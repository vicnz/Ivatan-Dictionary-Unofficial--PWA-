<script>
    export let db;
    export let favorites;
    import { setContext } from "svelte";
    setContext("database", db);
    setContext("favorites", favorites);
</script>

<slot />
