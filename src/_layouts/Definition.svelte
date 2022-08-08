<script>
    import { halfmoon } from "../_utils/loadHalfmoon";
    import { navigate } from "svelte-navigator";
    export let data;
    export let key;

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

<div class="card p-0 m-0 my-10">
    <div class="alert alert-primary p-card border-0 rounded-0">
        <div class="d-flex align-items-center justify-content-between">
            <span>
                <span class="badge badge-pill">{key + 1}</span>
                &nbsp;
                {data.type.toUpperCase()}
            </span>
            <span>
                {#if data.variant.ivatan}
                    <span
                        data-toggle="tooltip"
                        data-title="Ivatan"
                        class="badge ml-5">{data.variant.ivatan}</span
                    >
                {/if}
                {#if data.variant.ilokano}
                    <span
                        data-toggle="tooltip"
                        data-title="Ilokano"
                        class="badge ml-5">{data.variant.ilokano}</span
                    >
                {/if}
                {#if data.variant.taglog}
                    <span
                        data-toggle="tooltip"
                        data-title="Tagalog"
                        class="badge ml-5">{data.variant.tagalog}</span
                    >
                {/if}
            </span>
        </div>
    </div>
    <div class="p-card">
        <p class="selectable">
            {data.description}
            &nbsp;
            <button
                class="btn btn-sm shadow-none btn-square"
                data-title="Copy Text"
                data-toggle="tooltip"
                on:click={() => share(data.description)}
            >
                <span class="ri ri-file-copy-line" />
            </button>
        </p>
        <hr />
        {#if data.cultural_note}
            <p>
                Cultural Note:
                <span class="text-muted font-italic selectable"
                    >"{data.cultural_note}"</span
                >
            </p>
        {/if}
        {#if data.grammar}
            <p>
                Grammar:
                <span class="text-muted">
                    {data.grammar}
                </span>
            </p>
        {/if}
        {#if data.semantics}
            <p>
                Semantics:
                <span class="text-muted">
                    {data.semantics}
                </span>
            </p>
        {/if}
        {#if data.morphophonemics}
            <p>
                Morphonemics:
                {#each data.morphophonemics[0].split(",") as morphonemic}
                    <span class="badge ml-10">{morphonemic}</span>
                {/each}
            </p>
        {/if}
        {#if data.related}
            <p>
                Related:
                {#each data.related as related}
                    <button
                        class="btn btn-link ml-10 btn-sm"
                        on:click={() => navigate(`/search/${related}`)}
                    >
                        {related}
                    </button>
                {/each}
            </p>
        {/if}
        {#if data.synonym}
            <p>
                Synonyms:
                {#each data.synonym as synonym}
                    <button
                        class="btn btn-link ml-10 btn-sm"
                        on:click={() => navigate(`/search/${synonym}`)}
                    >
                        {synonym}
                    </button>
                {/each}
            </p>
        {/if}
        {#if data.antonym}
            <p>
                Antonyms:
                {#each data.antonym as antonym}
                    <button
                        class="btn btn-link ml-10 btn-sm"
                        on:click={() => navigate(`/search/${antonym}`)}
                    >
                        {antonym}
                    </button>
                {/each}
            </p>
        {/if}
        {#if data.samples.length > 0}
            <hr />
            <p class="font-weight-semi-bold">Samples:</p>

            {#each data.samples as sample, idx}
                <div
                    class="p-10 bg-light-lm rounded bg-very-dark-dm"
                    style="border-left: solid lightgrey 2px"
                >
                    <p class="text-muted font-italic">Inv: "{sample.sample}"</p>
                    <p class="text-muted">En: "{sample.translation}"</p>
                </div>
                <div class="text-center">
                    <span class="ri ri-separator" />
                </div>
            {/each}
        {/if}
    </div>
</div>
