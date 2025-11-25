/**
 * PinIcon Component
 *
 * Pin/bookmark icon for pinning conversations
 */

import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface PinIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const PinIcon: React.FC<PinIconProps> = ({
  width = 24,
  height = 24,
  color = '#000000',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16 3V7L13 10L13 21L11 21L11 10L8 7V3L16 3Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 2L15 2"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default PinIcon;
