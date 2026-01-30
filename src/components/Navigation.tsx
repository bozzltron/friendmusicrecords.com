import { A } from "@solidjs/router";

export default function Navigation() {
  return (
    <nav 
      class="w-full py-6 px-4 border-b"
      style={{ 
        "background": "var(--bg-primary)",
        "border-color": "var(--border-default)"
      }}
      aria-label="Main navigation"
      role="navigation"
    >
      <div class="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <A 
          href="/" 
          class="focus:outline-none focus:ring-2 rounded"
          style={{ "focus:ring-color": "var(--focus-ring)", "color": "var(--text-primary)" }}
          aria-label="friend music records home"
        >
          <span 
            class="text-xl font-mono md:hidden"
            style={{ color: "var(--text-primary)" }}
          >
            fm
          </span>
          <span 
            class="text-xl font-mono hidden md:inline"
            style={{ color: "var(--text-primary)" }}
          >
            friend music
          </span>
        </A>

        {/* Navigation Links */}
        <div class="flex items-center gap-6">
          <A 
            href="/" 
            class="text-base transition-colors focus:outline-none focus:ring-2 rounded px-2 py-1"
            style={{ 
              "color": "var(--text-secondary)",
              "focus:ring-color": "var(--focus-ring)"
            }}
            activeClass="text-primary"
            inactiveClass="hover:text-primary"
          >
            Home
          </A>
          <A 
            href="/about" 
            class="text-base transition-colors focus:outline-none focus:ring-2 rounded px-2 py-1"
            style={{ 
              "color": "var(--text-secondary)",
              "focus:ring-color": "var(--focus-ring)"
            }}
            activeClass="text-primary"
            inactiveClass="hover:text-primary"
          >
            About
          </A>
          <A 
            href="/artists" 
            class="text-base transition-colors focus:outline-none focus:ring-2 rounded px-2 py-1"
            style={{ 
              "color": "var(--text-secondary)",
              "focus:ring-color": "var(--focus-ring)"
            }}
            activeClass="text-primary"
            inactiveClass="hover:text-primary"
          >
            Artists
          </A>
          <A 
            href="/press" 
            class="text-base transition-colors focus:outline-none focus:ring-2 rounded px-2 py-1"
            style={{ 
              "color": "var(--text-secondary)",
              "focus:ring-color": "var(--focus-ring)"
            }}
            activeClass="text-primary"
            inactiveClass="hover:text-primary"
          >
            Press
          </A>
          <A 
            href="/contact" 
            class="text-base transition-colors focus:outline-none focus:ring-2 rounded px-2 py-1"
            style={{ 
              "color": "var(--text-secondary)",
              "focus:ring-color": "var(--focus-ring)"
            }}
            activeClass="text-primary"
            inactiveClass="hover:text-primary"
          >
            Contact
          </A>
        </div>
      </div>
    </nav>
  );
}

