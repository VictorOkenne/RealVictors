/**
 * LeaderIcon Component
 *
 * Leader/leaderboard icon for bottom navigation
 */

import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface LeaderIconProps {
  width?: number;
  height?: number;
  color?: string;
  style?: any;
}

export const LeaderIcon: React.FC<LeaderIconProps> = ({
  width = 32,
  height = 32,
  color = 'black',
  style,
}) => {
  return (
    <View style={style}>
      <Svg width={width} height={height} viewBox="0 0 32 32" fill="none">
        {/* Left bar - filled */}
        <Path
          d="M5.17477 24.5798H10.3495V14.2303H5.17477V24.5798Z"
          fill={color}
        />
        {/* Middle bar - filled */}
        <Path
          d="M12.9369 24.5798H18.1116V6.46823H12.9369V24.5798Z"
          fill={color}
        />
        {/* Right bar - filled */}
        <Path
          d="M20.699 24.5798H25.8737V16.8177H20.699V24.5798Z"
          fill={color}
        />
      </Svg>
    </View>
  );
};

export default LeaderIcon;
