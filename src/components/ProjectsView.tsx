import { DeliverableCard } from './DeliverableCard';

export function ProjectsView() {
  const deliverables = [
    {
      number: 0,
      title: 'Post-Purchase Activation Optimization',
      description: 'Improve product access flow after purchase',
      status: 'completed' as const,
      progress: 4,
      total: 4,
      tasks: [
        { completed: true, label: '[Step 1] Analytics — Purchase vs. First Session Conversion Dashboard' },
        { completed: true, label: '[Step 2] Frontend — Post-Purchase Redirect Page (Traffic Controller)' },
        { completed: true, label: '[Step 3] Full Stack — Query String Session Handover ("World Class" Auth)' },
        { completed: true, label: '[Step 4] Frontend — FAQ Accordion on Post-Purchase Page' },
      ],
    },
    {
      number: 1,
      title: 'Personalize OneSignal Flows',
      description: 'Integrate personalized email flows per user in OneSignal (9-Email Activation Journey)',
      status: 'at-risk' as const,
      progress: 1,
      total: 7,
      tasks: [
        { completed: true, label: '[Backend] Implementation of OneSignal Data Feed Endpoint (GET /user-feed)' },
        { completed: false, label: '[OneSignal] Email 1: Welcome + Onboarding Recap', status: 'UNASSIGNED' },
        { completed: false, label: '[OneSignal] Email 2: First Book Introduction', status: 'UNASSIGNED' },
        { completed: false, label: '[OneSignal] Email 3: Progress Check-in', status: 'UNASSIGNED' },
        { completed: false, label: '[OneSignal] Email 4: Unlock Next Book', status: 'UNASSIGNED' },
        { completed: false, label: '[OneSignal] Email 5: Weekly Goal Reminder', status: 'UNASSIGNED' },
        { completed: false, label: '[OneSignal] Email 6: Block Completion', status: 'UNASSIGNED' },
      ],
    },
    {
      number: 2,
      title: 'Reduce Churn from Content Discovery Failures',
      description: 'Reduce refunds where users report they couldn\'t find the content they expected (Meilisearch + Lastlink data)',
      status: 'in-progress' as const,
      progress: 0,
      total: 7,
      tasks: [
        { completed: false, label: 'Phase 1: Extract and analyze Lastlink refund data', status: 'in-review' },
        { completed: false, label: 'Phase 2: Build custom search logging — Backend endpoint + migration (~1 day)' },
        { completed: false, label: 'Phase 2: Build custom search logging — Mobile app instrumentation (~1 day)' },
        { completed: false, label: 'Phase 2: Build Metabase search analytics dashboard (~0.5 day)' },
        { completed: false, label: 'Phase 2: Classify zero-result queries and cross-reference with refund data' },
        { completed: false, label: 'Phase 3: Configure Meilisearch synonyms and ranking rules' },
        { completed: false, label: 'Phase 3: Improve zero-results UX and create Content Gap Report' },
      ],
    },
    {
      number: 3,
      title: 'AI Discovery Concierge',
      description: 'AI chat for contextual microbook suggestions',
      status: 'empty' as const,
      progress: 0,
      total: 0,
      tasks: [],
    },
  ];

  const competingWork = [
    { title: 'Implement Tenjin S2S Purchase Tracking', status: 'in-review', done: false },
    { title: '[SEO TECH] Launch 404s Fixes on 30k Pages', status: 'in-review', done: false },
    { title: '[Other] Implement the book content elements (SEO)', status: 'in-review', done: false },
    { title: 'Write Macroplan for AI-First Engineering Culture', status: 'in-progress', done: false },
    { title: 'Setup Metabase notification for Retention numbers', status: 'to-do', done: false },
    { title: '[REQUEST] Implement Facebook Data Deletion Callback', status: 'to-do', done: false },
    { title: '[BUG] [URGENTE] Tela branca de loading — Android & iOS', status: 'done', done: true },
    { title: 'Bug Report — Subscription stuck on "Trial" (x2)', status: 'done', done: true },
    { title: 'Add \'lessons\' field to /api/v1/website/books/:slug endpoint', status: 'done', done: true },
  ];

  const risks = [
    {
      level: 'HIGH',
      title: 'Deliverables 2 and 3 at 0% execution in week 6 of 7',
      description: 'Search Engine has 7 "To Do" tasks and AI Concierge has no tasks created at all. With only 1 week remaining + Carnival buffer, delivering everything on the original timeline is unlikely.',
      mitigation: 'Action: Reprioritize immediately. Decide what is feasible to deliver by end of Q1 and communicate to the team.',
    },
    {
      level: 'HIGH',
      title: '6 email templates with no assignee in OneSignal',
      description: 'The backend is ready (endpoint /user-feed complete), but the 6 emails in the activation journey (Welcome, First Book, Progress, etc.) have no designated owner.',
      mitigation: 'Action: Define who will create the templates (Abras? Marketing? You?) and assign the tasks in ClickUp.',
    },
    {
      level: 'MEDIUM',
      title: 'Parallel work overload',
      description: '5 active tasks (urgent bugs, SEO, Tenjin, macroplan) are competing for your time. This explains why the main project deliverables have not progressed.',
      mitigation: 'Action: Negotiate with leadership on real priorities. If bugs are more urgent, adjust the project timeline accordingly.',
    },
    {
      level: 'MEDIUM',
      title: 'Spreadsheet and Kickoff slide are outdated',
      description: 'The spreadsheet shows 71% progress while ClickUp shows 28%. There needs to be a single source of truth.',
      mitigation: 'Action: Define ClickUp as the single source of truth. Update the spreadsheet and slide to reflect reality.',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-review':
        return 'bg-blue-bg text-blue';
      case 'in-progress':
        return 'bg-yellow-bg text-yellow';
      case 'done':
        return 'bg-green-bg text-green';
      default:
        return 'bg-gray-bg text-gray';
    }
  };

  return (
    <div className="space-y-6">
      {/* Deliverables Section */}
      <section>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          Real Deliverable Status
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#7c3aed] text-white">
            ClickUp
          </span>
        </h2>
        <div className="space-y-3">
          {deliverables.map((deliverable) => (
            <DeliverableCard key={deliverable.number} {...deliverable} />
          ))}
        </div>
      </section>

      {/* Competing Work Section */}
      <section>
        <h2 className="text-lg font-bold mb-4">Parallel Work Competing for Your Attention</h2>
        <div className="bg-orange-bg border border-[#fdba74] rounded-xl p-4">
          <h4 className="text-sm font-semibold text-orange mb-2">
            Active tasks consuming time from the main project (4/9 done)
          </h4>
          <div className="space-y-0">
            {competingWork.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-1.5 border-b border-[#fed7aa] last:border-b-0 text-[13px]"
              >
                <span className={item.done ? 'line-through text-gray' : ''}>
                  {item.title}
                </span>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-xl ${getStatusColor(item.status)}`}
                >
                  {item.status === 'in-review' ? 'In Review' :
                   item.status === 'in-progress' ? 'In Progress' :
                   item.status === 'done' ? 'Done' : 'To Do'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Risks Section */}
      <section>
        <h2 className="text-lg font-bold mb-4">Identified Risks</h2>
        <div className="space-y-2">
          {risks.map((risk, index) => (
            <div key={index} className="bg-[#fef2f2] border border-[#fca5a5] rounded-xl p-4">
              <div className="text-sm font-semibold text-[#991b1b] mb-1">
                {risk.level}: {risk.title}
              </div>
              <div className="text-[13px] text-[#7f1d1d] mb-2">{risk.description}</div>
              <div className="text-xs text-gray italic">{risk.mitigation}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Suggested Action Plan */}
      <section>
        <h2 className="text-lg font-bold mb-4">Suggested Action Plan</h2>
        <div className="space-y-3">
          <div className="bg-white border-l-4 border-l-red rounded-r-xl p-4 shadow-sm">
            <h4 className="text-sm font-semibold mb-1">
              1. URGENT: Have a reprioritization conversation with leadership
            </h4>
            <p className="text-[13px] text-gray">
              You need to have an honest conversation about the real state of the project. The gap between what was planned and what was executed is significant, but there is a clear explanation (urgent bugs, side quests). The worst thing to do is leave this uncommunicated.
            </p>
          </div>
          <div className="bg-white border-l-4 border-l-red rounded-r-xl p-4 shadow-sm">
            <h4 className="text-sm font-semibold mb-1">
              2. URGENT: Decide on realistic Q1 scope
            </h4>
            <p className="text-[13px] text-gray">
              With 1 week + Carnival buffer remaining, propose: Deliverable 0 (done) + Deliverable 1 (finalize if Abras delivers templates) as Q1 deliveries. Deliverables 2 and 3 need a new timeline (Q2?).
            </p>
          </div>
          <div className="bg-white border-l-4 border-l-blue rounded-r-xl p-4 shadow-sm">
            <h4 className="text-sm font-semibold mb-1">
              3. Assign the 6 email templates in ClickUp
            </h4>
            <p className="text-[13px] text-gray">
              These are the closest quick wins. The backend is already ready. If the templates are created, Deliverable 1 can be completed quickly.
            </p>
          </div>
          <div className="bg-white border-l-4 border-l-blue rounded-r-xl p-4 shadow-sm">
            <h4 className="text-sm font-semibold mb-1">
              4. Define ClickUp as the single source of truth
            </h4>
            <p className="text-[13px] text-gray">
              Stop updating the spreadsheet. ClickUp already has the right lists. Update statuses there and use ClickUp as the source for any report.
            </p>
          </div>
          <div className="bg-white border-l-4 border-l-blue rounded-r-xl p-4 shadow-sm">
            <h4 className="text-sm font-semibold mb-1">
              5. Start recording Book Start Rate weekly
            </h4>
            <p className="text-[13px] text-gray">
              Access Metabase (data.12min.com/question/227) every Friday and log the value. Without this metric, there is no way to know whether Deliverable 0's outputs are already generating impact.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
