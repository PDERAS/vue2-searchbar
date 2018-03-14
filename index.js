import Searchbar from './components/Searchbar';
import options from './options';

export options;

function install (Vue, globalOptions) {
    if (globalOptions) {
        Object.keys(globalOptions).map(function(key) {
            options[key] = gloablOptions[key];
        });
    }

    Vue.component('searchbar', Searchbar);
}

export default install;
