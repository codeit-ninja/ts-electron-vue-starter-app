import { app } from 'electron'
import { version } from 'vue'
import { platform } from 'os'

export class ExampleService {
    public async getSystemInformation() {
        return {
            electronVersion: process.versions.electron,
            vueVersion: version,
            nodeVersion: process.versions.node,
            platform: platform()
        }
    }
}