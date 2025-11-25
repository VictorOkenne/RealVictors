/**
 * PlayIcon Component
 *
 * Play icon for voice notes and media
 */

import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface PlayIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const PlayIcon: React.FC<PlayIconProps> = ({
  width = 24,
  height = 24,
  color = '#000000',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 3L19 12L5 21V3Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={color}
      />
    </Svg>
  );
};

export default PlayIcon;
