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

<nav class="navbar">
    <div class="navbar-content">
        <button
            class="btn btn-square shadow-none"
            on:click={() => halfmoon((e) => e.toggleSidebar())}
            title="SHIFT+S"
        >
            <span class="ri ri-menu-line" />
        </button>
    </div>
    <div class="navbar-brand hidden-sm-and-down">Ivatan Dictionary</div>
    <div class="navbar-content flex-fill">
        {#await loadJSONString()}
            <div class="navbav-item">Loading...</div>
        {:then result}
            <SearchBar words={result} />
        {/await}
    </div>
    <div class="navbar-content">
        <button
            class="btn btn-square shadow-none rounded-sm"
            on:click={() => halfmoon(toggleDarkMode)}
        >
            <span class="ri ri-moon-line" />
        </button>
    </div>
</nav>
