/**
 * MicrophoneIcon Component
 *
 * Voice note recording icon
 */

import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface MicrophoneIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const MicrophoneIcon: React.FC<MicrophoneIconProps> = ({
  width = 24,
  height = 24,
  color = '#000000',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 1C10.8954 1 10 1.89543 10 3V12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12V3C14 1.89543 13.1046 1 12 1Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19 10V12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12V10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 19V23"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 23H16"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default MicrophoneIcon;
