// src/app/about/page.tsx
import { Container, Title, Text, Stack, Card } from '@mantine/core';
import { MainAppShell } from '@/components/layout/MainAppShell';

export default function AboutPage() {
  return (
    <MainAppShell>
      <Container size="md" py="xl" style={{ flex: 1 }}>
        <Stack gap="xl" py={40}>
          <Title order={1} style={{ color: '#2F2A28' }}>
            About Floorplan Studio
          </Title>

          <Card shadow="sm" padding="xl" radius="md">
            <Stack gap="md">
              <Text size="lg" style={{ color: '#5E5753' }}>
                Floorplan Studio is a cozy, browser-based tool for creating 2D floorplans and
                spatial layouts. Built with modern web technologies, it offers a warm design studio
                aesthetic while prioritizing privacy and ease of use.
              </Text>

              <Title order={2} size="h3" mt="md" style={{ color: '#2F2A28' }}>
                Purpose
              </Title>
              <Text style={{ color: '#5E5753' }}>
                This tool is designed for <strong>diagram-level planning</strong> and visualization.
                It's perfect for:
              </Text>
              <ul style={{ color: '#5E5753', marginLeft: '1.5rem' }}>
                <li>Brainstorming room layouts</li>
                <li>Furniture arrangement planning</li>
                <li>Quick space visualization</li>
                <li>Rough draft floorplans</li>
                <li>Educational purposes</li>
              </ul>

              <Title order={2} size="h3" mt="md" style={{ color: '#2F2A28' }}>
                What It's Not
              </Title>
              <Text style={{ color: '#5E5753' }}>
                Floorplan Studio is <strong>not intended for</strong>:
              </Text>
              <ul style={{ color: '#5E5753', marginLeft: '1.5rem' }}>
                <li>Professional architectural drawings</li>
                <li>Construction-grade plans</li>
                <li>Code-compliant building designs</li>
                <li>Engineering specifications</li>
              </ul>
              <Text fw={600} style={{ color: '#A59386' }}>
                Always consult licensed architects and engineers for actual building projects.
              </Text>

              <Title order={2} size="h3" mt="md" style={{ color: '#2F2A28' }}>
                Technology
              </Title>
              <Text style={{ color: '#5E5753' }}>
                Built with Next.js, TypeScript, Mantine UI, and react-konva for a modern, performant
                experience. All processing happens in your browser—no servers, no tracking, complete
                privacy.
              </Text>

              <Title order={2} size="h3" mt="md" style={{ color: '#2F2A28' }}>
                Open Source
              </Title>
              <Text style={{ color: '#5E5753' }}>
                Floorplan Studio is open source software, free to use and modify. We believe in
                transparent, accessible tools for everyone.
              </Text>
            </Stack>
          </Card>
        </Stack>
      </Container>
    </MainAppShell>
  );
}
