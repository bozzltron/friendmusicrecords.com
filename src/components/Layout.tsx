import type { JSX } from "solid-js";
import Navigation from "./Navigation";
import Footer from "./Footer";

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout(props: LayoutProps) {
  return (
    <div class="flex flex-col min-h-screen">
      <a
        href="#main-content"
        class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 px-4 py-2 rounded focus:outline-none focus:ring-2 z-50"
        style={{
          background: "var(--accent-primary)",
          color: "var(--bg-primary)",
          "focus:ring-color": "var(--focus-ring)",
        }}
      >
        Skip to main content
      </a>
      <Navigation />
      {props.children}
      <Footer />
    </div>
  );
}
