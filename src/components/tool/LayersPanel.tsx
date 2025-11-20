// src/components/tool/LayersPanel.tsx
'use client';

import { Stack, Text, Group, ActionIcon, ScrollArea, Paper, Tooltip } from '@mantine/core';
import { FloorplanObject } from '@/lib/floorplan/types';
import { IconEye, IconEyeOff, IconLock, IconLockOpen, IconTrash } from '@tabler/icons-react';

interface LayersPanelProps {
  objects: FloorplanObject[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onToggleVisibility: (id: string) => void;
  onToggleLock: (id: string) => void;
  onDelete: (id: string) => void;
  onReorder: (newOrder: FloorplanObject[]) => void;
}

export function LayersPanel({
  objects,
  selectedId,
  onSelect,
  onToggleVisibility,
  onToggleLock,
  onDelete,
}: LayersPanelProps) {
  // Get icon for object type
  const getObjectIcon = (type: string) => {
    switch (type) {
      case 'wall':
        return '🧱';
      case 'door':
        return '🚪';
      case 'furniture':
        return '🪑';
      case 'text':
        return '📝';
      default:
        return '📦';
    }
  };

  return (
    <Stack gap="xs" style={{ height: '100%' }}>
      <Text size="sm" fw={600} style={{ color: '#2F2A28' }}>
        Layers ({objects.length})
      </Text>

      <ScrollArea style={{ flex: 1 }}>
        <Stack gap="xs">
          {objects.length === 0 ? (
            <Paper p="md" radius="md" style={{ backgroundColor: '#F7F3EF' }}>
              <Text size="sm" c="dimmed" ta="center" style={{ color: '#87817D' }}>
                No objects yet. Use the tools to add objects to your floorplan.
              </Text>
            </Paper>
          ) : (
            objects
              .slice()
              .reverse()
              .map((obj) => (
                <Paper
                  key={obj.id}
                  p="xs"
                  radius="md"
                  style={{
                    backgroundColor: selectedId === obj.id ? '#E8DFD9' : '#FFFFFF',
                    cursor: 'pointer',
                    border: selectedId === obj.id ? '2px solid #A59386' : '1px solid #E8DFD9',
                    transition: 'all 0.2s ease',
                  }}
                  onClick={() => onSelect(obj.id)}
                >
                  <Group justify="space-between" wrap="nowrap">
                    {/* Object info */}
                    <Group gap="xs" style={{ flex: 1, minWidth: 0 }}>
                      <Text size="lg">{getObjectIcon(obj.type)}</Text>
                      <Text
                        size="sm"
                        fw={selectedId === obj.id ? 600 : 400}
                        style={{
                          color: obj.isVisible ? '#2F2A28' : '#B0ABA8',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {obj.name}
                      </Text>
                    </Group>

                    {/* Actions */}
                    <Group gap={4} wrap="nowrap">
                      <Tooltip label={obj.isVisible ? 'Hide' : 'Show'}>
                        <ActionIcon
                          variant="subtle"
                          color="taupe"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleVisibility(obj.id);
                          }}
                        >
                          {obj.isVisible ? (
                            <IconEye size={16} />
                          ) : (
                            <IconEyeOff size={16} />
                          )}
                        </ActionIcon>
                      </Tooltip>

                      <Tooltip label={obj.isLocked ? 'Unlock' : 'Lock'}>
                        <ActionIcon
                          variant="subtle"
                          color="taupe"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleLock(obj.id);
                          }}
                        >
                          {obj.isLocked ? (
                            <IconLock size={16} />
                          ) : (
                            <IconLockOpen size={16} />
                          )}
                        </ActionIcon>
                      </Tooltip>

                      <Tooltip label="Delete">
                        <ActionIcon
                          variant="subtle"
                          color="red"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm(`Delete ${obj.name}?`)) {
                              onDelete(obj.id);
                            }
                          }}
                        >
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Tooltip>
                    </Group>
                  </Group>
                </Paper>
              ))
          )}
        </Stack>
      </ScrollArea>
    </Stack>
  );
}

// Note: Install @tabler/icons-react with: npm install @tabler/icons-react
