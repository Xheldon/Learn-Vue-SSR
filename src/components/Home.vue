<template>
    <div>
        {{text}}
    </div>
</template>
<script>
    export default {
        asyncData ({ store, route }) {
            return store.dispatch('fetchItem', route.query.id);
        },
        computed: {
            text () {
                return this.$store.state.items[this.$route.query.id]
            }
        }
    }
</script>
