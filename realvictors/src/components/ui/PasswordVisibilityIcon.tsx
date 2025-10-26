import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

interface PasswordVisibilityIconProps {
  isVisible: boolean;
  color?: string;
}

/**
 * PasswordVisibilityIcon - Reusable eye icon for password visibility toggle
 * 
 * Shows an open eye when password is hidden, closed/slashed eye when visible
 * 
 * @param isVisible - Whether the password is currently visible
 * @param color - Icon color (default: #827F7F)
 */
export const PasswordVisibilityIcon: React.FC<PasswordVisibilityIconProps> = ({ 
  isVisible, 
  color = '#827F7F' 
}) => (
  <Svg width={25} height={25} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
    {!isVisible && <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>}
    {!isVisible && <Circle cx="12" cy="12" r="3"/>}
    {isVisible && (
      <>
        <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
        <Path d="M1 1l22 22" strokeLinecap="round"/>
      </>
    )}
  </Svg>
);

export default PasswordVisibilityIcon;

