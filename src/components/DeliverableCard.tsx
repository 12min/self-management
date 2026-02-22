interface Task {
  completed: boolean;
  label: string;
  status?: string;
}

interface DeliverableCardProps {
  number: number;
  title: string;
  description: string;
  status: 'completed' | 'at-risk' | 'in-progress' | 'empty';
  progress: number;
  total: number;
  tasks: Task[];
}

const statusConfig = {
  completed: {
    badge: 'Completed',
    badgeClass: 'bg-green-bg text-green',
    border: 'border-l-green',
    progressColor: 'bg-green',
  },
  'at-risk': {
    badge: 'At Risk',
    badgeClass: 'bg-yellow-bg text-yellow',
    border: 'border-l-yellow',
    progressColor: 'bg-yellow',
  },
  'in-progress': {
    badge: 'In Progress',
    badgeClass: 'bg-yellow-bg text-yellow',
    border: 'border-l-yellow',
    progressColor: 'bg-yellow',
  },
  empty: {
    badge: 'Empty list',
    badgeClass: 'bg-gray-bg text-gray',
    border: 'border-l-red',
    progressColor: 'bg-red',
  },
};

export function DeliverableCard({
  number,
  title,
  description,
  status,
  progress,
  total,
  tasks,
}: DeliverableCardProps) {
  const config = statusConfig[status];
  const percentage = total > 0 ? (progress / total) * 100 : 0;

  return (
    <div className={`bg-white rounded-xl p-5 border border-border shadow-sm ${config.border} border-l-4 mb-3`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-3 gap-3">
        <div>
          <h3 className="text-[15px] font-semibold">
            Deliverable {number}: {title}
          </h3>
          <div className="text-[13px] text-gray mt-1">{description}</div>
        </div>
        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${config.badgeClass}`}>
          {config.badge}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 bg-gray-bg rounded-md h-2 overflow-hidden">
          <div
            className={`h-full rounded-md ${config.progressColor}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-xs font-semibold text-gray min-w-[40px]">
          {progress}/{total}
        </span>
      </div>

      {/* Tasks List */}
      {status === 'empty' ? (
        <p className="text-[13px] text-red py-2">
          No tasks have been created in this ClickUp list. The deliverable exists as a list but is completely empty.
        </p>
      ) : (
        <ul className="space-y-0">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="text-[13px] py-1.5 border-b border-gray-bg last:border-b-0 flex items-start gap-2"
            >
              <span className={`font-bold ${task.completed ? 'text-green' : task.status === 'in-review' ? 'text-blue' : 'text-red'}`}>
                {task.completed ? '✓' : task.status === 'in-review' ? '✎' : '■'}
              </span>
              <span className="flex-1">
                {task.label}
                {task.status && (
                  <span className={`ml-2 text-[11px] font-semibold ${
                    task.status === 'in-review' ? 'text-blue' : 'text-red'
                  }`}>
                    {task.status === 'in-review' ? 'IN REVIEW' : task.status}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
