/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export const darkMode = ['class'];
export const content = [
  './pages/**/*.{ts,tsx}',
  './components/**/*.{ts,tsx}',
  './app/**/*.{ts,tsx}',
  './src/**/*.{ts,tsx}',
  './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
];
export const theme = {
  transparent: 'transparent',
  current: 'currentColor',
  container: {
    center: true,
    padding: '2rem',
    screens: {
      '2xl': '1400px',
    },
  },
  extend: {
    colors: {
      // light mode
      tremor: {
        brand: {
          faint: '#eff6ff',
          muted: '#bfdbfe',
          subtle: '#60a5fa',
          DEFAULT: '#3b82f6',
          emphasis: '#1d4ed8',
          inverted: '#ffffff', // white
        },
        background: {
          muted: '#f9fafb',
          subtle: '#f3f4f6',
          DEFAULT: '#ffffff',
          emphasis: '#374151', // gray-700
        },
        border: {
          DEFAULT: '#e5e7eb', // gray-200
        },
        ring: {
          DEFAULT: '#e5e7eb', // gray-200
        },
        content: {
          subtle: '#9ca3af',
          DEFAULT: '#6b7280',
          emphasis: '#374151',
          strong: '#111827',
          inverted: '#ffffff', // white
        },
      },
      // dark mode
      'dark-tremor': {
        brand: {
          faint: 'hsl(226, 58%, 10%)',
          muted: 'hsl(226, 57%, 21%)',
          subtle: 'hsl(226, 71%, 40%)',
          DEFAULT: 'hsl(var(--primary))',
          emphasis: 'hsl(213, 94%, 68%)',
          inverted: 'hsl(224, 71%, 4%)', // gray-950
        },
        background: {
          muted: 'hsl(var(--muted))',
          subtle: 'hsl(var(--accent))',
          DEFAULT: 'hsl(var(--background))',
          emphasis: '#d1d5db', // gray-300
        },
        border: {
          DEFAULT: 'hsl(var(--border))', // gray-800
        },
        ring: {
          DEFAULT: 'hsl(var(--border))', // gray-800
        },
        content: {
          subtle: '#4b5563',
          DEFAULT: 'hsl(var(--foreground))',
          emphasis: '#e5e7eb',
          strong: '#f9fafb',
          inverted: '#000000', // black
        },
      },
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))',
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))',
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))',
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))',
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))',
      },
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))',
      },
      success: {
        DEFAULT: 'hsl(var(--success))',
        foreground: 'hsl(var(--foreground))',
      },
    },
    boxShadow: {
      // light
      'tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      'tremor-card':
        '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      'tremor-dropdown':
        '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      // dark
      'dark-tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      'dark-tremor-card':
        '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      'dark-tremor-dropdown':
        '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    },
    borderRadius: {
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)',
      'tremor-small': '0.375rem',
      'tremor-default': '0.5rem',
      'tremor-full': '9999px',
    },
    fontSize: {
      'tremor-label': ['0.75rem'],
      'tremor-default': ['0.875rem', { lineHeight: '1.25rem' }],
      'tremor-title': ['1.125rem', { lineHeight: '1.75rem' }],
      'tremor-metric': ['1.875rem', { lineHeight: '2.25rem' }],
    },
    keyframes: {
      'accordion-down': {
        from: { height: 0 },
        to: { height: 'var(--radix-accordion-content-height)' },
      },
      'accordion-up': {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: 0 },
      },
    },
    animation: {
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out',
    },
    screens: {
      '8xl': '200ch',
    },
  },
};
export const safelist = [
  {
    pattern:
      /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    variants: ['hover', 'ui-selected'],
  },
  {
    pattern:
      /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    variants: ['hover', 'ui-selected'],
  },
  {
    pattern:
      /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    variants: ['hover', 'ui-selected'],
  },
  {
    pattern:
      /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
  },
  {
    pattern:
      /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
  },
  {
    pattern:
      /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
  },
];

export const plugins = [
  require('tailwindcss-animate'),
  require('@headlessui/tailwindcss'),
];
