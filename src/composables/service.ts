
import { ipcRenderer } from 'electron';
import { toRaw } from 'vue';
import { services } from '../services/Services';

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
const servicesProxy: typeof services = new Proxy({} as any, {
    get(_, serviceName) { return createProxy(serviceName as string) }
})

export function useService(name: keyof typeof services) {
    return servicesProxy[name]
}