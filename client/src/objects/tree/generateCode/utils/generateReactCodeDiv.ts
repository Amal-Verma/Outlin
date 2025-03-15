import { node } from '@/types/object_types';
import { generateReactCodeDivStyle } from './generateReactCodeDivStyle';

/**
 * Generates the React code for a div element.
 * @param parent - The parent node.
 * @param rectangle - The rectangle node.
 * @param child - The child elements as a string.
 * @returns The generated React code for the div element.
 */
export const generateReactCodeDiv = (parent: node, rectangle: node, child: string) => {
  const width = Math.abs((rectangle.body.Essentials.width / parent.body.Essentials.width)) * 100;
  const height = Math.abs((rectangle.body.Essentials.height / parent.body.Essentials.height)) * 100;
  const left = Math.abs(((rectangle.body.Essentials.x - parent.body.Essentials.x) / parent.body.Essentials.width)) * 100;
  const top = Math.abs(((rectangle.body.Essentials.y - parent.body.Essentials.y) / parent.body.Essentials.height)) * 100;

  let out =   `
  <${rectangle.body.Essentials.tag}
    style={{position: 'absolute', left: '${left}%', top: '${top}%', width: '${width}%', height: '${height}%',${generateReactCodeDivStyle(rectangle.body)}}}
  >`

  if (rectangle.body.Essentials.text.length) {
    out += '\n  ' +  rectangle.body.Essentials.text;
  }

  if (child.length) {
    child.split('\n').forEach((line) => {
      out += '\n  ' + line;
    });
  }

  out +=  `\n  </${rectangle.body.Essentials.tag}>`;
  
  return (
    out
  );
}
