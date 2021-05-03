import fetchJson from '@/utils/fetch-json';

export interface IStation {
  id?: number,
  title: string,
  line: number,
  transferLines: number[],
}

export default {
  async getList(): Promise<IStation[]> {
    return await fetchJson<IStation[]>('/api/stations');
  },

  async add(station: IStation): Promise<IStation> {
    return await fetchJson('/api/stations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(station),
    });
  },
  
  async update(station: IStation): Promise<IStation> {
    return await fetchJson(`/api/stations/${station.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(station),
    });
  },

  async remove(id: number): Promise<void> {
    return await fetchJson<void>(`/api/stations/${id}`, { method: 'DELETE' });
  },
}