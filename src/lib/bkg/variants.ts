export enum SVG {
  vvvortex = 'vvvortex'
}

export enum Kind {
  svg = 'svg',
  video = 'video'
}

export const kinds: { [key: string]: string[] } = { svg: Object.keys(SVG), video: [] };
