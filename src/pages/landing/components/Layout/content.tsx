import {Box, media, Text, xcss} from '@atlaskit/primitives';
import {LayoutProps} from "@component/Layout/layout";
import React, {FC, useEffect} from "react";
import PageHeader from "@atlaskit/page-header";
import BreadcrumbList from "../Breadcrumb";
import {useDispatch, useSelector} from "react-redux";
import {useFlags} from '@atlaskit/flag';
import SuccessIcon from "@atlaskit/icon/glyph/check-circle";
import Error from "@atlaskit/icon/glyph/error";
import {token} from "@atlaskit/tokens";
import {G400, R300} from "@atlaskit/theme/colors";
import {resetFlag, showFlag as showFlagWithResetBack} from "@/store/actions/show-flag";
import {useRouter} from "next/router";

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
    const router = useRouter()
    const dispatch = useDispatch();
    const {show, title: flagTitle, message, success, goBack} = useSelector((state: any) => state.flag)
    const {showFlag} = useFlags()

    useEffect(() => {
        if (show) {
            if (success == true) {
                if (goBack == true) {
                    router.back()
                    dispatch(showFlagWithResetBack({
                        show: show,
                        title: flagTitle,
                        message: message,
                        success: success,
                        goBack: false
                    }) as any)
                } else {
                    showSuccessFlag()
                }
            } else {
                if (goBack == true) {
                    router.back()
                    dispatch(showFlagWithResetBack({
                        show: show,
                        title: flagTitle,
                        message: message,
                        success: success,
                        goBack: false
                    }) as any)
                } else {
                    showErrorFlag()
                }
            }
        }
    }, [message])

    const showSuccessFlag = () => {
        setTimeout(() => {
            showFlag({
                icon: (
                    <SuccessIcon
                        label="Success"
                        primaryColor={token('color.icon.success', G400)}
                    />
                ),
                title: flagTitle,
                description: message,
                isAutoDismiss: true,
            });
            dispatch(resetFlag() as any)
        }, 300)
    };

    const showErrorFlag = () => {
        setTimeout(() => {
            showFlag({
                icon: (
                    <Error
                        label="Error"
                        primaryColor={token('color.icon.danger', R300)}
                    />
                ),
                title: flagTitle,
                description: message,
                isAutoDismiss: true,
            })
            dispatch(resetFlag() as any)
        }, 300)
    }

    return (
        <Box xcss={containerStyles}>
            {shouldShowPageHeader &&
                (
                    shouldShowBreadcrumbs ?
                        <PageHeader
                            breadcrumbs={BreadcrumbList()}
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
