/**
 * FacebookIcon Component
 * 
 * Reusable Facebook icon for share functionality
 */

import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface FacebookIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const FacebookIcon: React.FC<FacebookIconProps> = ({
  width = 30,
  height = 30,
  color = '#1877F2',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 30 30" fill="none">
      <Path
        d="M30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 22.4869 5.48528 28.6925 12.6562 29.8177V19.3359H8.84766V15H12.6562V11.6953C12.6562 7.93594 14.8957 5.85938 18.3222 5.85938C19.9631 5.85938 21.6797 6.15234 21.6797 6.15234V9.84375H19.7883C17.925 9.84375 17.3438 11.0001 17.3438 12.1863V15H21.5039L20.8389 19.3359H17.3438V29.8177C24.5147 28.6925 30 22.4869 30 15Z"
        fill={color}
      />
    </Svg>
  );
};

