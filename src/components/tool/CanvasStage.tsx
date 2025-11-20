// src/components/tool/CanvasStage.tsx
"use client";

import { useRef, useEffect, useState, forwardRef } from 'react';
import { Stage, Layer, Rect, Text, Group, Arc, Transformer } from 'react-konva';
import Konva from 'konva';
import {
  FloorplanObject,
  WallObject,
  DoorObject,
  FurnitureObject,
  TextObject,
  ToolType,
  FurnitureType,
  ViewportState,
  GridConfig,
  MIN_ZOOM,
  MAX_ZOOM,
  pxToUnits,
  unitsToPx,
  snapToBase4,
} from '@/lib/floorplan/types';
import { GridLayer } from './GridLayer';

interface PreviewObject {
  type: 'wall' | 'door' | 'furniture';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  furnitureType?: FurnitureType;
}

interface CanvasStageProps {
  objects: FloorplanObject[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onChange: (id: string, updates: Partial<FloorplanObject>) => void;
  tool: ToolType;
  viewport: ViewportState;
  onViewportChange: (viewport: ViewportState) => void;
  grid: GridConfig;
  selectedFurniture?: FurnitureType;
  onAddWall?: (x: number, y: number, width: number, height: number) => void;
  onAddDoor?: (x: number, y: number, width: number, height: number) => void;
  onAddFurniture?: (x: number, y: number) => void;
  onAddText?: (x: number, y: number) => void;
}

export const CanvasStage = forwardRef<Konva.Stage, CanvasStageProps>(
  (
    {
      objects,
      selectedId,
      onSelect,
      onChange,
      tool,
      viewport,
      onViewportChange,
      grid,
      selectedFurniture = 'bed',
      onAddWall,
      onAddDoor,
      onAddFurniture,
      onAddText,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
    const transformerRef = useRef<Konva.Transformer>(null);
    const [isPanning, setIsPanning] = useState(false);

    // Preview state for drawing
    const [isDrawing, setIsDrawing] = useState(false);
    const [drawStart, setDrawStart] = useState<{ x: number; y: number } | null>(null);
    const [previewObject, setPreviewObject] = useState<PreviewObject | null>(null);

    // Measure container dimensions
    useEffect(() => {
      const updateDimensions = () => {
        if (containerRef.current) {
          setDimensions({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
          });
        }
      };

      updateDimensions();
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    // Update transformer when selection changes
    useEffect(() => {
      if (transformerRef.current) {
        const stage = transformerRef.current.getStage();
        if (stage && selectedId) {
          const selectedNode = stage.findOne(`#${selectedId}`);
          if (selectedNode) {
            transformerRef.current.nodes([selectedNode]);
            transformerRef.current.getLayer()?.batchDraw();
          }
        } else {
          transformerRef.current.nodes([]);
        }
      }
    }, [selectedId]);

    // Handle wheel zoom
    const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
      e.evt.preventDefault();

      const stage = e.target.getStage();
      if (!stage) return;

      const oldScale = viewport.scale;
      const pointer = stage.getPointerPosition();
      if (!pointer) return;

      // Calculate new scale
      const scaleBy = 1.05;
      const direction = e.evt.deltaY > 0 ? -1 : 1;
      let newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

      // Clamp scale
      newScale = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newScale));

      // Calculate new position to zoom towards pointer
      const mousePointTo = {
        x: (pointer.x - viewport.x) / oldScale,
        y: (pointer.y - viewport.y) / oldScale,
      };

      const newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
      };

      onViewportChange({
        scale: newScale,
        x: newPos.x,
        y: newPos.y,
      });
    };

    // Convert screen position to canvas position
    const screenToCanvas = (stage: Konva.Stage, screenX: number, screenY: number) => {
      return {
        x: (screenX - viewport.x) / viewport.scale,
        y: (screenY - viewport.y) / viewport.scale,
      };
    };

    // Handle mouse down
    const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
      const stage = e.target.getStage();
      if (!stage) return;

      // Check if clicked on empty area
      const clickedOnEmpty = e.target === stage;

      // Pan tool or middle mouse button
      if (tool === 'pan' || e.evt.button === 1) {
        setIsPanning(true);
        stage.container().style.cursor = 'grabbing';
        return;
      }

      if (clickedOnEmpty) {
        onSelect(null);

        const pointer = stage.getPointerPosition();
        if (!pointer) return;

        const pos = screenToCanvas(stage, pointer.x, pointer.y);

        // Start drawing wall
        if (tool === 'wall') {
          setIsDrawing(true);
          setDrawStart(pos);
          setPreviewObject({
            type: 'wall',
            x: pos.x,
            y: pos.y,
            width: 0,
            height: 0,
            rotation: 0,
          });
        }

        // Start drawing door
        if (tool === 'door') {
          setIsDrawing(true);
          setDrawStart(pos);
          setPreviewObject({
            type: 'door',
            x: pos.x,
            y: pos.y,
            width: 0,
            height: 0,
            rotation: 0,
          });
        }

        // Start drawing furniture
        if (tool === 'furniture') {
          setIsDrawing(true);
          setDrawStart(pos);
          setPreviewObject({
            type: 'furniture',
            x: pos.x,
            y: pos.y,
            width: 0,
            height: 0,
            rotation: 0,
            furnitureType: selectedFurniture,
          });
        }

        // Place text
        if (tool === 'text' && onAddText) {
          onAddText(pos.x, pos.y);
        }
      }
    };

