import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

interface HeartIconProps {
  width?: number;
  height?: number;
  color?: string;
  filled?: boolean;
  style?: any;
}

export const HeartIcon: React.FC<HeartIconProps> = ({
  width = 30,
  height = 30,
  color = 'black',
  filled = false,
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
        <Path
          d="M9.37512 5C5.57825 5 2.50012 8.07813 2.50012 11.875C2.50012 18.75 10.6251 25 15.0001 26.4538C19.3751 25 27.5001 18.75 27.5001 11.875C27.5001 8.07813 24.422 5 20.6251 5C18.3001 5 16.2439 6.15438 15.0001 7.92125C14.3661 7.01837 13.5238 6.28151 12.5447 5.77302C11.5656 5.26453 10.4784 4.99938 9.37512 5Z"
          stroke={filled ? '#FF0000' : color}
          fill={filled ? '#FF0000' : 'none'}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};
