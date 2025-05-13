import { Ratelimit } from '@upstash/ratelimit';
import redis from './redisDB';

const defaultRateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(1, "1 m"),
});

const authenticatedRateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(5, "1 m"),
});

export function getRateLimit(isAuthenticated: boolean) {
  const limitType = isAuthenticated ? 'Authenticated (5 req/min)' : 'Unauthenticated (1 req/min)';
  console.log(`[RateLimit] Using limit: ${limitType}`);
  return isAuthenticated ? authenticatedRateLimit : defaultRateLimit;
}

export { redis };
