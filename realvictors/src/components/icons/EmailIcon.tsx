/**
 * EmailIcon Component
 * 
 * Reusable Email icon for share functionality
 */

import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface EmailIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const EmailIcon: React.FC<EmailIconProps> = ({
  width = 30,
  height = 30,
  color = '#000000',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 30 30" fill="none">
      <Path
        d="M26.25 5.625H3.75C2.71875 5.625 1.875 6.46875 1.875 7.5V22.5C1.875 23.5312 2.71875 24.375 3.75 24.375H26.25C27.2812 24.375 28.125 23.5312 28.125 22.5V7.5C28.125 6.46875 27.2812 5.625 26.25 5.625ZM25.4062 8.20312L15 15.4688L4.59375 8.20312H25.4062ZM3.75 22.5V9.32812L14.5781 17.0156C14.7188 17.1094 14.8594 17.1562 15 17.1562C15.1406 17.1562 15.2812 17.1094 15.4219 17.0156L26.25 9.32812V22.5H3.75Z"
        fill={color}
      />
    </Svg>
  );
};

