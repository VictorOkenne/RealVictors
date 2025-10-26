import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

interface ShareIconProps {
  width?: number;
  height?: number;
  color?: string;
  style?: any;
}

export const ShareIcon: React.FC<ShareIconProps> = ({
  width = 30,
  height = 30,
  color = 'black',
  style,
}) => {
  return (
    <View style={style}>
      <Svg
        width={width}
        height={height}
        viewBox="0 0 26 22"
        fill="none"
      >
        <Path
          d="M24.6875 10.9375L0.937523 20.9375L5.39127 10.9375L0.937523 0.9375L24.6875 10.9375ZM24.6875 10.9375H5.31252"
          stroke={color}
          strokeWidth="1.875"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};
