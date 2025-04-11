import {Box, Text, xcss} from '@atlaskit/primitives';
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
import Footer from "@component/Footer";
import ContentWrapper from "@component/Layout/common/content-wrapper";
import FooterNavigation from "@component/Footer/footer-nav";
import {media} from "@atlaskit/primitives/responsive";

const footerNavStyles = xcss({
    msWrapMargin: undefined,
    display: 'flex',
    gap: 'space.400',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'color.text.subtlest',
    font: 'font.body',
    paddingInlineStart: 'space.1000',
    paddingInlineEnd: 'space.1000',
    paddingBlockStart: 'space.300',
    paddingBlockEnd: 'space.300',
    [media.above.xxs]: {
        flexWrap: 'wrap',
        gap: 'space.200',
    },
});

const footerStyles = xcss({
    backgroundColor: "color.background.neutral",
    gridArea: "footer",
    maxHeight: "50%",
    paddingInline: "space.100",
    paddingBlockStart: "space.300",
    [media.above.sm]: {
        maxHeight: "25%",
        paddingInline: "space.300",
    },
});

const BaseContent: FC<LayoutProps> = (
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
    }, [show, message])

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
        <div id={"main"}>
            <Box>
                {shouldShowPageHeader &&
                    (
                        shouldShowBreadcrumbs && title ?
                            <ContentWrapper>
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
                            </ContentWrapper>
                            :
                            title && (
                                <ContentWrapper>
                                    <PageHeader>
                                        {title}
                                    </PageHeader>
                                </ContentWrapper>
                            )
                    )}
                {children}
            </Box>
            <FooterNavigation/>
            <Box as={"footer"} xcss={footerStyles}>
                <Box as={"nav"} xcss={footerNavStyles}>
                    <Box as={"small"}>&copy; {new Date().getFullYear()} {process.env.NEXT_PUBLIC_APP_NAME}</Box>
                </Box>
            </Box>
        </div>
    );
};

export default BaseContent;
