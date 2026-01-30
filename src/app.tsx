import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense, onMount, ErrorBoundary, createSignal } from "solid-js";
import { registerSW } from 'virtual:pwa-register';
import "./app.css";

function GlobalErrorFallback(err: unknown) {
  console.error("Global error boundary:", err);
  return (
    <div class="min-h-screen flex flex-col items-center justify-center" style={{ "background": "var(--bg-primary)" }}>
      <h2 class="text-2xl md:text-3xl font-bold mb-6 text-center" style={{ color: "var(--text-primary)" }}>
        Something went wrong. Please refresh the page.
      </h2>
      <button
        class="mt-8 px-6 py-3 rounded font-semibold shadow transition-colors focus:outline-none focus:ring-2 text-lg"
        style={{ 
          "background": "var(--accent-primary)",
          "color": "var(--bg-primary)",
          "focus:ring-color": "var(--focus-ring)"
        }}
        onClick={() => window.location.reload()}
      >
        Reload Page
      </button>
    </div>
  );
}

export default function App() {
  const [updateReady, setUpdateReady] = createSignal(false);
  const [offlineReady, setOfflineReady] = createSignal(false);
  let doUpdate: ((reload?: boolean) => void) | undefined;

  onMount(() => {
    // Service worker registration for PWA
    doUpdate = registerSW({
      immediate: true,
      onNeedRefresh() {
        setUpdateReady(true);
      },
      onOfflineReady() {
        setOfflineReady(true);
        setTimeout(() => setOfflineReady(false), 2500);
      }
    });
  });

  return (
    <ErrorBoundary fallback={GlobalErrorFallback}>
      <Router
        root={props => (
          <>
            <Suspense>{props.children}</Suspense>
            
            {/* Offline ready notification */}
            {offlineReady() && (
              <div 
                class="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 rounded-lg px-4 py-2 text-sm shadow-lg"
                style={{ 
                  "background": "rgba(26, 26, 26, 0.9)",
                  "border": "1px solid var(--border-default)",
                  "color": "var(--text-primary)"
                }}
              >
                App is ready to work offline
              </div>
            )}
            
            {/* Update available notification */}
            {updateReady() && (
              <div 
                class="fixed bottom-0 left-0 right-0 z-40"
                style={{ 
                  "background": "rgba(18, 18, 18, 0.95)",
                  "border-top": "1px solid var(--border-default)",
                  "color": "var(--text-primary)"
                }}
              >
                <div class="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between gap-3">
                  <span class="text-sm">A new version is available.</span>
                  <div class="flex items-center gap-2">
                    <button
                      class="px-3 py-1.5 rounded text-sm font-medium focus:outline-none focus:ring-2"
                      style={{ 
                        "background": "var(--accent-primary)",
                        "color": "var(--bg-primary)",
                        "focus:ring-color": "var(--focus-ring)"
                      }}
                      onClick={() => { setUpdateReady(false); doUpdate && doUpdate(true); }}
                    >
                      Reload
                    </button>
                    <button
                      class="px-3 py-1.5 rounded text-sm focus:outline-none focus:ring-2"
                      style={{ 
                        "border": "1px solid var(--border-hover)",
                        "color": "var(--text-primary)",
                        "focus:ring-color": "var(--focus-ring)"
                      }}
                      onClick={() => setUpdateReady(false)}
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      >
        <FileRoutes />
      </Router>
    </ErrorBoundary>
  );
}

