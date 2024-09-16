import { CachedItem } from '@types';

export class Cache<T> {
  private readonly _cache = new Map<string, CachedItem<T>>();

  private readonly CACHE_TIME = 10 * 60 * 1000;

  public set(id: string, data: T) {
    const cachedItem: CachedItem<T> = {
      cacheTime: new Date(),
      data,
    };

    this._cache.set(id, cachedItem);
  }

  public get(id: string): T | undefined {
    if (this._cache.has(id)) {
      return this._cache.get(id)?.data;
    }

    return undefined;
  }

  public clean() {
    const keys = this._cache.keys();

    for (const key of keys) {
      const cachedItem = this._cache.get(key) as CachedItem<T>;
      const cacheDuration =
        new Date().getTime() - cachedItem.cacheTime.getTime();

      if (cacheDuration > this.CACHE_TIME) {
        this._cache.delete(key);
      }
    }
  }

  public clear() {
    this._cache.clear();
  }
}
