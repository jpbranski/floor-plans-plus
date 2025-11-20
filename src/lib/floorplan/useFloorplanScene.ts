// src/lib/floorplan/useFloorplanScene.ts
'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  FloorplanScene,
  FloorplanObject,
  WallObject,
  DoorObject,
  FurnitureObject,
  TextObject,
  FurnitureType,
  DEFAULT_WALL,
  DEFAULT_DOOR,
  FURNITURE_DEFAULTS,
  DEFAULT_TEXT,
} from './types';
import { generateId, generatePrefixedId } from '@/utils/id';
import { UndoManager } from '../undo/UndoManager';

const STORAGE_KEY = 'floorplan-studio-scene-v1';

/**
 * Create an empty floorplan scene
 */
function createEmptyScene(): FloorplanScene {
  return {
    id: generateId(),
    name: 'Untitled Floorplan',
    objects: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Hook for managing floorplan scene state
 */
export function useFloorplanScene() {
  const [scene, setScene] = useState<FloorplanScene>(createEmptyScene);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const undoManager = useRef(new UndoManager());

  // Initialize undo manager with initial scene
  useEffect(() => {
    undoManager.current.pushState(scene);
  }, []);

  /**
   * Update scene and push to undo history
   */
  const updateScene = useCallback((updater: (prev: FloorplanScene) => FloorplanScene) => {
    setScene((prev) => {
      const updated = updater(prev);
      const newScene = {
        ...updated,
        updatedAt: new Date().toISOString(),
      };
      undoManager.current.pushState(newScene);
      return newScene;
    });
  }, []);

  /**
   * Add a wall to the scene
   */
  const addWall = useCallback(
    (x: number, y: number, width: number, height: number) => {
      updateScene((prev) => {
        const wallCount = prev.objects.filter((obj) => obj.type === 'wall').length;
        const newWall: WallObject = {
          ...DEFAULT_WALL,
          id: generatePrefixedId('wall'),
          name: `Wall ${wallCount + 1}`,
          x,
          y,
          width,
          height,
        };
        return {
          ...prev,
          objects: [...prev.objects, newWall],
        };
      });
    },
    [updateScene]
  );

  /**
   * Add a door to the scene
   */
  const addDoor = useCallback(
    (x: number, y: number) => {
      updateScene((prev) => {
        const doorCount = prev.objects.filter((obj) => obj.type === 'door').length;
        const newDoor: DoorObject = {
          ...DEFAULT_DOOR,
          id: generatePrefixedId('door'),
          name: `Door ${doorCount + 1}`,
          x,
          y,
        };
        return {
          ...prev,
          objects: [...prev.objects, newDoor],
        };
      });
    },
    [updateScene]
  );

  /**
   * Add furniture to the scene
   */
  const addFurniture = useCallback(
    (x: number, y: number, furnitureType: FurnitureType) => {
      updateScene((prev) => {
        const furnitureCount = prev.objects.filter((obj) => obj.type === 'furniture').length;
        const defaults = FURNITURE_DEFAULTS[furnitureType];
        const newFurniture: FurnitureObject = {
          ...defaults,
          furnitureType,
          id: generatePrefixedId('furniture'),
          name: `${furnitureType.charAt(0).toUpperCase() + furnitureType.slice(1)} ${
            furnitureCount + 1
          }`,
          x,
          y,
        };
        return {
          ...prev,
          objects: [...prev.objects, newFurniture],
        };
      });
    },
    [updateScene]
  );

  /**
   * Add text to the scene
   */
  const addText = useCallback(
    (x: number, y: number) => {
      updateScene((prev) => {
        const textCount = prev.objects.filter((obj) => obj.type === 'text').length;
        const newText: TextObject = {
          ...DEFAULT_TEXT,
          id: generatePrefixedId('text'),
          name: `Note ${textCount + 1}`,
          x,
          y,
        };
        return {
          ...prev,
          objects: [...prev.objects, newText],
        };
      });
    },
    [updateScene]
  );

  /**
   * Update a specific object
   */
  const updateObject = useCallback(
    (id: string, updates: Partial<FloorplanObject>) => {
      updateScene((prev) => ({
        ...prev,
        objects: prev.objects.map((obj) => (obj.id === id ? { ...obj, ...updates } as FloorplanObject : obj)),
      }));
    },
    [updateScene]
  );

  /**
   * Delete an object
   */
  const deleteObject = useCallback(
    (id: string) => {
      updateScene((prev) => ({
        ...prev,
        objects: prev.objects.filter((obj) => obj.id !== id),
      }));
      if (selectedId === id) {
        setSelectedId(null);
      }
    },
    [updateScene, selectedId]
  );

  /**
   * Delete the currently selected object
   */
  const deleteSelected = useCallback(() => {
    if (selectedId) {
      const obj = scene.objects.find((o) => o.id === selectedId);
      if (obj && !obj.isLocked) {
        deleteObject(selectedId);
      }
    }
  }, [selectedId, scene.objects, deleteObject]);

  /**
   * Reorder objects (change z-index)
   */
  const reorderObjects = useCallback(
    (newOrder: FloorplanObject[]) => {
      updateScene((prev) => ({
        ...prev,
        objects: newOrder,
      }));
    },
    [updateScene]
  );

  /**
   * Undo last action
   */
  const undo = useCallback(() => {
    const previousState = undoManager.current.undo();
    if (previousState) {
      setScene(previousState);
      // Clear selection if the selected object no longer exists
      if (selectedId && !previousState.objects.find((obj) => obj.id === selectedId)) {
        setSelectedId(null);
      }
    }
  }, [selectedId]);

  /**
   * Redo last undone action
   */
  const redo = useCallback(() => {
    const nextState = undoManager.current.redo();
    if (nextState) {
      setScene(nextState);
    }
  }, []);

  /**
   * Check if undo is available
   */
  const canUndo = undoManager.current.canUndo();

  /**
   * Check if redo is available
   */
  const canRedo = undoManager.current.canRedo();

  /**
   * Save scene to localStorage
   */
  const saveToLocalStorage = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scene));
      return true;
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
      return false;
    }
  }, [scene]);

  /**
   * Load scene from localStorage
   */
  const loadFromLocalStorage = useCallback(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const loadedScene = JSON.parse(saved) as FloorplanScene;
        setScene(loadedScene);
        undoManager.current.clear();
        undoManager.current.pushState(loadedScene);
        setSelectedId(null);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      return false;
    }
  }, []);

  /**
   * Create a new empty scene
   */
  const newScene = useCallback(() => {
    const empty = createEmptyScene();
    setScene(empty);
    undoManager.current.clear();
    undoManager.current.pushState(empty);
    setSelectedId(null);
  }, []);

  /**
   * Get selected object
   */
  const selectedObject = selectedId
    ? scene.objects.find((obj) => obj.id === selectedId)
    : null;

  return {
    scene,
    selectedId,
    selectedObject,
    setSelectedId,
    addWall,
    addDoor,
    addFurniture,
    addText,
    updateObject,
    deleteObject,
    deleteSelected,
    reorderObjects,
    undo,
    redo,
    canUndo,
    canRedo,
    saveToLocalStorage,
    loadFromLocalStorage,
    newScene,
  };
}
