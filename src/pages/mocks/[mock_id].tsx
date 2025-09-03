import {NextPage} from 'next';
import React, {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import {FlagsProvider} from '@atlaskit/flag';
import {useRouter} from 'next/router';
import SpinnerLoading from '@component/Spinner';
import MockForm from './form';
import {useDispatch} from "react-redux";
import {showFlag} from '@store/actions/show-flag';
import ContentWrapper from "@component/Layout/common/content-wrapper";
import {useFetchProject} from "@pages/projects/data/remote";
import {addMock, getMock, updateMock} from "@api/data/services/mock";
import {MockPayloadProps} from "@api/data/interfaces/mock";
import {useFetchMocks} from "@pages/mocks/data/remote";

const Layout = dynamic(
    () => import('@component/Layout'),
    {ssr: false}
)

const Mock: NextPage = () => {
    const router = useRouter()
    const {mock_id, pid, sid, idx, action} = router.query
    const [loading, setLoading] = useState<boolean>(action != undefined);
    const [mockData, setMockData] = useState<MockPayloadProps>();
    const dispatch = useDispatch();

    const {
        data: dataProject,
        isLoading: isLoadingProject,
        mutate: mutateProject,
        error: errorProject
    } = useFetchProject(pid as string, sid as string)

    const {
        data: dataMocks,
        isLoading: isLoadingMocks,
        mutate: mutateMocks,
        error: errorMocks
    } = useFetchMocks(pid as string, sid as string)

    const handleCancel = () => {
        router.back()
    }

    const updateMockData = async (params: any) => {
        const payload = {
            name: params.name,
            endpoint: params.endpoint,
            method: params.method.value,
            response: params.response,
            header: params.header,
            code: params.code.value,
            sid: sid,
            pid: pid,
            is_active: params.is_active ? "1" : "0",
        }
        await updateMock(mock_id as string, pid as string, sid as string, idx as any, payload as any)
            .then((res) => {
                if (!res.success) {
                    dispatch(
                        showFlag({
                            success: false,
                            title: "Update Failed, Please try again!",
                            message: res.message
                        }) as any
                    );
                } else {
                    dispatch(
                        showFlag({
                            success: true,
                            title: "Successfully Updated",
                            message: "The endpoint has been successfully updated!",
                            goBack: true
                        }) as any
                    )
                }
            })
            .catch((err) => {
                dispatch(
                    showFlag({
                        success: false,
                        title: "Update Failed, Please try again!",
                        message: err.message
                    }) as any
                );
            })
    }

    const postMockData = async (params: any) => {
        let errors = {}
        const payload = {
            name: params.name,
            endpoint: params.endpoint,
            method: params.method.value,
            response: params.response,
            header: params.header,
            code: params.code.value,
            sid: sid,
            pid: pid,
            is_active: params.is_active ? "1" : "0",
        }
        await addMock(payload as any)
            .then((res) => {
                if (!res.success) {
                    if (res.errors) {
                        errors = res.errors
                    } else {
                        errors = {}
                    }
                    dispatch(
                        showFlag({
                            success: false,
                            title: "Add Failed, Please try again!",
                            message: res.message
                        }) as any
                    );
                } else {
                    dispatch(
                        showFlag({
                            success: true,
                            title: "Successfully saved",
                            message: "The endpoint has been successfully saved!",
                            goBack: true
                        }) as any
                    )
                }
            })
            .catch((err) => {
                dispatch(
                    showFlag({
                        success: false,
                        title: "Add Failed, Please try again!",
                        message: err.message
                    }) as any
                );
            })
        return errors
    }

    const getMockById = async (mid: string, pid: string, sid: string) => {
        setLoading(true)
        try {
            const {data} = await getMock(mid, pid, sid)
            setLoading(false)
            if (data?.data != null) {
                setMockData(data.data)
            } else {
                dispatch(
                    showFlag({
                        success: false,
                        title: "Failed, Not found!",
                        message: data.message,
                        goBack: true
                    }) as any
                );
            }
        } catch (err) {
            setLoading(false)
            dispatch(
                showFlag({
                    success: false,
                    title: "Failed, Not found.",
                    message: "An error occurred!",
                    goBack: true
                }) as any
            );
        }
    };

    useEffect(() => {
        if (router.isReady && action != undefined) {
            getMockById(mock_id as string, pid as string, sid as string)
        }
    }, [router.isReady, mock_id])


    return (
        <FlagsProvider>
            <Layout
                title={loading ? "Endpoint..." : action == "edit" ? "Edit Endpoint" : action === "view" ? mockData?.name : "Create Endpoint"}
                description={loading ? "Endpoint details..." : action === "view" ? `Endpoint url: ${dataProject?.prefix}/${mockData?.endpoint}` : undefined}
                isSideNavOpen={true}
                isAdmin={true}
                sidebarList={dataMocks}
            >
                <ContentWrapper>
                    {
                        loading || isLoadingProject
                            ? <SpinnerLoading size={"large"}/>
                            : <MockForm
                                project={dataProject}
                                data={mockData as any}
                                setData={setMockData}
                                type={action as any || mock_id}
                                onHandleCancel={handleCancel}
                                onHandleSubmit={action == "edit" ? updateMockData : postMockData}
                            />
                    }
                </ContentWrapper>
            </Layout>
        </FlagsProvider>
    );
};

export default Mock;