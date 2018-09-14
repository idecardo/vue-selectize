import $ from 'jquery';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

if (!$().selectize) {
    require('selectize');
}

var script = {
    props: {
        disabled: {
            type: Boolean,
            default: false
        },

        options: {
            type: Array,
            default: function _default() {
                return [];
            }
        },

        settings: {
            type: Object,
            default: function _default() {
                return {};
            }
        },

        value: {
            default: null
        }
    },

    data: function data() {
        return {
            instance: null,
            onChange: false
        };
    },

    mounted: function mounted() {
        var _this = this;

        this.instance = $(this.$el).selectize(_extends({
            onInitialize: function onInitialize() {
                _this.setValue();
                _this.setDisabled();
            },

            onChange: function onChange(value) {
                _this.onChange = true;
                _this.$emit('input', value);
            }

        }, this.mergedSettings))[0].selectize;
    },
    destroyed: function destroyed() {
        if (this.instance) {
            this.instance.destroy();
        }
    },


    methods: {
        setValue: function setValue() {
            this.$el.selectize.setValue(this.value, true);
        },
        setDisabled: function setDisabled() {
            if (this.disabled) {
                this.$el.selectize.disable();
            } else {
                this.$el.selectize.enable();
            }
        }
    },

    computed: {
        mergedSettings: function mergedSettings() {
            return $.extend(this.settings, $(this.$el).data(), {
                options: this.options
            });
        }
    },

    watch: {
        disabled: function disabled(value) {
            this.setDisabled();
        },
        options: function options(_options) {
            this.instance.updateOption(this.instance.getValue(), _options);
        },
        value: function value(_value) {
            if (!this.onChange) {
                this.setValue();
            }

            this.onChange = false;
        }
    }
};

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('select', [_vm._t("default")], 2);
};
var __vue_staticRenderFns__ = [];

/* style */
var __vue_inject_styles__ = undefined;
/* scoped */
var __vue_scope_id__ = undefined;
/* module identifier */
var __vue_module_identifier__ = undefined;
/* functional template */
var __vue_is_functional_template__ = false;
/* component normalizer */
function __vue_normalize__(template, style, script$$1, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

  // For security concerns, we use only base name in production mode.
  component.__file = "main.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;

    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  return component;
}
/* style inject */

/* style inject SSR */

var component = __vue_normalize__({ render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, undefined, undefined);

// Import vue component

// install function executed by Vue.use()
function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('Selectize', component);
}

// Create module definition for Vue.use()
var plugin = {
  install: install
};

// To auto-install when vue is found
var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

export default component;
export { install };
