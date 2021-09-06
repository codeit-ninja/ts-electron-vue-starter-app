
import { ipcRenderer } from 'electron'
import type { iServices } from '@/services/Services'
import { toRaw } from 'vue'

const { invoke } = ipcRenderer;

function createProxy(service: string) {
  return new Proxy({} as any, {
    get(_, functionName) {
      return (...payloads: any[]) => {
        const rawPayloads = payloads.map(e => toRaw(e));
        return invoke('service:call', service, functionName as string, ...rawPayloads);
      }
    }
  })
}
const servicesProxy: iServices = new Proxy({} as any, {
  get(_, serviceName) { return createProxy(serviceName as string) }
})

export function useService<T extends keyof iServices>(name: T): iServices[T] {
  return servicesProxy[name]
}
