import {ProjectFormProps} from "@api/data/interfaces/project";
import React, {FC, Fragment} from "react";
import Form, {ErrorMessage, Field, FormFooter, HelperMessage} from '@atlaskit/form';
import {Box, xcss} from '@atlaskit/primitives';
import ContainerGrid from "@component/ContainerGrid";
import {Col, Row} from "react-grid-system";
import ContainerForm from "@component/ContainerForm";
import TextField from '@atlaskit/textfield';
import {ButtonGroup, LoadingButton} from "@atlaskit/button";
import Button from '@atlaskit/button/new';
import Toggle from '@atlaskit/toggle';


const ProjectForm: FC<ProjectFormProps> = (
    {
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
                            <Col sm={12} md={5}>
                                <ContainerForm>
                                    <Field
                                        aria-required={true}
                                        name="name"
                                        label="Project Name"
                                        defaultValue={data?.name}
                                        isRequired
                                    >
                                        {({fieldProps, error}) => (
                                            <Fragment>
                                                <TextField {...fieldProps} type={"text"}
                                                           placeholder="Your Project Name"/>
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
                                        name="prefix"
                                        label="Prefix"
                                        defaultValue={data?.prefix}
                                        isRequired
                                    >
                                        {({fieldProps, error}) => (
                                            <Fragment>
                                                <TextField {...fieldProps} type={"text"} placeholder="/api/v1"/>
                                                <HelperMessage>Add API prefix to all endpoints in this project.</HelperMessage>
                                                {error && (
                                                    <ErrorMessage>
                                                        {error}
                                                    </ErrorMessage>
                                                )}
                                            </Fragment>
                                        )}
                                    </Field>
                                    <Field
                                        label="Project Status"
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
                                                {type == "edit" ? "Update Change" : "Create Project"}
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

export default ProjectForm;