// src/app/tool/page.tsx
'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { Box, Grid, Stack, ScrollArea, Divider, Modal, Text, List } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import Konva from 'konva';
import dynamic from 'next/dynamic';
import { MainAppShell } from '@/components/layout/MainAppShell';
import { Toolbar } from '@/components/tool/Toolbar';
import { LayersPanel } from '@/components/tool/LayersPanel';
import { PropertiesPanel } from '@/components/tool/PropertiesPanel';
import { ExportPanel } from '@/components/tool/ExportPanel';
import { CommandPalette } from '@/components/tool/CommandPalette';
import { EditSizeModal } from '@/components/tool/EditSizeModal';
import { useFloorplanScene } from '@/lib/floorplan/useFloorplanScene';
import {
  ToolType,
  FurnitureType,
  ViewportState,
  DEFAULT_VIEWPORT,
  MIN_ZOOM,
  MAX_ZOOM,
  ZOOM_STEP,
} from '@/lib/floorplan/types';

// Dynamically import CanvasStage with SSR disabled to prevent Konva SSR errors
const CanvasStage = dynamic(() => import('@/components/tool/CanvasStage').then(mod => ({ default: mod.CanvasStage })), {
  ssr: false,
});

export default function ToolPage() {
  const stageRef = useRef<Konva.Stage>(null);
  const [currentTool, setCurrentTool] = useState<ToolType>('select');
  const [selectedFurniture, setSelectedFurniture] = useState<FurnitureType>('bed');
  const [viewport, setViewport] = useState<ViewportState>(DEFAULT_VIEWPORT);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [editSizeModalOpen, setEditSizeModalOpen] = useState(false);

  // Use the floorplan scene hook
  const {
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
    updateGrid,
    undo,
    redo,
    canUndo,
    canRedo,
    saveToLocalStorage,
    loadFromLocalStorage,
    newScene,
  } = useFloorplanScene();

  // Zoom controls
  const handleZoomIn = useCallback(() => {
    setViewport((prev) => ({
      ...prev,
      scale: Math.min(prev.scale + ZOOM_STEP, MAX_ZOOM),
    }));
  }, []);

  const handleZoomOut = useCallback(() => {
    setViewport((prev) => ({
      ...prev,
      scale: Math.max(prev.scale - ZOOM_STEP, MIN_ZOOM),
    }));
  }, []);

  const handleZoomReset = useCallback(() => {
    setViewport(DEFAULT_VIEWPORT);
  }, []);

  // File operations
  const handleSave = useCallback(() => {
    const success = saveToLocalStorage();
    if (success) {
      notifications.show({
        title: 'Saved',
        message: 'Floorplan saved to localStorage',
        color: 'green',
      });
    } else {
      notifications.show({
        title: 'Error',
        message: 'Failed to save floorplan',
        color: 'red',
      });
    }
  }, [saveToLocalStorage]);

  const handleLoad = useCallback(() => {
    const success = loadFromLocalStorage();
    if (success) {
      notifications.show({
        title: 'Loaded',
        message: 'Floorplan loaded from localStorage',
        color: 'green',
      });
    } else {
      notifications.show({
        title: 'No Saved Data',
        message: 'No saved floorplan found',
        color: 'orange',
      });
    }
  }, [loadFromLocalStorage]);

  const handleNew = useCallback(() => {
    if (scene.objects.length > 0) {
      if (confirm('Create a new floorplan? Any unsaved changes will be lost.')) {
        newScene();
        notifications.show({
          title: 'New Floorplan',
          message: 'Created new floorplan',
          color: 'blue',
        });
      }
    } else {
      newScene();
    }
  }, [scene.objects.length, newScene]);

  // Add object handlers that pass the selected furniture type
  const handleAddFurniture = useCallback(
    (x: number, y: number) => {
      addFurniture(x, y, selectedFurniture);
    },
    [addFurniture, selectedFurniture]
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command palette
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
        return;
      }

      // Save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
        return;
      }

      // Undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
        return;
      }

      // Redo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) {
        e.preventDefault();
        redo();
        return;
      }

      // Delete
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (
          document.activeElement?.tagName !== 'INPUT' &&
          document.activeElement?.tagName !== 'TEXTAREA'
        ) {
          e.preventDefault();
          deleteSelected();
        }
        return;
      }

      // Grid and edit shortcuts (only when not typing)
      if (
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        // Toggle grid (G)
        if (e.key.toLowerCase() === 'g' && !e.shiftKey) {
          e.preventDefault();
          updateGrid({ enabled: !scene.grid.enabled });
          return;
        }

        // Edit Size modal (Shift+G)
        if (e.key.toLowerCase() === 'g' && e.shiftKey) {
          e.preventDefault();
          if (selectedId) {
            setEditSizeModalOpen(true);
          }
          return;
        }

        // Grid opacity shortcuts
        if (e.key === '+' || e.key === '=') {
          e.preventDefault();
          updateGrid({ opacity: Math.min(1, scene.grid.opacity + 0.1) });
          return;
        }

        if (e.key === '-' || e.key === '_') {
          e.preventDefault();
          updateGrid({ opacity: Math.max(0, scene.grid.opacity - 0.1) });
          return;
        }

        // Tool shortcuts
        switch (e.key.toLowerCase()) {
          case 'v':
            setCurrentTool('select');
            break;
          case 'w':
            setCurrentTool('wall');
            break;
          case 'd':
            setCurrentTool('door');
            break;
          case 'f':
            setCurrentTool('furniture');
            break;
          case 't':
            setCurrentTool('text');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSave, undo, redo, deleteSelected, scene.grid, updateGrid, selectedId]);

  // Toggle object visibility
  const handleToggleVisibility = useCallback(
    (id: string) => {
      const obj = scene.objects.find((o) => o.id === id);
      if (obj) {
        updateObject(id, { isVisible: !obj.isVisible });
      }
    },
    [scene.objects, updateObject]
  );

  // Toggle object lock
  const handleToggleLock = useCallback(
    (id: string) => {
      const obj = scene.objects.find((o) => o.id === id);
      if (obj) {
        updateObject(id, { isLocked: !obj.isLocked });
      }
    },
    [scene.objects, updateObject]
  );

  return (
    <MainAppShell hideFooter>
      <Box style={{ height: 'calc(100vh - 70px)', overflow: 'hidden' }}>
        <Grid gutter={0} style={{ height: '100%', margin: 0 }}>
          {/* Left Toolbar */}
          <Grid.Col span="content" style={{ height: '100%', borderRight: '1px solid #E8DFD9' }}>
            <Toolbar
              currentTool={currentTool}
              onToolChange={setCurrentTool}
              selectedFurniture={selectedFurniture}
              onFurnitureChange={setSelectedFurniture}
              grid={scene.grid}
              onGridChange={updateGrid}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onZoomReset={handleZoomReset}
              onUndo={undo}
              onRedo={redo}
              canUndo={canUndo}
              canRedo={canRedo}
              onSave={handleSave}
              onLoad={handleLoad}
              onNew={handleNew}
              onHelp={() => setHelpModalOpen(true)}
              onEditSize={() => setEditSizeModalOpen(true)}
              hasSelection={!!selectedId}
            />
          </Grid.Col>

          {/* Center Canvas */}
          <Grid.Col span="auto" style={{ height: '100%', padding: 0 }}>
            <Box style={{ height: '100%', backgroundColor: '#F7F3EF', padding: '1rem' }}>
              <CanvasStage
                ref={stageRef}
                objects={scene.objects}
                selectedId={selectedId}
                onSelect={setSelectedId}
                onChange={updateObject}
                tool={currentTool}
                viewport={viewport}
                onViewportChange={setViewport}
                grid={scene.grid}
                selectedFurniture={selectedFurniture}
                onAddWall={addWall}
                onAddDoor={addDoor}
                onAddFurniture={handleAddFurniture}
                onAddText={addText}
              />
            </Box>
          </Grid.Col>

          {/* Right Panel */}
          <Grid.Col
            span="content"
            style={{
              height: '100%',
              width: '280px',
              borderLeft: '1px solid #E8DFD9',
            }}
          >
            <ScrollArea style={{ height: '100%' }}>
              <Stack gap="xl" p="md">
                {/* Layers Panel */}
                <LayersPanel
                  objects={scene.objects}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                  onToggleVisibility={handleToggleVisibility}
                  onToggleLock={handleToggleLock}
                  onDelete={deleteObject}
                  onReorder={reorderObjects}
                />

                <Divider />

                {/* Properties Panel */}
                <PropertiesPanel selectedObject={selectedObject} onUpdate={updateObject} />

                <Divider />

                {/* Export Panel */}
                <ExportPanel stageRef={stageRef} />
              </Stack>
            </ScrollArea>
          </Grid.Col>
        </Grid>
      </Box>

      {/* Command Palette */}
      <CommandPalette
        opened={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onToolChange={setCurrentTool}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onZoomReset={handleZoomReset}
        onNew={handleNew}
        onSave={handleSave}
        onLoad={handleLoad}
        onHelp={() => {
          setCommandPaletteOpen(false);
          setHelpModalOpen(true);
        }}
      />

      {/* Edit Size Modal */}
      <EditSizeModal
        opened={editSizeModalOpen}
        onClose={() => setEditSizeModalOpen(false)}
        object={selectedObject || null}
        gridSize={scene.grid.size}
        onUpdate={updateObject}
      />

      {/* Help Modal */}
      <Modal
        opened={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
        title="Help & Keyboard Shortcuts"
        size="lg"
        centered
      >
        <Stack gap="md">
          <div>
            <Text size="sm" fw={600} mb="xs" style={{ color: '#2F2A28' }}>
              Tool Shortcuts
            </Text>
            <List size="sm" spacing="xs">
              <List.Item>
                <strong>V</strong> - Select/Move tool
              </List.Item>
              <List.Item>
                <strong>W</strong> - Wall tool
              </List.Item>
              <List.Item>
                <strong>D</strong> - Door tool
              </List.Item>
              <List.Item>
                <strong>F</strong> - Furniture tool
              </List.Item>
              <List.Item>
                <strong>T</strong> - Text tool
              </List.Item>
              <List.Item>
                <strong>Spacebar</strong> (hold) - Pan mode
              </List.Item>
              <List.Item>
                <strong>G</strong> - Toggle grid
              </List.Item>
              <List.Item>
                <strong>Shift+G</strong> - Edit size (for selected object)
              </List.Item>
              <List.Item>
                <strong>+/-</strong> - Adjust grid opacity
              </List.Item>
            </List>
          </div>

          <div>
            <Text size="sm" fw={600} mb="xs" style={{ color: '#2F2A28' }}>
              Canvas Controls
            </Text>
            <List size="sm" spacing="xs">
              <List.Item>
                <strong>Mouse Wheel</strong> - Zoom in/out
              </List.Item>
              <List.Item>
                <strong>Click & Drag</strong> - Draw walls (Wall tool)
              </List.Item>
              <List.Item>
                <strong>Click</strong> - Place objects (Door, Furniture, Text tools)
              </List.Item>
              <List.Item>
                <strong>Click & Drag</strong> - Move objects (Select tool)
              </List.Item>
            </List>
          </div>

          <div>
            <Text size="sm" fw={600} mb="xs" style={{ color: '#2F2A28' }}>
              Edit & Navigation
            </Text>
            <List size="sm" spacing="xs">
              <List.Item>
                <strong>Ctrl/Cmd + Z</strong> - Undo
              </List.Item>
              <List.Item>
                <strong>Ctrl/Cmd + Shift + Z</strong> - Redo
              </List.Item>
              <List.Item>
                <strong>Delete / Backspace</strong> - Delete selected object
              </List.Item>
              <List.Item>
                <strong>Ctrl/Cmd + S</strong> - Save to localStorage
              </List.Item>
              <List.Item>
                <strong>Ctrl/Cmd + K</strong> - Open command palette
              </List.Item>
            </List>
          </div>

          <div>
            <Text size="sm" fw={600} mb="xs" style={{ color: '#2F2A28' }}>
              Getting Started
            </Text>
            <Text size="sm" style={{ color: '#5E5753' }}>
              1. Select a tool from the left toolbar or use keyboard shortcuts
              <br />
              2. Draw on the canvas using your mouse
              <br />
              3. Use the Layers panel to manage objects
              <br />
              4. Edit properties in the Properties panel
              <br />
              5. Save your work and export when ready
            </Text>
          </div>
        </Stack>
      </Modal>
    </MainAppShell>
  );
}
