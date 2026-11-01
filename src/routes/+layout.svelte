<script lang="ts">
  import 'virtual:uno.css';
  import '@fontsource-variable/albert-sans';
  import '@fontsource-variable/noto-sans';
  import '@fontsource/stick-no-bills/700.css';
  import '@fontsource/stick-no-bills/800.css';
  import '@fontsource/orbitron/500.css';
  import '@fontsource/orbitron/700.css';
  import '@fontsource-variable/jetbrains-mono';
  import '#lib/theme/themes.css';

  let { children } = $props();
</script>

{@render children()}
