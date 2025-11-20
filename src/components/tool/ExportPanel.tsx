// src/components/tool/ExportPanel.tsx
'use client';

import { Stack, Text, Button, Checkbox, Group } from '@mantine/core';
import { useState } from 'react';
import Konva from 'konva';
import { exportAsImage, exportAsPdf } from '@/utils/export';
import { notifications } from '@mantine/notifications';

interface ExportPanelProps {
  stageRef: React.RefObject<Konva.Stage>;
}

export function ExportPanel({ stageRef }: ExportPanelProps) {
  const [includeNotes, setIncludeNotes] = useState(true);
  const [includeScaleBar, setIncludeScaleBar] = useState(true);

  const handleExport = (format: 'png' | 'jpeg' | 'webp' | 'pdf') => {
    if (!stageRef.current) {
      notifications.show({
        title: 'Export Error',
        message: 'Canvas is not ready. Please try again.',
        color: 'red',
      });
      return;
    }

    try {
      const filename = 'floorplan';

      if (format === 'pdf') {
        exportAsPdf(stageRef.current, filename, {
          includeNotes,
          includeScaleBar,
          pixelRatio: 2,
        });
      } else {
        exportAsImage(stageRef.current, format, filename, {
          includeNotes,
          includeScaleBar,
          pixelRatio: 2,
        });
      }

      notifications.show({
        title: 'Export Successful',
        message: `Floorplan exported as ${format.toUpperCase()}`,
        color: 'green',
      });
    } catch (error) {
      console.error('Export error:', error);
      notifications.show({
        title: 'Export Error',
        message: 'Failed to export floorplan. Please try again.',
        color: 'red',
      });
    }
  };

  return (
    <Stack gap="md">
      <Text size="sm" fw={600} style={{ color: '#2F2A28' }}>
        Export
      </Text>

      {/* Export options */}
      <Stack gap="xs">
        <Checkbox
          label="Include text notes"
          checked={includeNotes}
          onChange={(e) => setIncludeNotes(e.currentTarget.checked)}
          size="sm"
        />
        <Checkbox
          label="Include scale bar"
          checked={includeScaleBar}
          onChange={(e) => setIncludeScaleBar(e.currentTarget.checked)}
          size="sm"
        />
      </Stack>

      {/* Export buttons */}
      <Stack gap="xs">
        <Button
          variant="light"
          color="taupe"
          size="sm"
          fullWidth
          onClick={() => handleExport('png')}
        >
          Export as PNG
        </Button>

        <Button
          variant="light"
          color="taupe"
          size="sm"
          fullWidth
          onClick={() => handleExport('jpeg')}
        >
          Export as JPG
        </Button>

        <Button
          variant="light"
          color="taupe"
          size="sm"
          fullWidth
          onClick={() => handleExport('webp')}
        >
          Export as WebP
        </Button>

        <Button
          variant="filled"
          color="mauve"
          size="sm"
          fullWidth
          onClick={() => handleExport('pdf')}
        >
          Export as PDF
        </Button>
      </Stack>

      <Text size="xs" c="dimmed" style={{ color: '#B0ABA8' }}>
        Exported files will be downloaded to your default download folder.
      </Text>
    </Stack>
  );
}
