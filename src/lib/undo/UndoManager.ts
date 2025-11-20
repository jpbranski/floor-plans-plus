// src/lib/undo/UndoManager.ts
import { FloorplanScene } from '../floorplan/types';

/**
 * Maximum number of undo/redo history entries to keep
 */
const MAX_HISTORY_LENGTH = 50;

/**
 * UndoManager - Manages undo/redo history for floorplan scenes
 *
 * This class maintains a stack of scene states and allows users to
 * navigate backward (undo) and forward (redo) through their changes.
 */
export class UndoManager {
  private history: FloorplanScene[] = [];
  private currentIndex: number = -1;

  /**
   * Push a new state to the history
   * This clears any redo history beyond the current point
   */
  pushState(scene: FloorplanScene): void {
    // Deep clone the scene to avoid reference issues
    const clonedScene = this.cloneScene(scene);

    // Remove any redo history beyond current index
    this.history = this.history.slice(0, this.currentIndex + 1);

    // Add new state
    this.history.push(clonedScene);

    // Limit history length
    if (this.history.length > MAX_HISTORY_LENGTH) {
      this.history.shift();
    } else {
      this.currentIndex++;
    }
  }

  /**
   * Undo - go back one step in history
   * Returns the previous state, or null if can't undo
   */
  undo(): FloorplanScene | null {
    if (!this.canUndo()) {
      return null;
    }

    this.currentIndex--;
    return this.cloneScene(this.history[this.currentIndex]);
  }

  /**
   * Redo - go forward one step in history
   * Returns the next state, or null if can't redo
   */
  redo(): FloorplanScene | null {
    if (!this.canRedo()) {
      return null;
    }

    this.currentIndex++;
    return this.cloneScene(this.history[this.currentIndex]);
  }

  /**
   * Check if undo is available
   */
  canUndo(): boolean {
    return this.currentIndex > 0;
  }

  /**
   * Check if redo is available
   */
  canRedo(): boolean {
    return this.currentIndex < this.history.length - 1;
  }

  /**
   * Clear all history
   */
  clear(): void {
    this.history = [];
    this.currentIndex = -1;
  }

  /**
   * Get current state without modifying history
   */
  getCurrentState(): FloorplanScene | null {
    if (this.currentIndex >= 0 && this.currentIndex < this.history.length) {
      return this.cloneScene(this.history[this.currentIndex]);
    }
    return null;
  }

  /**
   * Get the number of undo steps available
   */
  getUndoCount(): number {
    return this.currentIndex;
  }

  /**
   * Get the number of redo steps available
   */
  getRedoCount(): number {
    return this.history.length - this.currentIndex - 1;
  }

  /**
   * Deep clone a scene to avoid reference issues
   */
  private cloneScene(scene: FloorplanScene): FloorplanScene {
    return JSON.parse(JSON.stringify(scene));
  }

  /**
   * Get a string representation of history for debugging
   */
  debugHistory(): string {
    return `History: ${this.history.length} states, current index: ${this.currentIndex}`;
  }
}

/**
 * Create a new UndoManager instance
 */
export function createUndoManager(): UndoManager {
  return new UndoManager();
}
