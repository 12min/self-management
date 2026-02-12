import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onRemove: () => void;
  onUpdate: (updates: Partial<Task>) => void;
  isLast?: boolean;
}

const statusIcons = {
  done: '✓',
  'in-review': '✎',
  'in-progress': '■',
  todo: '■',
};

const statusLabels = {
  done: 'Done',
  'in-review': 'In Review',
  'in-progress': 'In Progress',
  todo: 'To Do',
};

export function TaskItem({ task, onRemove, onUpdate, isLast = false }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditValue(task.title);
  };

  const handleSave = () => {
    if (editValue.trim()) {
      onUpdate({ title: editValue.trim() });
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(task.title);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`task-item flex items-center gap-2 px-0 py-2 text-sm cursor-move transition-all hover:bg-gray-50 hover:translate-x-1 ${
        !isLast ? 'border-b border-gray-bg' : ''
      }`}
    >
      <span
        className="font-bold"
        style={{ color: `var(--${task.statusColor})` }}
      >
        {statusIcons[task.status]}
      </span>

      {isEditing ? (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="flex-1 border-2 border-blue rounded px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-blue/20"
          autoFocus
        />
      ) : (
        <span
          className="flex-1 cursor-text hover:bg-gray-bg hover:px-1 hover:rounded"
          onDoubleClick={handleDoubleClick}
          title="Double-click to edit"
        >
          {task.title}
          {task.url && (
            <>
              {' - '}
              <a
                href={task.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue underline"
                onClick={(e) => e.stopPropagation()}
              >
                ClickUp:{task.id}
              </a>
            </>
          )}
        </span>
      )}

      <button
        className="remove-task-btn opacity-0 px-2 py-1 rounded transition-all hover:bg-red-bg hover:text-red hover:scale-110"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        title="Remove task"
      >
        ×
      </button>

      <span
        className="text-xs font-semibold px-2 py-1 rounded-xl ml-auto"
        style={{
          background: `var(--${task.statusColor}-bg)`,
          color: `var(--${task.statusColor})`,
        }}
      >
        {statusLabels[task.status]}
      </span>
    </div>
  );
}
