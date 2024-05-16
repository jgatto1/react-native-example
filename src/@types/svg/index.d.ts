declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGElement>>;
  export default ReactComponent;
}

declare module 'react-native-shadow';
