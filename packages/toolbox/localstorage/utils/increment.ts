import type {LocalForage} from './create-local-forage.js';

export async function increment(localForage: LocalForage, key: string, by = 1) {
  const value = await localForage.getItem<number>(key);
  const newValue = +(value || 0) + by;
  await localForage.setItem(key, newValue);
  return newValue;
}

export default increment;
export type IncrementUtil = typeof increment;
