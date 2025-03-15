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
  const width = Math.abs((rectangle.body.attributes.Essentials.width / parent.body.attributes.Essentials.width)) * 100;
  const height = Math.abs((rectangle.body.attributes.Essentials.height / parent.body.attributes.Essentials.height)) * 100;
  const left = Math.abs(((rectangle.body.attributes.Essentials.x - parent.body.attributes.Essentials.x) / parent.body.attributes.Essentials.width)) * 100;
  const top = Math.abs(((rectangle.body.attributes.Essentials.y - parent.body.attributes.Essentials.y) / parent.body.attributes.Essentials.height)) * 100;

  let out =   `
  <${rectangle.body.attributes.Essentials.tag}
    style={{position: 'absolute', left: '${left}%', top: '${top}%', width: '${width}%', height: '${height}%',${generateReactCodeDivStyle(rectangle.body)}}}
  >`

  if (rectangle.body.attributes.Essentials.text.length) {
    out += '\n  ' +  rectangle.body.attributes.Essentials.text;
  }

  if (child.length) {
    child.split('\n').forEach((line) => {
      out += '\n  ' + line;
    });
  }

  out +=  `\n  </${rectangle.body.attributes.Essentials.tag}>`;
  
  return (
    out
  );
}
