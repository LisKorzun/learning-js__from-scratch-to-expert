<template>
    <section class="hero is-primary is-medium">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">
                    {{title}}
                </h1>
                <h2 class="subtitle">
                    {{subtitile}}
                </h2>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'module-home',
        data () {
            return {
                title: 'Welcome',
                subtitile: 'Полезные примерчики. Краткие описания. Понятные инструкции.'
            }
        }
    }
</script>
