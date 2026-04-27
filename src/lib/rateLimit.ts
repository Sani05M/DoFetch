/**
 * Simple in-memory rate limiter for serverless environments.
 * No external dependencies. Tracks requests per key in a sliding window.
 * Automatically prunes stale entries to prevent memory leaks.
 */

interface RateLimitEntry {
  timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

// Prune stale entries every 5 minutes to prevent memory buildup
let lastPrune = Date.now();
const PRUNE_INTERVAL = 5 * 60 * 1000;

function pruneStale(windowMs: number) {
  const now = Date.now();
  if (now - lastPrune < PRUNE_INTERVAL) return;
  lastPrune = now;
  
  for (const [key, entry] of store) {
    entry.timestamps = entry.timestamps.filter(t => now - t < windowMs);
    if (entry.timestamps.length === 0) store.delete(key);
  }
}

/**
 * Check if a key has exceeded its rate limit.
 * @param key - Unique identifier (e.g., userId)
 * @param maxRequests - Max requests allowed in window
 * @param windowMs - Time window in milliseconds
 * @returns { allowed: boolean, remaining: number, resetIn: number }
 */
export function rateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetIn: number } {
  pruneStale(windowMs);
  
  const now = Date.now();
  const entry = store.get(key) || { timestamps: [] };
  
  // Filter to only timestamps within the current window
  entry.timestamps = entry.timestamps.filter(t => now - t < windowMs);
  
  if (entry.timestamps.length >= maxRequests) {
    const oldestInWindow = entry.timestamps[0];
    const resetIn = Math.ceil((oldestInWindow + windowMs - now) / 1000);
    return { allowed: false, remaining: 0, resetIn };
  }
  
  entry.timestamps.push(now);
  store.set(key, entry);
  
  return {
    allowed: true,
    remaining: maxRequests - entry.timestamps.length,
    resetIn: Math.ceil(windowMs / 1000)
  };
}
