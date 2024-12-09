import {ProjectFormProps} from "@api/data/interfaces/project";
import React, {FC, Fragment} from "react";
import Form, {ErrorMessage, Field, FormFooter, HelperMessage} from '@atlaskit/form';
import {Box, xcss, Text, Stack} from '@atlaskit/primitives';
import ContainerGrid from "@component/ContainerGrid";
import {Col, Row} from "react-grid-system";
import ContainerForm from "@component/ContainerForm";
import TextField from '@atlaskit/textfield';
import {ButtonGroup, LoadingButton} from "@atlaskit/button";
import Button from '@atlaskit/button/new';
import Toggle from '@atlaskit/toggle';
import {MockFormProps} from "@api/data/interfaces/mock";
import Heading from "@atlaskit/heading";
import {cardNoShadowStyle} from "@component/Common/style-util";
import {OptionType, ValueType} from "@atlaskit/select/types";
import Select from "@atlaskit/select";
import TextArea from "@atlaskit/textarea";


const MockForm: FC<MockFormProps> = (
    {
        project,
        data,
        setData,
        type,
        onHandleCancel,
        onHandleSubmit
    }
) => {

    return (
        <Form onSubmit={onHandleSubmit}>
            {({formProps, submitting}) => (
                <Box as={"form"} {...formProps}>
                    <ContainerGrid>
                        <Row>
                            <Col sm={12} md={6}>
                                <ContainerForm>
                                    <Field
                                        aria-required={true}
                                        name="name"
                                        label="Endpoint"
                                        defaultValue={data?.name}
                                        isRequired
                                    >
                                        {({fieldProps, error}) => (
                                            <Fragment>
                                                <TextField {...fieldProps} type={"text"}
                                                           elemBeforeInput={<Box xcss={xcss({
                                                               paddingInlineStart: "space.150",
                                                               color: "color.text.subtle"
                                                           })}>{project?.prefix}</Box>}
                                                           placeholder="Input endpoint"/>
                                                {error && (
                                                    <ErrorMessage>
                                                        {error}
                                                    </ErrorMessage>
                                                )}
                                            </Fragment>
                                        )}
                                    </Field>
                                    <Field
                                        name="desc"
                                        label="Description"
                                        defaultValue={data?.desc}
                                        isRequired
                                    >
                                        {({fieldProps, error}) => (
                                            <Fragment>
                                                <TextField {...fieldProps} type={"text"}
                                                           placeholder="Input description"/>
                                                {error && (
                                                    <ErrorMessage>
                                                        {error}
                                                    </ErrorMessage>
                                                )}
                                            </Fragment>
                                        )}
                                    </Field>
                                </ContainerForm>
                            </Col>
                            <Col sm={12} md={12}>
                                <ContainerForm>
                                    <br/>
                                    <Heading level="h600">Requests</Heading>
                                    <Box testId={"card-offset"} xcss={xcss({
                                        // backgroundColor: "elevation.surface.raised",
                                        borderRadius: "border.radius.100",
                                        outlineColor: "color.border",
                                        outlineWidth: "border.width",
                                        outlineStyle: "solid",
                                        paddingBottom: "space.200",
                                        paddingInlineStart: "space.200",
                                        paddingBlockEnd: "space.200",
                                        marginTop: "space.200"
                                    })}>
                                        <Row>
                                            <Col sm={12} md={6}>
                                                <Field<ValueType<OptionType>>
                                                    label="Method"
                                                    name="var_column"
                                                    id="var_column"
                                                    // defaultValue={codes.find((it) => it.value == data?.var_column) as any}
                                                    aria-required={true}
                                                    isRequired
                                                >
                                                    {({fieldProps: {id, ...rest}, error}) => (
                                                        <Fragment>
                                                            <Select
                                                                id={`${id}-select`}
                                                                isSearchable={true}
                                                                // options={variables as any}
                                                                // isLoading={loadingFilterVariable}
                                                                {...rest}
                                                            />
                                                            {error && <ErrorMessage>{error}</ErrorMessage>}
                                                        </Fragment>
                                                    )}
                                                </Field>
                                                <Field<ValueType<OptionType>>
                                                    label="Code"
                                                    name="var_column"
                                                    id="var_column"
                                                    // defaultValue={codes.find((it) => it.value == data?.var_column) as any}
                                                    aria-required={true}
                                                    isRequired
                                                >
                                                    {({fieldProps: {id, ...rest}, error}) => (
                                                        <Fragment>
                                                            <Select
                                                                id={`${id}-select`}
                                                                isSearchable={true}
                                                                // options={variables as any}
                                                                // isLoading={loadingFilterVariable}
                                                                {...rest}
                                                            />
                                                            {error && <ErrorMessage>{error}</ErrorMessage>}
                                                        </Fragment>
                                                    )}
                                                </Field>
                                            </Col>
                                            <Col sm={12} md={12}>
                                                <Box xcss={xcss({marginRight: "space.200"})}>
                                                    <Field
                                                        name="header"
                                                        label="HTTP Headers"
                                                        defaultValue={data?.desc}
                                                    >
                                                        {({fieldProps, error}: any) => (
                                                            <Fragment>
                                                                <TextArea isMonospaced minimumRows={10} placeholder="{
                                                                &quot;X-Foo-Bar&quot;: &quot;Hello World&quot;
                                                                }" {...fieldProps} />
                                                                <HelperMessage>Customize the HTTP headers sent in the response. Define the headers as a JSON object.</HelperMessage>
                                                                {error && (
                                                                    <ErrorMessage>
                                                                        {error}
                                                                    </ErrorMessage>
                                                                )}
                                                            </Fragment>
                                                        )}
                                                    </Field>
                                                </Box>
                                                <Box xcss={xcss({marginRight: "space.200"})}>
                                                    <Field
                                                        name="header"
                                                        label="HTTP Response Body "
                                                        defaultValue={data?.desc}
                                                        isRequired
                                                    >
                                                        {({fieldProps, error}: any) => (
                                                            <Fragment>
                                                                <TextArea isMonospaced minimumRows={10} placeholder="{
                                                                &quot;X-Foo-Bar&quot;: &quot;Hello World&quot;
                                                                }" {...fieldProps} />
                                                                {error && (
                                                                    <ErrorMessage>
                                                                        {error}
                                                                    </ErrorMessage>
                                                                )}
                                                            </Fragment>
                                                        )}
                                                    </Field>
                                                    <Field
                                                        label="Activate Status"
                                                        name="is_active"
                                                        defaultValue={parseInt(data?.is_active as any) || 1 as number}
                                                    >
                                                        {({fieldProps: {value, ...others}}) => (
                                                            <Toggle
                                                                isChecked={!!value}
                                                                {...others}
                                                                id="toggle-large"
                                                                size="large"/>
                                                        )}
                                                    </Field>
                                                </Box>
                                            </Col>
                                        </Row>
                                    </Box>
                                </ContainerForm>
                            </Col>
                            <Col md={12}>
                                <Box xcss={xcss({paddingBottom: "space.400"})}>
                                    <FormFooter align={"start"}>
                                        <ButtonGroup>
                                            <LoadingButton
                                                appearance="primary"
                                                type="submit"
                                                isLoading={submitting}
                                            >
                                                {type == "edit" ? "Update Change" : "Submit Endpoint"}
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

export default MockForm;