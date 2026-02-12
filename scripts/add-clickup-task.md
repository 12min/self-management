# Add ClickUp Task via MCP

## Como usar este script

Este guia explica como adicionar tasks do ClickUp ao dashboard usando o MCP (Model Context Protocol).

### Opção 1: Usar o botão "Add Task" no dashboard (Recomendado)

1. Execute o dashboard:
   ```bash
   npm run dev
   ```

2. Clique no botão **"➕ Add Task"** na seção desejada (Yesterday ou Today)

3. No modal que aparecer:
   - Cole o link completo da task do ClickUp (ex: `https://app.clickup.com/t/86afba1tb`)
   - Digite o título da task
   - Selecione o status (To Do, In Progress, In Review, Done)
   - Clique em "Add Task"

4. A task será adicionada imediatamente e salva no localStorage!

### Opção 2: Adicionar ao estado padrão (via Claude Code)

Se você quiser adicionar uma task ao estado padrão do aplicativo (que aparece após reset):

1. Peça ao Claude Code para adicionar a task:
   ```
   Adicione a task https://app.clickup.com/t/TASK_ID nas atividades de [ontem/hoje]
   ```

2. O Claude Code irá:
   - Buscar as informações da task via MCP do ClickUp
   - Adicionar a task no arquivo `src/hooks/useTaskManager.ts`
   - Fazer commit da mudança

3. Reinicie o dashboard para ver a mudança

### Extração automática do Task ID

O dashboard extrai automaticamente o ID da task de URLs do ClickUp:
- ✅ `https://app.clickup.com/t/86afba1tb` → ID: `86afba1tb`
- ✅ `app.clickup.com/t/86afba1tb` → ID: `86afba1tb`
- ✅ `86afba1tb` → ID: `86afba1tb`

## Estrutura de uma Task

```typescript
{
  id: string;           // ID da task do ClickUp
  title: string;        // Título da task
  status: TaskStatus;   // 'done' | 'in-review' | 'in-progress' | 'todo'
  statusColor: StatusColor; // 'green' | 'blue' | 'yellow' | 'gray'
  url: string;          // URL completo da task no ClickUp
}
```

## Mapeamento de Status

- **Done** → Verde 🟢
- **In Review** → Azul 🔵
- **In Progress** → Amarelo 🟡
- **To Do** → Cinza ⚪

## Dicas

- Use o botão "Add Task" para adicionar tasks temporariamente (salvo no localStorage)
- Use o Claude Code para adicionar tasks permanentemente (salvo no código)
- Você pode editar qualquer task com duplo-clique no título
- Tasks podem ser arrastadas entre Yesterday e Today
- Use "🔄 Reset to Default" para restaurar o estado original (perde tasks adicionadas via botão)
