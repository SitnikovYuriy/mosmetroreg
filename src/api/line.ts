import fetchJson from '@/utils/fetch-json';

export interface ILine {
  id: number,
  title: string,
  color: string,
  shortTitle: string,
}

export default {
  async getList(): Promise<ILine[]> {
    return await fetchJson<ILine[]>('/api/lines');
  },
}