/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "system-ui",
          "-apple-system-subheadline",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "sans-serif"
        ],
        mono: [
          "SF Mono",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace"
        ]
      },
      colors: {
        apple: {
          blue: '#0071e3',
          'blue-dark': '#0077ED',
          indigo: '#5856d6',
          purple: '#af52de',
          pink: '#ff2d55',
          teal: '#5ac8fa',
          mint: '#00c7be',
          green: '#34c759',
          orange: '#ff9500',
          yellow: '#ffcc00',
          red: '#ff3b30',
          gray: {
            50: '#fbfbfd',
            100: '#f5f5f7',
            200: '#e5e5ea',
            300: '#d1d1d6',
            400: '#c7c7cc',
            500: '#8e8e93',
            600: '#636366',
            700: '#48484a',
            800: '#2c2c2e',
            850: '#222226',
            900: '#1c1c1e',
            950: '#0c0c0e'
          }
        }
      },
      boxShadow: {
        'apple-sm': '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'apple-md': '0 4px 16px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.08)',
        'apple-lg': '0 12px 32px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.04)',
        'apple-dark-sm': '0 2px 10px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        'apple-dark-md': '0 8px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
        'apple-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
      },
      backdropBlur: {
        'apple': '24px',
        'apple-heavy': '40px',
      }
    },
  },
  plugins: [],
}
