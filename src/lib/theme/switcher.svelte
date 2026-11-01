<script lang="ts">
  import { themes } from './themes.js';
  import { theme, setTheme } from './theme.svelte.ts';

  let open = $state(false);
  let root: HTMLElement | undefined = $state();

  const current = $derived(themes.find((t) => t.id === theme.current) ?? themes[0]);

  function onDocumentClick(event: MouseEvent) {
    if (open && root && !root.contains(event.target as Node)) open = false;
  }
  function onKey(event: KeyboardEvent) {
    if (event.key === 'Escape') open = false;
  }
</script>

<svelte:document onclick={onDocumentClick} onkeydown={onKey} />

<div class="relative" bind:this={root}>
  <button
    type="button"
    class="btn-ghost bg-surface text-sm px-3 py-1.5 shadow-[var(--shadow)]"
    aria-haspopup="listbox"
    aria-expanded={open}
    aria-label="Change theme"
    onclick={() => (open = !open)}
  >
    <span class="swatch" aria-hidden="true">
      {#each current.swatch as c (c)}<i style:background={c}></i>{/each}
    </span>
    <span class="hidden sm:inline">{current.name}</span>
  </button>

  {#if open}
    <ul
      role="listbox"
      aria-label="Theme"
      class="card !absolute right-0 mt-2 w-64 p-1.5 z-50 list-none m-0 shadow-[var(--shadow-lg)]"
    >
      {#each themes as t (t.id)}
        <li
          role="option"
          aria-selected={t.id === theme.current}
          class="flex items-center gap-3 rounded-ts px-2.5 py-2 cursor-pointer hover:bg-accent-soft"
          class:bg-accent-soft={t.id === theme.current}
          onclick={() => {
            setTheme(t.id);
            open = false;
          }}
          onkeydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setTheme(t.id);
              open = false;
            }
          }}
          tabindex="0"
        >
          <span class="swatch" aria-hidden="true">
            {#each t.swatch as c (c)}<i style:background={c}></i>{/each}
          </span>
          <span class="flex flex-col leading-tight">
            <span class="font-medium text-sm">{t.name}</span>
            <span class="text-xs text-muted">{t.description}</span>
          </span>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .swatch {
    display: inline-flex;
    gap: 2px;
    padding: 2px;
    border-radius: 999px;
    border: 1px solid var(--c-line);
    background: var(--c-surface);
  }
  .swatch i {
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
</style>
