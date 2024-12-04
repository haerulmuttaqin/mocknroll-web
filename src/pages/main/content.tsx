import React, {FC, Fragment, useState} from 'react';

import {Box, xcss, Stack} from "@atlaskit/primitives";
import {useTranslation} from "next-i18next";
import ButtonGroup from '@atlaskit/button/button-group';
import TextField from '@atlaskit/textfield';
import LoadingButton from '@atlaskit/button/loading-button';
import ContainerGrid from "@component/ContainerGrid";
import {Col, Row} from "react-grid-system"
import Form, {ErrorMessage, Field, FormFooter,} from '@atlaskit/form';
import ContainerForm from "@component/ContainerForm";
import {showFlag} from "@/store/actions/show-flag";
import {useDispatch} from "react-redux";
import {getThumbnail} from "@/api/data/services/region";
import Grid, {GridItem} from "@atlaskit/grid";
import Image from "next/image";

const Content: FC<any> = (props) => {
    const {t} = useTranslation(['region'])
    const dispatch = useDispatch()
    const [thumbnail, setThumbnail] = useState<string>("")

    const handleCopy = () => {
        navigator.clipboard.writeText(thumbnail)
        dispatch(
            showFlag({
                success: true,
                title: "URL copied!",
            }) as any
        );
    }
    const handleOnError = (e: any) => {
        dispatch(
            showFlag({
                success: false,
                title: "Failed, Please try again!",
            }) as any
        );
    }

    const handleGetThumbnail = async (url: any) => {
        setThumbnail("")
        await getThumbnail(url.url as any)
            .then((res: any) => {
                if (!res) {
                    dispatch(
                        showFlag({
                            success: false,
                            title: "Failed, Please try again!",
                            message: res.message
                        }) as any
                    );
                } else {
                    setThumbnail("https://vid-thumb-api.hae.my.id/thumbnail?url=" + url.url)
                    dispatch(
                        showFlag({
                            success: true,
                            title: "Successfully Generated",
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

    return (
        <>
            <Box
                xcss={xcss({justifyContent: "center", alignItems: "center", paddingBlock: "space.400"})}
            >
                <Grid maxWidth="wide">
                    <GridItem start={{md: 3}} span={{md: 8}}>
                        <Form onSubmit={handleGetThumbnail}>
                            {({formProps, submitting}) => (
                                <Box as={"form"} {...formProps}>
                                    <ContainerForm>
                                        <Field
                                            aria-required={true}
                                            name="url"
                                            isRequired
                                        >
                                            {({fieldProps, error}) => (
                                                <Fragment>
                                                    <TextField {...fieldProps}
                                                               placeholder={t("search_placeholder")}/>
                                                    {error && (
                                                        <ErrorMessage>
                                                            {error}
                                                        </ErrorMessage>
                                                    )}
                                                </Fragment>
                                            )}
                                        </Field>
                                    </ContainerForm>
                                    <FormFooter align={"start"}>
                                        <ButtonGroup>
                                            <LoadingButton
                                                appearance="primary"
                                                type="submit"
                                                isLoading={submitting}
                                            >
                                                {"Get Thumbnail Now"}
                                            </LoadingButton>
                                        </ButtonGroup>
                                    </FormFooter>
                                </Box>
                            )}
                        </Form>
                        {
                            thumbnail != "" ?
                                <Stack>
                                    <br/><br/><br/>
                                    <Image
                                        id="image__card-thumbnail"
                                        width={0}
                                        height={500}
                                        sizes="100vw"
                                        style={{
                                            width: '100%',
                                            height: '500px',
                                            transitionTimingFunction: "ease-out",
                                        }}
                                        src={thumbnail as string}
                                        alt={"thumbnail" as string}
                                        onError={handleOnError}
                                        priority={true}
                                    />
                                    <Box xcss={xcss({paddingBottom: "space.400"})}>
                                        <FormFooter align={"start"}>
                                            <ButtonGroup>
                                                <LoadingButton
                                                    type="button"
                                                    onClick={handleCopy}
                                                >
                                                    {"Copy Generated URL"}
                                                </LoadingButton>
                                            </ButtonGroup>
                                        </FormFooter>
                                    </Box>
                                </Stack>
                                : null
                        }

                    </GridItem>
                </Grid>

            </Box>
        </>
    )
}

export default Content