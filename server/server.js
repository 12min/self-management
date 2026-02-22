import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 4000;
const TASKS_FILE = join(__dirname, 'data', 'tasks.json');

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to read tasks
async function readTasks() {
  try {
    const data = await fs.readFile(TASKS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading tasks:', error);
    return { yesterday: [], today: [] };
  }
}

// Helper function to write tasks
async function writeTasks(tasks) {
  try {
    await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing tasks:', error);
    return false;
  }
}

// Routes

// GET /api/tasks - Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await readTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read tasks' });
  }
});

// POST /api/tasks - Update all tasks
app.post('/api/tasks', async (req, res) => {
  try {
    const tasks = req.body;
    const success = await writeTasks(tasks);

    if (success) {
      res.json({ success: true, tasks });
    } else {
      res.status(500).json({ error: 'Failed to save tasks' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update tasks' });
  }
});

// POST /api/tasks/reset - Reset to default
app.post('/api/tasks/reset', async (req, res) => {
  try {
    const defaultTasks = {
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
        },
        {
          id: '86afba08v',
          title: '[Side Quest] Add Quarterly-Gold Plan Mapping in Billing Service and Admin Activation Functionality',
          status: 'in-progress',
          statusColor: 'yellow',
          url: 'https://app.clickup.com/t/86afba08v'
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
        }
      ]
    };

    const success = await writeTasks(defaultTasks);

    if (success) {
      res.json({ success: true, tasks: defaultTasks });
    } else {
      res.status(500).json({ error: 'Failed to reset tasks' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to reset tasks' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📊 Tasks API: http://localhost:${PORT}/api/tasks`);
  console.log(`💾 Data file: ${TASKS_FILE}`);
});
