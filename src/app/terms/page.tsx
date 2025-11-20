// src/app/terms/page.tsx
import { Container, Title, Text, Stack, Card } from '@mantine/core';
import { MainAppShell } from '@/components/layout/MainAppShell';

export default function TermsPage() {
  return (
    <MainAppShell>
      <Container size="md" py="xl" style={{ flex: 1 }}>
        <Stack gap="xl" py={40}>
          <Title order={1} style={{ color: '#2F2A28' }}>
            Terms of Service
          </Title>

          <Card shadow="sm" padding="xl" radius="md">
            <Stack gap="md">
              <Text size="sm" c="dimmed" style={{ color: '#87817D' }}>
                Last updated: {new Date().toLocaleDateString()}
              </Text>

              <Title order={2} size="h3" mt="md" style={{ color: '#2F2A28' }}>
                Acceptance of Terms
              </Title>
              <Text style={{ color: '#5E5753' }}>
                By accessing and using Floorplan Studio, you accept and agree to be bound by the
                terms and conditions of this agreement. If you do not agree to these terms, please
                do not use this application.
              </Text>

              <Title order={2} size="h3" mt="md" style={{ color: '#2F2A28' }}>
                Description of Service
              </Title>
              <Text style={{ color: '#5E5753' }}>
                Floorplan Studio is a free, browser-based tool for creating simple 2D floorplan
                diagrams. It is provided "as is" for personal and commercial use.
              </Text>

              <Title order={2} size="h3" mt="md" style={{ color: '#2F2A28' }}>
                Use License
              </Title>
              <Text style={{ color: '#5E5753' }}>
                You are granted a non-exclusive, non-transferable license to use Floorplan Studio
                for any lawful purpose, including:
              </Text>
              <ul style={{ color: '#5E5753', marginLeft: '1.5rem' }}>
                <li>Personal projects</li>
                <li>Commercial projects</li>
                <li>Educational purposes</li>
                <li>Non-profit work</li>
              </ul>

              <Title order={2} size="h3" mt="md" style={{ color: '#2F2A28' }}>
                Disclaimer of Warranties
              </Title>
              <Text fw={600} style={{ color: '#A59386' }}>
                IMPORTANT: This tool is NOT for professional architectural or construction use.
              </Text>
              <Text style={{ color: '#5E5753' }}>
                Floorplan Studio is provided "AS IS" and "AS AVAILABLE" without warranties of any
                kind, either express or implied, including but not limited to:
              </Text>
              <ul style={{ color: '#5E5753', marginLeft: '1.5rem' }}>
                <li>Fitness for architectural or construction purposes</li>
                <li>Accuracy of measurements or scale</li>
                <li>Compliance with building codes or regulations</li>
                <li>Professional standards for design or engineering</li>
              </ul>

              <Title order={2} size="h3" mt="md" style={{ color: '#2F2A28' }}>
                Limitation of Liability
              </Title>
              <Text style={{ color: '#5E5753' }}>
                In no event shall Floorplan Studio, its creators, or contributors be liable for any
                damages arising from the use or inability to use this application, including but not
                limited to:
              </Text>
              <ul style={{ color: '#5E5753', marginLeft: '1.5rem' }}>
                <li>Loss of data</li>
                <li>Errors in floorplan designs</li>
                <li>Construction defects based on app-generated plans</li>
                <li>Any other indirect, incidental, or consequential damages</li>
              </ul>

              <Title order={2} size="h3" mt="md" style={{ color: '#2F2A28' }}>
                Professional Consultation Required
              </Title>
              <Text style={{ color: '#5E5753' }}>
                For any actual building, renovation, or construction project, you MUST consult with
                licensed architects, engineers, and contractors. Floorplan Studio output should
                never be used as official construction documents.
              </Text>

              <Title order={2} size="h3" mt="md" style={{ color: '#2F2A28' }}>
                User Responsibilities
              </Title>
              <Text style={{ color: '#5E5753' }}>
                You are responsible for:
              </Text>
              <ul style={{ color: '#5E5753', marginLeft: '1.5rem' }}>
                <li>Backing up your own floorplan data</li>
                <li>Verifying the accuracy of any measurements or layouts</li>
                <li>Ensuring compliance with applicable laws and regulations</li>
                <li>Using the application in a lawful manner</li>
              </ul>

              <Title order={2} size="h3" mt="md" style={{ color: '#2F2A28' }}>
                Intellectual Property
              </Title>
              <Text style={{ color: '#5E5753' }}>
                Floorplans you create with this tool belong to you. The application code is open
                source under the MIT License. You may modify and redistribute the code according to
                the license terms.
              </Text>

              <Title order={2} size="h3" mt="md" style={{ color: '#2F2A28' }}>
                Changes to Terms
              </Title>
              <Text style={{ color: '#5E5753' }}>
                We reserve the right to modify these terms at any time. Continued use of the
                application after changes constitutes acceptance of the new terms.
              </Text>

              <Title order={2} size="h3" mt="md" style={{ color: '#2F2A28' }}>
                Contact
              </Title>
              <Text style={{ color: '#5E5753' }}>
                Questions about these terms? Contact us at hello@floorplanstudio.example.
              </Text>
            </Stack>
          </Card>
        </Stack>
      </Container>
    </MainAppShell>
  );
}
