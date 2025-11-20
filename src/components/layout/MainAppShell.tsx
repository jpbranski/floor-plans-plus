// src/components/layout/MainAppShell.tsx
'use client';

import { AppShell } from '@mantine/core';
import { AppHeader } from './AppHeader';
import { AppFooter } from './AppFooter';
import { ReactNode } from 'react';

interface MainAppShellProps {
  children: ReactNode;
  hideFooter?: boolean;
}

export function MainAppShell({ children, hideFooter = false }: MainAppShellProps) {
  return (
    <AppShell
      header={{ height: 70 }}
      padding={0}
      styles={{
        main: {
          backgroundColor: '#F7F3EF',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <AppShell.Header>
        <AppHeader />
      </AppShell.Header>

      <AppShell.Main
        style={{
          paddingTop: 70,
        }}
      >
        {children}
      </AppShell.Main>

      {!hideFooter && <AppFooter />}
    </AppShell>
  );
}
