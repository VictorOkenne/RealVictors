/**
 * BasketballCourtLayout Widget
 *
 * Full basketball court layout with field lines
 * Used for displaying complete basketball court views
 * Rotated 90 degrees to display vertically
 */

import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path, Mask, Circle } from 'react-native-svg';

interface BasketballCourtLayoutProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  style?: any;
  isAwayTeam?: boolean; // Determines which side to crop
}

export const BasketballCourtLayout: React.FC<BasketballCourtLayoutProps> = ({
  width,
  height,
  color = '#E05D1B',
  style,
  isAwayTeam = false,
}) => {
  // Use 100% if style is provided, otherwise use defaults
  const svgWidth = width || (style ? '100%' : 432);
  const svgHeight = height || (style ? '100%' : 784);

  // Crop the court to reduce empty space
  // For home team: crop the top (show bottom part where players are)
  // For away team: crop the bottom (show top part where flipped players are)
  const cropAmount = 230; // pixels to crop
  const viewBoxHeight = 554; // remaining visible height after crop
  const viewBox = isAwayTeam
    ? `0 0 432 ${viewBoxHeight}` // Crop bottom (show top portion)
    : `0 ${cropAmount} 432 ${viewBoxHeight}`; // Crop top (show bottom portion)

  return (
    <View style={style}>
      <Svg
        width={svgWidth}
        height={svgHeight}
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        {/* Rotate the entire court 90 degrees */}
        <G transform="translate(216, 392) rotate(90) translate(-392, -216)">
          <Mask id="path-1-inside-1_11_28236" fill="white">
            <Path d="M14 14H770V418H14V14Z"/>
          </Mask>
          <Path d="M14 14H770V418H14V14Z" fill="#FFEDD4"/>
          <Path d="M14 14V12H12V14H14ZM770 14H772V12H770V14ZM770 418V420H772V418H770ZM14 418H12V420H14V418ZM14 14V16H770V14V12H14V14ZM770 14H768V418H770H772V14H770ZM770 418V416H14V418V420H770V418ZM14 418H16V14H14H12V418H14Z" fill="#1E2939" mask="url(#path-1-inside-1_11_28236)"/>
          <Path d="M761.958 22.9785H22.043V409.021H761.958V22.9785Z" fill="#D4943A" stroke="black" strokeWidth="3.21702"/>
          <Circle cx="392" cy="216" r="48.256" stroke="black" strokeWidth="2.41277"/>
          <Path d="M392 22.9785V409.021" stroke="black" strokeWidth="2.41277"/>
          <Path d="M26.8685 199.915H22.043V232.085H26.8685V199.915Z" fill="black"/>
          <Circle cx="70.2979" cy="216" r="7.238" stroke="#FF6600" strokeWidth="1.60851"/>
          <Path d="M761.957 199.915H757.132V232.085H761.957V199.915Z" fill="black"/>
          <Circle cx="713.702" cy="216" r="7.238" stroke="#FF6600" strokeWidth="1.60851"/>
          <Path d="M174.851 151.66H22.043V280.341H174.851V151.66Z" stroke="black" strokeWidth="2.41277"/>
          <Path d="M761.957 151.66H609.148V280.341H761.957V151.66Z" stroke="black" strokeWidth="2.41277"/>
          <Circle cx="174.851" cy="216" r="48.255" stroke="black" strokeWidth="2.41277"/>
          <Circle cx="609.149" cy="216" r="48.255" stroke="black" strokeWidth="2.41277"/>
          <Path d="M174.852 151.66V280.341" stroke="black" strokeWidth="2.41277"/>
          <Path d="M609.148 151.66V280.341" stroke="black" strokeWidth="2.41277"/>
          <Path d="M22.043 87.3193C145.362 87.3193 207.022 130.213 207.022 216C207.022 301.787 145.362 344.681 22.043 344.681" stroke="black" strokeWidth="2.41277"/>
          <Path d="M761.957 87.3193C638.638 87.3193 576.979 130.213 576.979 216C576.979 301.787 638.638 344.681 761.957 344.681" stroke="black" strokeWidth="2.41277"/>
          <Path d="M22.043 183.83C43.4898 183.83 54.2132 194.553 54.2132 216C54.2132 237.447 43.4898 248.17 22.043 248.17" stroke="black" strokeWidth="1.60851"/>
          <Path d="M761.957 183.83C740.511 183.83 729.787 194.553 729.787 216C729.787 237.447 740.511 248.17 761.957 248.17" stroke="black" strokeWidth="1.60851"/>
          <Path d="M126.596 151.66V159.702" stroke="black" strokeWidth="1.60851"/>
          <Path d="M142.681 151.66V159.702" stroke="black" strokeWidth="1.60851"/>
          <Path d="M158.766 151.66V159.702" stroke="black" strokeWidth="1.60851"/>
          <Path d="M126.596 272.298V280.34" stroke="black" strokeWidth="1.60851"/>
          <Path d="M142.681 272.298V280.34" stroke="black" strokeWidth="1.60851"/>
          <Path d="M158.766 272.298V280.34" stroke="black" strokeWidth="1.60851"/>
          <Path d="M625.234 151.66V159.702" stroke="black" strokeWidth="1.60851"/>
          <Path d="M641.319 151.66V159.702" stroke="black" strokeWidth="1.60851"/>
          <Path d="M657.404 151.66V159.702" stroke="black" strokeWidth="1.60851"/>
          <Path d="M625.234 272.298V280.34" stroke="black" strokeWidth="1.60851"/>
          <Path d="M641.319 272.298V280.34" stroke="black" strokeWidth="1.60851"/>
          <Path d="M657.404 272.298V280.34" stroke="black" strokeWidth="1.60851"/>
          <Circle cx="392" cy="216" r="16.085" stroke="black" strokeWidth="1.60851"/>
        </G>
      </Svg>
    </View>
  );
};

export default BasketballCourtLayout;
