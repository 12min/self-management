import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { useState } from 'react';
import { Header } from './components/Header';
import { KPICard } from './components/KPICard';
import { TaskZone } from './components/TaskZone';
import { useTaskManager } from './hooks/useTaskManager';
import type { Task } from './types';

function App() {
  const { state, moveTask, removeTask, updateTask, addTask, clearZone, resetToDefault } = useTaskManager();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const taskId = active.id as string;

    const task = [...state.yesterday, ...state.today].find(t => t.id === taskId);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Check if dragging between zones
    if (overId === 'yesterday' || overId === 'today') {
      const fromZone = state.yesterday.find(t => t.id === activeId) ? 'yesterday' : 'today';
      if (fromZone !== overId) {
        moveTask(activeId, fromZone, overId);
      }
    }
  };

  return (
    <div className="max-w-[1100px] mx-auto p-6">
      <Header
        title="Improve User Activation through Personalized Content Recommendation"
        subtitle="Project Content Recommendation that Works — STATUS: AT RISK"
        owner="Renato Filho"
        week="Week 6 of 7 (Feb 10, 2026)"
        quarter="Q1 2026"
        source="ClickUp (real data)"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 mb-6">
        <KPICard
          label="Primary KPI"
          value="Book Start Rate"
          detail="Target: 46% → 65% (end of Q1)"
          color="blue"
          valueSize="small"
        />
        <KPICard
          label="Tasks Completed"
          value="5/18"
          detail="28% of ClickUp tasks"
          color="red"
        />
        <KPICard
          label="Deliverable 0"
          value="100%"
          detail="Post-Purchase (4/4)"
          color="green"
        />
        <KPICard
          label="Parallel Work"
          value="4/9"
          detail="Side quests completed"
          color="orange"
        />
      </div>

      {/* Reset Button */}
      <div className="text-right mb-3">
        <button
          onClick={resetToDefault}
          className="bg-gray/70 text-white border-none px-2.5 py-1 rounded text-xs cursor-pointer opacity-70 hover:opacity-100"
        >
          🔄 Reset to Default
        </button>
      </div>

      {/* Task Zones with Drag and Drop */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <TaskZone
          id="yesterday"
          title="Yesterday's Activity (Feb 11)"
          tasks={state.yesterday}
          onRemoveTask={(taskId) => removeTask(taskId, 'yesterday')}
          onUpdateTask={(taskId, updates) => updateTask(taskId, 'yesterday', updates)}
          onAddTask={(task) => addTask(task, 'yesterday')}
          onClearZone={() => clearZone('yesterday')}
          showClickUpTag
        />

        <TaskZone
          id="today"
          title="Today's Priorities (Feb 12)"
          tasks={state.today}
          onRemoveTask={(taskId) => removeTask(taskId, 'today')}
          onUpdateTask={(taskId, updates) => updateTask(taskId, 'today', updates)}
          onAddTask={(task) => addTask(task, 'today')}
          onClearZone={() => clearZone('today')}
        />

        <DragOverlay>
          {activeTask ? (
            <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-blue">
              {activeTask.title}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Footer */}
      <div className="text-center pt-6 pb-6 text-xs text-gray">
        Generated on Feb 10, 2026 • Data extracted from ClickUp (real) • Project Content Recommendation that Works • 12min
      </div>
    </div>
  );
}

export default App;