    // Handle mouse move
    const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
      const stage = e.target.getStage();
      if (!stage) return;

      if (isPanning) {
        const newPos = {
          x: viewport.x + e.evt.movementX,
          y: viewport.y + e.evt.movementY,
        };
        onViewportChange({ ...viewport, ...newPos });
        return;
      }

      // Update preview while drawing
      if (isDrawing && drawStart && previewObject) {
        const pointer = stage.getPointerPosition();
        if (!pointer) return;

        const currentPos = screenToCanvas(stage, pointer.x, pointer.y);
        const dx = currentPos.x - drawStart.x;
        const dy = currentPos.y - drawStart.y;

        setPreviewObject({
          ...previewObject,
          x: Math.min(drawStart.x, currentPos.x),
          y: Math.min(drawStart.y, currentPos.y),
          width: Math.abs(dx),
          height: Math.abs(dy),
        });
      }
    };

    // Handle mouse up
    const handleMouseUp = (e: Konva.KonvaEventObject<MouseEvent>) => {
      const stage = e.target.getStage();
      if (!stage) return;

      if (isPanning) {
        setIsPanning(false);
        stage.container().style.cursor = 'default';
      }

      // Finish drawing
      if (isDrawing && drawStart && previewObject) {
        const pointer = stage.getPointerPosition();
        if (pointer) {
          const currentPos = screenToCanvas(stage, pointer.x, pointer.y);

          const rawWidth = Math.abs(currentPos.x - drawStart.x);
          const rawHeight = Math.abs(currentPos.y - drawStart.y);

          const x = Math.min(drawStart.x, currentPos.x);
          const y = Math.min(drawStart.y, currentPos.y);

          // Convert to units and back to pixels with snapping
          const widthUnits = pxToUnits(rawWidth, grid.size);
          const heightUnits = pxToUnits(rawHeight, grid.size);
          const width = unitsToPx(widthUnits, grid.size);
          const height = unitsToPx(heightUnits, grid.size);

          // Only create object if it has some size
          if (widthUnits > 0 && heightUnits > 0) {
            if (previewObject.type === 'wall' && onAddWall) {
              onAddWall(x, y, width, height);
            } else if (previewObject.type === 'door' && onAddDoor) {
              onAddDoor(x, y, width, height);
            } else if (previewObject.type === 'furniture' && onAddFurniture) {
              onAddFurniture(x, y);
            }
          }
        }

        setIsDrawing(false);
        setDrawStart(null);
        setPreviewObject(null);
      }
    };

    // Render preview object
    const renderPreview = () => {
      if (!previewObject) return null;

      switch (previewObject.type) {
        case 'wall':
          return (
            <Rect
              x={previewObject.x}
              y={previewObject.y}
              width={previewObject.width}
              height={previewObject.height}
              fill="#9E9E9E"
              opacity={0.6}
              stroke="#A59386"
              strokeWidth={2}
              dash={[5, 5]}
            />
          );

        case 'door':
          return (
            <Rect
              x={previewObject.x}
              y={previewObject.y}
              width={previewObject.width}
              height={previewObject.height}
              fill="#8B4513"
              opacity={0.6}
              stroke="#A59386"
              strokeWidth={2}
              dash={[5, 5]}
            />
          );

        case 'furniture':
          return (
            <Rect
              x={previewObject.x}
              y={previewObject.y}
              width={previewObject.width}
              height={previewObject.height}
              fill="#8BC34A"
              opacity={0.6}
              stroke="#A59386"
              strokeWidth={2}
              dash={[5, 5]}
              cornerRadius={5}
            />
          );

        default:
          return null;
      }
    };

    // Render objects
    const renderObject = (obj: FloorplanObject) => {
      if (!obj.isVisible) return null;

      const isSelected = obj.id === selectedId;
      const isDraggable = tool === 'select' && !obj.isLocked;

      switch (obj.type) {
        case 'wall':
          return (
            <Rect
              key={obj.id}
              id={obj.id}
              x={obj.x}
              y={obj.y}
              width={obj.width}
              height={obj.height}
              fill={obj.fillColor}
              stroke={isSelected ? '#A59386' : '#2F2A28'}
              strokeWidth={isSelected ? 2 : 1}
              rotation={obj.rotation}
              draggable={isDraggable}
              onClick={() => tool === 'select' && onSelect(obj.id)}
              onDragEnd={(e) => {
                onChange(obj.id, { x: e.target.x(), y: e.target.y() });
              }}
              onTransformEnd={(e) => {
                const node = e.target;
                const scaleX = node.scaleX();
                const scaleY = node.scaleY();

                // Reset scale
                node.scaleX(1);
                node.scaleY(1);

                onChange(obj.id, {
                  x: node.x(),
                  y: node.y(),
                  width: Math.max(5, node.width() * scaleX),
                  height: Math.max(5, node.height() * scaleY),
                  rotation: node.rotation(),
                });
              }}
            />
          );

        case 'door':
          return (
            <Group
              key={obj.id}
              id={obj.id}
              x={obj.x}
              y={obj.y}
              rotation={obj.rotation}
              draggable={isDraggable}
              onClick={() => tool === 'select' && onSelect(obj.id)}
              onDragEnd={(e) => {
                onChange(obj.id, { x: e.target.x(), y: e.target.y() });
              }}
              onTransformEnd={(e) => {
                const node = e.target;
                const scaleX = node.scaleX();
                const scaleY = node.scaleY();

                node.scaleX(1);
                node.scaleY(1);

                onChange(obj.id, {
                  x: node.x(),
                  y: node.y(),
                  width: Math.max(5, obj.width * scaleX),
                  height: Math.max(5, obj.height * scaleY),
                  rotation: node.rotation(),
                });
              }}
            >
              {/* Door leaf */}
              <Rect
                width={obj.width}
                height={obj.height}
                fill="#8B4513"
                stroke={isSelected ? '#A59386' : '#2F2A28'}
                strokeWidth={isSelected ? 2 : 1}
              />
              {/* Swing arc */}
              <Arc
                x={obj.swingDirection === 'right' ? obj.width : 0}
                y={0}
                innerRadius={0}
                outerRadius={obj.width}
                angle={90}
                rotation={
                  obj.swingDirection === 'right'
                    ? 0
                    : obj.swingDirection === 'left'
                    ? 90
                    : obj.swingDirection === 'bottom'
                    ? 180
                    : 270
                }
                stroke={isSelected ? '#A59386' : '#2F2A28'}
                strokeWidth={1}
                dash={[5, 5]}
              />
            </Group>
          );

        case 'furniture':
          return (
            <Group
              key={obj.id}
              id={obj.id}
              x={obj.x}
              y={obj.y}
              rotation={obj.rotation}
              draggable={isDraggable}
              onClick={() => tool === 'select' && onSelect(obj.id)}
              onDragEnd={(e) => {
                onChange(obj.id, { x: e.target.x(), y: e.target.y() });
              }}
              onTransformEnd={(e) => {
                const node = e.target;
                const scaleX = node.scaleX();
                const scaleY = node.scaleY();

                node.scaleX(1);
                node.scaleY(1);

                onChange(obj.id, {
                  x: node.x(),
                  y: node.y(),
                  width: Math.max(5, obj.width * scaleX),
                  height: Math.max(5, obj.height * scaleY),
                  rotation: node.rotation(),
                });
              }}
            >
              <Rect
                width={obj.width}
                height={obj.height}
                fill={obj.fillColor}
                stroke={isSelected ? '#A59386' : '#2F2A28'}
                strokeWidth={isSelected ? 2 : 1}
                cornerRadius={5}
              />
              <Text
                text={obj.furnitureType}
                fontSize={14}
                fill="#FFFFFF"
                width={obj.width}
                height={obj.height}
                align="center"
                verticalAlign="middle"
              />
            </Group>
          );

        case 'text':
          return (
            <Text
              key={obj.id}
              id={obj.id}
              x={obj.x}
              y={obj.y}
              text={obj.text}
              fontSize={obj.fontSize}
              fontStyle={obj.fontStyle}
              fill={obj.textColor}
              rotation={obj.rotation}
              draggable={isDraggable}
              onClick={() => tool === 'select' && onSelect(obj.id)}
              onDragEnd={(e) => {
                onChange(obj.id, { x: e.target.x(), y: e.target.y() });
              }}
              onTransformEnd={(e) => {
                onChange(obj.id, {
                  x: e.target.x(),
                  y: e.target.y(),
                  rotation: e.target.rotation(),
                });
              }}
            />
          );

        default:
          return null;
      }
    };

    // Calculate grid dimensions based on viewport
    const gridWidth = Math.max(dimensions.width * 3, 5000);
    const gridHeight = Math.max(dimensions.height * 3, 5000);

    return (
      <div ref={containerRef} className="canvas-container" style={{ width: '100%', height: '100%' }}>
        <Stage
          ref={ref}
          width={dimensions.width}
          height={dimensions.height}
          scaleX={viewport.scale}
          scaleY={viewport.scale}
          x={viewport.x}
          y={viewport.y}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {/* Grid layer */}
          <GridLayer width={gridWidth} height={gridHeight} grid={grid} />

          {/* Objects layer */}
          <Layer>
            {objects.map(renderObject)}
            {renderPreview()}
            {tool === 'select' && <Transformer ref={transformerRef} />}
          </Layer>
        </Stage>
      </div>
    );
  }
);

CanvasStage.displayName = 'CanvasStage';
