import {Head, Html, Main, NextScript} from 'next/document'

const Document = () => {
    return (
        <Html>
            <Head>
                <link rel="icon" href="/favicon.ico" sizes="any"/>
                {/*<meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"/>*/}
                {/*<meta httpEquiv="refresh" content="10"></meta>*/}
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}

export default Document