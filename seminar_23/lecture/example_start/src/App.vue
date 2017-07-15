<template>
    <div id="app">
        <menu-global></menu-global>
        <router-view></router-view>
        <menu-footer-global></menu-footer-global>
    </div>
</template>

<script>
    import MenuGlobal from '@/components/MenuGlobal'
    import MenuFooterGlobal from '@/components/MenuFooterGlobal'

    export default {
        name: 'app',
        components: {
            'menu-global': MenuGlobal,
            'menu-footer-global': MenuFooterGlobal
        }
    }
</script>

<style lang="scss">
    @import './assets/scss/style.scss'
</style>
