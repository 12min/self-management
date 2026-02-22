interface PlanTask {
  title: string;
  status: 'complete' | 'in-progress' | 'in-review' | 'to-do';
  url?: string;
  note?: string;
}

interface PlanSection {
  title: string;
  priority: 1 | 2 | 3;
  description: string;
  tasks: PlanTask[];
}

const STATUS_STYLES: Record<PlanTask['status'], { label: string; bg: string; text: string }> = {
  'complete':    { label: '✅ Complete',    bg: 'bg-green-bg',  text: 'text-green' },
  'in-progress': { label: '🔄 In Progress', bg: 'bg-blue-bg',   text: 'text-blue' },
  'in-review':   { label: '👁 In Review',   bg: 'bg-orange-bg', text: 'text-orange' },
  'to-do':       { label: '⬜ To Do',       bg: 'bg-gray-bg',   text: 'text-gray' },
};

const SPRINT_TASKS: PlanTask[] = [
  { title: '[Bug] Login Modal Crash in Production', status: 'in-review', note: 'Aguardando aprovação — empurrar ativamente', url: 'https://app.clickup.com/t/86afac3dp' },
  { title: '[SEO TECH] Canonical Pages Issue Fix', status: 'in-review', note: 'Co-responsável c/ Emir', url: 'https://app.clickup.com/t/86afb1tne' },
  { title: '[Side Quest] Investigar Erros Críticos de Personalized Plan no Sentry', status: 'in-progress', url: 'https://app.clickup.com/t/86afa7zvp' },
  { title: '[Side Quest] Add Quarterly-Gold Plan Mapping (Billing)', status: 'in-progress', url: 'https://app.clickup.com/t/86afba08v' },
  { title: 'Write Macroplan for AI-First Engineering Culture', status: 'in-progress', url: 'https://app.clickup.com/t/86af7maye' },
  { title: '[REQUEST] Implement Facebook Data Deletion Callback', status: 'to-do', note: 'Sem urgência imediata', url: 'https://app.clickup.com/t/86af9v97p' },
];

const SPRINT_DONE: PlanTask[] = [
  { title: 'Implement Tenjin S2S Purchase Tracking', status: 'complete', url: 'https://app.clickup.com/t/86af1b3ba' },
  { title: '🐛 Investigar crash do Facebook Login no Mobile', status: 'complete', url: 'https://app.clickup.com/t/86afaadnf' },
  { title: "Add 'lessons' field to /api/v1/website/books/:slug", status: 'complete', url: 'https://app.clickup.com/t/86af9xkng' },
  { title: 'Phase 1: Extract and analyze Lastlink refund data', status: 'complete', url: 'https://app.clickup.com/t/86af072cg' },
  { title: '[SEO TECH] Launch the 404s Fixes on 30k Pages', status: 'complete', url: 'https://app.clickup.com/t/86af04vwz' },
  { title: '[Other] Implement the book content elements (SEO)', status: 'complete', url: 'https://app.clickup.com/t/86af9tmbg' },
];

const SIDE_QUESTS: PlanTask[] = [
  { title: 'Upload updated book covers', status: 'complete', url: 'https://app.clickup.com/t/86afbknn6' },
  { title: 'Add Quarterly-Gold Plan Mapping (Billing)', status: 'in-progress', url: 'https://app.clickup.com/t/86afba08v' },
  { title: '[SEO TECH] Canonical Pages Issue Fix', status: 'in-review', url: 'https://app.clickup.com/t/86afb1tne' },
  { title: 'Configurar limpeza automática de logs no Sentry', status: 'to-do', url: 'https://app.clickup.com/t/86afb44t6' },
  { title: 'Migrate admin controllers to JWT authentication', status: 'to-do', url: 'https://app.clickup.com/t/86afe7z6z' },
];

