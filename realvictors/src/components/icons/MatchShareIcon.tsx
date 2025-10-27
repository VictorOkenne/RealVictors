/**
 * MatchShareIcon Component
 * 
 * SVG icon for match sharing functionality
 */

import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface MatchShareIconProps {
  size?: number;
  color?: string;
  style?: any;
}

export const MatchShareIcon: React.FC<MatchShareIconProps> = ({
  size = 17,
  color = 'white',
  style,
}) => {
  return (
    <Svg
      width={size}
      height={size * (19/17)} // Maintain aspect ratio
      viewBox="0 0 17 19"
      fill="none"
      style={style}
    >
      <Path
        d="M8.48479 2.12115V11.1363M11.6666 4.24237L8.48479 1.06055L5.30297 4.24237M1.06055 9.5454V14.8484C1.06055 15.411 1.28403 15.9505 1.68184 16.3483C2.07964 16.7462 2.61918 16.9696 3.18176 16.9696H13.7878C14.3504 16.9696 14.8899 16.7462 15.2877 16.3483C15.6855 15.9505 15.909 15.411 15.909 14.8484V9.5454"
        stroke={color}
        strokeWidth="2.12121"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
