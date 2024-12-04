import { token } from "@atlaskit/tokens";
import { css, CSSObject } from "@emotion/react";
import {ResponsiveCSSObject, UNSAFE_buildAboveMediaQueryCSS} from "@atlaskit/primitives/responsive";
import {UNSAFE_BREAKPOINTS_CONFIG} from "@atlaskit/primitives";
//
// /**
//  *
//  *
//  * Everything in here is taken from @atlaskit/primitives, codesandbox wasn't playing
//  * nice when importing responsive utilities
//  *
//  *
//  *
//  */
//
// /**
//  * Our internal configuration for breakpoints configuration.
//  *
//  * @experimental Unsafe for consumption outside of the design system itself.
//  */
// export const UNSAFE_BREAKPOINTS_CONFIG: Record<Breakpoint, BreakpointConfig> = {
//     // mobile
//     xxs: {
//         gridItemGutter: token("space.200", "16px"),
//         gridMargin: token("space.200", "16px"),
//         min: 0,
//         max: 479
//     },
//     // phablet
//     xs: {
//         gridItemGutter: token("space.200", "16px"),
//         gridMargin: token("space.200", "16px"),
//         min: 480,
//         max: 767
//     },
//     // tablet
//     sm: {
//         gridItemGutter: token("space.200", "16px"),
//         gridMargin: token("space.300", "24px"),
//         min: 768,
//         max: 1023
//     },
//     // laptop desktop
//     md: {
//         gridItemGutter: token("space.300", "24px"),
//         gridMargin: token("space.400", "32px"),
//         min: 1024,
//         max: 1439
//     },
//     // monitor
//     lg: {
//         gridItemGutter: token("space.400", "32px"),
//         gridMargin: token("space.400", "32px"),
//         min: 1440,
//         max: 1767
//     },
//     // large high res
//     xl: {
//         gridItemGutter: token("space.400", "32px"),
//         gridMargin: token("space.500", "40px"),
//         min: 1768,
//         max: 2159
//     },
//     // extra large high res
//     xxl: {
//         gridItemGutter: token("space.500", "40px"),
//         gridMargin: token("space.500", "40px"),
//         min: 2160,
//         max: Number.MAX_SAFE_INTEGER
//     }
// } as const;
//
// /**
//  * The list of breakpoints in order from smallest to largest.  You may need to clone and reverse this list if you want the opposite.
//  *
//  * This is intentional for cascading with `min-width` or `media.above`. Media queries go from lowest width to highest.
//  *
//  * @experimental Unsafe for consumption outside of the design system itself.
//  */
// export const UNSAFE_BREAKPOINTS_ORDERED_LIST = (Object.keys(
//     UNSAFE_BREAKPOINTS_CONFIG
// ) as Breakpoint[]).sort(
//     (a, b) => UNSAFE_BREAKPOINTS_CONFIG[a].min - UNSAFE_BREAKPOINTS_CONFIG[b].min
// ) as ["xxs", "xs", "sm", "md", "lg", "xl", "xxl"];
//
// /**
//  * This is our smallest breakpoint with a few nuances to it:
//  * 1. It is the default value for shorthands, eg. `<GridItem span={6} />` maps to `{ [SMALLEST_BREAKPOINT]: props.span }`
//  * 2. It's omitted in `media.below` as there's nothing below `0px`.
//  *
//  * @experimental There's a chance this will change in _value_, but should only be used in a way that it will not matter if this value changes.
//  */
// export const SMALLEST_BREAKPOINT = UNSAFE_BREAKPOINTS_ORDERED_LIST[0];
//
// /**
//  * To ensure min-width and max-width do both target at the same time, we subtract a value.
//  * We use a fractional value here as used in other libraries and described in @link https://www.w3.org/TR/mediaqueries-4/#mq-min-max: "…possibility of fractional viewport sizes which can occur as a result of non-integer pixel densities…"
//  */
// const BELOW_PRECISION = 0.02;
//
// /**
//  * This is the full internal version.  The import has been separated to only expose as-needed.
//  */
// const internalMedia = {
//     /**
//      * A media query to target viewports above the min width of a given breakpoint.
//      * Note that `media.above.xs` is redundant and should not be used, but it's included for programatic purposes.
//      */
//     above: {
//         /**
//          * `above.xxs` is redundant and no media query should be used, but it's included for programatic purposes…
//          *
//          * Eg. this is `@media (min-width: 0px)`
//          */
//         xxs: `@media (min-width: ${UNSAFE_BREAKPOINTS_CONFIG.xxs.min}px)`,
//         xs: `@media (min-width: ${UNSAFE_BREAKPOINTS_CONFIG.xs.min}px)`,
//         sm: `@media (min-width: ${UNSAFE_BREAKPOINTS_CONFIG.sm.min}px)`,
//         md: `@media (min-width: ${UNSAFE_BREAKPOINTS_CONFIG.md.min}px)`,
//         lg: `@media (min-width: ${UNSAFE_BREAKPOINTS_CONFIG.lg.min}px)`,
//         xl: `@media (min-width: ${UNSAFE_BREAKPOINTS_CONFIG.xl.min}px)`,
//         xxl: `@media (min-width: ${UNSAFE_BREAKPOINTS_CONFIG.xxl.min}px)`
//     } as const,
//     below: {
//         /**
//          * A media query to target viewports below the min width of a given breakpoint.
//          * Note that `media.below.xxs` is intentionally omitted as this would be `@media (max-width: 0px)`
//          */
//         xs: `@media (max-width: ${
//             UNSAFE_BREAKPOINTS_CONFIG.xs.min - BELOW_PRECISION
//         }px)`,
//         sm: `@media (max-width: ${
//             UNSAFE_BREAKPOINTS_CONFIG.sm.min - BELOW_PRECISION
//         }px)`,
//         md: `@media (max-width: ${
//             UNSAFE_BREAKPOINTS_CONFIG.md.min - BELOW_PRECISION
//         }px)`,
//         lg: `@media (max-width: ${
//             UNSAFE_BREAKPOINTS_CONFIG.lg.min - BELOW_PRECISION
//         }px)`,
//         xl: `@media (max-width: ${
//             UNSAFE_BREAKPOINTS_CONFIG.xl.min - BELOW_PRECISION
//         }px)`,
//         xxl: `@media (max-width: ${
//             UNSAFE_BREAKPOINTS_CONFIG.xxl.min - BELOW_PRECISION
//         }px)`
//     } as const,
//     /**
//      * A media query to target viewports exactly between the min and max of a given breakpoint.
//      */
//     only: {
//         xxs: `@media (min-width: ${UNSAFE_BREAKPOINTS_CONFIG.xxs.min}px) and (max-width: ${UNSAFE_BREAKPOINTS_CONFIG.xxs.max}px)`,
//         xs: `@media (min-width: ${UNSAFE_BREAKPOINTS_CONFIG.xs.min}px) and (max-width: ${UNSAFE_BREAKPOINTS_CONFIG.xs.max}px)`,
//         sm: `@media (min-width: ${UNSAFE_BREAKPOINTS_CONFIG.sm.min}px) and (max-width: ${UNSAFE_BREAKPOINTS_CONFIG.sm.max}px)`,
//         md: `@media (min-width: ${UNSAFE_BREAKPOINTS_CONFIG.md.min}px) and (max-width: ${UNSAFE_BREAKPOINTS_CONFIG.md.max}px)`,
//         lg: `@media (min-width: ${UNSAFE_BREAKPOINTS_CONFIG.lg.min}px) and (max-width: ${UNSAFE_BREAKPOINTS_CONFIG.lg.max}px)`,
//         xl: `@media (min-width: ${UNSAFE_BREAKPOINTS_CONFIG.xl.min}px) and (max-width: ${UNSAFE_BREAKPOINTS_CONFIG.xl.max}px)`,
//         xxl: `@media (min-width: ${UNSAFE_BREAKPOINTS_CONFIG.xxl.min}px) and (max-width: ${UNSAFE_BREAKPOINTS_CONFIG.xxl.max}px)`
//     } as const
// };
//
// /**
//  * This is an object of usable media query helpers using our internal breakpoints configuration.
//  *
//  * @experimental Unsafe for usage as the API is not finalized.
//  */
// export const UNSAFE_media = {
//     above: internalMedia.above,
//     below: internalMedia.below
// } as const;
//
// /**
//  * Build a map of breakpoints to css with media queries and nested styles.
//  *
//  * @experimental Unsafe for usage as the API is not finalized.
//  *
//  * @example
//  * A map to build optional `display:none` for consumption on a div.
//  * ```ts
//  * const hideMediaQueries = buildAboveMediaQueryCSS({ display: 'none' });
//  *
//  * const Component = ({ hideAtBreakpoints: ('xs' | 'sm')[], children: ReactNode }) => {
//  *   return <div css={hideAtBreakpoints.map(b => hideMediaQueries[b])}>{children}</div>;
//  * }
//  * ```
//  *
//  * This roughly builds a map that will look roughly like this (if done manually):
//  * ```ts
//  * {
//  *   xxs: css({ '@media (min-width: 0px)': { display: 'none' } }),
//  *   xs: css({ '@media (min-width: …px)': { display: 'none' } }),
//  *   sm: css({ '@media (min-width: …px)': { display: 'none' } }),
//  * }
//  * ```
//  */
// export const UNSAFE_buildAboveMediaQueryCSS = (
//     /**
//      * The desired CSS to place inside of the media query.
//      * This can either be a css object directly or functional with `breakpoint` as the arg to return a css object.
//      */
//     input: CSSObject | ((breakpoint: Breakpoint) => CSSObject)
// ) => {
//     return UNSAFE_BREAKPOINTS_ORDERED_LIST.reduce(
//         (acc, breakpoint) => ({
//             ...acc,
//             [breakpoint]: css({
//                 // eslint-disable-next-line @repo/internal/styles/no-nested-styles
//                 [UNSAFE_media.above[breakpoint]]:
//                     typeof input === "function" ? input(breakpoint) : input
//             })
//         }),
//         {} as Required<ResponsiveCSSObject>
//     );
// };
//
// /**
//  * The breakpoints we have for responsiveness.
//  */
// export type Breakpoint = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
//
// /**
//  * Our internal breakpoint config used to build media queries and define attributes for certain components.
//  */
// export type BreakpointConfig = {
//     /**
//      * The gap between a `GridItem`.
//      */
//     gridItemGutter: ReturnType<typeof token>;
//     /**
//      * The outer whitespace of a `Grid` item.
//      */
//     gridMargin: ReturnType<typeof token>;
//     /**
//      * The min-width used in media queries
//      */
//     min: number;
//     /**
//      * The max-width used in media queries
//      */
//     max: number;
// };


