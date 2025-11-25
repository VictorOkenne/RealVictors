/**
 * RedCardIcon Component
 * 
 * Reusable red card icon for match events
 */

import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface RedCardIconProps extends SvgProps {
  size?: number;
}

export const RedCardIcon: React.FC<RedCardIconProps> = ({ 
  size = 15, 
  ...props 
}) => {
  return (
    <Svg
      width={size}
      height={size * (20/15)}
      viewBox="0 0 15 20"
      fill="none"
      {...props}
    >
      <Path
        d="M13.5 20H1.5C1.10218 20 0.720644 19.7366 0.43934 19.2678C0.158035 18.7989 0 18.163 0 17.5V2.5C0 1.83696 0.158035 1.20107 0.43934 0.732233C0.720644 0.263392 1.10218 0 1.5 0H13.5C13.8978 0 14.2794 0.263392 14.5607 0.732233C14.842 1.20107 15 1.83696 15 2.5V17.5C15 18.163 14.842 18.7989 14.5607 19.2678C14.2794 19.7366 13.8978 20 13.5 20Z"
        fill="#FF0000"
      />
    </Svg>
  );
};

