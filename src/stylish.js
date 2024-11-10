const stringify = (value, depth) => {
    if (typeof value !== 'object' || value === null) {
      return `${value}`;
    }
  
    const indent = ' '.repeat(depth * 4);
    const lines = Object.entries(value).map(([key, val]) => 
      `${indent}    ${key}: ${stringify(val, depth + 1)}`
    );
  
    return `{\n${lines.join('\n')}\n${indent}}`;
  };
  
  const stylishFormatter = (diffTree, depth = 1) => {
    const indentSize = depth * 4;
    const currentIndent = ' '.repeat(indentSize - 2);
    const bracketIndent = ' '.repeat(indentSize - 4);
  
    const lines = diffTree.map((node) => {
      const { key, type, value, oldValue, newValue, children } = node;
      
      switch (type) {
        case 'added':
          return `${currentIndent}+ ${key}: ${stringify(value, depth)}`;
        case 'deleted':
          return `${currentIndent}- ${key}: ${stringify(value, depth)}`;
        case 'unchanged':
          return `${currentIndent}  ${key}: ${stringify(value, depth)}`;
        case 'changed':
          return [
            `${currentIndent}- ${key}: ${stringify(oldValue, depth)}`,
            `${currentIndent}+ ${key}: ${stringify(newValue, depth)}`
          ].join('\n');
        case 'nested':
          return `${currentIndent}  ${key}: ${stylishFormatter(children, depth + 1)}`;
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    });
  
    return `{\n${lines.join('\n')}\n${bracketIndent}}`;
  };

  export default stylishFormatter;