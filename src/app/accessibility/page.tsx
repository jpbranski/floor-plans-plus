// src/app/accessibility/page.tsx
import { Container, Title, Text, Stack, Card } from '@mantine/core';
import { MainAppShell } from '@/components/layout/MainAppShell';

export default function AccessibilityPage() {
  return (
    <MainAppShell>
      <Container size="md" py="xl" style={{ flex: 1 }}>
        <Stack gap="xl" py={40}>
          <Title order={1} style={{ color: '#2F2A28' }}>
            Accessibility Statement
          </Title>

          <Card shadow="sm" padding="xl" radius="md">
            <Stack gap="md">
              <Text size="lg" style={{ color: '#5E5753' }}>
                Floorplan Studio is committed to ensuring digital accessibility for people with
                disabilities. We are continually improving the user experience for everyone and
                applying relevant accessibility standards.
              </Text>

              <Title order={2} size="h3" mt="md" style={{ color: '#2F2A28' }}>
                Conformance
              </Title>
              <Text style={{ color: '#5E5753' }}>
                We aim to conform to WCAG 2.1 Level AA standards. While we strive for full
                compliance, some aspects of the canvas-based drawing tool may present accessibility
                challenges.
              </Text>

              <Title order={2} size="h3" mt="md" style={{ color: '#2F2A28' }}>
                Accessibility Features
              </Title>
              <Text style={{ color: '#5E5753' }}>
                Floorplan Studio includes the following accessibility features:
              </Text>
              <ul style={{ color: '#5E5753', marginLeft: '1.5rem' }}>
                <li>
                  <strong>Keyboard Navigation:</strong> Full keyboard support with shortcuts for all
                  major functions (V for select, W for wall, D for door, etc.)
                </li>
                <li>
                  <strong>Command Palette:</strong> Ctrl/Cmd+K opens a searchable command menu for
                  quick access without memorizing shortcuts
                </li>
                <li>
                  <strong>Focus Indicators:</strong> Clear visual focus indicators for keyboard
                  navigation
                </li>
                <li>
                  <strong>Color Contrast:</strong> Text and UI elements meet WCAG AA contrast
                  requirements
                </li>
                <li>
                  <strong>Semantic HTML:</strong> Proper heading structure and ARIA labels where
                  appropriate
                </li>
                <li>
                  <strong>Resizable Text:</strong> Interface text respects browser zoom and font
                  size settings
                </li>
              </ul>

              <Title order={2} size="h3" mt="md" style={{ color: '#2F2A28' }}>
                Known Limitations
              </Title>
              <Text style={{ color: '#5E5753' }}>
                As a canvas-based drawing application, some features may be challenging for users
                with certain disabilities:
              </Text>
              <ul style={{ color: '#5E5753', marginLeft: '1.5rem' }}>
                <li>
                  Screen readers have limited access to canvas content (objects are drawn visually
                  rather than as DOM elements)
                </li>
                <li>Fine motor control is required for precise object positioning and resizing</li>
                <li>Visual design elements may not be perceivable to users with visual impairments</li>
              </ul>
              <Text style={{ color: '#5E5753' }}>
                We are actively exploring ways to improve accessibility for these use cases,
                including alternative representations of floorplan data.
              </Text>

              <Title order={2} size="h3" mt="md" style={{ color: '#2F2A28' }}>
                Keyboard Shortcuts
              </Title>
              <Text style={{ color: '#5E5753' }}>
                All major functions are accessible via keyboard:
              </Text>
              <ul style={{ color: '#5E5753', marginLeft: '1.5rem' }}>
                <li>V - Select/Move tool</li>
                <li>W - Wall tool</li>
                <li>D - Door tool</li>
                <li>F - Furniture tool</li>
                <li>T - Text tool</li>
                <li>Spacebar - Pan mode (hold)</li>
                <li>Ctrl/Cmd+Z - Undo</li>
                <li>Ctrl/Cmd+Shift+Z - Redo</li>
                <li>Delete/Backspace - Delete selected</li>
                <li>Ctrl/Cmd+S - Save</li>
                <li>Ctrl/Cmd+K - Command palette</li>
              </ul>

              <Title order={2} size="h3" mt="md" style={{ color: '#2F2A28' }}>
                Feedback
              </Title>
              <Text style={{ color: '#5E5753' }}>
                We welcome feedback on the accessibility of Floorplan Studio. If you encounter
                accessibility barriers, please let us know:
              </Text>
              <ul style={{ color: '#5E5753', marginLeft: '1.5rem' }}>
                <li>Email: hello@floorplanstudio.example</li>
                <li>Subject line: "Accessibility Feedback"</li>
                <li>Please describe the issue and your assistive technology setup</li>
              </ul>
              <Text style={{ color: '#5E5753' }}>
                We will make every reasonable effort to address your concerns and improve
                accessibility.
              </Text>

              <Title order={2} size="h3" mt="md" style={{ color: '#2F2A28' }}>
                Third-Party Content
              </Title>
              <Text style={{ color: '#5E5753' }}>
                This application uses minimal third-party libraries. We select dependencies that
                prioritize accessibility and web standards.
              </Text>

              <Title order={2} size="h3" mt="md" style={{ color: '#2F2A28' }}>
                Updates
              </Title>
              <Text size="sm" c="dimmed" style={{ color: '#87817D' }}>
                This statement was last updated on {new Date().toLocaleDateString()}.
              </Text>
            </Stack>
          </Card>
        </Stack>
      </Container>
    </MainAppShell>
  );
}
