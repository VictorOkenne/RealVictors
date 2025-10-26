import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

interface BookmarkIconProps {
  width?: number;
  height?: number;
  color?: string;
  filled?: boolean;
  style?: any;
}

export const BookmarkIcon: React.FC<BookmarkIconProps> = ({
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
          d="M7.37375 7.50293C7.37375 6.10293 7.37375 5.40293 7.64625 4.86793C7.88593 4.39755 8.26836 4.01511 8.73875 3.77543C9.27375 3.50293 9.97375 3.50293 11.3737 3.50293H18.3737C19.7737 3.50293 20.4737 3.50293 21.0087 3.77543C21.4791 4.01511 21.8616 4.39755 22.1012 4.86793C22.3737 5.40293 22.3737 6.10293 22.3737 7.50293V24.1342C22.3737 24.7417 22.3737 25.0454 22.2475 25.2117C22.1929 25.284 22.1233 25.3436 22.0435 25.3863C21.9636 25.429 21.8754 25.4539 21.785 25.4592C21.5762 25.4717 21.3237 25.3029 20.8187 24.9667L14.8737 21.0029L8.92875 24.9654C8.42375 25.3029 8.17125 25.4717 7.96125 25.4592C7.87104 25.4537 7.78309 25.4288 7.70346 25.386C7.62383 25.3433 7.55442 25.2838 7.5 25.2117C7.37375 25.0454 7.37375 24.7417 7.37375 24.1342V7.50293Z"
          stroke={color}
          fill={filled ? color : 'none'}
          strokeWidth="1.875"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};
