import { networkInterfaces } from 'os';

export function getNetworkInfo() {
  const info: Record<string, string[]> = {};
  const nets = networkInterfaces();

  for (const key in nets) {
    info[key] = (nets[key] || [])
      .filter(it => {
        return it.family === 'IPv4' && !it.internal;
      })
      .map(it => {
        return it.address;
      });
  }

  return info;
}
