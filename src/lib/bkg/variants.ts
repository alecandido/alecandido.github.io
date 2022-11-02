export enum SVG {
  vvvortex = 'vvvortex'
}

export enum Video {
  mountainRiver = 'mountain-river',
  mountain = 'mountain',
  waterfall = 'waterfall',
  wave = 'wave'
}

export enum Kind {
  svg = 'svg',
  video = 'video'
}

export type KindProps = { icon: string; elements: string[] };
export const kinds: { [key: string]: KindProps } = {
  svg: { icon: '🎴', elements: Object.keys(SVG) },
  video: { icon: '📽️', elements: Object.values(Video) }
};
