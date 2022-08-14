<script>
    import SearchBar from "./Searchbar.svelte";

    import { halfmoon } from "../_utils/loadHalfmoon";

    function toggleDarkMode(hm) {
        hm.toggleDarkMode();
    }

    async function loadJSONString() {
        const result = await fetch("/words.json");
        return await result.json();
    }
</script>

<nav class="navbar bg-primary">
    <div class="navbar-content">
        <button
            class="btn btn-square shadow-none border-0 btn-primary"
            on:click={() => halfmoon((e) => e.toggleSidebar())}
            title="SHIFT+S"
        >
            <span class="ri ri-menu-line" />
        </button>
    </div>
    <div class="navbar-brand hidden-sm-and-down text-light-lm">
        Ivatan Dictionary
    </div>
    <div class="navbar-content flex-fill">
        {#await loadJSONString()}
            <div class="navbav-item">Loading JSON data...</div>
        {:then result}
            <SearchBar words={result} />
        {/await}
    </div>
    <div class="navbar-content">
        <button
            class="btn btn-square shadow-none rounded-sm btn-primary border-0"
            on:click={() => halfmoon(toggleDarkMode)}
        >
            <span class="ri ri-moon-line" />
        </button>
    </div>
</nav>

<nav
    class="navbar navbar-fixed-bottom border-0 bg-light-lm bg-dark-dm text-light-dm text-dark-lm"
>
    <div class="flex-fill text-center">Built with 💖 by N30NZ0N3</div>
</nav>
