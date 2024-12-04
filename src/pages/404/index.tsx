import type {NextPage} from "next";
import React, {useEffect} from "react";
import dynamic from "next/dynamic";
import {Box, Stack, xcss} from "@atlaskit/primitives";
import EmptyState from "@atlaskit/empty-state";
import {useRouter} from "next/router";
import {usePathname} from "next/navigation";

const Layout = dynamic(
    () => import('../../components/Layout/index'),
    {ssr: false}
)

const boxStyles = xcss({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    textAlign: "center",
    paddingTop: "space.600",
    width: '100%',
    height: '100%',
});

const Overview: NextPage = () => {

    const router = useRouter()

    const paths = usePathname()
    const pathNames = paths.split('/').filter(path => path)

    useEffect(() => {
        if (pathNames[0] == "area") {
            router.push("/")
        }
    }, [pathNames]);

    useEffect(() => {
        if (pathNames[0] == "zone") {
            router.push(`/area/${pathNames[1]}`)
        }
    }, [pathNames]);

    return (
        <>
            <Layout title={"404 Page Not Found"} shouldShowPageHeader={false}>
                <Box xcss={boxStyles}>
                    <Stack alignBlock="center">
                        <EmptyState
                            header="404 - Page Not Found"
                            description="Make sure the site existing. If it does, ask a project admin for permission to see the data."
                            headingLevel={3}
                            imageUrl={"../assets/images/empty_x.svg"}
                        />
                    </Stack>
                </Box>
            </Layout>
        </>
    );
};

export default Overview;