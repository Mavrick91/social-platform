/* eslint-disable no-undef */

/** @type {import('tailwindcss').Config} */

const sidenavSizes = {
  'small-sidenav': '77px',
  'medium-sidenav': '244px',
};

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    screens: {
      lg: '1264px',
    },
    extend: {
      margin: {
        ...sidenavSizes,
      },
      width: {
        ...sidenavSizes,
      },
      maxWidth: {
        'lg-page': '935px',
      },
      colors: {
        'ig-blue': '#0095F6',
        'ig-blue-dark': '#00376B',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        badge: 'rgb(var(--badge))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        white: 'rgb(var(--web-always-white))',
        separator: {
          DEFAULT: 'rgb(var(--separator))',
          post: 'rgb(var(--separator-post))',
        },
        primary: {
          DEFAULT: 'rgb(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          text: 'rgb(var(--primary-text))',
          button: 'rgb(var(--primary-button))',
          hover: 'rgb(var(--primary-hover))',
          'link-hover': 'rgb(var(--primary-link-hover))',
        },
        secondary: {
          DEFAULT: 'rgb(var(--secondary))',
          button: 'rgb(var(--secondary-button))',
          background: 'rgb(var(--secondary-background))',
          foreground: 'hsl(var(--secondary-foreground))',
          'button-background': 'rgb(var(--secondary-button-background))',
        },
        'secondary-button-hover': {
          DEFAULT: 'rgb(var(--secondary-button-hover))',
        },
        destructive: {
          DEFAULT: 'rgb(var(--destructive))',
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
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
