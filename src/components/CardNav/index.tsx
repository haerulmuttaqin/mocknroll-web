import { Box, xcss } from "@atlaskit/primitives";
import React from "react";

const containerStyles = xcss({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "elevation.surface.raised",
    padding: "space.300",
    transition: "200ms",
    borderRadius: "border.radius.100",
    boxShadow: "elevation.shadow.raised",
    height: "100%",
    ":hover": {
        backgroundColor: "elevation.surface.hovered",
        cursor: "pointer"
    }
});

interface Props {
    children?: React.ReactNode;
}
export const NavCard: React.FC<Props> = ({ children }) => {
    return <Box xcss={containerStyles}>{children}</Box>;
};
