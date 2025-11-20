// src/components/tool/PropertiesPanel.tsx
'use client';

import {
  Stack,
  Text,
  NumberInput,
  TextInput,
  Select,
  Slider,
  ColorInput,
  SegmentedControl,
  Paper,
  Textarea,
} from '@mantine/core';
import {
  FloorplanObject,
  WallObject,
  DoorObject,
  FurnitureObject,
  TextObject,
  SwingDirection,
  DOOR_WIDTH_PRESETS,
} from '@/lib/floorplan/types';

interface PropertiesPanelProps {
  selectedObject: FloorplanObject | null;
  onUpdate: (id: string, updates: Partial<FloorplanObject>) => void;
}

export function PropertiesPanel({ selectedObject, onUpdate }: PropertiesPanelProps) {
  if (!selectedObject) {
    return (
      <Stack gap="md" style={{ height: '100%' }}>
        <Text size="sm" fw={600} style={{ color: '#2F2A28' }}>
          Properties
        </Text>
        <Paper p="md" radius="md" style={{ backgroundColor: '#F7F3EF' }}>
          <Text size="sm" c="dimmed" ta="center" style={{ color: '#87817D' }}>
            Select an object to view and edit its properties.
          </Text>
        </Paper>
      </Stack>
    );
  }

  const handleUpdate = (updates: Partial<FloorplanObject>) => {
    onUpdate(selectedObject.id, updates);
  };

  return (
    <Stack gap="md" style={{ height: '100%' }}>
      <Text size="sm" fw={600} style={{ color: '#2F2A28' }}>
        Properties
      </Text>

      {/* Common properties */}
      <Stack gap="sm">
        <TextInput
          label="Name"
          value={selectedObject.name}
          onChange={(e) => handleUpdate({ name: e.currentTarget.value })}
          size="sm"
        />

        <NumberInput
          label="X Position"
          value={Math.round(selectedObject.x)}
          onChange={(value) => handleUpdate({ x: Number(value) })}
          size="sm"
        />

        <NumberInput
          label="Y Position"
          value={Math.round(selectedObject.y)}
          onChange={(value) => handleUpdate({ y: Number(value) })}
          size="sm"
        />

        <NumberInput
          label="Rotation (degrees)"
          value={Math.round(selectedObject.rotation)}
          onChange={(value) => handleUpdate({ rotation: Number(value) })}
          min={0}
          max={360}
          size="sm"
        />
      </Stack>

      {/* Type-specific properties */}
      {selectedObject.type === 'wall' && (
        <WallProperties wall={selectedObject as WallObject} onUpdate={handleUpdate} />
      )}

      {selectedObject.type === 'door' && (
        <DoorProperties door={selectedObject as DoorObject} onUpdate={handleUpdate} />
      )}

      {selectedObject.type === 'furniture' && (
        <FurnitureProperties
          furniture={selectedObject as FurnitureObject}
          onUpdate={handleUpdate}
        />
      )}

      {selectedObject.type === 'text' && (
        <TextProperties text={selectedObject as TextObject} onUpdate={handleUpdate} />
      )}
    </Stack>
  );
}

// Wall-specific properties
function WallProperties({
  wall,
  onUpdate,
}: {
  wall: WallObject;
  onUpdate: (updates: Partial<WallObject>) => void;
}) {
  return (
    <Stack gap="sm">
      <Text size="sm" fw={600} mt="md" style={{ color: '#2F2A28' }}>
        Wall Properties
      </Text>

      <NumberInput
        label="Width"
        value={Math.round(wall.width)}
        onChange={(value) => onUpdate({ width: Number(value) })}
        min={10}
        size="sm"
      />

      <NumberInput
        label="Height"
        value={Math.round(wall.height)}
        onChange={(value) => onUpdate({ height: Number(value) })}
        min={10}
        size="sm"
      />

      <div>
        <Text size="sm" mb="xs" style={{ color: '#2F2A28' }}>
          Thickness: {wall.thickness}
        </Text>
        <Slider
          value={wall.thickness}
          onChange={(value) => onUpdate({ thickness: value })}
          min={5}
          max={50}
          step={1}
          marks={[
            { value: 10, label: '10' },
            { value: 20, label: '20' },
            { value: 30, label: '30' },
            { value: 40, label: '40' },
          ]}
        />
      </div>

      <ColorInput
        label="Color"
        value={wall.fillColor}
        onChange={(value) => onUpdate({ fillColor: value })}
        size="sm"
        format="hex"
        swatches={['#9E9E9E', '#757575', '#616161', '#424242']}
      />
    </Stack>
  );
}

