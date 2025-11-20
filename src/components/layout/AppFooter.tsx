// src/components/layout/AppFooter.tsx
'use client';

import { Group, Text, Anchor, Box, Stack } from '@mantine/core';
import Link from 'next/link';

export function AppFooter() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/accessibility', label: 'Accessibility' },
  ];

  return (
    <Box
      component="footer"
      style={{
        backgroundColor: '#F7F3EF',
        borderTop: '1px solid #E8DFD9',
        padding: '2rem',
        marginTop: 'auto',
      }}
    >
      <Stack gap="md" align="center">
        {/* Footer links */}
        <Group gap="lg">
          {footerLinks.map((link) => (
            <Anchor
              key={link.href}
              component={Link}
              href={link.href}
              underline="hover"
              size="sm"
              style={{
                color: '#87817D',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#A59386';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#87817D';
              }}
            >
              {link.label}
            </Anchor>
          ))}
        </Group>

        {/* Copyright */}
        <Text size="sm" c="dimmed" style={{ color: '#87817D' }}>
          © {currentYear} Floorplan Studio. All rights reserved.
        </Text>

        {/* Disclaimer */}
        <Text size="xs" c="dimmed" style={{ color: '#B0ABA8', maxWidth: '600px', textAlign: 'center' }}>
          For diagram-level planning only. Not intended for architectural or construction use.
        </Text>
      </Stack>
    </Box>
  );
}
