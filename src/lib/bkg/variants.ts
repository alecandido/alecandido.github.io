export enum SVG {
  vvvortex = 'vvvortex'
}

export enum Kind {
  svg = 'svg',
  video = 'video'
}

export const kinds: { [key: string]: { icon: string; elements: string[] } } = {
  svg: { icon: '🎴', elements: Object.keys(SVG) },
  video: { icon: '📽️', elements: [] }
};
