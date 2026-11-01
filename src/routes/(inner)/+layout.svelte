<script lang="ts">
  import { page } from '$app/state';
  import { resolve } from '$app/paths';
  import Switcher from '#lib/theme/switcher.svelte';
  import { profile } from '#lib/content/profile.js';
  import { generated } from '#lib/data/index.js';

  let { children } = $props();

  const sections = [
    { href: resolve('/(inner)/about'), label: 'About' },
    { href: resolve('/(inner)/journey'), label: 'Journey' },
    { href: resolve('/(inner)/projects'), label: 'Projects' },
    { href: resolve('/(inner)/activity'), label: 'Activity' }
  ];

  const active = (href: string) => page.url.pathname.replace(/\/$/, '') === href.replace(/\/$/, '');
</script>

<div class="min-h-dvh flex flex-col">
  <header class="sticky top-0 z-30 backdrop-blur bg-bg/85 border-b border-line">
    <div class="mx-auto max-w-5xl px-5 h-14 flex items-center gap-4">
      <a href={resolve('/')} class="font-display font-semibold text-lg no-underline shrink-0">
        {profile.name}
      </a>
      <nav class="ml-auto flex items-center gap-1 sm:gap-2 overflow-x-auto" aria-label="Sections">
        {#each sections as s (s.href)}
          <a
            href={s.href}
            class="navlink px-2.5 py-1.5 rounded-t text-sm no-underline whitespace-nowrap"
            class:is-active={active(s.href)}
            aria-current={active(s.href) ? 'page' : undefined}
          >
            {s.label}
          </a>
        {/each}
      </nav>
      <Switcher />
    </div>
  </header>

  <main class="mx-auto w-full max-w-5xl px-5 py-10 flex-1">
    {@render children()}
  </main>

  <footer class="border-t border-line mt-16">
    <div
      class="mx-auto max-w-5xl px-5 py-6 flex flex-wrap gap-x-6 gap-y-2 items-center text-xs text-muted"
    >
      <span>© {new Date().getFullYear()} {profile.name}</span>
      <a href={resolve('/(inner)/credits')} class="link">Credits</a>
      <a href="https://github.com/alecandido/alecandido.github.io" class="link">Source</a>
      <span class="ml-auto">
        Data refreshed {generated.toLocaleDateString('en', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}
      </span>
    </div>
  </footer>
</div>

<style>
  .navlink {
    color: var(--c-muted);
    transition:
      color var(--dur) var(--ease),
      background-color var(--dur) var(--ease);
  }
  .navlink:hover {
    color: var(--c-fg);
    background: var(--c-accent-soft);
  }
  .navlink.is-active {
    color: var(--c-fg);
    box-shadow: inset 0 -2px 0 var(--c-accent);
  }
</style>
