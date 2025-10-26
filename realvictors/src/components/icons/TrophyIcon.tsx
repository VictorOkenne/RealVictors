import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface TrophyIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const TrophyIcon: React.FC<TrophyIconProps> = ({ 
  width = 24, 
  height = 24, 
  color = 'white' 
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 9C6 10.5913 6.63214 12.1174 7.75736 13.2426C8.88258 14.3679 10.4087 15 12 15C13.5913 15 15.1174 14.3679 16.2426 13.2426C17.3679 12.1174 18 10.5913 18 9V4H6V9Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 9H3C3 10.0609 3.42143 11.0783 4.17157 11.8284C4.92172 12.5786 5.93913 13 7 13"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18 9H21C21 10.0609 20.5786 11.0783 19.8284 11.8284C19.0783 12.5786 18.0609 13 17 13"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 15V19"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 19H16"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default TrophyIcon;
