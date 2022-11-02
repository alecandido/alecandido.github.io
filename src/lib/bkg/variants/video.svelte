<script lang="ts">
  import { kinds } from '$lib/bkg/variants';
  export let animate = true;
  export let variant: string;

  let video: HTMLVideoElement;

  $: if (video) {
    if (animate) {
      video.play();
    } else {
      video.pause();
    }
  }

  let src = `/bkg/${variant}.mp4`;
  $: if (kinds.video.elements.includes(variant)) {
    src = `/bkg/${variant}.mp4`;
  }
</script>

<video bind:this={video} {src} autoplay={animate} muted loop class="max-w-none" />
