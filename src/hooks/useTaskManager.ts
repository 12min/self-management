import { useState, useEffect, useCallback } from 'react';
import type { DashboardState, Task } from '../types';

const API_URL = 'http://localhost:4000/api/tasks';

const defaultState: DashboardState = {
  yesterday: [],
  today: []
};

export function useTaskManager() {
  const [state, setState] = useState<DashboardState>(defaultState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load tasks from server on mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setState(data);
      setError(null);
    } catch (err) {
      console.error('Error loading tasks:', err);
      setError('Failed to load tasks from server');
    } finally {
      setLoading(false);
    }
  };

  // Save tasks to server
  const saveTasks = async (newState: DashboardState) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newState),
      });

      if (!response.ok) {
        throw new Error('Failed to save tasks');
      }

      setError(null);
    } catch (err) {
      console.error('Error saving tasks:', err);
      setError('Failed to save tasks to server');
    }
  };

  const moveTask = useCallback((taskId: string, from: 'yesterday' | 'today', to: 'yesterday' | 'today') => {
    setState((prev) => {
      const taskIndex = prev[from].findIndex(task => task.id === taskId);
      if (taskIndex === -1) return prev;

      const task = prev[from][taskIndex];
      const newState = { ...prev };
      newState[from] = prev[from].filter((_, i) => i !== taskIndex);
      newState[to] = [...prev[to], task];

      // Save to server
      saveTasks(newState);

      return newState;
    });
  }, []);

  const removeTask = useCallback((taskId: string, zone: 'yesterday' | 'today') => {
    setState((prev) => {
      const newState = {
        ...prev,
        [zone]: prev[zone].filter(task => task.id !== taskId)
      };

      // Save to server
      saveTasks(newState);

      return newState;
    });
  }, []);

  const updateTask = useCallback((taskId: string, zone: 'yesterday' | 'today', updates: Partial<Task>) => {
    setState((prev) => {
      const newState = {
        ...prev,
        [zone]: prev[zone].map(task =>
          task.id === taskId ? { ...task, ...updates } : task
        )
      };

      // Save to server
      saveTasks(newState);

      return newState;
    });
  }, []);

  const addTask = useCallback((task: Task, zone: 'yesterday' | 'today') => {
    setState((prev) => {
      const newState = {
        ...prev,
        [zone]: [...prev[zone], task]
      };

      // Save to server
      saveTasks(newState);

      return newState;
    });
  }, []);

  const clearZone = useCallback((zone: 'yesterday' | 'today') => {
    setState((prev) => {
      const newState = {
        ...prev,
        [zone]: []
      };

      // Save to server
      saveTasks(newState);

      return newState;
    });
  }, []);

  const resetToDefault = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:4000/api/tasks/reset', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to reset tasks');
      }

      const data = await response.json();
      setState(data.tasks);
      setError(null);
    } catch (err) {
      console.error('Error resetting tasks:', err);
      setError('Failed to reset tasks');
    }
  }, []);

  return {
    state,
    loading,
    error,
    moveTask,
    removeTask,
    updateTask,
    addTask,
    clearZone,
    resetToDefault,
  };
}
