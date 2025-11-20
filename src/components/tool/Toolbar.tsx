// src/components/tool/Toolbar.tsx
'use client';

import { Stack, Button, Divider, Text, Select, Tooltip, ActionIcon, Group } from '@mantine/core';
import { ToolType, FurnitureType } from '@/lib/floorplan/types';

interface ToolbarProps {
  currentTool: ToolType;
  onToolChange: (tool: ToolType) => void;
  selectedFurniture: FurnitureType;
  onFurnitureChange: (type: FurnitureType) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onSave: () => void;
  onLoad: () => void;
  onNew: () => void;
  onHelp: () => void;
}

export function Toolbar({
  currentTool,
  onToolChange,
  selectedFurniture,
  onFurnitureChange,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onSave,
  onLoad,
  onNew,
  onHelp,
}: ToolbarProps) {
  const tools: { value: ToolType; label: string; description: string; shortcut: string }[] = [
    { value: 'select', label: 'Select', description: 'Select and move objects', shortcut: 'V' },
    { value: 'wall', label: 'Wall', description: 'Draw walls', shortcut: 'W' },
    { value: 'door', label: 'Door', description: 'Place doors', shortcut: 'D' },
    { value: 'furniture', label: 'Furniture', description: 'Add furniture', shortcut: 'F' },
    { value: 'text', label: 'Text', description: 'Add text labels', shortcut: 'T' },
    { value: 'pan', label: 'Pan', description: 'Pan the canvas', shortcut: 'Space' },
  ];

  const furnitureTypes: { value: FurnitureType; label: string }[] = [
    { value: 'bed', label: 'Bed' },
    { value: 'sofa', label: 'Sofa' },
    { value: 'table', label: 'Table' },
    { value: 'desk', label: 'Desk' },
    { value: 'chair', label: 'Chair' },
  ];

  return (
    <Stack gap="md" p="md" style={{ width: '240px', backgroundColor: '#FFFFFF', height: '100%' }}>
      {/* Tools section */}
      <div>
        <Text size="sm" fw={600} mb="xs" style={{ color: '#2F2A28' }}>
          Tools
        </Text>
        <Stack gap="xs">
          {tools.map((tool) => (
            <Tooltip key={tool.value} label={`${tool.description} (${tool.shortcut})`} position="right">
              <Button
                variant={currentTool === tool.value ? 'filled' : 'light'}
                color="taupe"
                fullWidth
                size="sm"
                onClick={() => onToolChange(tool.value)}
                styles={{
                  root: {
                    justifyContent: 'flex-start',
                  },
                }}
              >
                <Group gap="xs" style={{ width: '100%', justifyContent: 'space-between' }}>
                  <Text size="sm">{tool.label}</Text>
                  <Text size="xs" c="dimmed">
                    {tool.shortcut}
                  </Text>
                </Group>
              </Button>
            </Tooltip>
          ))}
        </Stack>
      </div>

      {/* Furniture type selector (only show when furniture tool is active) */}
      {currentTool === 'furniture' && (
        <div>
          <Text size="sm" fw={600} mb="xs" style={{ color: '#2F2A28' }}>
            Furniture Type
          </Text>
          <Select
            value={selectedFurniture}
            onChange={(value) => onFurnitureChange(value as FurnitureType)}
            data={furnitureTypes}
            size="sm"
          />
        </div>
      )}

      <Divider />

      {/* View controls */}
      <div>
        <Text size="sm" fw={600} mb="xs" style={{ color: '#2F2A28' }}>
          View
        </Text>
        <Stack gap="xs">
          <Button variant="light" color="taupe" size="sm" fullWidth onClick={onZoomIn}>
            Zoom In
          </Button>
          <Button variant="light" color="taupe" size="sm" fullWidth onClick={onZoomOut}>
            Zoom Out
          </Button>
          <Button variant="light" color="taupe" size="sm" fullWidth onClick={onZoomReset}>
            Reset View
          </Button>
        </Stack>
      </div>

      <Divider />

      {/* History controls */}
      <div>
        <Text size="sm" fw={600} mb="xs" style={{ color: '#2F2A28' }}>
          History
        </Text>
        <Stack gap="xs">
          <Tooltip label="Undo (Ctrl/Cmd+Z)" position="right">
            <Button
              variant="light"
              color="taupe"
              size="sm"
              fullWidth
              onClick={onUndo}
              disabled={!canUndo}
            >
              Undo
            </Button>
          </Tooltip>
          <Tooltip label="Redo (Ctrl/Cmd+Shift+Z)" position="right">
            <Button
              variant="light"
              color="taupe"
              size="sm"
              fullWidth
              onClick={onRedo}
              disabled={!canRedo}
            >
              Redo
            </Button>
          </Tooltip>
        </Stack>
      </div>

      <Divider />

      {/* File operations */}
      <div>
        <Text size="sm" fw={600} mb="xs" style={{ color: '#2F2A28' }}>
          File
        </Text>
        <Stack gap="xs">
          <Button variant="light" color="taupe" size="sm" fullWidth onClick={onNew}>
            New
          </Button>
          <Tooltip label="Save (Ctrl/Cmd+S)" position="right">
            <Button variant="light" color="taupe" size="sm" fullWidth onClick={onSave}>
              Save
            </Button>
          </Tooltip>
          <Button variant="light" color="taupe" size="sm" fullWidth onClick={onLoad}>
            Load
          </Button>
        </Stack>
      </div>

      <Divider />

      {/* Help */}
      <Button variant="light" color="mauve" size="sm" fullWidth onClick={onHelp} mt="auto">
        Help & Shortcuts
      </Button>
    </Stack>
  );
}
