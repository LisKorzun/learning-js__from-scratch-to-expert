<template>
    <footer class="footer global-footer-menu">
        <div class="container">
            <div class="content has-text-centered">
                <p> {{msg}}
                    <a class="icon" href="https://github.com/LisKorzun" target="_blank">
                        <i class="fa fa-github"></i>
                    </a>
                </p>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        name: 'global-footer-menu',
        data () {
            return {
                msg: 'Created by LisKorzun'
            }
        }
    }
</script>
