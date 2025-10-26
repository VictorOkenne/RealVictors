import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

interface CommentIconProps {
  width?: number;
  height?: number;
  color?: string;
  style?: any;
}

export const CommentIcon: React.FC<CommentIconProps> = ({
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
        viewBox="0 0 23 23"
        fill="none"
      >
        {/* Main speech bubble using your design */}
        <Path
          d="M1.25 11.25C1.25 8.59783 2.30357 6.0543 4.17893 4.17893C6.0543 2.30357 8.59784 1.25 11.25 1.25C13.9022 1.25 16.4457 2.30357 18.3211 4.17893C20.1964 6.0543 21.25 8.59783 21.25 11.25V17.6125C21.25 18.6725 21.25 19.2 21.0925 19.6237C20.9673 19.9595 20.7713 20.2645 20.5179 20.5179C20.2645 20.7713 19.9595 20.9673 19.6237 21.0925C19.2 21.25 18.6712 21.25 17.6125 21.25H11.25C8.59784 21.25 6.0543 20.1964 4.17893 18.3211C2.30357 16.4457 1.25 13.9022 1.25 11.25Z"
          stroke={color}
          strokeWidth="2"
        />
        {/* Text lines inside bubble */}
        <Path
          d="M6.5 9.5H15.5"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <Path
          d="M6.5 13H12.5"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
};
