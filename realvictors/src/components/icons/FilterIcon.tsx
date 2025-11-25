/**
 * FilterIcon Component
 *
 * A filter/funnel icon used for filtering content
 */

import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface FilterIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const FilterIcon: React.FC<FilterIconProps> = ({
  width = 20,
  height = 20,
  color = 'black',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M2.5 3.75L8.5 10.7575V16.0183L11.5 17.5V10.7575L17.5 3.75H2.5Z"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
