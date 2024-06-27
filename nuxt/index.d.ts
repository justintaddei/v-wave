import { NuxtModule, ModuleOptions } from '@nuxt/schema';

interface VWaveModuleOptions extends ModuleOptions {
    randomProp: string;
}
declare const module: NuxtModule<VWaveModuleOptions>;

declare module '@nuxt/schema' {
    interface NuxtConfig { ['vWave']?: NuxtModule<VWaveModuleOptions> }
    interface NuxtOptions { ['vWave']?: VWaveModuleOptions }
}

declare module 'nuxt/schema' {
    interface NuxtConfig { ['vWave']?: NuxtModule<VWaveModuleOptions> }
    interface NuxtOptions { ['vWave']?: VWaveModuleOptions }
}

export { VWaveModuleOptions, module as default };
