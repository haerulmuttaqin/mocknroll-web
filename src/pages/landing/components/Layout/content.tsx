import {Box, media, Text, xcss} from '@atlaskit/primitives';
import {LayoutProps} from "@component/Layout/layout";
import React, {FC} from "react";
import PageHeader from "@atlaskit/page-header";
import '@/styles/landing.module.css'

const containerStyles = xcss({
    paddingLeft: "space.250",
    paddingRight: "space.250",
    [media.above.sm]: {
        paddingLeft: "space.400",
        paddingRight: "space.400",
    },
});

const LandingPageContent: FC<LayoutProps> = (
    {
        children,
        title,
        description,
        shouldShowPageHeader = true,
        shouldShowBreadcrumbs = true,
        renderAction,
        renderBottomBar,
    }
) => {
    return (
        <Box xcss={containerStyles}>
            {shouldShowPageHeader &&
                (
                    shouldShowBreadcrumbs ?
                        <PageHeader
                            actions={renderAction}
                            bottomBar={renderBottomBar}
                        >
                            {title}
                            {description &&
                                <Box>
                                    <Text size={"medium"}>{description}</Text>
                                </Box>
                            }
                        </PageHeader>
                        :
                        <PageHeader>
                            {title}
                        </PageHeader>
                )}

            {children}
        </Box>
    );
};

export default LandingPageContent;
