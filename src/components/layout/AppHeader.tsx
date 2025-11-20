// src/components/layout/AppHeader.tsx
'use client';

import { Group, Text, Anchor, Box } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AppHeader() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/tool', label: 'Tool' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <Box
      component="header"
      style={{
        backgroundColor: '#F7F3EF',
        borderBottom: '1px solid #E8DFD9',
        padding: '1rem 2rem',
      }}
    >
      <Group justify="space-between" align="center">
        {/* Logo/Brand */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Text
            size="xl"
            fw={700}
            style={{
              color: '#2F2A28',
              letterSpacing: '-0.5px',
            }}
          >
            Floorplan Studio
          </Text>
        </Link>

        {/* Navigation */}
        <Group gap="xl">
          {navLinks.map((link) => (
            <Anchor
              key={link.href}
              component={Link}
              href={link.href}
              underline="never"
              style={{
                color: pathname === link.href ? '#A59386' : '#2F2A28',
                fontWeight: pathname === link.href ? 600 : 500,
                fontSize: '0.95rem',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (pathname !== link.href) {
                  e.currentTarget.style.color = '#A59386';
                }
              }}
              onMouseLeave={(e) => {
                if (pathname !== link.href) {
                  e.currentTarget.style.color = '#2F2A28';
                }
              }}
            >
              {link.label}
            </Anchor>
          ))}
        </Group>
      </Group>
    </Box>
  );
}
