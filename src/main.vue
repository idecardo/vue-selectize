<template>
    <select>
        <slot></slot>
    </select>
</template>

<script>
    import $ from 'jquery'

    if (!$().selectize) {
        require('selectize')
    }

    export default {
        props: {
            disabled: {
                type: Boolean,
                default: false,
            },

            options: {
                type: Array,
                default: () => ([]),
            },

            settings: {
                type: Object,
                default: () => ({}),
            },

            value: {
                default: null,
            },
        },

        data: () => ({
            instance: null,
            onChange: false,
        }),

        mounted() {
            this.instance = $(this.$el).selectize({
                onInitialize: () => {
                    this.setValue()
                    this.setDisabled()
                },

                onChange: (value) => {
                    this.onChange = true
                    this.$emit('input', value)
                },

                ...this.mergedSettings,
            })[0].selectize
        },

        destroyed() {
            if (this.instance) {
                this.instance.destroy()
            }
        },

        methods: {
            setValue() {
                this.$el.selectize.setValue(this.value, true)
            },

            setDisabled() {
                if (this.disabled) {
                    this.$el.selectize.disable()
                } else {
                    this.$el.selectize.enable()
                }
            },
        },

        computed: {
            mergedSettings() {
                return $.extend(this.settings, $(this.$el).data(), {
                    options: this.options,
                })
            },
        },

        watch: {
            disabled(value) {
                this.setDisabled()
            },

            options(options) {
                this.instance.updateOption(this.instance.getValue(), options)
            },

            value(value) {
                if (! this.onChange) {
                    this.setValue()
                }

                this.onChange = false
            },
        },
    }
</script>
