<template>
    <div>
        {{text}}
    </div>
</template>
<script>
    export default {
        asyncData ({ store, route }) {
            return store.dispatch('fetchItem', route.params.id);
        },
        computed: {
            text () {
                return this.$store.state.text
            }
        }
    }
</script>