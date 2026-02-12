import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { TaskItem } from './TaskItem';
import type { Task } from '../types';

interface TaskZoneProps {
  id: string;
  title: string;
  tasks: Task[];
  onRemoveTask: (taskId: string) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onClearZone: () => void;
  showClickUpTag?: boolean;
}

export function TaskZone({
  id,
  title,
  tasks,
  onRemoveTask,
  onUpdateTask,
  onClearZone,
  showClickUpTag = false,
}: TaskZoneProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  const handleClear = () => {
    if (window.confirm(`Are you sure you want to clear all tasks from ${title}?`)) {
      onClearZone();
    }
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold flex items-center gap-2 mb-0">
          {title}
          {showClickUpTag && (
            <span className="inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded bg-purple-600 text-white">
              ClickUp
            </span>
          )}
        </h2>
        <button
          onClick={handleClear}
          className="bg-red text-white border-none px-3 py-1.5 rounded text-xs font-semibold cursor-pointer transition-all hover:bg-red-700 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 flex items-center gap-1"
        >
          <span>🗑️</span>
          <span>Clean List</span>
        </button>
      </div>

      <div
        ref={setNodeRef}
        className={`drop-zone bg-white rounded-xl p-5 border shadow-sm min-h-[60px] transition-all ${
          isOver ? 'bg-blue-50 border-2 border-dashed border-blue' : 'border-border'
        }`}
      >
        {tasks.length === 0 ? (
          <p className="text-gray text-sm text-center py-5">No tasks yet</p>
        ) : (
          <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
            {tasks.map((task, index) => (
              <TaskItem
                key={task.id}
                task={task}
                onRemove={() => onRemoveTask(task.id)}
                onUpdate={(updates) => onUpdateTask(task.id, updates)}
                isLast={index === tasks.length - 1}
              />
            ))}
          </SortableContext>
        )}
      </div>
    </div>
  );
}
