<template>
    <h1>This is your Electron + Vue 3 + TypeScript starter app</h1>
    <p>Documentation can be found at <a href="#" @click="openExternalLink">ts-electron-vue-starter-app</a></p>
    <table v-if="state.systemInformation">
        <tr>
            <th>Platform:</th>
            <td>{{state.systemInformation.platform}}</td>
        </tr>
        <tr>
            <th>Electron version:</th>
            <td>{{state.systemInformation.electronVersion}}</td>
        </tr>
        <tr>
            <th>Vue version:</th>
            <td>{{state.systemInformation.vueVersion}}</td>
        </tr>
        <tr>
            <th>Node version:</th>
            <td>{{state.systemInformation.nodeVersion}}</td>
        </tr>
    </table>
    <h2>Test if reactivity is working properly</h2>
    <b>You clicked:</b> {{state.counter}}<br/>
    <button @click="updateCount()">Click me</button><br/>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { shell } from 'electron';
import { useService } from '@/composables/service';
import ExampleStore from '@/store/ExampleStore';

export default defineComponent({
    setup() {
        const { state } = ExampleStore;

        onMounted( async () => {
            state.systemInformation = await useService('ExampleService').getSystemInformation();
        })

        return {
            openExternalLink: () => shell.openExternal('https://github.com/redbullzuiper/ts-electron-vue-starter-app'),
            updateCount: () => ++state.counter,
            state
        }
    },
})
</script>
<style lang="scss" scoped>
h1 {
    margin-top: 8rem;
    font-size: 1.5rem;
}

h3 {
    margin-top: 2rem;
}

table {
    text-align: left;
    margin: 0 auto;

    td {
        padding: .5rem;
    }
}

button {
    margin-top: 1rem;
    padding: .5rem 1rem;
    cursor: pointer;
}
</style>