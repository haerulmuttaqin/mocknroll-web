import {NextPage} from 'next';
import React, {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import {FlagsProvider} from '@atlaskit/flag';
import {useRouter} from 'next/router';
import SpinnerLoading from '@component/Spinner';
import {addProject, updateProject, getProject} from "@api/data/services/project";
import ProjectForm from './form';
import {ProjectPayloadProps} from '@api/data/interfaces/project';
import {useDispatch} from "react-redux";
import {showFlag} from '@store/actions/show-flag';
import ContentWrapper from "@component/Layout/common/content-wrapper";

const Layout = dynamic(
    () => import('@component/Layout'),
    {ssr: false}
)

const Project: NextPage = () => {
    const router = useRouter()
    const {project_id, sid, idx, action} = router.query
    const [loading, setLoading] = useState<boolean>(action == "edit");
    const [projectData, setProjectData] = useState<ProjectPayloadProps>();
    const dispatch = useDispatch();

    const handleCancel = () => {
        router.back()
    }

    const updateProjectData = async (params: any) => {
        const payload = {
            id: params.id,
            name: params.name,
            key: params.key,
            prefix: params.prefix,
            is_active: params.is_active ? "1" : "0",
            created_at: params.created_at,
            updated_at: params.updated_at,
            sid: params.sid
        }
        await updateProject(project_id as string, sid as string, idx as any, payload)
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
                            message: "The project has been successfully updated!",
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

    const postProjectData = async (params: any) => {
        let errors = {}
        const payload = {
            name: params.name,
            prefix: params.prefix,
            is_active: params.is_active ? "1" : "0",
        }
        await addProject(payload)
            .then((res) => {
                if (!res.success) {
                    dispatch(
                        showFlag({
                            success: false,
                            title: "Add Failed, Please try again!",
                            message: res.message
                        }) as any
                    );
                    if (res.errors) {
                        errors = res.errors
                    } else {
                        errors = {}
                    }
                } else {
                    dispatch(
                        showFlag({
                            success: true,
                            title: "Successfully saved",
                            message: "The project has been successfully created!",
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

    const getProjectById = async (project_id: string, sheet_id: string) => {
        setLoading(true)
        try {
            const {data} = await getProject(project_id, sheet_id)
            setLoading(false)
            if (data?.data != null) {
                setProjectData(data.data)
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
            getProjectById(project_id as string, sid as string)
        }
    }, [router.isReady])


    return (
        <FlagsProvider>
            <Layout
                title={action == "edit" ? "Edit Project" : "Create Project"}
            >
                <ContentWrapper>
                    {
                        loading
                            ? <SpinnerLoading size={"large"}/>
                            : <ProjectForm
                                data={projectData as any}
                                setData={setProjectData}
                                type={action as any || project_id}
                                onHandleCancel={handleCancel}
                                onHandleSubmit={action == "edit" ? updateProjectData : postProjectData}
                            />
                    }
                </ContentWrapper>
            </Layout>
        </FlagsProvider>
    );
};

export default Project;