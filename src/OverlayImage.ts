import { xToPx, yToPx, lonToX, latToY } from './geo';
import { BBox, StaticMapCtx, RenderedImage } from './types';

export interface OverlayImage {
  bbox: BBox;
  url: string;
}

export type RenderedOverlayImage = RenderedImage;

export function processOverlayImage(map: StaticMapCtx, oi: OverlayImage): RenderedOverlayImage {
  const x = xToPx(map, lonToX(oi.bbox[0], map.zoom));
  const y = yToPx(map, latToY(oi.bbox[1], map.zoom));
  const width = xToPx(map, lonToX(oi.bbox[2], map.zoom)) - x;
  const height = yToPx(map, latToY(oi.bbox[3], map.zoom)) - y;
  return { href: oi.url, x, y: map.height - y, width, height };
}
