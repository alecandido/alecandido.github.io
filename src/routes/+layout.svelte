<script>
  import '@brainandbones/skeleton/themes/theme-skeleton.css';
  import '@brainandbones/skeleton/styles/all.css';
  import '../app.postcss';

  import { AppShell, AppBar, GradientHeading } from '@brainandbones/skeleton';
</script>

<AppShell>
  <!-- Sidebar -->
  <AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4" />

  <svelte:fragment slot="sidebarLeft">
    <!-- Insert the list: -->
    <nav class="list-nav">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
    <!-- --- -->
  </svelte:fragment>

  <!-- Page Content Slot -->
  <slot />
</AppShell>
