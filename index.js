import Searchbar from './components/Searchbar.vue';
import options from './options';

export { options };
export default {
    install (Vue, globalOptions) {
        if (globalOptions) {
            Object.keys(globalOptions).map(function(key) {
                options[key] = gloablOptions[key];
            });
        }

        Vue.component('vue-searchbar', Searchbar);
    }
}