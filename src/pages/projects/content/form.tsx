import { ProjectFormProps } from "@api/data/interfaces/project";
import { OptionProps } from "@api/data/interfaces";
import React, {FC, Fragment, useEffect, useState} from "react";
import Form, {ErrorMessage, Field, FormFooter} from '@atlaskit/form';
import {Box, xcss} from '@atlaskit/primitives';
import ContainerGrid from "@component/ContainerGrid";
import { Col, Row } from "react-grid-system";
import ContainerForm from "@component/ContainerForm";
import TextField from '@atlaskit/textfield';
import Divider from "@component/Divider";
import { ButtonGroup, LoadingButton } from "@atlaskit/button";
import Button from '@atlaskit/button/new';
import Toggle from '@atlaskit/toggle';
import {getVariablesOptions} from "@/api/data/services/variable";
import {showFlag} from "@store/actions/show-flag";
import {useDispatch} from "react-redux";
import Select, {OptionType, ValueType} from "@atlaskit/select";


const BillingConfingForm: FC<ProjectFormProps> = (
    {
        data,
        setData,
        type,
        onHandleCancel,
        onHandleSubmit
    }
) => {

    const dispatch = useDispatch();
    const [variables, setVariables] = useState<OptionProps[]>([])
    const [loadingFilterVariable, setLoadingFilterVariable] = useState<boolean>()

    const getDataVariableColums = async () => {
        setLoadingFilterVariable(true)
        try {
            const {data} = await getVariablesOptions()
            if (data?.data.length > 0) {
                setVariables(data?.data.map((data: any) => {
                    return {label: `${data.var_column}`, value: data.var_column}
                }))
            }
            setLoadingFilterVariable(false)
        } catch (err) {
            dispatch(
                showFlag({
                    success: false,
                    title: "Loading Variable Column Failed, Please try again.",
                    message: JSON.stringify(err)
                }) as any
            );
            setLoadingFilterVariable(false)
        }
    };

    useEffect(() => {
        getDataVariableColums()
    }, []);

    return (
        <Form onSubmit={onHandleSubmit}>
            {({formProps, submitting}) => (
                <Box as={"form"} {...formProps}>
                    <ContainerGrid>
                        <Row>
                            <Col sm={12} md={5}>
                                <ContainerForm>
                                    <Field
                                        aria-required={true}
                                        name="billconf_name"
                                        label="Blling Config Name"
                                        defaultValue={data?.billconf_name}
                                        isRequired
                                    >
                                        {({fieldProps, error}) => (
                                            <Fragment>
                                                <TextField {...fieldProps} type={"text"} placeholder="Input name"/>
                                                {error && (
                                                    <ErrorMessage>
                                                        {error}
                                                    </ErrorMessage>
                                                )}
                                            </Fragment>
                                        )}
                                    </Field>
                                    <Field<ValueType<OptionType>>
                                        label="Variable Column"
                                        name="var_column"
                                        id="var_column"
                                        defaultValue={variables.find((it) => it.value == data?.var_column) as any}
                                        aria-required={true}
                                        isRequired
                                    >
                                        {({fieldProps: {id, ...rest}, error}) => (
                                            <Fragment>
                                                <Select
                                                    id={`${id}-select`}
                                                    isSearchable={true}
                                                    options={variables as any}
                                                    isLoading={loadingFilterVariable}
                                                    {...rest}
                                                />
                                                {error && <ErrorMessage>{error}</ErrorMessage>}
                                            </Fragment>
                                        )}
                                    </Field>
                                    <Field
                                        aria-required={true}
                                        name="billconf_wbp"
                                        label="WBP Tariff (IDR)"
                                        defaultValue={data?.billconf_wbp}
                                        isRequired
                                    >
                                        {({fieldProps, error}) => (
                                            <Fragment>
                                                <TextField {...fieldProps} type={"number"} placeholder="Input value"/>
                                                {error && (
                                                    <ErrorMessage>
                                                        {error}
                                                    </ErrorMessage>
                                                )}
                                            </Fragment>
                                        )}
                                    </Field>
                                    <Field
                                        aria-required={true}
                                        label="LWBP Tariff (IDR)"
                                        name="billconf_lwbp"
                                        defaultValue={data?.billconf_lwbp}
                                        isRequired
                                    >
                                        {({fieldProps, error}) => (
                                            <Fragment>
                                                <TextField {...fieldProps} type={"number"} placeholder="Input value"/>
                                                {error && (<ErrorMessage>{error}</ErrorMessage>)}
                                            </Fragment>
                                        )}
                                    </Field>
                                    <Field
                                        aria-required={true}
                                        label="WBP Time Start"
                                        name="billconf_wbp_start"
                                        defaultValue={data?.billconf_wbp_start}
                                        isRequired
                                    >
                                        {({fieldProps, error}) => (
                                            <Fragment>
                                                <TextField {...fieldProps} placeholder="00:00"/>
                                                {error && (<ErrorMessage>{error}</ErrorMessage>)}
                                            </Fragment>
                                        )}
                                    </Field>
                                    <Field
                                        aria-required={true}
                                        label="WBP Time End"
                                        name="billconf_wbp_end"
                                        defaultValue={data?.billconf_wbp_end}
                                        isRequired
                                    >
                                        {({fieldProps, error}) => (
                                            <Fragment>
                                                <TextField {...fieldProps} placeholder="00:00"/>
                                                {error && (<ErrorMessage>{error}</ErrorMessage>)}
                                            </Fragment>
                                        )}
                                    </Field>
                                    <Field
                                        aria-required={true}
                                        label="VAT (%)"
                                        name="billconf_vat"
                                        defaultValue={data?.billconf_vat}
                                        isRequired
                                    >
                                        {({fieldProps, error}) => (
                                            <Fragment>
                                                <TextField {...fieldProps} placeholder="Input value"/>
                                                {error && (<ErrorMessage>{error}</ErrorMessage>)}
                                            </Fragment>
                                        )}
                                    </Field>
                                    <Field
                                        aria-required={true}
                                        name="admin_fee"
                                        label="Admin Fee (IDR)"
                                        defaultValue={data?.billconf_wbp}
                                        isRequired
                                    >
                                        {({fieldProps, error}) => (
                                            <Fragment>
                                                <TextField {...fieldProps} type={"number"} placeholder="Input value"/>
                                                {error && (
                                                    <ErrorMessage>
                                                        {error}
                                                    </ErrorMessage>
                                                )}
                                            </Fragment>
                                        )}
                                    </Field>
                                    <Field
                                            label="Status Active"
                                            name="is_active"
                                            defaultValue={data?.is_active}
                                        >
                                            {({fieldProps: {value, ...others}}) => (
                                                <Toggle
                                                    isChecked={!!value}
                                                    {...others}
                                                    id="toggle-large"
                                                    size="large"/>
                                            )}
                                        </Field>
                                </ContainerForm>
                            </Col>
                            <Col md={12}>
                                <Divider/>
                                <Box xcss={xcss({paddingBottom: "space.400"})}>
                                    <FormFooter align={"start"}>
                                        <ButtonGroup>
                                            <LoadingButton
                                                appearance="primary"
                                                type="submit"
                                                isLoading={submitting}
                                            >
                                                {type == "edit" ? "Update Change" : "Create Billing Confing"}
                                            </LoadingButton>
                                            <Button onClick={onHandleCancel}>Cancel</Button>
                                        </ButtonGroup>
                                    </FormFooter>
                                </Box>
                            </Col>
                        </Row>
                    </ContainerGrid>
                </Box>
            )}
        </Form>
    );
};

export default BillingConfingForm;