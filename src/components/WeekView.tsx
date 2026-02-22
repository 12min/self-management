interface FocusTask {
  title: string;
  status: 'in-progress' | 'in-review' | 'complete' | 'to-do';
  url?: string;
  tags?: string[];
}

const TODAY_FOCUS: FocusTask[] = [
  {
    title: '[Side Quest] Add Quarterly-Gold Plan Mapping in Billing Service',
    status: 'in-progress',
    url: 'https://app.clickup.com/t/86afba08v',
    tags: ['backend', 'billing'],
  },
  {
    title: '[Side Quest] Investigar Erros Críticos de Personalized Plan no Sentry',
    status: 'in-progress',
    url: 'https://app.clickup.com/t/86afa7zvp',
    tags: ['n8n', 'performance'],
  },
  {
    title: 'Migrate Google Play to subscriptionsv2 API (v12 SKUs)',
    status: 'in-review',
    url: 'https://app.clickup.com/t/86afba1tb',
    tags: ['side quest'],
  },
];

function FocusCard() {
  return (
    <div className="bg-white rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray uppercase tracking-wider">
          🎯 Foco do Dia — 19 Fev 2026
        </h3>
        <span className="text-xs bg-blue-bg text-blue px-2 py-0.5 rounded-full font-medium">
          {TODAY_FOCUS.filter(t => t.status === 'in-progress').length} em progresso · {TODAY_FOCUS.filter(t => t.status === 'in-review').length} in review
        </span>
      </div>
      <div className="space-y-2">
        {TODAY_FOCUS.map((task) => (
          <div key={task.title} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
            <span className="text-base">{task.status === 'in-review' ? '👁' : task.status === 'complete' ? '✅' : '🔄'}</span>
            <div className="flex-1 min-w-0">
              {task.url ? (
                <a
                  href={task.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-dark hover:text-blue transition-colors"
                >
                  {task.title}
                </a>
              ) : (
                <span className="text-sm text-dark">{task.title}</span>
              )}
              {task.tags && (
                <div className="flex gap-1 mt-1">
                  {task.tags.map(tag => (
                    <span key={tag} className="text-xs bg-gray-bg text-gray px-1.5 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${
              task.status === 'in-review' ? 'bg-orange-bg text-orange' :
              task.status === 'complete' ? 'bg-green-bg text-green' :
              'bg-blue-bg text-blue'
            }`}>
              {task.status === 'in-review' ? 'In Review' : task.status === 'complete' ? 'Completo' : 'Em Progresso'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface CompletedTask {
  date: string;
  title: string;
  url: string;
  category: 'bug' | 'suporte' | 'dev' | 'side-quest';
}

const WEEK_COMPLETED: CompletedTask[] = [
  { date: '18/02 15:11', title: '[Suporte] Corrigir e-mail — nodivam@hotmail.com', url: '', category: 'suporte' },
  { date: '18/02 15:11', title: '[Bug] Áudio não inicia no microbook Inteligência Positiva', url: '', category: 'bug' },
  { date: '18/02 15:13', title: '[Suporte] Assinatura Google Play não refletida (caso 1)', url: '', category: 'suporte' },
  { date: '18/02 15:14', title: '[Suporte] Assinatura Google Play não refletida (caso 2)', url: '', category: 'suporte' },
  { date: '18/02 15:27', title: '[Suporte] Assinatura Google Play não refletida (caso 3)', url: '', category: 'suporte' },
  { date: '18/02 17:59', title: '[Bug] Pagamento via Lastlink não refletido na conta', url: '', category: 'bug' },
  { date: '19/02 08:16', title: '[Bug] Botão "Entrar" não realiza login no site web.12min.com', url: 'https://app.clickup.com/t/86aff0mxy', category: 'bug' },
  { date: '20/02 08:35', title: '[Suporte] Assinatura Lastlink ativa, app exibe como pausada', url: '', category: 'suporte' },
  { date: '20/02 08:35', title: '[Suporte] Conta bloqueada apesar de assinatura ativa', url: '', category: 'suporte' },
  { date: '20/02 08:36', title: '[Suporte] Exclusão total de contas (LGPD)', url: '', category: 'suporte' },
  { date: '20/02', title: 'Finalizar skill /lgpd-delete-user — sistemas externos faltantes', url: 'https://app.clickup.com/t/86afj4x12', category: 'dev' },
];

const CATEGORY_STYLE: Record<CompletedTask['category'], { label: string; bg: string; text: string }> = {
  bug:        { label: 'Bug',        bg: 'bg-red-bg',    text: 'text-red' },
  suporte:    { label: 'Suporte',    bg: 'bg-blue-bg',   text: 'text-blue' },
  dev:        { label: 'Dev',        bg: 'bg-green-bg',  text: 'text-green' },
  'side-quest': { label: 'Side Quest', bg: 'bg-orange-bg', text: 'text-orange' },
};

function WeekCompletedCard() {
  const bugs    = WEEK_COMPLETED.filter(t => t.category === 'bug').length;
  const suporte = WEEK_COMPLETED.filter(t => t.category === 'suporte').length;
  const dev     = WEEK_COMPLETED.filter(t => t.category === 'dev').length;

  return (
    <div className="bg-white rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray uppercase tracking-wider">
          ✅ Concluídas na Semana — 16–20 Fev 2026
        </h3>
        <div className="flex gap-3 text-center">
          <div><span className="text-lg font-bold text-dark">{WEEK_COMPLETED.length}</span><div className="text-xs text-gray">total</div></div>
          <div><span className="text-lg font-bold text-red">{bugs}</span><div className="text-xs text-gray">bugs</div></div>
          <div><span className="text-lg font-bold text-blue">{suporte}</span><div className="text-xs text-gray">suporte</div></div>
          <div><span className="text-lg font-bold text-green">{dev}</span><div className="text-xs text-gray">dev</div></div>
        </div>
      </div>
      <div className="space-y-0">
        {WEEK_COMPLETED.map((task, i) => {
          const style = CATEGORY_STYLE[task.category];
          return (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
              <span className="text-xs text-gray w-20 shrink-0">{task.date}</span>
              <div className="flex-1 min-w-0">
                {task.url ? (
                  <a href={task.url} target="_blank" rel="noopener noreferrer"
                    className="text-sm text-dark hover:text-blue transition-colors">
                    {task.title}
                  </a>
                ) : (
                  <span className="text-sm text-dark">{task.title}</span>
                )}
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${style.bg} ${style.text}`}>
                {style.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface DaySummary {
  label: string;
  date: string;
  total: number;
  completed: number;
  comments: number;
  resolved: string[];
  open: string[];
  categories: { label: string; count: number; color: string; bar: string }[];
  dimmed?: boolean;
}

const DAYS: DaySummary[] = [
  {
    label: 'Hoje',
    date: '19 Fev 2026',
    total: 2,
    completed: 1,
    comments: 1,
    resolved: ['08:16 — Bug botão "Entrar" no site web.12min.com — fechado'],
    open: ['11:07 — LGPD delete user skill em andamento (issue #1260 no GitHub)'],
    categories: [
      { label: 'Bugs', count: 1, color: 'text-red', bar: 'bg-red' },
      { label: 'Suporte', count: 0, color: 'text-blue', bar: 'bg-blue' },
      { label: 'Conteúdo', count: 0, color: 'text-orange', bar: 'bg-orange' },
      { label: 'Dev', count: 1, color: 'text-green', bar: 'bg-green' },
    ],
  },
  {
    label: 'Ontem',
    date: '18 Fev 2026',
    total: 15,
    completed: 6,
    comments: 9,
    resolved: [
      'Bug de loop de onboarding (root cause + fix aplicado)',
      '3 casos de assinatura Google Play não refletida',
      'Correção de e-mail — nodivam@hotmail.com',
      'Bug de áudio no microbook Inteligência Positiva',
      'Contenção: 47 livros sem áudio ocultados',
      'Bug botão "Entrar" no site web.12min.com (fix deployado)',
      'Pagamento via Lastlink não refletido — caso resolvido',
    ],
    open: [
      'Cobrança 10R$ sem registro — inconclusivo (sem evidência)',
      'Migrate Google Play subscriptionsv2 — apenas linkado',
    ],
    categories: [
      { label: 'Bugs', count: 8, color: 'text-red', bar: 'bg-red' },
      { label: 'Suporte', count: 6, color: 'text-blue', bar: 'bg-blue' },
      { label: 'Conteúdo', count: 2, color: 'text-orange', bar: 'bg-orange' },
      { label: 'Dev', count: 1, color: 'text-green', bar: 'bg-green' },
    ],
    dimmed: true,
  },
];

function DayCard({ day }: { day: DaySummary }) {
  const maxCount = Math.max(...day.categories.map(c => c.count), 1);

  return (
    <div className={`bg-white rounded-xl border border-border p-5 ${day.dimmed ? 'opacity-75' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray uppercase tracking-wider">
          📅 {day.label} — {day.date}
        </h3>
        <div className="flex gap-4 text-center">
          <div><span className="text-lg font-bold text-dark">{day.total}</span><div className="text-xs text-gray">interações</div></div>
          <div><span className="text-lg font-bold text-green">{day.completed}</span><div className="text-xs text-gray">concluídas</div></div>
          <div><span className="text-lg font-bold text-blue">{day.comments}</span><div className="text-xs text-gray">comentários</div></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-green-bg rounded-lg p-4">
          <div className="text-xs font-semibold text-green uppercase mb-2">✅ Resolvido</div>
          <ul className="space-y-1 text-sm text-dark">
            {day.resolved.map((item, i) => <li key={i}>• {item}</li>)}
          </ul>
        </div>
        <div className="bg-orange-bg rounded-lg p-4">
          <div className="text-xs font-semibold text-orange uppercase mb-2">⚠️ Em Aberto</div>
          <ul className="space-y-1 text-sm text-dark">
            {day.open.map((item, i) => <li key={i}>• {item}</li>)}
          </ul>
        </div>
      </div>

      <div className="border-t border-border pt-4">
        <div className="text-xs font-semibold text-gray uppercase mb-3">Interações por categoria</div>
        <div className="grid grid-cols-4 gap-3">
          {day.categories.map(({ label, count, color, bar }) => (
            <div key={label} className="bg-gray-bg rounded-lg p-3">
              <div className={`text-2xl font-bold ${color}`}>{count}</div>
              <div className="text-xs text-gray mt-0.5">{label}</div>
              <div className="mt-2 h-1 rounded-full bg-border overflow-hidden">
                <div className={`h-full rounded-full ${bar}`} style={{ width: `${(count / maxCount) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function WeekView() {
  return (
    <div className="space-y-4">
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-dark">Resumo da Semana</h2>
        <p className="text-gray text-sm mt-1">Semana de 16–22 Fev 2026 • Dados do ClickUp</p>
      </div>
      <div className="bg-white rounded-xl border border-border p-5">
        <h3 className="text-sm font-semibold text-gray uppercase tracking-wider mb-4">
          Week Highlights
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-bg rounded-lg p-4">
            <div className="text-xs font-semibold text-green uppercase mb-2">🌟 Highlight</div>
            <p className="text-sm text-dark">Discovered edge cases in payment-related endpoints and shipped targeted fixes, reducing the number of support tickets.</p>
          </div>
          <div className="bg-red-bg rounded-lg p-4">
            <div className="text-xs font-semibold text-red uppercase mb-2">📉 Lowlight</div>
            <p className="text-sm text-dark">Due to the high volume of open issues last week, I was unable to focus on KPI-driven work.</p>
          </div>
        </div>
      </div>
      <FocusCard />
      <WeekCompletedCard />
      {DAYS.map(day => (
        <DayCard key={day.date} day={day} />
      ))}
    </div>
  );
}
