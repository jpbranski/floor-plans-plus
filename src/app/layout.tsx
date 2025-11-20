// src/app/layout.tsx
import type { Metadata } from 'next';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { theme } from '@/theme/theme';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Floorplan Studio - Cozy 2D Planning Tool',
  description:
    'A warm, local-only floorplan drawing app for diagram-level planning. Built with Next.js, TypeScript, and Mantine UI.',
  keywords: ['floorplan', 'floor plan', 'design', 'planning', 'drawing', '2d', 'tool'],
  authors: [{ name: 'Floorplan Studio' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <Notifications position="top-right" />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
