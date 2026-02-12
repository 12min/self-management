export type TaskStatus = 'done' | 'in-review' | 'in-progress' | 'todo';

export type StatusColor = 'green' | 'blue' | 'yellow' | 'red' | 'gray' | 'orange';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  statusColor: StatusColor;
  url?: string | null;
}

export interface DashboardState {
  yesterday: Task[];
  today: Task[];
}

export interface Deliverable {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'at-risk' | 'in-progress' | 'not-started' | 'empty';
  borderColor: 'green' | 'yellow' | 'red' | 'gray';
  progress: number;
  total: number;
  tasks: DeliverableTask[];
}

export interface DeliverableTask {
  id: string;
  title: string;
  status: 'done' | 'todo' | 'in-review';
  assignee?: string | null;
  completedDate?: string | null;
}

export interface Risk {
  id: string;
  title: string;
  description: string;
  mitigation: string;
  level: 'high' | 'medium' | 'low';
}

export interface CompetingWork {
  id: string;
  title: string;
  status: 'in-progress' | 'in-review' | 'todo' | 'done';
}
