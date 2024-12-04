import {ReactNode} from "react";
import {css} from "@emotion/react";
import {token} from "@atlaskit/tokens";
import {N20, N200} from "@atlaskit/theme/colors";

const panelStyles = css({
    display: 'flex',
    padding: token('space.400', '32px'),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: token('color.background.neutral', N20),
    borderRadius: token('border.radius', '3px'),
    color: token('color.text.subtlest', N200),
    fontSize: '4em',
    fontWeight: 500,
    marginBlockEnd: token('space.100', '8px'),
    marginBlockStart: token('space.200', '16px'),
});

export const Panel = ({children, testId}: {
    children: ReactNode;
    testId?: string;
}) => (
    <div data-testid={testId}>
        {children}
    </div>
);