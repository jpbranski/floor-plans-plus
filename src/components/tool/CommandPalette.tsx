// src/components/tool/CommandPalette.tsx
'use client';

import { Modal, TextInput, Stack, Group, Text, ScrollArea, UnstyledButton } from '@mantine/core';
import { useState, useMemo } from 'react';
import { ToolType } from '@/lib/floorplan/types';

interface Command {
  id: string;
  label: string;
  description: string;
  category: string;
  action: () => void;
  keywords?: string[];
}

interface CommandPaletteProps {
  opened: boolean;
  onClose: () => void;
  onToolChange: (tool: ToolType) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
  onNew: () => void;
  onSave: () => void;
  onLoad: () => void;
  onHelp: () => void;
}

export function CommandPalette({
  opened,
  onClose,
  onToolChange,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  onNew,
  onSave,
  onLoad,
  onHelp,
}: CommandPaletteProps) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Define all available commands
  const commands: Command[] = useMemo(
    () => [
      // Tools
      {
        id: 'tool-select',
        label: 'Select Tool',
        description: 'Switch to select and move tool',
        category: 'Tools',
        action: () => {
          onToolChange('select');
          onClose();
        },
        keywords: ['select', 'move', 'v'],
      },
      {
        id: 'tool-wall',
        label: 'Wall Tool',
        description: 'Draw walls',
        category: 'Tools',
        action: () => {
          onToolChange('wall');
          onClose();
        },
        keywords: ['wall', 'draw', 'w'],
      },
      {
        id: 'tool-door',
        label: 'Door Tool',
        description: 'Place doors',
        category: 'Tools',
        action: () => {
          onToolChange('door');
          onClose();
        },
        keywords: ['door', 'place', 'd'],
      },
      {
        id: 'tool-furniture',
        label: 'Furniture Tool',
        description: 'Add furniture',
        category: 'Tools',
        action: () => {
          onToolChange('furniture');
          onClose();
        },
        keywords: ['furniture', 'add', 'f'],
      },
      {
        id: 'tool-text',
        label: 'Text Tool',
        description: 'Add text labels',
        category: 'Tools',
        action: () => {
          onToolChange('text');
          onClose();
        },
        keywords: ['text', 'label', 'note', 't'],
      },
      {
        id: 'tool-pan',
        label: 'Pan Tool',
        description: 'Pan the canvas',
        category: 'Tools',
        action: () => {
          onToolChange('pan');
          onClose();
        },
        keywords: ['pan', 'move', 'hand'],
      },

      // Zoom
      {
        id: 'zoom-in',
        label: 'Zoom In',
        description: 'Zoom in on the canvas',
        category: 'View',
        action: () => {
          onZoomIn();
          onClose();
        },
        keywords: ['zoom', 'in', 'closer'],
      },
      {
        id: 'zoom-out',
        label: 'Zoom Out',
        description: 'Zoom out on the canvas',
        category: 'View',
        action: () => {
          onZoomOut();
          onClose();
        },
        keywords: ['zoom', 'out', 'farther'],
      },
      {
        id: 'zoom-reset',
        label: 'Reset Zoom',
        description: 'Reset zoom to 100%',
        category: 'View',
        action: () => {
          onZoomReset();
          onClose();
        },
        keywords: ['zoom', 'reset', '100%', 'default'],
      },

      // Scene
      {
        id: 'scene-new',
        label: 'New Plan',
        description: 'Create a new floorplan',
        category: 'Scene',
        action: () => {
          onNew();
          onClose();
        },
        keywords: ['new', 'create', 'clear'],
      },
      {
        id: 'scene-save',
        label: 'Save',
        description: 'Save to localStorage',
        category: 'Scene',
        action: () => {
          onSave();
          onClose();
        },
        keywords: ['save', 'store', 'ctrl+s'],
      },
      {
        id: 'scene-load',
        label: 'Load',
        description: 'Load from localStorage',
        category: 'Scene',
        action: () => {
          onLoad();
          onClose();
        },
        keywords: ['load', 'open', 'restore'],
      },

      // Help
      {
        id: 'help',
        label: 'Help & Shortcuts',
        description: 'View keyboard shortcuts and help',
        category: 'Help',
        action: () => {
          onHelp();
          onClose();
        },
        keywords: ['help', 'shortcuts', 'keyboard', 'guide'],
      },
    ],
    [onToolChange, onZoomIn, onZoomOut, onZoomReset, onNew, onSave, onLoad, onHelp, onClose]
  );

  // Filter commands based on search
  const filteredCommands = useMemo(() => {
    if (!search) return commands;

    const searchLower = search.toLowerCase();
    return commands.filter((cmd) => {
      const labelMatch = cmd.label.toLowerCase().includes(searchLower);
      const descMatch = cmd.description.toLowerCase().includes(searchLower);
      const categoryMatch = cmd.category.toLowerCase().includes(searchLower);
      const keywordMatch = cmd.keywords?.some((kw) => kw.toLowerCase().includes(searchLower));

      return labelMatch || descMatch || categoryMatch || keywordMatch;
    });
  }, [search, commands]);

  // Group commands by category
  const groupedCommands = useMemo(() => {
    const groups: Record<string, Command[]> = {};
    filteredCommands.forEach((cmd) => {
      if (!groups[cmd.category]) {
        groups[cmd.category] = [];
      }
      groups[cmd.category].push(cmd);
    });
    return groups;
  }, [filteredCommands]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filteredCommands.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  // Reset state when modal opens/closes
  const handleClose = () => {
    setSearch('');
    setSelectedIndex(0);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title="Command Palette"
      size="lg"
      padding="md"
      centered
    >
      <Stack gap="md">
        <TextInput
          placeholder="Type to search commands..."
          value={search}
          onChange={(e) => {
            setSearch(e.currentTarget.value);
            setSelectedIndex(0);
          }}
          onKeyDown={handleKeyDown}
          autoFocus
          size="md"
          styles={{
            input: {
              fontSize: '1rem',
            },
          }}
        />

        <ScrollArea style={{ maxHeight: '400px' }}>
          <Stack gap="lg">
            {Object.entries(groupedCommands).map(([category, cmds]) => (
              <div key={category}>
                <Text size="xs" fw={600} c="dimmed" mb="xs" style={{ color: '#87817D' }}>
                  {category}
                </Text>
                <Stack gap={4}>
                  {cmds.map((cmd, idx) => {
                    const globalIndex = filteredCommands.indexOf(cmd);
                    const isSelected = globalIndex === selectedIndex;

                    return (
                      <UnstyledButton
                        key={cmd.id}
                        onClick={cmd.action}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '8px',
                          backgroundColor: isSelected ? '#E8DFD9' : 'transparent',
                          transition: 'background-color 0.15s ease',
                        }}
                      >
                        <Group justify="space-between">
                          <div>
                            <Text size="sm" fw={500} style={{ color: '#2F2A28' }}>
                              {cmd.label}
                            </Text>
                            <Text size="xs" c="dimmed" style={{ color: '#87817D' }}>
                              {cmd.description}
                            </Text>
                          </div>
                        </Group>
                      </UnstyledButton>
                    );
                  })}
                </Stack>
              </div>
            ))}

            {filteredCommands.length === 0 && (
              <Text size="sm" c="dimmed" ta="center" py="xl" style={{ color: '#87817D' }}>
                No commands found matching "{search}"
              </Text>
            )}
          </Stack>
        </ScrollArea>

        <Text size="xs" c="dimmed" style={{ color: '#B0ABA8' }}>
          Use ↑↓ to navigate, Enter to select, Esc to close
        </Text>
      </Stack>
    </Modal>
  );
}
