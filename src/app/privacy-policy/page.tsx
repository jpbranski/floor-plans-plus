// src/app/privacy-policy/page.tsx
import { Container, Title, Text, Stack, Card } from '@mantine/core';
import { MainAppShell } from '@/components/layout/MainAppShell';

export default function PrivacyPolicyPage() {
  return (
    <MainAppShell>
      <Container size="md" py="xl" style={{ flex: 1 }}>
        <Stack gap="xl" py={40}>
          <Title order={1} style={{ color: '#2F2A28' }}>
            Privacy Policy
          </Title>

          <Card shadow="sm" padding="xl" radius="md">
            <Stack gap="md">
              <Text size="sm" c="dimmed" style={{ color: '#87817D' }}>
                Last updated: {new Date().toLocaleDateString()}
              </Text>

              <Title order={2} size="h3" mt="md" style={{ color: '#2F2A28' }}>
                Our Commitment to Privacy
              </Title>
              <Text style={{ color: '#5E5753' }}>
                Floorplan Studio is designed with privacy as a fundamental principle. This app is
                100% local and client-side. We do not collect, store, or transmit any of your data
                to external servers.
              </Text>

              <Title order={2} size="h3" mt="md" style={{ color: '#2F2A28' }}>
                Data Collection
              </Title>
              <Text fw={600} style={{ color: '#A59386' }}>
                We do not collect any personal data.
              </Text>
              <Text style={{ color: '#5E5753' }}>
                Floorplan Studio runs entirely in your web browser. All floorplans, settings, and
                user data are stored locally on your device using browser localStorage. We have no
                access to this data.
              </Text>

              <Title order={2} size="h3" mt="md" style={{ color: '#2F2A28' }}>
                Third-Party Services
              </Title>
              <Text style={{ color: '#5E5753' }}>
                This application does not use third-party analytics, tracking, or advertising
                services. We do not embed any third-party scripts that collect user data.
              </Text>

              <Title order={2} size="h3" mt="md" style={{ color: '#2F2A28' }}>
                Cookies
              </Title>
              <Text style={{ color: '#5E5753' }}>
                Floorplan Studio does not use cookies. All data persistence is handled via browser
                localStorage, which is controlled entirely by you.
              </Text>

              <Title order={2} size="h3" mt="md" style={{ color: '#2F2A28' }}>
                Local Storage
              </Title>
              <Text style={{ color: '#5E5753' }}>
                When you save your floorplan, it is stored in your browser's localStorage under the
                key <code>floorplan-studio-scene-v1</code>. This data:
              </Text>
              <ul style={{ color: '#5E5753', marginLeft: '1.5rem' }}>
                <li>Remains on your device only</li>
                <li>Can be cleared by you at any time via browser settings</li>
                <li>Is never transmitted to any server</li>
                <li>Is not accessible to us or any third party</li>
              </ul>

              <Title order={2} size="h3" mt="md" style={{ color: '#2F2A28' }}>
                Export Functionality
              </Title>
              <Text style={{ color: '#5E5753' }}>
                When you export your floorplan (as PDF, PNG, JPG, or WebP), the file is generated
                entirely in your browser and saved directly to your device. No data is uploaded or
                sent anywhere.
              </Text>

              <Title order={2} size="h3" mt="md" style={{ color: '#2F2A28' }}>
                Your Rights
              </Title>
              <Text style={{ color: '#5E5753' }}>
                Since we don't collect any data, there is nothing for us to delete, modify, or
                export. You have complete control over your data at all times through your browser.
              </Text>

              <Title order={2} size="h3" mt="md" style={{ color: '#2F2A28' }}>
                Changes to This Policy
              </Title>
              <Text style={{ color: '#5E5753' }}>
                If we ever change our privacy practices, we will update this policy and note the
                revision date above. However, our core commitment to local-only operation will not
                change.
              </Text>

              <Title order={2} size="h3" mt="md" style={{ color: '#2F2A28' }}>
                Questions
              </Title>
              <Text style={{ color: '#5E5753' }}>
                If you have questions about this privacy policy, please contact us at
                hello@floorplanstudio.example.
              </Text>
            </Stack>
          </Card>
        </Stack>
      </Container>
    </MainAppShell>
  );
}