// Door-specific properties
function DoorProperties({
  door,
  onUpdate,
}: {
  door: DoorObject;
  onUpdate: (updates: Partial<DoorObject>) => void;
}) {
  return (
    <Stack gap="sm">
      <Text size="sm" fw={600} mt="md" style={{ color: '#2F2A28' }}>
        Door Properties
      </Text>

      <Select
        label="Door Width"
        value={door.width.toString()}
        onChange={(value) => onUpdate({ width: Number(value) })}
        data={DOOR_WIDTH_PRESETS.map((preset) => ({
          value: preset.value.toString(),
          label: preset.label,
        }))}
        size="sm"
      />

      <Select
        label="Swing Direction"
        value={door.swingDirection}
        onChange={(value) => onUpdate({ swingDirection: value as SwingDirection })}
        data={[
          { value: 'left', label: 'Left' },
          { value: 'right', label: 'Right' },
          { value: 'top', label: 'Top' },
          { value: 'bottom', label: 'Bottom' },
        ]}
        size="sm"
      />

      <SegmentedControl
        value={door.doorType}
        onChange={(value) => onUpdate({ doorType: value as 'single' | 'double' })}
        data={[
          { value: 'single', label: 'Single' },
          { value: 'double', label: 'Double' },
        ]}
        size="sm"
      />
    </Stack>
  );
}

// Furniture-specific properties
function FurnitureProperties({
  furniture,
  onUpdate,
}: {
  furniture: FurnitureObject;
  onUpdate: (updates: Partial<FurnitureObject>) => void;
}) {
  return (
    <Stack gap="sm">
      <Text size="sm" fw={600} mt="md" style={{ color: '#2F2A28' }}>
        Furniture Properties
      </Text>

      <TextInput
        label="Furniture Type"
        value={furniture.furnitureType}
        disabled
        size="sm"
        styles={{ input: { backgroundColor: '#F7F3EF' } }}
      />

      <NumberInput
        label="Width"
        value={Math.round(furniture.width)}
        onChange={(value) => onUpdate({ width: Number(value) })}
        min={10}
        size="sm"
      />

      <NumberInput
        label="Height"
        value={Math.round(furniture.height)}
        onChange={(value) => onUpdate({ height: Number(value) })}
        min={10}
        size="sm"
      />

      <ColorInput
        label="Color"
        value={furniture.fillColor}
        onChange={(value) => onUpdate({ fillColor: value })}
        size="sm"
        format="hex"
        swatches={['#8BC34A', '#2196F3', '#FF9800', '#9C27B0', '#F44336']}
      />
    </Stack>
  );
}

// Text-specific properties
function TextProperties({
  text,
  onUpdate,
}: {
  text: TextObject;
  onUpdate: (updates: Partial<TextObject>) => void;
}) {
  return (
    <Stack gap="sm">
      <Text size="sm" fw={600} mt="md" style={{ color: '#2F2A28' }}>
        Text Properties
      </Text>

      <Textarea
        label="Text Content"
        value={text.text}
        onChange={(e) => onUpdate({ text: e.currentTarget.value })}
        size="sm"
        minRows={3}
      />

      <NumberInput
        label="Font Size"
        value={text.fontSize}
        onChange={(value) => onUpdate({ fontSize: Number(value) })}
        min={8}
        max={72}
        size="sm"
      />

      <SegmentedControl
        value={text.fontStyle}
        onChange={(value) => onUpdate({ fontStyle: value as 'normal' | 'bold' | 'italic' })}
        data={[
          { value: 'normal', label: 'Normal' },
          { value: 'bold', label: 'Bold' },
          { value: 'italic', label: 'Italic' },
        ]}
        size="sm"
      />

      <ColorInput
        label="Text Color"
        value={text.textColor}
        onChange={(value) => onUpdate({ textColor: value })}
        size="sm"
        format="hex"
        swatches={['#2F2A28', '#000000', '#FFFFFF', '#A59386', '#C9A4C9']}
      />
    </Stack>
  );
}
