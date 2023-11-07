import { options } from './v-wave.client';

export default defineNuxtPlugin(({ vueApp }) => {
    vueApp.directive(options.directive ?? 'wave', {});
    vueApp.directive(`${options.directive ?? 'wave'}-trigger`, {});
});
