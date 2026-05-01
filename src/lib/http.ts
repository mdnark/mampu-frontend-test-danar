const BASE_URL = "https://jsonplaceholder.typicode.com/";

export const http = {
  async get<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${BASE_URL}${endpoint}`);
    if (!res.ok) throw new Error(`Failed: ${endpoint}`);
    return res.json();
  },
};
