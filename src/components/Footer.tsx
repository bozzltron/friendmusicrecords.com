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
      </div>
    </footer>
  );
}

