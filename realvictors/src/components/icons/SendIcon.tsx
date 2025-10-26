import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

interface SendIconProps {
  width?: number;
  height?: number;
  color?: string;
  style?: any;
}

export const SendIcon: React.FC<SendIconProps> = ({
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
        viewBox="0 0 24 24"
        fill="none"
      >
        <Path
          d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z"
          fill={color}
        />
      </Svg>
    </View>
  );
};
