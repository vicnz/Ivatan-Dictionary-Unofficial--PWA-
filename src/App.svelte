<script context="module">
  import { writable } from "svelte/store";
  export const installable = writable({ instance: null, supported: false });
</script>

<script>
  $: sqlInstance = null;
  import { Router, Route } from "svelte-navigator";
  import Navbar from "./_layouts/Navbar.svelte";
  import Sidebar from "./_layouts/Sidebar.svelte";

  //routes
  import Search from "./_routes/Search.svelte";
  import Bookmarks from "./_routes/Bookmarks.svelte";
  import SearchResult from "./_routes/SearchResult.svelte";
  import DbProvider from "./_layouts/DBProvider.svelte";
  import { onMount } from "svelte";

  async function initializeDatabase() {
    const config = {
      locateFile: (filename) => "/scripts/sql-wasm.wasm",
    };
    const request = await fetch("/data.db");
    const data = new Uint8Array(await request.arrayBuffer());
    const sql = await window.initSqlJs(config);
    sqlInstance = sql;
    const favoritesInstance = localforage.createInstance({ name: "favorites" });
    const database = new sql.Database(data);
    return { database, favorites: favoritesInstance };
  }

  onMount(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      $installable = {
        instance: e,
        supported: true,
      };
    });

    return () => {
      sqlInstance.close();
    };
  });
</script>

<Router basepath="/">
  <div
    class="page-wrapper with-navbar with-sidebar"
    data-sidebar-type="overlayed-sm-and-down"
  >
    <div class="sticky-alerts" />
    <Sidebar />
    {#await initializeDatabase()}
      <div class="content-wrapper">
        <div
          class="wrapper h-full w-full"
          style="display:grid;place-items:center"
        >
          <div class="card border-0 bg-transparent text-center">
            <p>
              Initializing Dictionary Data, This may take several second(s) or a
              minute(s) based on your connection...
            </p>
            <hr />
            <p class="text-primary">
              If you are wondering if this message will show up every visit?,
              the answer is NO, this will only happen on first visit or when
              your browser cleans your browser data.
            </p>
          </div>
        </div>
      </div>
    {:then data}
      <Navbar />
      <div class="content-wrapper">
        <DbProvider db={data.database} favorites={data.favorites}>
          <Route path="/*">
            <!-- Search Root Page -->
            <Route path="/" component={Search} />
            <!-- Search Result Page -->
            <Route path="/search/:slug" let:params>
              <SearchResult slug={params.slug} />
            </Route>
          </Route>
          <!-- Bookmarks -->
          <Route path="/bookmarks" component={Bookmarks} />
        </DbProvider>
      </div>
    {/await}
  </div>
</Router>
