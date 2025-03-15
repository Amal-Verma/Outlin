import { rectangle } from '@/types/object_types';
import { objectToString } from './objectToString';

/**
 * Generates the style string for a rectangle.
 * @param rectangle - The rectangle to generate the style for.
 * @returns The generated style string.
 */
export const generateReactCodeDivStyle = (rectangle: rectangle) => {
  let style = '';
  const styleObj = rectangle.generateStyle(0, 0, 1);
  
  delete styleObj.position;
  delete styleObj.width;
  delete styleObj.height;
  delete styleObj.left;
  delete styleObj.top;

  style = objectToString(styleObj);
  style = style.slice(1, -1);

  return style;
}
