<template>
    <div class="searchbar-wrapper" :style="theme">
        <div class="input-icon" :class="iconSide">
            <i class="fa fa-search" aria-hidden="true" v-if="!loading"></i>
            <i class="fa fa-spinner fa-pulse fa-fw loader" aria-hidden="true" v-else></i>
            <input v-model="currentSearch" type="text" :placeholder="placeholder" @keyup.enter="searchEnter" />
        </div>
    </div>
</template>

<script>
    import defaults from '../options';

    export default {
        name: 'searchbar',

        props: {
            value: {
                type: String,
                default: null
            },
            /* The side to show the search icon on */
            iconSide: {
                type: String,
                default: function() {
                    return defaults.iconSide;
                }
            },

            /* The variable that determines if the search is loading */
            loading: {
                type: Boolean,
                default: false
            },

            /* The function to run on search */
            onSearch: {
                type: Function,
                required: true
            },

            /* Placeholder text displayed in searchbar */
            placeholder: {
                type: String,
                default: 'Search...'
            },

            /* The commit function if integrating with vuex */
            searchLocation: {
                type: String,
                default: null
            },

            /* How frequently the search runs */
            searchWhen: {
                type: String,
                default: function() {
                    return defaults.searchWhen;
                },
                validator: function(value) {
                    return [
                        'onDelay',
                        'onEnter'
                    ].includes(value);
                }
            },

            /* Custom styling for searchbar */
            theme: {
                type: String,
                default: null
            },

            /* The delay on search when searchWhen set to onDelay */
            timeoutDelay: {
                type: Number,
                default: function() {
                    return defaults.timeoutDelay;
                }
            }
        },

        computed: {
            currentSearch: {
                get: function() {
                    return this.value || this.internalSearch;
                },
                set: function(val) {
                    this.internalSearch = val;
                    this.$emit('input', val);
                }
            }
        },

        data: function() {
            return {
                internalSearch:  null,
                timeout:        null
            }
        },

        watch: {
            currentSearch: function() {
                if (this.searchLocation) {
                    this.$store.commit(this.searchLocation, this.currentSearch);
                }
                this.delayedSearch();
            }
        },

        methods: {
            delayedSearch: function() {
                if (this.searchWhen != 'onDelay') {
                    return;
                }

                if (this.timeout) {
                    clearTimeout(this.timeout);
                }

                let _this = this;
                this.timeout = setTimeout(function() {
                    _this.search();
                }, this.timeoutDelay);
            },

            searchEnter: function() {
                if (this.searchWhen != 'onEnter') {
                    return;
                }
                this.search();
            },

            search: function() {
                this.onSearch(this.currentSearch);
            }
        }
    }
</script>

<style lang="scss">
$searchbar-font-color: #626262;
$searchbar-bg-color: #dfdede;
$base-width: 150px;
$expanded-width: 300px;
$border-radius: 0px;

.searchbar-wrapper {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;

    .input-icon {
        position: relative;

        & > i {
            -webkit-transform: translate(0, -50%);
               -moz-transform: translate(0, -50%);
                -ms-transform: translate(0, -50%);
                 -o-transform: translate(0, -50%);
                    transform: translate(0, -50%);

            color: $searchbar-font-color;
            position: absolute;
            display: block;
            top: 50%;
            pointer-events: none;
            width: 25px;
            text-align: center;
            font-style: normal;
        }

        & > input {

            /* Border Radius */
            -webkit-border-radius: $border-radius;
               -moz-border-radius: $border-radius;
                -ms-border-radius: $border-radius;
                 -o-border-radius: $border-radius;
                    border-radius: $border-radius;

            /* Box Shadow */
            -webkit-box-shadow: none;
               -moz-box-shadow: none;
                    box-shadow: none;

            /* Transition */
            -webkit-transition: 0.3s ease-out;
               -moz-transition: 0.3s ease-out;
                 -o-transition: 0.3s ease-out;
                    transition: 0.3s ease-out;

            background-color: $searchbar-bg-color;
            display: block;
            width: $base-width;
            height: 36px;
            padding: 6px 12px 6px 25px;
            font-size: 14px;
            line-height: 1.6;
            color: $searchbar-font-color;
            border: none;
            resize: none;

            &:focus {
                /* Box Shadow */
                -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
                   -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
                        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);

                background-color: darken($searchbar-bg-color, 5%);
                background-image: none;
                outline: none;
                width: $expanded-width;
            }

            &:hover {
                background-color: darken($searchbar-bg-color, 5%);
            }

            &::placeholder {
                color: $searchbar-font-color;
            }
        }

        &.right {
            & > i {
                -webkit-transform: translate(0, -50%);
                   -moz-transform: translate(0, -50%);
                    -ms-transform: translate(0, -50%);
                     -o-transform: translate(0, -50%);
                        transform: translate(0, -50%);

                position: absolute;
                display: block;
                top: 50%;
                right: 0px;
                pointer-events: none;
                width: 25px;
                text-align: center;
                font-style: normal;

                &.clickable {
                    pointer-events: all;
                    cursor: pointer;
                }
            }

            & > input {
                padding-left: 12px;
                padding-right: 25px;
            }
        }

        .loader {
            top: 30%;
        }
    }
}

</style>
