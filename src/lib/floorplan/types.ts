// src/lib/floorplan/types.ts

/**
 * Available tool types for the floorplan editor
 */
export type ToolType = 'select' | 'wall' | 'door' | 'furniture' | 'text' | 'pan';

/**
 * Available furniture types
 */
export type FurnitureType = 'bed' | 'sofa' | 'table' | 'desk' | 'chair';

/**
 * Door swing direction
 */
export type SwingDirection = 'left' | 'right' | 'top' | 'bottom';

/**
 * Base properties shared by all floorplan objects
 */
export interface FloorplanObjectBase {
  id: string;
  type: 'wall' | 'door' | 'furniture' | 'text';
  name: string;
  x: number;
  y: number;
  rotation: number; // in degrees
  isLocked: boolean;
  isVisible: boolean;
}

/**
 * Wall object - rectangular walls with thickness
 */
export interface WallObject extends FloorplanObjectBase {
  type: 'wall';
  width: number;
  height: number;
  thickness: number;
  fillColor: string;
}

/**
 * Door object - door with swing arc
 */
export interface DoorObject extends FloorplanObjectBase {
  type: 'door';
  width: number; // door width (e.g., 30, 32, 36 inches)
  height: number; // door thickness/depth
  swingDirection: SwingDirection;
  doorType: 'single' | 'double';
}

/**
 * Furniture object - labeled rectangles for furniture
 */
export interface FurnitureObject extends FloorplanObjectBase {
  type: 'furniture';
  furnitureType: FurnitureType;
  width: number;
  height: number;
  fillColor: string;
}

/**
 * Text object - labels and notes
 */
export interface TextObject extends FloorplanObjectBase {
  type: 'text';
  text: string;
  fontSize: number;
  fontStyle: 'normal' | 'bold' | 'italic';
  textColor: string;
}

/**
 * Union type for all floorplan objects
 */
export type FloorplanObject = WallObject | DoorObject | FurnitureObject | TextObject;

/**
 * Viewport state for pan and zoom
 */
export interface ViewportState {
  scale: number; // zoom level (1.0 = 100%)
  x: number; // pan offset x
  y: number; // pan offset y
}

/**
 * Grid configuration (Option A: 1 unit = 1 grid square)
 */
export interface GridConfig {
  enabled: boolean;
  size: number; // pixels per grid square (default 40)
  opacity: number; // 0-1 (default 0.25)
}

/**
 * Complete floorplan scene
 */
export interface FloorplanScene {
  id: string;
  name: string;
  objects: FloorplanObject[];
  grid: GridConfig;
  createdAt: string;
  updatedAt: string;
}

/**
 * Default values for new objects
 */
export const DEFAULT_WALL: Omit<WallObject, 'id' | 'name' | 'x' | 'y'> = {
  type: 'wall',
  width: 100,
  height: 20,
  thickness: 20,
  rotation: 0,
  fillColor: '#9E9E9E',
  isLocked: false,
  isVisible: true,
};

export const DEFAULT_DOOR: Omit<DoorObject, 'id' | 'name' | 'x' | 'y'> = {
  type: 'door',
  width: 80, // approx 32 inches scaled
  height: 10,
  rotation: 0,
  swingDirection: 'right',
  doorType: 'single',
  isLocked: false,
  isVisible: true,
};

export const FURNITURE_DEFAULTS: Record<
  FurnitureType,
  Omit<FurnitureObject, 'id' | 'name' | 'x' | 'y' | 'furnitureType'>
> = {
  bed: {
    type: 'furniture',
    width: 150,
    height: 180,
    rotation: 0,
    fillColor: '#8BC34A',
    isLocked: false,
    isVisible: true,
  },
  sofa: {
    type: 'furniture',
    width: 180,
    height: 80,
    rotation: 0,
    fillColor: '#2196F3',
    isLocked: false,
    isVisible: true,
  },
  table: {
    type: 'furniture',
    width: 120,
    height: 80,
    rotation: 0,
    fillColor: '#FF9800',
    isLocked: false,
    isVisible: true,
  },
  desk: {
    type: 'furniture',
    width: 140,
    height: 70,
    rotation: 0,
    fillColor: '#9C27B0',
    isLocked: false,
    isVisible: true,
  },
  chair: {
    type: 'furniture',
    width: 50,
    height: 50,
    rotation: 0,
    fillColor: '#F44336',
    isLocked: false,
    isVisible: true,
  },
};

export const DEFAULT_TEXT: Omit<TextObject, 'id' | 'name' | 'x' | 'y'> = {
  type: 'text',
  text: 'New note',
  fontSize: 16,
  fontStyle: 'normal',
  rotation: 0,
  textColor: '#2F2A28',
  isLocked: false,
  isVisible: true,
};

/**
 * Door width presets (in canvas units, approximately inches)
 */
export const DOOR_WIDTH_PRESETS = [
  { label: '28"', value: 70 },
  { label: '30"', value: 75 },
  { label: '32"', value: 80 },
  { label: '36"', value: 90 },
];

/**
 * Default viewport state
 */
export const DEFAULT_VIEWPORT: ViewportState = {
  scale: 1,
  x: 0,
  y: 0,
};

/**
 * Zoom constraints
 */
export const MIN_ZOOM = 0.3;
export const MAX_ZOOM = 3.0;
export const ZOOM_STEP = 0.1;

/**
 * Grid constraints
 */
export const MIN_GRID_SIZE = 20;
export const MAX_GRID_SIZE = 80;
export const DEFAULT_GRID_SIZE = 40;
export const DEFAULT_GRID_OPACITY = 0.25;

/**
 * Default grid configuration
 */
export const DEFAULT_GRID: GridConfig = {
  enabled: true,
  size: DEFAULT_GRID_SIZE,
  opacity: DEFAULT_GRID_OPACITY,
};

/**
 * Base-4 pixel snapping
 */
export function snapToBase4(value: number): number {
  return Math.round(value / 4) * 4;
}

/**
 * Convert pixels to grid units
 */
export function pxToUnits(px: number, gridSize: number): number {
  return Math.round(px / gridSize);
}

/**
 * Convert grid units to pixels with base-4 snapping
 */
export function unitsToPx(units: number, gridSize: number): number {
  return snapToBase4(units * gridSize);
}
