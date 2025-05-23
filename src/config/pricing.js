// pricing.js - Centralized LLM pricing configuration

export default {
  'gpt-4-turbo': { in: 2.00/1_000_000, out: 8.00/1_000_000 },
  'gpt-4.1': { in: 2.00/1_000_000, out: 8.00/1_000_000 },
  'gpt-4.1-2025-04-14': { in: 2.00/1_000_000, out: 8.00/1_000_000 },
  'gpt-4o-mini': { in: 0.40/1_000_000, out: 1.60/1_000_000 },
  'gpt-4.1-mini': { in: 0.40/1_000_000, out: 1.60/1_000_000 },
  'gpt-4.1-mini-2025-04-14': { in: 0.40/1_000_000, out: 1.60/1_000_000 },
  'o3': { in: 10.00/1_000_000, out: 40.00/1_000_000 },
  'o3-2025-04-16': { in: 10.00/1_000_000, out: 40.00/1_000_000 }
};