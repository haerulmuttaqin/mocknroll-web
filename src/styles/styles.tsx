import {media, xcss} from "@atlaskit/primitives";

export const filterFlexItemStyle = xcss({
    flex: '0 0 91vw',
    [media.above.xs]: {
        flex: '0 0 200px',
    },
});

export const responsiveStyles = xcss({
    [media.above.xs]: {
        gridTemplateColumns: 'repeat(0, 0fr)',
    },
    [media.above.sm]: {
        gridTemplateColumns: 'repeat(3, 3fr)',
    },
    [media.above.lg]: {
        gridTemplateColumns: 'repeat(3, 2fr)',
    },
});