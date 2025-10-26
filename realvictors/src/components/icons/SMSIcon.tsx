/**
 * SMSIcon Component
 * 
 * Reusable SMS icon for share functionality
 */

import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface SMSIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const SMSIcon: React.FC<SMSIconProps> = ({
  width = 30,
  height = 30,
  color = '#000000',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 30 30" fill="none">
      <Path
        d="M25.3125 3.75H4.6875C3.23438 3.75 2.01562 4.96875 2.01562 6.42188L2.01562 26.25L6.5625 21.5625H25.3125C26.7656 21.5625 28.125 20.3438 28.125 18.8906V6.42188C28.125 4.96875 26.7656 3.75 25.3125 3.75ZM25.3125 18.8906H5.67188L4.6875 19.875V6.42188H25.3125V18.8906ZM7.5 11.25H11.25V15H7.5V11.25ZM13.125 11.25H16.875V15H13.125V11.25ZM18.75 11.25H22.5V15H18.75V11.25Z"
        fill={color}
      />
    </Svg>
  );
};

