import {xcss} from "@atlaskit/primitives";

export const cardStyle = xcss({
    backgroundColor: "elevation.surface.raised",
    boxShadow: "elevation.shadow.raised",
    borderRadius: "border.radius.100",
    transition: "200ms",
    ":hover": {
        backgroundColor: "elevation.surface.hovered",
        cursor: "pointer",
    },
    ":active": {
        backgroundColor: "elevation.surface.pressed",
        outlineColor: "color.border.focused",
        outlineWidth: "border.width.outline",
        outlineStyle: "solid",
    },
})

export const cardNoShadowStyle = xcss({
    backgroundColor: "elevation.surface.raised",
    borderRadius: "border.radius.100",
    ":hover": {
        outlineColor: "color.border",
        outlineWidth: "border.width",
        outlineStyle: "solid",
        cursor: "pointer",
    },
    ":active": {
        backgroundColor: "elevation.surface.raised.pressed",
        outlineColor: "color.border.focused",
        outlineWidth: "border.width.outline",
        outlineStyle: "solid",
    },
})

export const cardNoShadowNoBackgroundStyle = xcss({
    borderRadius: "border.radius.100",
    outlineColor: "color.border",
    outlineWidth: "border.width",
    outlineStyle: "solid",
    ":hover": {
        backgroundColor: "elevation.surface.hovered",
        cursor: "pointer",
    },
    ":active": {
        backgroundColor: "elevation.surface.pressed",
        outlineColor: "color.border.focused",
        outlineWidth: "border.width.outline",
        outlineStyle: "solid",
    },
})

export const cardNoShadowNoBackgroundNoBorderStyle = xcss({
    borderRadius: "border.radius.100",
    ":hover": {
        backgroundColor: "elevation.surface.hovered",
        outlineColor: "color.border",
        outlineWidth: "border.width",
        outlineStyle: "solid",
        cursor: "pointer",
    },
    ":active": {
        backgroundColor: "elevation.surface.pressed",
        outlineColor: "color.border.focused",
        outlineWidth: "border.width.outline",
        outlineStyle: "solid",
    },
})

export const cardNoShadowNoBackgroundNoBorderStyleSelected = xcss({
    borderRadius: "border.radius.100",
    backgroundColor: "elevation.surface.hovered",
    outlineColor: "color.border.selected",
    outlineWidth: "border.width",
    outlineStyle: "solid",
    ":hover": {
        cursor: "pointer",
        backgroundColor: "elevation.surface.hovered",
    },
    ":active": {
        backgroundColor: "elevation.surface.pressed",
        outlineColor: "color.border.focused",
        outlineWidth: "border.width.outline",
        outlineStyle: "solid",
    },
})