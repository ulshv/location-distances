import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient({ db: process.env.REDIS_DB || 0 });

const redisClient = {
  get: promisify(client.get).bind(client),
  set: promisify(client.set).bind(client),
}

export default redisClient;
