// src/theme/theme.ts
import { MantineThemeOverride, createTheme } from '@mantine/core';

/**
 * Floorplan Studio theme configuration
 * Warm design studio aesthetic with cream-taupe-mauve palette
 */
export const theme: MantineThemeOverride = createTheme({
  // Color palette
  colors: {
    // Primary: Taupe shades
    taupe: [
      '#F5F0ED', // lightest
      '#E8DFD9',
      '#D9CBC0',
      '#CAB7A7',
      '#BBA38E',
      '#A59386', // base - shade 5
      '#8F7D71',
      '#79675D',
      '#635149',
      '#4D3B35', // darkest
    ],
    // Secondary: Mauve shades
    mauve: [
      '#F7EEF7',
      '#ECDCEC',
      '#E1CAE1',
      '#D5B8D5',
      '#C9A4C9', // base - shade 4
      '#BD90BD',
      '#A77CA7',
      '#916891',
      '#7B547B',
      '#654065',
    ],
    // Neutral: Charcoal shades
    charcoal: [
      '#F7F6F6',
      '#E8E6E5',
      '#D9D6D4',
      '#B0ABA8',
      '#87817D',
      '#5E5753',
      '#2F2A28', // base - shade 6
      '#252120',
      '#1B1918',
      '#111010',
    ],
    // Cream for backgrounds
    cream: [
      '#FFFFFF',
      '#FCFAF8',
      '#F7F3EF', // base - shade 2
      '#F2EDE7',
      '#EDE7DF',
      '#E8E1D7',
      '#E3DBCF',
      '#DED5C7',
      '#D9CFBF',
      '#D4C9B7',
    ],
  },

  // Set primary color to taupe
  primaryColor: 'taupe',
  primaryShade: 5,

  // Default radius for rounded corners
  defaultRadius: 'md',

  // Font family
  fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',

  // Font sizes
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  },

  // Spacing
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },

  // Shadows - soft and subtle
  shadows: {
    xs: '0 1px 2px rgba(47, 42, 40, 0.05)',
    sm: '0 2px 4px rgba(47, 42, 40, 0.08)',
    md: '0 4px 8px rgba(47, 42, 40, 0.1)',
    lg: '0 8px 16px rgba(47, 42, 40, 0.12)',
    xl: '0 16px 32px rgba(47, 42, 40, 0.15)',
  },

  // Component overrides
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
      styles: {
        root: {
          fontWeight: 600,
        },
      },
    },
    Card: {
      defaultProps: {
        radius: 'md',
        shadow: 'sm',
      },
    },
    Paper: {
      defaultProps: {
        radius: 'md',
        shadow: 'xs',
      },
    },
    Input: {
      defaultProps: {
        radius: 'md',
      },
    },
    TextInput: {
      defaultProps: {
        radius: 'md',
      },
    },
    Select: {
      defaultProps: {
        radius: 'md',
      },
    },
    NumberInput: {
      defaultProps: {
        radius: 'md',
      },
    },
    Textarea: {
      defaultProps: {
        radius: 'md',
      },
    },
    Modal: {
      defaultProps: {
        radius: 'md',
        overlayProps: {
          opacity: 0.55,
          blur: 3,
        },
      },
    },
  },

  // Focus ring
  focusRing: 'auto',

  // Other properties
  cursorType: 'pointer',
});
