# Electron + Vue 3 + TypeScript starter app
Quik starters template for Electron, Vue 3 and TypeScript. So you dont have to setup a project yourself each time. Just clone the repository and run `npm run electron:serve`

## Services
****You can delete this if you want to use you're own implementation.***

A service is a `class` which communicates between Electrons *renderer* process and the *main* process. There is an example provided in`src/services`

You can use a `service` inside the *renderer* by calling the `useService('name-of-service')` method.  Don't forget to register it first in `src/services/Services.ts`.

So for example:

    import { ExampleService } from './ExampleService'
    import { MyNewService } from './MyNewService'
    
    /**
     * Register your services here
     */
    export  const  services  = {
        ExampleService: new ExampleService(),
        MyNewService: new MyNewService()
    }

You can now call it in the *renderer* like so

    import { useService } from '@/composables/service'
    
    const myNewService = useService('MyNewService');

## Store
*****As for services, you can delete this if you want to implement you're own logic here aswell.***

A store is an *object* with *reactive* properties, all properties defined inside the store are *reactive* by default. You can find an example in `src/store/ExampleStore.ts`

Creating a new store is simple, just extend the base `Store`. Note that you should export a new store as `default new class`

    export default new class CarStore extends Store<CarStore> {
        public list = [/* array of objects with cars */];
        public selected?: /* Object with selected car from list */
    }

To use the store *import* it

    import CarStore from '@/store/CarStore'

Here is an example how to use the store

    export default defineComponent({
        const { state } = CarStore;
	 const selectCar = (car) => state.selected = car;
		
        onMounted( async () => {
            state.list = await useService('CarService').getCarsByBrand('Volkswagen')
        })
        
        return {
            state,
            selectCar
        }
    })

Now in your *template*

    <template>
        <b>Select a car</b>
        <ul v-for="car in state.cars" :key="car" @click="selectCar(car)">
            <li>{{car.brand}}</li>
            <li>{{car.color}}</li>
            <li>{{car.price}}</li>
            ...
        </ul>
        <b>The car you selected</b>
        <ul v-if="state.selected">
            <li>{{state.selected.brand}}</li>
            <li>{{state.selected.color}}</li>
            <li>{{state.selected.price}}</li>
        </ul>
    </template>

## NPM
Build

    npm run electron:build

Serve

    npm run electron:serve
