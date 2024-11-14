import stylishFormatter from './stylish.js';
import plainFormatter from './plain.js';

export default (format) => {
  switch (format) {
    case 'plain':
      return plainFormatter;
    case 'stylish':
    default:
      return stylishFormatter;
  }
};
