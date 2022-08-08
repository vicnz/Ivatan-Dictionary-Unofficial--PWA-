<script>
    export let words = [];
    import { navigate } from "svelte-navigator";

    let searchResult = [];
    let query = null;

    $: {
        searchResult = words.filter((item) => {
            return item.startsWith(query, 0);
        });
    }

    function onItemClicked(string) {
        searchResult = [];
        query = null;
        navigate(`/search/${string}`);
    }
</script>

<div class="input-wrapper">
    <input
        type="search"
        class="form-control"
        bind:value={query}
        placeholder="search here, some words has '-' at their beginning"
    />

    {#if query && searchResult.length > 0}
        {#key searchResult}
            <div class="suggestion-list">
                {#each searchResult as result}
                    <div
                        class="card m-0 my-5 mx-5 p-0"
                        aria-current={result}
                        on:click={() => onItemClicked(result)}
                    >
                        <div class="d-flex p-5 justify-content-between">
                            <div class="d-flex align-items-center">
                                <span class="ri ri-attachment-line" />
                                &nbsp;
                                <span class="text-primary">
                                    {result.substring(0, query.trim().length)}
                                </span>
                                <span>
                                    {result.substring(query.trim().length)}
                                </span>
                            </div>
                            <span class="ri ri-arrow-right-line" />
                        </div>
                    </div>
                {/each}
            </div>
        {/key}
    {/if}
</div>

<style>
    .input-wrapper {
        width: 100%;
        position: relative;
    }
    .suggestion-list {
        border-radius: 5px;
        position: absolute;
        width: 100%;
        max-height: 75vh;
        top: 110%;
        left: 0;
        background-color: rgba(0, 0, 0, 0.2);
        overflow-y: auto;
        backdrop-filter: blur(2px);
    }
    .card:hover {
        opacity: 0.7;
    }
</style>
