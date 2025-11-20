// src/components/tool/EditSizeModal.tsx
"use client";

import { useState, useEffect } from 'react';
import { Modal, Stack, NumberInput, Button, Group, Text } from '@mantine/core';
import {
  FloorplanObject,
  WallObject,
  pxToUnits,
  unitsToPx,
} from '@/lib/floorplan/types';

interface EditSizeModalProps {
  opened: boolean;
  onClose: () => void;
  object: FloorplanObject | null;
  gridSize: number;
  onUpdate: (id: string, updates: Partial<FloorplanObject>) => void;
}

export function EditSizeModal({
  opened,
  onClose,
  object,
  gridSize,
  onUpdate,
}: EditSizeModalProps) {
  const [widthUnits, setWidthUnits] = useState(0);
  const [heightUnits, setHeightUnits] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [thickness, setThickness] = useState(20);

  // Initialize values when object changes
  useEffect(() => {
    if (object) {
      if (object.type === 'wall' || object.type === 'door' || object.type === 'furniture') {
        setWidthUnits(pxToUnits(object.width, gridSize));
        setHeightUnits(pxToUnits(object.height, gridSize));
      }
      setRotation(object.rotation);

      if (object.type === 'wall') {
        setThickness((object as WallObject).thickness);
      }
    }
  }, [object, gridSize]);

  const handleApply = () => {
    if (!object) return;

    const updates: Partial<FloorplanObject> = {
      rotation,
    };

    // Update dimensions for objects that have them
    if (object.type === 'wall' || object.type === 'door' || object.type === 'furniture') {
      const newWidth = unitsToPx(widthUnits, gridSize);
      const newHeight = unitsToPx(heightUnits, gridSize);

      (updates as any).width = newWidth;
      (updates as any).height = newHeight;
    }

    // Update thickness for walls
    if (object.type === 'wall') {
      (updates as any).thickness = Math.round(thickness / 4) * 4;
    }

    onUpdate(object.id, updates);
    onClose();
  };

  if (!object) return null;

  const hasSize = object.type === 'wall' || object.type === 'door' || object.type === 'furniture';
  const hasThickness = object.type === 'wall';

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={`Edit Size: ${object.name}`}
      centered
    >
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          1 unit = 1 grid square ({gridSize}px)
        </Text>

        {hasSize && (
          <>
            <NumberInput
              label="Width (units)"
              value={widthUnits}
              onChange={(val) => setWidthUnits(typeof val === 'number' ? val : 0)}
              min={1}
              max={100}
              step={1}
              description={`${unitsToPx(widthUnits, gridSize)}px`}
            />

            <NumberInput
              label="Height (units)"
              value={heightUnits}
              onChange={(val) => setHeightUnits(typeof val === 'number' ? val : 0)}
              min={1}
              max={100}
              step={1}
              description={`${unitsToPx(heightUnits, gridSize)}px`}
            />
          </>
        )}

        {hasThickness && (
          <NumberInput
            label="Thickness (pixels)"
            value={thickness}
            onChange={(val) => setThickness(typeof val === 'number' ? val : 20)}
            min={4}
            max={100}
            step={4}
            description="Snapped to multiples of 4"
          />
        )}

        <NumberInput
          label="Rotation (degrees)"
          value={rotation}
          onChange={(val) => setRotation(typeof val === 'number' ? val : 0)}
          min={-180}
          max={180}
          step={15}
        />

        <Group justify="flex-end" gap="xs">
          <Button variant="subtle" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleApply}>
            Apply
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