const ACTION_PLAN: PlanSection[] = [
  {
    priority: 1,
    title: 'Destravar Reviews',
    description: 'Tasks que dependem de outra pessoa para avançar. Ação ativa necessária.',
    tasks: [
      { title: 'Confirmar validação do Login Modal Crash', status: 'in-review', note: 'Se ninguém revisou, escalar agora' },
      { title: 'Canonical Pages — confirmar com Emir se precisa de algo', status: 'in-review' },
    ],
  },
  {
    priority: 2,
    title: 'Fechar 1 In Progress Hoje',
    description: 'Você tem 3 tasks em paralelo. Escolha UMA para concluir hoje.',
    tasks: [
      { title: 'Personalized Plan Sentry errors', status: 'in-progress', note: '~2h de investigação focada' },
      { title: 'Macroplan AI-First', status: 'in-progress', note: 'Escrita — pode fazer em qualquer contexto' },
    ],
  },
  {
    priority: 3,
    title: 'Side Quest Backlog',
    description: 'Itens acumulando — endereçar esta semana.',
    tasks: [
      { title: 'Sentry cleanup automático', status: 'to-do', note: 'Dívida técnica crescendo' },
      { title: 'JWT migration admin controllers', status: 'to-do', note: 'Próxima sprint' },
    ],
  },
];

