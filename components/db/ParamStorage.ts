/**
 * Web implementation uses browser LocalStorage capabilities, wrapped into promises
 */
class AsyncBrowserLocalStorage{
  async key(n: number): Promise<string|null> {
    return new Promise<string|null>(ok =>
      ok(window.localStorage.key(n)));
  }
  async getItem(key: string): Promise<string|null> {
    return new Promise<string|null>(ok =>
      ok(window.localStorage.getItem(key)));
  }
  async setItem(key: string, value: string): Promise<void> {
    return new Promise<void>(ok => {
      window.localStorage.setItem(key, value);
      ok();
    });
  }
  async removeItem(key: string): Promise<void> {
    return new Promise<void>(ok => {
      window.localStorage.removeItem(key);
      ok();
    });
  }
  async clear(): Promise<void> {
    return new Promise<void>(ok => {
      window.localStorage.clear();
      ok();
    });
  }
}

export const ParamStorage = new AsyncBrowserLocalStorage();

export default AsyncBrowserLocalStorage;
