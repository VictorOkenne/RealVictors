/**
 * BasketballCourtIcon Component
 *
 * Simple basketball court icon for matches tab
 */

import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

interface BasketballCourtIconProps {
  width?: number;
  height?: number;
  color?: string;
  style?: any;
}

export const BasketballCourtIcon: React.FC<BasketballCourtIconProps> = ({
  width = 30,
  height = 30,
  color = '#FFFFFF',
  style,
}) => {
  return (
    <View style={style}>
      <Svg
        width={width}
        height={height}
        viewBox="0 0 30 30"
        fill="none"
      >
        {/* Filled background court */}
        <Rect
          x="2"
          y="5"
          width="26"
          height="20"
          fill={color}
        />

        {/* Outer boundary - dark outline */}
        <Rect
          x="2"
          y="5"
          width="26"
          height="20"
          fill="none"
          stroke="#000000"
          strokeWidth="1.5"
          opacity={0.3}
        />

        {/* Center line - dark vertical line */}
        <Rect
          x="14.2"
          y="5"
          width="1.5"
          height="20"
          fill="#000000"
          opacity={1}
        />

        {/* Center circle - dark outline */}
        <Circle
          cx="15"
          cy="15"
          r="2.5"
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          opacity={1}
        />

        {/* LEFT three-point arc - shortened height */}
        <Path
          d="M 2 10 A 7 5 0 0 1 2 20"
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          opacity={1}
        />

        {/* RIGHT three-point arc - shortened height */}
        <Path
          d="M 28 10 A 7 5 0 0 0 28 20"
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          opacity={1.0}
        />
      </Svg>
    </View>
  );
};

export default BasketballCourtIcon;

