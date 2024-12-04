import {LayoutCommonProps, LayoutProps} from "@component/Layout/layout";
import {FlagsProvider, useFlags} from "@atlaskit/flag";
import Head from "next/head";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {resetFlag, showFlag as showFlagWithResetBack} from "@/store/actions/show-flag";
import SuccessIcon from "@atlaskit/icon/glyph/check-circle";
import {token} from "@atlaskit/tokens";
import {G400, R300} from "@atlaskit/theme/colors";
import Error from "@atlaskit/icon/glyph/error";
import {useRouter} from "next/router";

const LayoutCommon = ({children, title}: LayoutCommonProps) => {

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
        <div>
            <Head>
                <title>{`ATCS - ${title}`}</title>
                <meta property="og:title" content={`ATCS - ${title}`} key="title" />
            </Head>
            {children}
        </div>
    )
}
export default LayoutCommon