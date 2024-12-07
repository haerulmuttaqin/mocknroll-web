import { NextPage } from 'next';
import React, {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import { FlagsProvider } from '@atlaskit/flag';
import { useRouter } from 'next/router';
import SpinnerLoading from '@component/Spinner';
import {addBillingConfig, editBillingConfig, getBillingConfig} from "@api/data/services/project";
import BillingConfingForm from './content/form';
import { BillingConfigPayloadProps } from '@api/data/interfaces/project';
import {useDispatch} from "react-redux";
import { showFlag } from '@store/actions/show-flag';
import {useCompany} from "@utils/hooks";




const Layout = dynamic(
    () => import('@component/Layout'),
    {ssr: false}
)

const BillingConfig: NextPage = () => {
    const router = useRouter()
    const companyId = useCompany()
    const {project_id, action} = router.query
    const [loading, setLoading] = useState<boolean>(action == "edit");
    const [billingconfData, setBillingconfData] = useState<BillingConfigPayloadProps>();
    const dispatch = useDispatch();

    const handleCancel = () => {
        router.back()
    }

    const updateBillingConfig = async (params: any) => {
        let errors = {}
        const payload = {
            billconf_name: params.billconf_name,
            billconf_wbp: params.billconf_wbp,
            billconf_lwbp: params.billconf_lwbp,
            billconf_wbp_start: params.billconf_wbp_start,
            billconf_wbp_end: params.billconf_wbp_end,
            billconf_vat: params.billconf_vat,
            admin_fee: params.admin_fee,
            is_active: params.is_active ? 1 : 0,
            var_column: params.var_column.value,
            company_id: companyId,
        }
        await editBillingConfig(project_id as any, payload)
            .then((res) => {
                if (!res.success) {
                    dispatch(
                        showFlag({
                            success: false,
                            title: "Update Failed, Please try again!",
                            message: res.message
                        }) as any
                    );
                    if (res.errors) {
                        errors = res.errors
                    } else if (res.data) {
                        errors = res.data
                    } else {
                        errors = {}
                    }
                } else {
                    dispatch(
                        showFlag({
                            success: true,
                            title: "Successfuly Updated",
                            message: "The config alarm has been successfully updated!",
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
        return errors
    }

    const postDataBillingConf = async (params: any) => {
        let errors = {}
        const payload = {
            billconf_name: params.billconf_name,
            billconf_wbp: params.billconf_wbp,
            billconf_lwbp: params.billconf_lwbp,
            billconf_wbp_start: params.billconf_wbp_start,
            billconf_wbp_end: params.billconf_wbp_end,
            billconf_vat: params.billconf_vat,
            admin_fee: params.admin_fee,
            is_active: params.is_active,
            var_column: params.var_column.value,
            company_id: companyId,
        }
        await addBillingConfig(payload)
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
                    } else if (res.data) {
                        errors = res.data
                    } else {
                        errors = {}
                    }
                } else {
                    dispatch(
                        showFlag({
                            success: true,
                            title: "Successfuly saved",
                            message: "The config billing has been successfully saved!",
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

    const getDataBillingConf = async (project_id: number) => {
        setLoading(true)
        try {
            const {data} = await getBillingConfig(project_id)
            setLoading(false)
            if (data?.data != null) {
                setBillingconfData(data.data)
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
            getDataBillingConf(project_id as any)
        }
    }, [router.isReady])


    return (
        <FlagsProvider>
            <Layout
                title={action == "edit" ? "Edit Billing Config" : "Create Billing Configuration"}
            >
                {
                    loading
                        ? <SpinnerLoading size={"large"}/>
                        : <BillingConfingForm
                            data={billingconfData as any}
                            setData={setBillingconfData}
                            type={action as any || project_id}
                            onHandleCancel={handleCancel}
                            onHandleSubmit={action == "edit" ? updateBillingConfig : postDataBillingConf}
                        />
                }
            </Layout>
        </FlagsProvider>
    );
};

export default BillingConfig;