<script>
  /* Common layout for the inner site */
  import { AppShell, AppBar, GradientHeading } from '@brainandbones/skeleton';
</script>

<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4">
  <!-- Header -->
  <svelte:fragment slot="header">
    <AppBar>
      <svelte:fragment slot="lead">
        <GradientHeading
          tag="h1"
          direction="bg-gradient-to-br"
          from="from-primary-500"
          to="to-accent-500"
        >
          <a href="/">My site</a>
        </GradientHeading>
      </svelte:fragment>
      <svelte:fragment slot="trail">
        <a class="btn btn-sm" href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <!-- Sidebar -->
  <svelte:fragment slot="sidebarLeft">
    <nav class="list-nav">
      <ul>
        <li><a href="/landing">Landing</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  </svelte:fragment>
  <!-- Page Content Slot -->
  <slot />
</AppShell>
