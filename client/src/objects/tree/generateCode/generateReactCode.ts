import { tree, node } from '@/types';
import { generateReactCodeDiv } from './utils/generateReactCodeDiv';

/**
 * Generates the React code for the tree.
 * @param tree - The tree to generate the React code for.
 * @returns The generated React code as a string.
 */
export const generateReactCode = (tree: tree) => {
  const tab = '    ';
  let reactCode = `import React from 'react'

const GeneratedComponent = () => {
  return (
    <div style={{position: 'absolute', width: '100%', height: '100vh'}}>`

  const generateReactCodeHelper = (parent: node, node: node) => {
    let children = '';
    for (let i = 0; i < node.children.length; i++) {
      children += generateReactCodeHelper(node, node.children[i]);
    }
    return generateReactCodeDiv(parent, node, children);
  }

  for (let i = 0; i < tree.root.children.length; i++) {
    const tempCode = generateReactCodeHelper(tree.root, tree.root.children[i]);
    tempCode.split('\n').forEach((line: string) => {
      reactCode += '\n' + tab + line;
    });
  }

  reactCode += `
  
  </div>
  )
}

export default GeneratedComponent`
  return reactCode;
}