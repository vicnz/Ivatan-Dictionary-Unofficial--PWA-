<script>
    import { navigate } from "svelte-navigator";
    import { halfmoon } from "../_utils/loadHalfmoon";
    import { getContext } from "svelte";
    const favorites = getContext("favorites");
    const database = getContext("database");
    $: isCleared = false;

    async function loadFavorites() {
        let favList = [];
        let favInfo = [];
        await favorites.iterate((val, key, idx) => {
            favList.push({
                key,
                val,
            });
        });

        favList.forEach((val) => {
            const stmt = database.prepare(
                "SELECT definitions FROM dictionary WHERE word = ?"
            );
            const result = stmt.getAsObject([val.key]);
            const definition1 = JSON.parse(result.definitions)[0].description;
            favInfo.push({
                word: val.key,
                definition: definition1,
            });
        });

        return favInfo;
    }

    async function onNavigate(text) {
        navigate(`/search/${text}`);
    }

    async function onClear() {
        await favorites.clear();
        isCleared = !isCleared;
        halfmoon((instance) => {
            instance.initStickyAlert({
                title: "Cleared",
                content: "All Favorite Items Are Cleared",
            });
        });
    }

    async function onDelete(key) {
        await favorites.removeItem(key);
        isCleared = !isCleared;
        halfmoon((instance) => {
            instance.initStickyAlert({
                title: "Removed",
                content: `Remove Favorite Item "${key}"`,
            });
        });
    }
</script>

<div class="alert alert-primary border-0 rounded-0" id="header">
    <div class="d-flex m-10 justify-content-between align-items-center">
        <div class="content-title">Favorites</div>
        <button
            class="btn btn-square shadow-none btn-danger"
            title="Clear All Favorites"
            on:click={() => onClear()}
        >
            <span class="ri ri-delete-bin-4-fill" />
        </button>
    </div>
</div>
{#key isCleared}
    {#await loadFavorites()}
        <p>loading....</p>
    {:then data}
        <div class="container w-md-three-quarter w-xl-half">
            {#if data.length < 1}
                <div class="container">
                    <p class="text-center">No Favorites</p>
                </div>
            {:else}
                {#each data as item}
                    <div class="card p-0">
                        <div
                            class="alert alert-primary border-0 rounded-0 d-flex align-items-center justify-content-between"
                        >
                            {item.word}
                            <button
                                class="btn btn-square shadow-none btn-danger"
                                data-toggle="tooltip"
                                data-title="Delete Favorite Item"
                                on:click={() => onDelete(item.word)}
                            >
                                <span class="ri ri-close-line" />
                            </button>
                        </div>
                        <div class="p-card">
                            <p>
                                {item.definition}
                            </p>
                            <button
                                class="btn btn-block"
                                on:click={() => onNavigate(item.word)}
                            >
                                View
                            </button>
                        </div>
                    </div>
                {/each}
            {/if}
        </div>
    {/await}
{/key}

<style>
    #header {
        position: sticky -webkit-sticky;
        position: sticky;
        top: 0px;
        z-index: 1;
    }
</style>
