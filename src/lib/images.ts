import architecture from '../assets/images/architecture.jpg';
import construction from '../assets/images/construction.jpg';
import design from '../assets/images/design.jpg';
import heroVilla from '../assets/images/hero-villa.jpg';
import interior from '../assets/images/interior.jpg';
import poolVilla from '../assets/images/pool-villa.jpg';
import type { ImageMetadata } from 'astro';

export const images = {
  architecture,
  construction,
  design,
  'hero-villa': heroVilla,
  interior,
  'pool-villa': poolVilla,
} satisfies Record<string, ImageMetadata>;

export type ImageKey = keyof typeof images;

export function getImage(key: string): ImageMetadata {
  return images[key as ImageKey] ?? heroVilla;
}
