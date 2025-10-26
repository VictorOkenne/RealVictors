/**
 * XIcon Component (formerly Twitter)
 * 
 * Reusable X (Twitter) icon for share functionality
 */

import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface XIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const XIcon: React.FC<XIconProps> = ({
  width = 30,
  height = 30,
  color = '#000000',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 30 30" fill="none">
      <Path
        d="M23.6516 2.8125H27.9609L18.6094 13.6406L29.5312 27.1875H21.0938L14.2734 18.5547L6.5625 27.1875H2.25L12.2344 15.6641L1.6875 2.8125H10.3359L16.5234 10.7578L23.6516 2.8125ZM22.1719 24.7031H24.5859L9.14062 5.29688H6.5625L22.1719 24.7031Z"
        fill={color}
      />
    </Svg>
  );
};

