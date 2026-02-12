import { useState, useEffect, useCallback } from 'react';
import type { DashboardState, Task } from '../types';

const STORAGE_KEY = 'dashboard-tasks-state';

const defaultState: DashboardState = {
  yesterday: [
    {
      id: '86af1b3ba',
      title: 'Implement Tenjin S2S Purchase Tracking — Analyse values coming in Tenjin',
      status: 'done',
      statusColor: 'green',
      url: 'https://app.clickup.com/t/86af1b3ba'
    },
    {
      id: '86af04vwz',
      title: '[SEO TECH] Launch the 404s Fixes on 30k Pages (SP 02/02/26)',
      status: 'in-review',
      statusColor: 'blue',
      url: 'https://app.clickup.com/t/86af04vwz'
    },
    {
      id: '86afba1tb',
      title: '[Side Quest] Adicionar Mapeamento do Plano "Quarterly-Gold" no Billing Service',
      status: 'in-review',
      statusColor: 'blue',
      url: 'https://app.clickup.com/t/86afba1tb'
    }
  ],
  today: [
    {
      id: '86afa7zvph',
      title: '[Side Quest] Implement retry mechanism with exponential backoff for personalized plan sync endpoints (PR #1233, #1234)',
      status: 'in-review',
      statusColor: 'blue',
      url: 'https://app.clickup.com/t/86afa7zvph'
    },
    {
      id: '86afbknn6',
      title: '[Side Quest] Upload updated book covers',
      status: 'in-progress',
      statusColor: 'yellow',
      url: 'https://app.clickup.com/t/86afbknn6'
    },
    {
      id: '86afac3dp',
      title: '[Side Quest] Fix React Error #525 in LoginModal - added DialogTitle/DialogDescription for accessibility (PR #76)',
      status: 'in-progress',
      statusColor: 'yellow',
      url: 'https://app.clickup.com/t/86afac3dp'
    },
    {
      id: 'tenjin-tracking',
      title: '[Side Quest] Implement Tenjin S2S Purchase Tracking — Analyse values coming in Tenjin',
      status: 'in-progress',
      statusColor: 'yellow',
      url: null
    }
  ]
};

export function useTaskManager() {
  const [state, setState] = useState<DashboardState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved state:', e);
        return defaultState;
      }
    }
    return defaultState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const moveTask = useCallback((taskId: string, from: 'yesterday' | 'today', to: 'yesterday' | 'today') => {
    setState((prev) => {
      const taskIndex = prev[from].findIndex(task => task.id === taskId);
      if (taskIndex === -1) return prev;

      const task = prev[from][taskIndex];
      const newState = { ...prev };
      newState[from] = prev[from].filter((_, i) => i !== taskIndex);
      newState[to] = [...prev[to], task];

      return newState;
    });
  }, []);

  const removeTask = useCallback((taskId: string, zone: 'yesterday' | 'today') => {
    setState((prev) => ({
      ...prev,
      [zone]: prev[zone].filter(task => task.id !== taskId)
    }));
  }, []);

  const updateTask = useCallback((taskId: string, zone: 'yesterday' | 'today', updates: Partial<Task>) => {
    setState((prev) => ({
      ...prev,
      [zone]: prev[zone].map(task =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    }));
  }, []);

  const addTask = useCallback((task: Task, zone: 'yesterday' | 'today') => {
    setState((prev) => ({
      ...prev,
      [zone]: [...prev[zone], task]
    }));
  }, []);

  const clearZone = useCallback((zone: 'yesterday' | 'today') => {
    setState((prev) => ({
      ...prev,
      [zone]: []
    }));
  }, []);

  const resetToDefault = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState(defaultState);
  }, []);

  return {
    state,
    moveTask,
    removeTask,
    updateTask,
    addTask,
    clearZone,
    resetToDefault
  };
}
