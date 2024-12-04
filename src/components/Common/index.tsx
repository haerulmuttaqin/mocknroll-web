import {FC, ReactNode} from "react";
import {xcss, Box} from "@atlaskit/primitives"

const nameWrapperStyles = xcss({
    display: 'flex',
    alignItems: 'center',
});

export const NameWrapper: FC<{ children: ReactNode }> = ({ children }) => (
    <Box xcss={nameWrapperStyles}>{children}</Box>
);

const avatarWrapperStyles = xcss({
    marginInlineEnd: 'space.100',
});

export const AvatarWrapper: FC<{ children: ReactNode }> = ({ children }) => (
    <Box xcss={avatarWrapperStyles}>{children}</Box>
);