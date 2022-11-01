// https://fffuel.co/vvvortex/
import { SVG } from '@svgdotjs/svg.js';

function random(max: number, min: number): number {
  return Math.random() * (max - min) + min;
}
function map(n: number, start1: number, end1: number, start2: number, end2: number) {
  return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}

export type DataVvvortex = {
  bgColor: string;
  frequency: number;
  fillType: string;
  fills: string[];
  fill: string;
  modOpacity: string;
  lineCap: string;
  scaleConstant: number;
  baseStrokeWidth: number;
  width: number;
  height: number;
};

export default function (element: HTMLElement) {
  const data: DataVvvortex = JSON.parse(element.dataset.vvvortex);

  const svg = SVG().addTo(element).viewbox(0, 0, data.width, data.height).attr('id', 'vvvortex');
  // .attr("preserveAspectRatio", "xMidYMid slice");

  // svg.clear();

  if (data.fillType === 'gradient') {
    svg
      .defs()
      .add(
        `<linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="vvvortex-grad"><stop stop-color="${data.fills[0]}" stop-opacity="1" offset="0%"></stop><stop stop-color="${data.fills[1]}" stop-opacity="1" offset="100%"></stop></linearGradient>`
      );
  }

  let circleGroup = svg
    .group()
    .stroke({ color: data.fillType === 'gradient' ? 'url(#vvvortex-grad)' : data.fill })
    .fill(data.bgColor)
    .attr('stroke-linecap', data.lineCap)
    .attr('id', 'vvvortex-circles');

  console.log(data.frequency);
  for (let i = data.frequency; i >= 1; i--) {
    // make stroke a little larger/thinner on the outside/inner edges
    let strokeWidth;
    if (data.baseStrokeWidth >= 3) {
      strokeWidth = Math.round(
        map(i, data.frequency, 1, +data.baseStrokeWidth + 4, +data.baseStrokeWidth - 2)
      );
    } else {
      strokeWidth = Math.round(
        map(i, data.frequency, 1, +data.baseStrokeWidth + 4, +data.baseStrokeWidth)
      );
    }

    let dash;
    let gap;

    if (data.baseStrokeWidth >= 12) {
      dash = Math.round(random(30, 77));
      gap = Math.round(random(30, 77));
    } else {
      dash = Math.round(random(10, 55));
      gap = Math.round(random(10, 55));
    }

    const circle = circleGroup
      .circle(i * data.scaleConstant)
      .stroke({ width: strokeWidth })
      .cx(data.width / 2)
      .cy(data.height / 2)
      .attr('stroke-dasharray', `${dash} ${gap}`)
      .attr('stroke-dashoffset', '25')
      .attr(
        'transform',
        `rotate(${Math.round(random(0, 360))}, ${data.width / 2}, ${data.height / 2})`
      );

    if (data.modOpacity === 'random') {
      circle.opacity(parseFloat(random(0.07, 1).toFixed(2)));
    } else if (data.modOpacity === 'fade') {
      const fadeVal = map(i, data.frequency, 1, 0.05, 1);
      circle.opacity(parseFloat(fadeVal.toFixed(2)));
    } else if (data.modOpacity === 'fade-in') {
      const fadeVal = map(i, data.frequency, 1, 1, 0.05);
      circle.opacity(parseFloat(fadeVal.toFixed(2)));
    }
  }
}
