// src/utils/id.ts

/**
 * Generate a unique ID for objects in the scene
 * Uses crypto.randomUUID if available, otherwise falls back to a simple timestamp-based ID
 */
export function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback for older browsers
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * Generate a unique ID with a prefix
 * Useful for creating human-readable IDs like "wall-abc123"
 */
export function generatePrefixedId(prefix: string): string {
  const id = generateId();
  const shortId = id.substring(0, 8);
  return `${prefix}-${shortId}`;
}
