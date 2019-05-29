import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient({ db: process.env.REDIS_DB || 0 });

const redisClient = {
  get: promisify(client.get).bind(client),
  set: promisify(client.set).bind(client),
}

type Fn = (...args: any) => Promise<any>

export function withRedisCache<T> (fn: Fn) {
  return async function(...args: any) {
    const cachedJson = await redisClient.get(args[0]);

    if (cachedJson) {
      return JSON.parse(cachedJson);
    } else {
      const data = await fn(...args);
      redisClient.set(args[0], JSON.stringify(data));
      return data;
    }
  }
}
