// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en" dir="ltr">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
          
          {/* Security */}
          <meta http-equiv="X-Content-Type-Options" content="nosniff" />
          <meta http-equiv="X-Frame-Options" content="SAMEORIGIN" />
          <meta name="referrer" content="strict-origin-when-cross-origin" />
          
          {/* Icons & Manifest */}
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/friendmusicrecords.webp" type="image/webp" />
          <link rel="apple-touch-icon" href="/friendmusicrecords.webp" />
          
          {/* Preconnect to external resources - Performance optimization */}
          <link rel="preconnect" href="https://bandcamp.com" crossorigin="anonymous" />
          <link rel="dns-prefetch" href="https://bandcamp.com" />
          <link rel="preconnect" href="https://www.googletagmanager.com" crossorigin="anonymous" />
          <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
          
          {/* Theme & PWA */}
          <meta name="theme-color" content="#121212" media="(prefers-color-scheme: dark)" />
          <meta name="theme-color" content="#121212" media="(prefers-color-scheme: light)" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-title" content="friend music" />
          <meta name="mobile-web-app-capable" content="yes" />
          
          {/* Performance hints */}
          <meta name="format-detection" content="telephone=no" />
          
          {/* Google Analytics */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-VZXLSE4S22"></script>
          <script>
            {`
              // Ignore local traffic
              const hostname = window.location.hostname;
              const isLocalhost = hostname === 'localhost' || 
                                  hostname === '127.0.0.1' || 
                                  hostname === '0.0.0.0' ||
                                  hostname.startsWith('192.168.') ||
                                  hostname.startsWith('10.') ||
                                  hostname.endsWith('.local');
              
              if (!isLocalhost) {
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-VZXLSE4S22');
              }
            `}
          </script>
          
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));

