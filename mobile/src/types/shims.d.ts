// Type shims for vector icons in Expo to satisfy TypeScript in this project
declare module '@expo/vector-icons' {
  import type { ComponentType } from 'react';
  import type { TextProps } from 'react-native';
  export interface IconProps extends TextProps {
    name: string;
    size?: number;
    color?: string;
  }
  export const MaterialCommunityIcons: ComponentType<IconProps>;
  export const Feather: ComponentType<IconProps>;
}

declare module '@expo/vector-icons/build/createIconSet' {
  export type IconName = string;
}


