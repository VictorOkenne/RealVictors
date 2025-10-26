/**
 * LinkIcon Component
 * 
 * Reusable Link icon for share functionality
 */

import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface LinkIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const LinkIcon: React.FC<LinkIconProps> = ({
  width = 30,
  height = 30,
  color = '#000000',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 30 30" fill="none">
      <Path
        d="M13.9453 16.0547C14.3672 16.5938 14.8828 17.0391 15.4688 17.3906C16.0547 17.7422 16.7344 17.9297 17.4375 17.9297C18.1406 17.9297 18.8203 17.7422 19.4062 17.3906C19.9922 17.0391 20.5078 16.5938 20.9297 16.0547L24.6797 12.3047C25.5469 11.3672 26.0156 10.125 26.0156 8.85938C26.0156 7.59375 25.5469 6.35156 24.6797 5.41406C23.7422 4.54688 22.5 4.07812 21.2344 4.07812C19.9688 4.07812 18.7266 4.54688 17.7891 5.41406L16.0312 7.19531"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.0547 13.9453C15.6328 13.4062 15.1172 12.9609 14.5312 12.6094C13.9453 12.2578 13.2656 12.0703 12.5625 12.0703C11.8594 12.0703 11.1797 12.2578 10.5938 12.6094C10.0078 12.9609 9.49219 13.4062 9.07031 13.9453L5.32031 17.6953C4.45312 18.6328 3.98438 19.875 3.98438 21.1406C3.98438 22.4062 4.45312 23.6484 5.32031 24.5859C6.25781 25.4531 7.5 25.9219 8.76562 25.9219C10.0312 25.9219 11.2734 25.4531 12.2109 24.5859L13.9688 22.8047"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

