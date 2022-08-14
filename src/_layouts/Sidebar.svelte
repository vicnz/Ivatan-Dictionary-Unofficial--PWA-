<script>
    import { installable } from "../_utils/installable";
    import { Link } from "svelte-navigator";
    import { halfmoon } from "../_utils/loadHalfmoon";

    async function onShare() {
        await navigator.share({
            url: "https://ivatan-dictionary.vercel.app/",
            title: "Share The App With Friends",
        });
    }

    async function showToast(e) {
        e.initStickyAlert({
            content: "Sample Toast Content",
            title: "Error Page or Something",
        });
    }

    async function onInstall() {
        if ($installable.instance !== null) {
            $installable.instance.prompt();
            const { outcome } = await $installable.instance.userChoice;
            if (outcome === "accepted") {
                $installable = {
                    instance: null,
                    supported: true,
                };
            }
        }
    }
</script>

<aside class="sidebar">
    <div class="sidebar-menu">
        <div class="sidebar-brand">Ivatan Dictionary</div>
        <div class="sidebar-divider" />
        <Link to="/" class="sidebar-link sidebar-link-with-icon">
            <span class="sidebar-icon ri ri-home-2-fill" />
            Search
        </Link>
        <Link to="/bookmarks" class="sidebar-link sidebar-link-with-icon">
            <span class="sidebar-icon ri ri-heart-fill" />
            Bookmarks
        </Link>
        <div class="sidebar-title">About</div>
        <div class="sidebar-content">
            <p>
                Ivatan Dictionary (Unofficial) is not official based from Ivatan
                barebone native language , more on an excerp from the Babuyan
                Islands.
            </p>
            <p>
                Due to circumstance, I am unable to fetch relevant Dictionary
                data to use, if you want to visit the page where this data is
                aquired visit this <a
                    href="https://philippines.sil.org/resources/online_resources/ivb"
                    >website</a
                >.
            </p>
        </div>
        {#if $installable.supported}
            <div class="sidebar-divider" />
            <div class="sidebar-content">
                <p class="text-danger">
                    NOTE: Older browser (later than 6 years) may or may not
                    support app installation or offline capabilities. it is
                    recommended to use updated browser
                </p>
            </div>
            <div class="sidebar-content">
                <button class="btn btn-block" on:click={() => onInstall()}>
                    Install
                </button>
            </div>
        {/if}
        <div class="sidebar-title">Share</div>
        <div class="sidebar-divider" />
        <div class="sidebar-content">
            <p>Share the App with Friends.</p>
        </div>
        <div class="sidebar-content">
            <button class="btn btn-block btn-primary" on:click={onShare}>
                Share
            </button>
        </div>
    </div>
</aside>

<div
    class="sidebar-overlay"
    on:click={() => halfmoon((e) => e.toggleSidebar())}
/>
