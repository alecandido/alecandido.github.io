<script lang="ts">
  export let animate = true;

  let video: HTMLVideoElement;

  $: if (video) {
    if (animate) {
      video.play();
    } else {
      video.pause();
    }
  }
</script>

<video bind:this={video} autoplay={animate} muted loop class="max-w-none">
  <source src="/bkg/mountain-river.mp4" type="video/mp4" />
</video>