export const dynamicSizedPaddingHorizontalStyles = css({
    xxs: {
        gridItemGutter: token("space.200", "16px"),
        gridMargin: token("space.200", "16px"),
        min: 0,
        max: 479
    },
    // phablet
    xs: {
        gridItemGutter: token("space.200", "16px"),
        gridMargin: token("space.200", "16px"),
        min: 480,
        max: 767
    },
    // tablet
    sm: {
        gridItemGutter: token("space.200", "16px"),
        gridMargin: token("space.300", "24px"),
        min: 768,
        max: 1023
    },
    // laptop desktop
    md: {
        gridItemGutter: token("space.300", "24px"),
        gridMargin: token("space.400", "32px"),
        min: 1024,
        max: 1439
    },
    // monitor
    lg: {
        gridItemGutter: token("space.400", "32px"),
        gridMargin: token("space.400", "32px"),
        min: 1440,
        max: 1767
    },
    // large high res
    xl: {
        gridItemGutter: token("space.400", "32px"),
        gridMargin: token("space.500", "40px"),
        min: 1768,
        max: 2159
    },
    // extra large high res
    xxl: {
        gridItemGutter: token("space.500", "40px"),
        gridMargin: token("space.500", "40px"),
        min: 2160,
        max: Number.MAX_SAFE_INTEGER
    }
});

export const responsiveWidthSearchStyles = css({
    minWidth: "100%",
    paddingInline: token("space.100"),
    paddingBlock: token("space.050")
});