function StatusBadge({ status }: { status: PlanTask['status'] }) {
  const s = STATUS_STYLES[status];
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.bg} ${s.text}`}>
      {s.label}
    </span>
  );
}

function TaskRow({ task }: { task: PlanTask }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-border last:border-0">
      <div className="flex-1 min-w-0">
        {task.url ? (
          <a
            href={task.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-dark hover:text-blue transition-colors line-clamp-2"
          >
            {task.title}
          </a>
        ) : (
          <span className="text-sm text-dark">{task.title}</span>
        )}
        {task.note && (
          <p className="text-xs text-gray mt-0.5">{task.note}</p>
        )}
      </div>
      <StatusBadge status={task.status} />
    </div>
  );
}

function SectionCard({ children, title, className = '' }: { children: React.ReactNode; title: string; className?: string }) {
  return (
    <div className={`bg-white rounded-xl border border-border p-5 ${className}`}>
      <h3 className="text-sm font-semibold text-gray uppercase tracking-wider mb-3">{title}</h3>
      {children}
    </div>
  );
}

export function FocusPlanView() {
  const completionRate = Math.round((SPRINT_DONE.length / (SPRINT_DONE.length + SPRINT_TASKS.filter(t => t.status !== 'complete').length)) * 100);
  const sideQuestsDone = SIDE_QUESTS.filter(t => t.status === 'complete').length;
  const inProgress = SPRINT_TASKS.filter(t => t.status === 'in-progress').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-border p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-dark">Plano de Foco — Sprint 2026-02-09</h2>
            <p className="text-gray text-sm mt-1">Gerado em 18 Feb 2026 • Dados do ClickUp</p>
          </div>
          <div className="flex gap-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-green">{completionRate}%</div>
              <div className="text-xs text-gray">Entrega sprint</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange">{inProgress}</div>
              <div className="text-xs text-gray">WIP ativo</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue">{sideQuestsDone}/{SIDE_QUESTS.length}</div>
              <div className="text-xs text-gray">Side quests</div>
            </div>
          </div>
        </div>

        {/* WIP Warning */}
        {inProgress > 2 && (
          <div className="mt-4 bg-orange-bg border border-orange rounded-lg px-4 py-3 text-sm text-orange">
            ⚠️ <strong>WIP alto:</strong> {inProgress} tasks em progresso simultâneo. Ideal é máximo 2-3. Feche uma antes de começar outra.
          </div>
        )}
      </div>

      {/* Action Plan */}
      <div>
        <h3 className="text-base font-semibold text-dark mb-3">🎯 Plano de Ação</h3>
        <div className="space-y-3">
          {ACTION_PLAN.map((section) => (
            <div key={section.title} className="bg-white rounded-xl border border-border overflow-hidden">
              <div className={`px-5 py-3 border-b border-border flex items-center gap-3 ${
                section.priority === 1 ? 'bg-red-bg' :
                section.priority === 2 ? 'bg-blue-bg' : 'bg-gray-bg'
              }`}>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  section.priority === 1 ? 'bg-red text-white' :
                  section.priority === 2 ? 'bg-blue text-white' : 'bg-gray text-white'
                }`}>
                  P{section.priority}
                </span>
                <div>
                  <div className="font-semibold text-dark text-sm">{section.title}</div>
                  <div className="text-xs text-gray">{section.description}</div>
                </div>
              </div>
              <div className="px-5">
                {section.tasks.map((task) => (
                  <TaskRow key={task.title} task={task} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sprint grid */}
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Sprint Atual — Em Andamento / Pendente">
          {SPRINT_TASKS.map((task) => (
            <TaskRow key={task.title} task={task} />
          ))}
        </SectionCard>

        <SectionCard title="Sprint Atual — Concluídas ✅">
          {SPRINT_DONE.map((task) => (
            <TaskRow key={task.title} task={task} />
          ))}
        </SectionCard>
      </div>

      {/* Side Quests */}
      <SectionCard title="Side Quests — Status">
        <div className="grid grid-cols-1 gap-0">
          {SIDE_QUESTS.map((task) => (
            <TaskRow key={task.title} task={task} />
          ))}
        </div>
      </SectionCard>

      {/* Performance Metrics */}
      <SectionCard title="Como Metrificar Sua Performance">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-bg rounded-lg p-4">
            <div className="text-xs text-gray uppercase font-semibold mb-1">Taxa de Conclusão</div>
            <div className="text-xl font-bold text-dark">{completionRate}%</div>
            <div className="text-xs text-gray mt-1">Concluídas ÷ total atribuídas</div>
          </div>
          <div className="bg-gray-bg rounded-lg p-4">
            <div className="text-xs text-gray uppercase font-semibold mb-1">WIP Atual</div>
            <div className={`text-xl font-bold ${inProgress > 3 ? 'text-red' : 'text-green'}`}>{inProgress}</div>
            <div className="text-xs text-gray mt-1">Meta: máx. 2-3 simultâneas</div>
          </div>
          <div className="bg-gray-bg rounded-lg p-4">
            <div className="text-xs text-gray uppercase font-semibold mb-1">Side Quest Load</div>
            <div className="text-xl font-bold text-orange">{SIDE_QUESTS.filter(t => t.status !== 'complete').length}</div>
            <div className="text-xs text-gray mt-1">Abertas acumuladas</div>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray border-t border-border pt-4 space-y-1">
          <p>• Se &gt;30% das tasks/sprint são side quests não planejadas → problema sistêmico, vale conversa com o time</p>
          <p>• Ao final de cada sprint: anote tasks entregues, carregadas, e quantas side quests vieram de fora</p>
        </div>
      </SectionCard>

      {/* Resumo Executivo — Plano */}
      <div className="bg-white rounded-xl border border-border p-5">
        <h3 className="text-sm font-semibold text-gray uppercase tracking-wider mb-3">📋 Plano da Semana</h3>
        <div className="grid grid-cols-4 gap-3">
          {[
            { period: 'Hoje', action: 'Destravar reviews → Fechar 1 in-progress', color: 'border-red' },
            { period: 'Amanhã', action: 'Facebook Data Deletion Callback', color: 'border-blue' },
            { period: 'Esta semana', action: 'Sentry cleanup (side quest)', color: 'border-orange' },
            { period: 'Próxima sprint', action: 'JWT migration admin controllers', color: 'border-gray' },
          ].map(({ period, action, color }) => (
            <div key={period} className={`border-l-4 ${color} pl-3 py-1`}>
              <div className="text-xs text-gray font-semibold uppercase">{period}</div>
              <div className="text-sm text-dark mt-0.5">{action}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
