import type { Component } from 'svelte';

export type Credit = { name: string; url: string };

export type Video = {
  id: string;
  title: string;
  /** Where the clip comes from; `null` for the author's own footage. */
  source: { page: string; credit: Credit } | null;
};

/** Background clips, in static/bkg/<id>.{webm,mp4,webp}. Licence: Pexels. */
export const videos: Video[] = [
  { id: 'mountain', title: 'Mountain', source: null },
  { id: 'mountain-river', title: 'Mountain river', source: null },
  { id: 'waterfall', title: 'Waterfall', source: null },
  { id: 'wave', title: 'Wave', source: null },
  {
    id: 'waves-aerial',
    title: 'Beach waves from above',
    source: {
      page: 'https://www.pexels.com/video/34500343/',
      credit: { name: 'Fahad Baig', url: 'https://www.pexels.com/@fahad-baig-2542650' }
    }
  },
  {
    id: 'jellyfish',
    title: 'Jellyfish',
    source: {
      page: 'https://www.pexels.com/video/18882089/',
      credit: { name: 'Alvin David', url: 'https://www.pexels.com/@alvinbcd' }
    }
  },
  {
    id: 'particles',
    title: 'Particle waves',
    source: {
      page: 'https://www.pexels.com/video/7101913/',
      credit: { name: 'Nicola Narracci', url: 'https://www.pexels.com/@nicola-narracci-157460431' }
    }
  },
  {
    id: 'aurora',
    title: 'Aurora time-lapse',
    source: {
      page: 'https://www.pexels.com/video/28889010/',
      credit: { name: 'Alexey Chudin', url: 'https://www.pexels.com/@chudin-alexey' }
    }
  },
  {
    id: 'city-night',
    title: 'City at night, from above',
    source: {
      page: 'https://www.pexels.com/video/33637800/',
      credit: { name: 'Artur Vander PiloT', url: 'https://www.pexels.com/@fotopilot' }
    }
  },
  {
    id: 'clouds',
    title: 'Clouds over green mountains',
    source: {
      page: 'https://www.pexels.com/video/8025691/',
      credit: { name: 'Yaroslav Shuraev', url: 'https://www.pexels.com/@yaroslav-shuraev' }
    }
  },
  {
    id: 'lava',
    title: 'Lava flow',
    source: {
      page: 'https://www.pexels.com/video/20217377/',
      credit: { name: 'Gylfi Gylfason', url: 'https://www.pexels.com/@just-icelandic' }
    }
  },
  {
    id: 'snow-ridge',
    title: 'Snow ridge by drone',
    source: {
      page: 'https://www.pexels.com/video/36111065/',
      credit: { name: 'Ahmet Mert', url: 'https://www.pexels.com/@ahmetmert' }
    }
  }
];

export type Pattern = {
  id: string;
  title: string;
  /** Loaded lazily: only the chosen pattern's code reaches the browser. */
  load: () => Promise<{ default: Component<{ animate: boolean }> }>;
};

/** Animated SVG backgrounds, inspired by the generators at fffuel.co. */
export const patterns: Pattern[] = [
  { id: 'vortex', title: 'Vortex', load: () => import('./patterns/vortex.svelte') },
  { id: 'oscillate', title: 'Oscillate', load: () => import('./patterns/oscillate.svelte') },
  { id: 'spiral', title: 'Spiral', load: () => import('./patterns/spiral.svelte') },
  { id: 'horizon', title: 'Horizon', load: () => import('./patterns/horizon.svelte') },
  { id: 'flux', title: 'Flux', load: () => import('./patterns/flux.svelte') },
  { id: 'twinkle', title: 'Twinkle', load: () => import('./patterns/twinkle.svelte') },
  { id: 'gyrate', title: 'Gyrate', load: () => import('./patterns/gyrate.svelte') }
];

export type Choice = { kind: 'video'; video: Video } | { kind: 'pattern'; pattern: Pattern };

/** Pick a background at random: patterns and videos with equal weight. */
export function pick(random = Math.random): Choice {
  if (random() < 0.5) {
    return { kind: 'pattern', pattern: patterns[Math.floor(random() * patterns.length)] };
  }
  return { kind: 'video', video: videos[Math.floor(random() * videos.length)] };
}
