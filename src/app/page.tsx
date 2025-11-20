// src/app/page.tsx
'use client';

import { Container, Title, Text, Button, Stack, Card, Grid, List } from '@mantine/core';
import Link from 'next/link';
import { MainAppShell } from '@/components/layout/MainAppShell';

export default function HomePage() {
  return (
    <MainAppShell>
      <Container size="lg" py="xl" style={{ flex: 1 }}>
        {/* Hero section */}
        <Stack gap="xl" align="center" py={60}>
          <Title
            order={1}
            size={48}
            style={{
              color: '#2F2A28',
              textAlign: 'center',
              letterSpacing: '-1px',
            }}
          >
            Floorplan Studio
          </Title>

          <Text
            size="xl"
            style={{
              color: '#87817D',
              textAlign: 'center',
              maxWidth: '600px',
            }}
          >
            A cozy, local-only 2D planning tool for creating beautiful floorplans and spatial
            layouts.
          </Text>

          <Button
            component={Link}
            href="/tool"
            size="lg"
            radius="md"
            style={{
              backgroundColor: '#A59386',
              color: 'white',
              marginTop: '1rem',
            }}
          >
            Open Floorplan Tool
          </Button>
        </Stack>

        {/* Features grid */}
        <Grid gutter="lg" mt={60} mb={60}>
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md">
              <Title order={3} size="h4" mb="sm" style={{ color: '#2F2A28' }}>
                🎨 Warm Design
              </Title>
              <Text size="sm" style={{ color: '#87817D' }}>
                Enjoy a cozy cream-taupe-mauve aesthetic that makes planning a pleasure.
              </Text>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md">
              <Title order={3} size="h4" mb="sm" style={{ color: '#2F2A28' }}>
                🔒 100% Local
              </Title>
              <Text size="sm" style={{ color: '#87817D' }}>
                Your data never leaves your browser. No servers, no tracking, complete privacy.
              </Text>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md">
              <Title order={3} size="h4" mb="sm" style={{ color: '#2F2A28' }}>
                ⌨️ Keyboard First
              </Title>
              <Text size="sm" style={{ color: '#87817D' }}>
                Powerful keyboard shortcuts and command palette for efficient workflows.
              </Text>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md">
              <Title order={3} size="h4" mb="sm" style={{ color: '#2F2A28' }}>
                🖼️ Full Editor
              </Title>
              <Text size="sm" style={{ color: '#87817D' }}>
                Draw walls, place doors, add furniture, and annotate with text labels.
              </Text>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md">
              <Title order={3} size="h4" mb="sm" style={{ color: '#2F2A28' }}>
                📤 Export Ready
              </Title>
              <Text size="sm" style={{ color: '#87817D' }}>
                Export to PDF, PNG, JPG, or WebP for sharing and printing.
              </Text>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md">
              <Title order={3} size="h4" mb="sm" style={{ color: '#2F2A28' }}>
                ♻️ Undo/Redo
              </Title>
              <Text size="sm" style={{ color: '#87817D' }}>
                Experiment freely with full undo/redo support for all actions.
              </Text>
            </Card>
          </Grid.Col>
        </Grid>

        {/* Quick start */}
        <Card shadow="md" padding="xl" radius="md" mt={60}>
          <Title order={2} size="h3" mb="md" style={{ color: '#2F2A28' }}>
            Quick Start
          </Title>
          <List spacing="sm" size="md" style={{ color: '#5E5753' }}>
            <List.Item>
              Click <strong>"Open Floorplan Tool"</strong> above to start drawing
            </List.Item>
            <List.Item>
              Use keyboard shortcuts (<strong>V</strong> for select, <strong>W</strong> for wall,{' '}
              <strong>D</strong> for door, etc.)
            </List.Item>
            <List.Item>
              Manage layers and properties in the right panel
            </List.Item>
            <List.Item>
              Press <strong>Ctrl/Cmd+K</strong> to open the command palette
            </List.Item>
            <List.Item>
              Save locally with <strong>Ctrl/Cmd+S</strong>, export when ready
            </List.Item>
          </List>
        </Card>
      </Container>
    </MainAppShell>
  );
}
