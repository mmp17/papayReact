import React from "react";
import styled from "styled-components";

//IMarginerProps Interface:
export interface IMarginerProps {
  //Defines the types for props: width, height, direction, and bg (background color).
  width?: string; // Using optional props (width?, height?, etc.) is good for flexibility. if no ? this prop is must be specified
  height?: string;
  direction?: "horizontal" | "vertical";
  bg?: string;
}

// HorizontalMargin and VerticalMargin Styled Components:
const HorizontalMargin = styled.span<IMarginerProps>`
  // Both are span elements styled to adjust their dimensions and background color based on the props
  display: flex;
  min-width: ${({ width }) => `${width}px`};
  min-height: ${({ height }) => `${height}px`};
  background: ${({ bg }) => `${bg}`};
`;

const VerticalMargin = styled.span<IMarginerProps>`
  display: flex;
  min-width: ${({ width }) => `${width}px`};
  min-height: ${({ height }) => `${height}px`};
  background: ${({ bg }) => `${bg}`};
`;

// Marginer Function Component:
function Marginer(props: IMarginerProps) {
  const { direction } = props;
  if (direction === "horizontal") return <HorizontalMargin {...props} />;
  else {
    return <VerticalMargin {...props} />;
  }
}

Marginer.defaultProps = {
  direction: "horizontal",
};

export default Marginer;

//  Marginer component in React, styled with styled-components, is a flexible utility component for creating horizontal or vertical spaces in your layout. It uses TypeScript interfaces for type-checking its props, ensuring more reliable code.
