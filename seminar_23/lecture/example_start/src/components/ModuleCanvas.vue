<template>
    <div class="module-canvas">
        <section class="hero is-info is-small">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title" v-text="storage.title"></h1>
                    <h2 class="subtitle" v-html="storage.subtitle"></h2>
                </div>
            </div>
            <div class="hero-foot">
                <nav class="tabs is-boxed">
                    <div class="container">
                        <ul>
                            <li v-for="(mainTab, index) in storage.moduleParts"
                                :class="{ 'is-active' : mainTab.isActive }"
                                :key="mainTab.id"
                                @click="selectPart(mainTab)">
                                <a>{{mainTab.name}}</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </section>
        <div class="container"
             v-for="(mainTab, index) in storage.moduleParts"
             v-show="mainTab.isActive">
            <tabs animation="slide"
                  :only-fade="false"
                  :key="mainTab.id">
                <tab-pane v-for="tab in mainTab.tabs" :key="tab.id" :label="tab.name">
                    <slot name="footer" v-if="tab.type === 'text'">
                        {{tab.content}}
                    </slot>
                    <slot name="footer" v-if="tab.type === 'collapse'">
                        <collapse accordion is-fullwidth>
                            <collapse-item v-for="item in tab.content" :key="item.id" :title="item.name">
                                <iframe width="100%" height="300"
                                        :src="item.url"
                                        allowfullscreen="allowfullscreen" frameborder="0"></iframe>
                            </collapse-item>
                        </collapse>
                    </slot>
                </tab-pane>
            </tabs>
        </div>
    </div>
</template>

<script>
    import data from '@/data/dataCanvas.js'
    import {Tabs, TabPane} from 'vue-bulma-tabs'
    import {Collapse, Item as CollapseItem} from 'vue-bulma-collapse'

    export default {
        name: 'module-canvas',
        components: {
            Tabs,
            TabPane,
            Collapse,
            CollapseItem
        },
        data () {
            return {
                selected: ''
            }
        },
        created(){
            this.storage = data;
            this.storage.moduleParts.forEach(function (part) {
                if (part.tabs && Array.isArray(part.tabs)) {
                    part.tabs.forEach(function (tab) {
                        if (tab.content && Array.isArray(tab.content)) {
                            tab.content.forEach(function (item) {
                                if (item.id) {
                                    switch (item.type) {
                                        case 'fiddle':
                                            item.url = '//jsfiddle.net/LisKorzun/' + item.id + '/embedded/' + (item.options || '') + '/?bodyColor=ffffff';
                                            break;
                                        default:
                                            item.url = '';
                                    }
                                }
                            })
                        }
                    })

                }
            }.bind(this));
        },
        methods: {
            selectPart (part) {
                this.selected = part;
                this.storage.moduleParts.forEach(function (tab) {
                    tab.isActive = (tab.id === part.id);
                })
            }
        }
    }
</script>
