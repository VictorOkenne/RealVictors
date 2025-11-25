/**
 * PauseIcon Component
 *
 * Pause icon for voice notes and media
 */

import React from 'react';
import Svg, { Rect } from 'react-native-svg';

interface PauseIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const PauseIcon: React.FC<PauseIconProps> = ({
  width = 24,
  height = 24,
  color = '#000000',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Rect
        x="6"
        y="4"
        width="4"
        height="16"
        rx="1"
        fill={color}
      />
      <Rect
        x="14"
        y="4"
        width="4"
        height="16"
        rx="1"
        fill={color}
      />
    </Svg>
  );
};

export default PauseIcon;
