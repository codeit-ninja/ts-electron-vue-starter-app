import { ExampleService } from "@/services/ExampleService";
import Store from "@/store/Store";

export default new class ExampleStore extends Store<ExampleStore> {
    public systemInformation?: Awaited<ReturnType<ExampleService['getSystemInformation']>>;

    public counter = 0;
}