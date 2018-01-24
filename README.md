# Vue Searchbar
A vue.js component searchbar. Allows for delayed or on key press search and can be integrated with vuex.

## How to initialize Vue Searchbar
Vue searchbar is built as a vue plugin. It can be initialized just as the Vue documentation states.

```javascript
import Searchbar from '@pderas/vue2-searchbar';

Vue.use(Searchbar);
```
## Usage

#### Creation
A search bar can be created simply by adding the component to a file and passing it a search function. This function will run either on key press or after a delay depending on what props or global options have been set.
```javascript
<searchbar :on-search="searchFunc" />

export default {
    methods: {
        searchFunc(search) {
            alert('You have tried to search for: ' + search);
        }
    }
}
```
### Options
| Option      | Default   | Description                                                     |
|-------------|-----------|-----------------------------------------------------------------|
| iconSide    | 'left'    | Determines what side the search icon is on.                     |
| searchWhen  | 'onDelay' | If the search should run after defined timeout or on key press. |
| timoutDelay | 1000      | The amount of time before a new search will occur.              |

# License
This project is covered under the MIT License. Feel free to use it wherever you like.