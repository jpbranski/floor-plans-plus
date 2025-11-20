// src/app/contact/page.tsx
import { Container, Title, Text, Stack, Card, Anchor } from '@mantine/core';
import { MainAppShell } from '@/components/layout/MainAppShell';

export default function ContactPage() {
  return (
    <MainAppShell>
      <Container size="md" py="xl" style={{ flex: 1 }}>
        <Stack gap="xl" py={40}>
          <Title order={1} style={{ color: '#2F2A28' }}>
            Contact Us
          </Title>

          <Card shadow="sm" padding="xl" radius="md">
            <Stack gap="md">
              <Text size="lg" style={{ color: '#5E5753' }}>
                We'd love to hear from you! Whether you have questions, feedback, or just want to
                say hello, feel free to reach out.
              </Text>

              <Title order={2} size="h3" mt="md" style={{ color: '#2F2A28' }}>
                Email
              </Title>
              <Text style={{ color: '#5E5753' }}>
                For general inquiries, support, or feedback:{' '}
                <Anchor href="mailto:hello@floorplanstudio.example" style={{ color: '#A59386' }}>
                  hello@floorplanstudio.example
                </Anchor>
              </Text>

              <Title order={2} size="h3" mt="md" style={{ color: '#2F2A28' }}>
                Bug Reports & Feature Requests
              </Title>
              <Text style={{ color: '#5E5753' }}>
                If you encounter a bug or have a feature suggestion, please email us with:
              </Text>
              <ul style={{ color: '#5E5753', marginLeft: '1.5rem' }}>
                <li>A description of the issue or feature</li>
                <li>Steps to reproduce (for bugs)</li>
                <li>Your browser and operating system</li>
                <li>Any relevant screenshots</li>
              </ul>

              <Title order={2} size="h3" mt="md" style={{ color: '#2F2A28' }}>
                Response Time
              </Title>
              <Text style={{ color: '#5E5753' }}>
                We aim to respond to all inquiries within 2-3 business days. Please note that
                Floorplan Studio is maintained by a small team, and response times may vary.
              </Text>

              <Title order={2} size="h3" mt="md" style={{ color: '#2F2A28' }}>
                Community
              </Title>
              <Text style={{ color: '#5E5753' }}>
                Join our community of users to share your floorplans, get tips, and connect with
                other creators. (Community links coming soon!)
              </Text>
            </Stack>
          </Card>
        </Stack>
      </Container>
    </MainAppShell>
  );
}
