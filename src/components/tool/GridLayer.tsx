// src/components/tool/GridLayer.tsx
"use client";

import { useEffect, useRef } from 'react';
import { Layer, Rect } from 'react-konva';
import { GridConfig } from '@/lib/floorplan/types';

interface GridLayerProps {
  width: number;
  height: number;
  grid: GridConfig;
}

export function GridLayer({ width, height, grid }: GridLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Create grid pattern
  useEffect(() => {
    if (!grid.enabled) {
      canvasRef.current = null;
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gridSize = grid.size;
    canvas.width = gridSize;
    canvas.height = gridSize;

    // Draw grid lines
    ctx.strokeStyle = `rgba(47, 42, 40, ${grid.opacity})`;
    ctx.lineWidth = 1;

    // Vertical line
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, gridSize);
    ctx.stroke();

    // Horizontal line
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(gridSize, 0);
    ctx.stroke();

    canvasRef.current = canvas;
  }, [grid.enabled, grid.size, grid.opacity]);

  if (!grid.enabled || !canvasRef.current) {
    return null;
  }

  return (
    <Layer listening={false}>
      <Rect
        x={0}
        y={0}
        width={width}
        height={height}
        fillPatternImage={canvasRef.current as any}
        fillPatternRepeat="repeat"
      />
    </Layer>
  );
}
