import { useState } from 'react';
import type { TaskStatus, StatusColor } from '../types';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (task: {
    id: string;
    title: string;
    status: TaskStatus;
    statusColor: StatusColor;
    url: string;
  }) => void;
  zone: 'yesterday' | 'today';
}

export function AddTaskModal({ isOpen, onClose, onAdd, zone }: AddTaskModalProps) {
  const [clickupLink, setClickupLink] = useState('');
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<TaskStatus>('in-progress');

  if (!isOpen) return null;

  const extractTaskId = (link: string): string | null => {
    // Extract from https://app.clickup.com/t/TASK_ID
    const match = link.match(/clickup\.com\/t\/([a-z0-9]+)/i);
    return match ? match[1] : null;
  };

  const getStatusColor = (status: TaskStatus): StatusColor => {
    switch (status) {
      case 'done':
        return 'green';
      case 'in-review':
        return 'blue';
      case 'in-progress':
        return 'yellow';
      case 'todo':
        return 'gray';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const taskId = extractTaskId(clickupLink);
    if (!taskId) {
      alert('Invalid ClickUp link. Please use format: https://app.clickup.com/t/TASK_ID');
      return;
    }

    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }

    onAdd({
      id: taskId,
      title: title.trim(),
      status,
      statusColor: getStatusColor(status),
      url: clickupLink,
    });

    // Reset form
    setClickupLink('');
    setTitle('');
    setStatus('in-progress');
    onClose();
  };

  const handleLinkChange = (value: string) => {
    setClickupLink(value);
    // If title is empty and we have a valid link, suggest using the ID as placeholder
    if (!title && extractTaskId(value)) {
      const taskId = extractTaskId(value);
      setTitle(`Task ${taskId}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
        <h3 className="text-xl font-bold mb-4">
          Add Task to {zone === 'yesterday' ? "Yesterday's Activity" : "Today's Priorities"}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ClickUp Link *
            </label>
            <input
              type="text"
              value={clickupLink}
              onChange={(e) => handleLinkChange(e.target.value)}
              placeholder="https://app.clickup.com/t/86afba1tb"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-blue outline-none"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Paste the full ClickUp task URL
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Task Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-blue outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Status *
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-blue outline-none"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="in-review">In Review</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
