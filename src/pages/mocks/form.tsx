import React, {FC, Fragment, useEffect, useState} from "react";
import Form, {ErrorMessage, Field, FormFooter, HelperMessage} from '@atlaskit/form';
import {Box, Text, xcss} from '@atlaskit/primitives';
import ContainerGrid from "@component/ContainerGrid";
import {Col, Row} from "react-grid-system";
import ContainerForm from "@component/ContainerForm";
import TextField from '@atlaskit/textfield';
import {ButtonGroup, LoadingButton} from "@atlaskit/button";
import Button, {IconButton} from '@atlaskit/button/new';
import Toggle from '@atlaskit/toggle';
import {MockFormProps} from "@api/data/interfaces/mock";
import Heading from "@atlaskit/heading";
import {OptionType, ValueType} from "@atlaskit/select/types";
import {Code} from '@atlaskit/code';
import Select, {GroupedOptionsType} from "@atlaskit/select";
import LinkExternalIcon from '@atlaskit/icon/core/link-external';
import {codeOption, methodOption} from "@pages/mocks/data/props";
import {useUserId} from "@utils/hooks";
import ReactCodeMirror from "@uiw/react-codemirror";
import {json} from "@codemirror/lang-json";
import {useColorMode} from "@atlaskit/app-provider";
import {useRouter} from "next/router";

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

    const userId = useUserId()
    const router = useRouter()
    const {sid, idx} = router.query
    const colorMode = useColorMode()
    const [placeHolderHeader, setPlaceHolderHeader] = useState("")
    const [placeHolderResponse, setPlaceHolderResponse] = useState("")
    const [methodOptions, setMethodOptions] = useState<OptionType[]>(methodOption)
    const [codeOptions, setCodeOptions] = useState<GroupedOptionsType<OptionType>>(codeOption)

    const handleOpenLink = () => {
        window?.open(`${window.location.origin.split("//")[0]}//${userId}-${project?.id}.${process.env.NEXT_PUBLIC_API_URL?.replaceAll("http:", "").replaceAll("https:", "").replaceAll("api.", "").replaceAll("//", "").replaceAll("/", "").replaceAll("apiv1", "")}${project?.prefix}/${data?.endpoint}`, "_blank")
    }

    const handleOnEdit = () => {
        router.push(`/mocks/${data.id}?action=edit&pid=${project.id}&sid=${sid}&idx=${idx}`)
    }

    useEffect(() => {
        setPlaceHolderHeader('{\n' +
            '   "X-Foo-Bar": "Hello World"\n' +
            '}')
        setPlaceHolderResponse('{\n' +
            '   "success": true\n' +
            '   "message": "Successfully fetched!"\n' +
            '   "data": {\n' +
            '       "id": 1\n' +
            '       "name": "Haerul Muttaqin"\n' +
            '   }\n' +
            '}')
    }, []);

    return (
        <Form onSubmit={onHandleSubmit}>
            {({formProps, submitting}) => (
                <Box as={"form"} {...formProps}>
                    <ContainerGrid>
                        <Row>
                            <Col sm={12} md={12}>
                                <ContainerForm>
                                    <Box testId={"card-offset"} xcss={xcss({
                                        // backgroundColor: "elevation.surface.raised",
                                        borderRadius: "border.radius.100",
                                        outlineColor: "color.border",
                                        outlineWidth: "border.width",
                                        outlineStyle: "solid",
                                        paddingBottom: "space.200",
                                        paddingInlineStart: "space.200",
                                        marginTop: "space.200"
                                    })}>
                                        <Row>
                                            <Col sm={12} md={12}>
                                                {
                                                    project && (
                                                        <Box testId={"card-message-offset"}
                                                             xcss={xcss({marginTop: "space.150"})}>
                                                            <Text as={"strong"}>
                                                                <code><Code
                                                                    onPointerEnterCapture={() => {
                                                                    }} onPointerLeaveCapture={() => {
                                                                }}>{`${window.location.origin.split("//")[0]}//`}</Code>{userId || ""}-{project?.id as string || ""}
                                                                    .<Code
                                                                        onPointerEnterCapture={() => {
                                                                        }} onPointerLeaveCapture={() => {
                                                                    }}>{process.env.NEXT_PUBLIC_API_URL?.replaceAll("http:", "").replaceAll("https:", "").replaceAll("api.", "").replaceAll("//", "").replaceAll("/", "").replaceAll("apiv1", "")}{project?.prefix}/</Code>{data?.endpoint == null ? ":" : ""}{data?.endpoint || 'endpoint'}
                                                                </code>
                                                                {
                                                                    data?.endpoint ? <IconButton
                                                                        onClick={handleOpenLink} icon={LinkExternalIcon}
                                                                        appearance={'subtle'}
                                                                        label="Link"/> : null
                                                                }
                                                            </Text>
                                                        </Box>
                                                    )
                                                }
                                                {
                                                    type == "view" ?
                                                        <Box>
                                                            <Text size={"medium"}>Generate:</Text>
                                                            <ButtonGroup>
                                                                <Button appearance={"subtle"} isDisabled={true}>Postman
                                                                    Collection</Button>
                                                                <Button appearance={"subtle"} isDisabled={true}>View In
                                                                    Swagger</Button>
                                                            </ButtonGroup>
                                                            <Text size={"small"}>(soon)</Text>
                                                            <br/><br/>
                                                        </Box> : null
                                                }
                                            </Col>
                                            <Col sm={12} md={6}>
                                                <Box xcss={xcss({marginRight: "space.200"})}>
                                                    <Field
                                                        aria-required={true}
                                                        name="endpoint"
                                                        label="Endpoint"
                                                        defaultValue={data?.endpoint}
                                                        isDisabled={type === 'view'}
                                                        isRequired
                                                    >
                                                        {({fieldProps, error}) => (
                                                            <Fragment>
                                                                <TextField {...fieldProps} type={"text"}
                                                                           elemBeforeInput={<Box xcss={xcss({
                                                                               paddingInlineStart: "space.150",
                                                                               color: "color.text.disabled"
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
                                                        name="name"
                                                        label="Name or Label"
                                                        defaultValue={data?.name}
                                                        isDisabled={type === 'view'}
                                                        isRequired
                                                    >
                                                        {({fieldProps, error}) => (
                                                            <Fragment>
                                                                <TextField {...fieldProps} type={"text"}
                                                                           placeholder="Input name or label"/>
                                                                {error && (
                                                                    <ErrorMessage>
                                                                        {error}
                                                                    </ErrorMessage>
                                                                )}
                                                            </Fragment>
                                                        )}
                                                    </Field>
                                                </Box>
                                            </Col>
                                        </Row>
                                    </Box>
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
                                        marginTop: "space.200"
                                    })}>
                                        <Row>
                                            <Col sm={12} md={6}>
                                                <Box xcss={xcss({marginRight: "space.200"})}>
                                                    <Field<ValueType<OptionType>>
                                                        label="Method"
                                                        name="method"
                                                        id="method"
                                                        isDisabled={type === 'view'}
                                                        defaultValue={methodOptions.find((it: any) => it.value == data?.method) as any || methodOptions[0]}
                                                        aria-required={true}
                                                        isRequired
                                                    >
                                                        {({fieldProps: {id, ...rest}, error}) => (
                                                            <Fragment>
                                                                <Select
                                                                    id={`${id}-select`}
                                                                    isSearchable={true}
                                                                    options={methodOptions as any}
                                                                    {...rest}
                                                                />
                                                                {error && <ErrorMessage>{error}</ErrorMessage>}
                                                            </Fragment>
                                                        )}
                                                    </Field>
                                                    <Field<ValueType<GroupedOptionsType<OptionType>>>
                                                        label="Code"
                                                        name="code"
                                                        id="code"
                                                        isDisabled={type === 'view'}
                                                        defaultValue={codeOptions.filter((group: any) => group.options.some((item: any) => item.value === data?.code))[0]?.options?.find((it: any) => it.value == parseInt(data?.code)) as any || {
                                                            value: '200',
                                                            label: '200 - OK',
                                                            highlight: true
                                                        }}
                                                        aria-required={true}
                                                        isRequired
                                                    >
                                                        {({fieldProps: {id, ...rest}, error}) => (
                                                            <Fragment>
                                                                <Select
                                                                    id={`${id}-select`}
                                                                    isSearchable={true}
                                                                    options={codeOptions as any}
                                                                    {...rest}
                                                                />
                                                                {error && <ErrorMessage>{error}</ErrorMessage>}
                                                            </Fragment>
                                                        )}
                                                    </Field>
                                                </Box>
                                            </Col>
                                            <Col sm={12} md={12}>
                                                <Box xcss={xcss({marginRight: "space.200"})}>
                                                    <Field
                                                        name="header"
                                                        label="HTTP Headers"
                                                        isDisabled={type === 'view'}
                                                        defaultValue={data?.header}
                                                    >
                                                        {({fieldProps, error}: any) => (
                                                            <Fragment>
                                                                <ReactCodeMirror
                                                                    {...fieldProps}
                                                                    className={colorMode == 'light' ? "json-editor-light" : "json-editor-night"}
                                                                    theme={colorMode}
                                                                    extensions={[json()]}
                                                                    minHeight={"100px"}
                                                                    maxHeight={"400px"}
                                                                    placeholder={placeHolderHeader}
                                                                    editable={type != "view"}
                                                                    readOnly={type == "view"}
                                                                />
                                                                <HelperMessage>Customize the HTTP headers sent in the
                                                                    response. Define the headers as a JSON
                                                                    object.</HelperMessage>
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
                                                        name="response"
                                                        label="HTTP Response Body "
                                                        isDisabled={type === 'view'}
                                                        defaultValue={data?.response}
                                                        isRequired
                                                    >
                                                        {({fieldProps, error}: any) => (
                                                            <Fragment>
                                                                <ReactCodeMirror
                                                                    {...fieldProps}
                                                                    className={colorMode == 'light' ? "json-editor-light" : "json-editor-night"}
                                                                    theme={colorMode}
                                                                    extensions={[json()]}
                                                                    minHeight={"200px"}
                                                                    maxHeight={"700px"}
                                                                    placeholder={placeHolderResponse}
                                                                    editable={type != "view"}
                                                                    readOnly={type == "view"}
                                                                />
                                                                {error && (
                                                                    <ErrorMessage>
                                                                        {error}
                                                                    </ErrorMessage>
                                                                )}
                                                            </Fragment>
                                                        )}
                                                    </Field>
                                                </Box>
                                            </Col>
                                        </Row>
                                    </Box>
                                    <Field
                                        label="Project Status"
                                        name="is_active"
                                        isDisabled={type === 'view'}
                                        defaultValue={data?.is_active ? parseInt(data?.is_active) : 1}
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
                                        {
                                            type === 'view' ?
                                                <ButtonGroup>
                                                    <Button appearance={"warning"} onClick={handleOnEdit}>Edit Endpoint</Button>
                                                    <Button onClick={onHandleCancel}>Back to Endpoint List</Button>
                                                </ButtonGroup>
                                                :
                                                <ButtonGroup>
                                                    <LoadingButton
                                                        appearance="primary"
                                                        type="submit"
                                                        isLoading={submitting}
                                                    >
                                                        {type == "edit" ? "Save Change" : "Submit Endpoint"}
                                                    </LoadingButton>
                                                    <Button onClick={onHandleCancel}>Cancel</Button>
                                                </ButtonGroup>
                                        }
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