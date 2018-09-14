# vue-selectize

A [Selectize](https://selectize.github.io/selectize.js/) wrapper for [Vue.js 2](https://vuejs.org/).

### Dependencies

- [jQuery](https://github.com/jquery/jquery/) >= 1.7.0

### Installation

```
npm install --save jquery @idecardo/vue-selectize
```

### Usage

```javascript
import Selectize from '@idecardo/vue-selectize'

export default {
    components: {
        Selectize,
    },

    data: () => ({
        options: [
            { value: 1, text: 'One'   },
            { value: 2, text: 'Two'   },
            { value: 3, text: 'Three' },
            { value: 4, text: 'Four'  },
            { value: 5, text: 'Five'  },
        ],

        selected: [],

        settings: {
            maxItems: 3,
            plugins: ['remove_button'],
        },
    }),
}
```

#### Basic

```html
<selectize v-model="selected">
    <option v-for="option in options" :value="option.value">
        {{ option.text }}
    </option>
</selectize>

<!-- Or using shorthand -->

<selectize :options="options" v-model="selected"></selectize>
```

#### Settings

```html
<selectize :options="options" :settings="settings" v-model="selected"></selectize>

<!-- Or using data attributes -->

<selectize :options="options" v-model="selected" data-max-items="3"></selectize>
```

#### Theme

```scss
// Include your preferred theme in your main SASS file or your component's <style lang="scss"/> section.

@import "~selectize/dist/css/selectize.default.css";
```
