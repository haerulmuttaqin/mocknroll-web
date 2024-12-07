import '@atlaskit/css-reset';
import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {Provider} from "react-redux";
import store from "@/store/store";
import AppThemeProvider from "@component/Layout/common/theme-provider";
import {SWRConfig} from 'swr'
import React from "react";
import {appWithTranslation, UserConfig} from 'next-i18next'
import nextI18nConfig from '../../next-i18next.config'
import {SessionProvider} from "next-auth/react";

function MyApp({Component, pageProps: {session, ...pageProps}}: AppProps) {
    return (
        <SWRConfig value={{provider: () => new Map()}}>
            <SessionProvider session={session}>
                <Provider store={store}>
                    <AppThemeProvider>
                        <Component {...pageProps} />
                    </AppThemeProvider>
                </Provider>
            </SessionProvider>
        </SWRConfig>
    )
}

export default appWithTranslation(MyApp, nextI18nConfig as UserConfig);
