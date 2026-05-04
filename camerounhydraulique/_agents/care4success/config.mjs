import axios from 'axios';

/**
 * Configuration centrale — Agents de test Care4Success
 * URL cible : https://care4success.usra-care.com/
 */

export const BASE_URL = 'https://care4success.usra-care.com';

export const AGENTS = {
  admin: {
    name: 'Agent Admin',
    email: 'admin@care4success.cm',
    password: 'admin',
    role: 'admin',
    icon: '👑',
    file: 'agent-admin.mjs',
  },
  teacher: {
    name: 'Agent Professeur',
    email: 'prof@care4success.cm',
    password: 'teacher123',
    role: 'teacher',
    icon: '🎓',
    file: 'agent-teacher.mjs',
  },
  student: {
    name: 'Agent Élève',
    email: 'eleve@care4success.cm',
    password: 'student123',
    role: 'student',
    icon: '📚',
    file: 'agent-student.mjs',
  },
  parent: {
    name: 'Agent Parent',
    email: 'parent@care4success.cm',
    password: 'parent123',
    role: 'parent',
    icon: '👨‍👩‍👧',
    file: 'agent-parent.mjs',
  },
  advisor: {
    name: 'Agent Conseiller',
    email: 'conseiller@care4success.cm',
    password: 'advisor123',
    role: 'advisor',
    icon: '💼',
    file: 'agent-advisor.mjs',
  },
  tutor: {
    name: 'Agent Tuteur',
    email: 'tuteur@care4success.cm',
    password: 'tutor123',
    role: 'tutor',
    icon: '🧑‍🏫',
    file: 'agent-tutor.mjs',
  },
  pedagogy: {
    name: 'Audit Pédagogique',
    icon: '🧪',
    file: 'agent-pedagogy.mjs',
  },
  recruitment: {
    name: 'Audit Recrutement',
    icon: '💠',
    file: 'agent-recruitment.mjs',
  },
  collaboration: {
    name: 'Audit Collaboration',
    icon: '🛰️',
    file: 'agent-collaboration.mjs',
  },
};

export const TIMEOUTS = {
  navigation: 10000,
  api: 8000,
  short: 3000,
};

/**
 * Fetch résilient avec axios
 */
export async function fetchJSON(url, options = {}, retries = 3, backoff = 1000) {
  const method = (options.method || 'GET').toLowerCase();
  const headers = { 
    'Content-Type': 'application/json',
    ...(options.headers || {}) 
  };
  const data = options.body ? JSON.parse(options.body) : undefined;

  for (let i = 0; i < retries; i++) {
    try {
      const res = await axios({
        url,
        method,
        headers,
        data,
        timeout: TIMEOUTS.api,
        validateStatus: () => true, // Handle all status codes
      });
      return { 
        status: res.status, 
        ok: res.status >= 200 && res.status < 300, 
        data: res.data 
      };
    } catch (err) {
      if (err.code === 'ECONNABORTED' || err.code === 'ETIMEDOUT' || !err.response) {
        if (i < retries - 1) {
          const wait = backoff * Math.pow(2, i);
          console.warn(`[RETRY AXIOS ${i+1}/${retries}] Failed for ${url}. Waiting ${wait}ms...`);
          await new Promise(r => setTimeout(r, wait));
          continue;
        }
      }
      return { status: 500, ok: false, data: { message: err.message } };
    }
  }
}
