/**
 * SoccerFieldLayout Widget
 *
 * Full soccer field layout with green background and white field lines
 * Used for displaying complete soccer field views
 */

import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path, Rect } from 'react-native-svg';

interface SoccerFieldLayoutProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  style?: any;
}

export const SoccerFieldLayout: React.FC<SoccerFieldLayoutProps> = ({
  width,
  height,
  color = '#DDDDDD',
  style,
}) => {
  // Use 100% if style is provided, otherwise use defaults
  const svgWidth = width || (style ? '100%' : 382);
  const svgHeight = height || (style ? '100%' : 683);
  
  return (
    <View style={style}>
      <Svg 
        width={svgWidth} 
        height={svgHeight} 
        viewBox="-10 -10 402 703" 
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        <Rect x="-10" y="-10" width="402" height="703" fill="#0F9D58" />
        <G opacity="0.35">
          <Path
            d="M364.101 32.4543V650.638H18.4519V32.4543H364.101ZM366 30.1562H16.5527V652.936H366V30.1562Z"
            fill="white"
          />
          <Path
            d="M16.759 59.7782L16.6641 57.4801C28.192 56.8137 37.517 45.3693 37.8968 31.4199L39.796 31.4889C39.3782 46.6332 29.2556 59.0658 16.759 59.7782Z"
            fill="white"
          />
          <Path
            d="M364.555 59.664C352.058 58.9516 341.935 46.5189 341.518 31.3746L343.417 31.3057C343.797 45.255 353.122 56.7224 364.631 57.3659L364.555 59.664Z"
            fill="white"
          />
          <Path
            d="M342.353 651.948H340.454C340.454 635.792 351.317 622.647 364.669 622.647V624.946C352.362 624.946 342.353 637.056 342.353 651.948Z"
            fill="white"
          />
          <Path
            d="M39.0184 651.947H37.1192C37.1192 637.906 28.421 626.347 16.874 625.06L17.0449 622.762C29.5795 624.164 39.0184 636.688 39.0184 651.947Z"
            fill="white"
          />
          <Path
            d="M222.175 33.0061V65.9605H159.274V33.0061H222.175ZM224.074 30.708H157.375V68.2586H224.074V30.708Z"
            fill="white"
          />
          <Path
            d="M221.491 581.764C216.287 573.629 204.19 568.366 190.687 568.366C177.259 568.366 165.2 573.583 159.958 581.649L157.926 580.5C163.585 571.79 176.462 566.16 190.687 566.16C205.006 566.16 217.902 571.836 223.523 580.638L221.491 581.764Z"
            fill="white"
          />
          <Path
            d="M253.985 582.201V650.5H127.462V582.201H253.985ZM255.675 580.155H125.771V652.499H255.656V580.155H255.675Z"
            fill="white"
          />
          <Path
            d="M221.491 101.075C216.287 109.21 204.19 114.473 190.687 114.473C177.259 114.473 165.2 109.256 159.958 101.19L157.926 102.339C163.585 111.049 176.462 116.679 190.687 116.679C205.006 116.679 217.902 111.003 223.523 102.201L221.491 101.075Z"
            fill="white"
          />
          <Path
            d="M253.985 100.661V32.3622H127.462V100.661H253.985ZM255.675 102.683H125.771V30.3398H255.656V102.683H255.675Z"
            fill="white"
          />
          <Path
            d="M222.175 616.993V649.948H159.274V616.993H222.175ZM224.074 614.695H157.375V652.246H224.074V614.695Z"
            fill="white"
          />
          <Path
            d="M210.457 652.476V664.702H171.676V652.476H210.457ZM212.356 650.178H169.776V667H212.356V650.178Z"
            fill="white"
          />
          <Path
            d="M210.457 18.2981V30.5239H171.676V18.2981H210.457ZM212.356 16H169.776V32.8219H212.356V16Z"
            fill="white"
          />
          <Path d="M366 340H17V342H366V340Z" fill="white" />
          <Path
            d="M190.724 379.623C169.206 379.623 151.715 362.407 151.715 341.229C151.715 320.05 169.206 302.834 190.724 302.834C212.241 302.834 229.733 320.05 229.733 341.229C229.733 362.407 212.241 379.623 190.724 379.623ZM190.724 304.703C170.251 304.703 153.614 321.097 153.614 341.229C153.614 361.361 170.27 377.754 190.724 377.754C211.197 377.754 227.834 361.361 227.834 341.229C227.834 321.097 211.197 304.703 190.724 304.703Z"
            fill="white"
          />
        </G>
      </Svg>
    </View>
  );
};

export default SoccerFieldLayout;

