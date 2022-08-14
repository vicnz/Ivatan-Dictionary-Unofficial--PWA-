<script>
    import { getContext } from "svelte";
    import { navigate } from "svelte-navigator";
    import Definition from "../_layouts/Definition.svelte";
    import { halfmoon } from "../_utils/loadHalfmoon";

    const database = getContext("database");
    const favorites = getContext("favorites");
    export let slug = "No Passed Value";
    $: bookmarkedWord = false;

    /**Load Data*/
    async function loadingSearchData() {
        const stmt = database.prepare(
            "SELECT * FROM dictionary WHERE word = ?"
        );
        const result = stmt.getAsObject([slug]);
        const isFavorite = await favorites.getItem(slug);
        if (result) {
            bookmarkedWord = isFavorite !== null;
            return {
                favorite: isFavorite !== null,
                data: {
                    word: result.word,
                    origin: result.origin,
                    definitions: JSON.parse(result.definitions),
                },
            };
        }
    }

    async function setFavorite(text) {
        if (bookmarkedWord) {
            bookmarkedWord = false;
            await favorites.removeItem(slug);
        } else {
            bookmarkedWord = true;
            await favorites.setItem(slug, true);
        }
    }

    async function share(text) {
        await navigator.clipboard.writeText(text);
        halfmoon((lib) => {
            lib.initStickyAlert({
                title: "Copied",
                content: `Copied Text "${text}"`,
                type: "alert-success",
            });
        });
    }
</script>

<div
    class="alert alert-primary border-0 rounded-0 shadow-sm p-0 p-10"
    id="header"
>
    <div class="d-flex justify-content-between align-items-center m-10">
        <button class="btn" on:click={() => navigate(-1)}>Back</button>
        <div class="flex-fill text-center content-title text-uppercase">
            {slug || "NO QUERY"}
        </div>
        <div class="btn-toolbar">
            <button
                class="btn btn-square shadow-none"
                title="Add To Favorites"
                on:click={() => setFavorite(slug)}
            >
                {#if bookmarkedWord}
                    <span class="ri ri-heart-2-fill text-danger" />
                {:else}
                    <span class="ri ri-heart-2-line" />
                {/if}
            </button>
            &nbsp;
            <button
                class="btn btn-square shadow-none"
                title="Share Text"
                on:click={() => share(slug)}
            >
                <span class="ri ri-file-copy-line" />
            </button>
        </div>
    </div>
</div>
<div class="content">
    <div class="container w-md-three-quarter w-xl-half">
        {#key slug}
            {#await loadingSearchData()}
                <p>loading...</p>
            {:then data}
                {#each data.data.definitions as definition, idx}
                    <Definition data={definition} key={idx} />
                {/each}
            {/await}
        {/key}
    </div>
</div>

<style>
    #header {
        z-index: 1;
        position: sticky -webkit-sticky;
        position: sticky;
        top: 0px;
    }
</style>
