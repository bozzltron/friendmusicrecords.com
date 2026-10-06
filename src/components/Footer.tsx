import BlueskyIcon from "./BlueskyIcon";
import { LABEL } from "../data/label";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      class="w-full text-center text-xs py-4 sm:py-6 px-4 sm:px-6 lg:px-8 border-t mt-auto"
      role="contentinfo"
      style={{ 
        "background": "var(--bg-primary)",
        "color": "var(--text-tertiary)",
        "border-color": "var(--border-default)"
      }}
    >
      <div class="max-w-content mx-auto">
        <p>&copy; {currentYear} friend music records. Founded 2026. All rights reserved.</p>
        <nav
          class="mt-3 flex items-center justify-center gap-4"
          aria-label="friend music records on social media"
        >
          <a
            href={LABEL.social.bluesky}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center rounded transition-colors text-[color:var(--text-secondary)] hover:text-[color:var(--accent-primary)]"
            aria-label="friend music records on Bluesky"
          >
            <BlueskyIcon class="w-5 h-5" />
          </a>
        </nav>
        <p class="mt-2">
          <a 
            href="/blog" 
            class="text-accent-primary hover:text-accent-secondary transition-colors"
            style={{ "color": "var(--accent-primary)", "hover:color": "var(--accent-secondary)" }}
          >
            Blog
          </a>
        </p>
      </div>
    </footer>
  );
}