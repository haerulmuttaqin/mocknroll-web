import React, {FC} from "react";
import {Box, Grid, Inline, Stack, xcss} from "@atlaskit/primitives";
import {ImageContainer} from "../ContainerImage";
import {useColorMode} from "@atlaskit/app-provider";
import {CardAreaProps} from "@component/CardArea/card-region";
import Heading from "@atlaskit/heading";
import Lozenge from "@atlaskit/lozenge";
import {cardNoShadowStyle, cardStyle} from "@component/Common/style-util";
import Image from "next/image";

const CardImage: FC<ImageProps> = ({src, name}) => {

    const colorMode = useColorMode()

    return (
        <ImageContainer noBorder>
            <Image
                id="image__card-area"
                width={35}
                height={35}
                style={{
                    width: "35px",
                    height: "35px",
                    aspectRatio: 16 / 9,
                    objectFit: "cover",
                    objectPosition: "50% center",
                    opacity: colorMode === "light" ? 1 : 0.8,
                }}
                src={`https://ui-avatars.com/api/?name=${name?.replace(" ", "+")}&background=062b70&color=75aeff&font-size=0.36&rounded=true`}
                alt={name as string}
            />
        </ImageContainer>
    )
}

const CardArea: FC<CardAreaProps> = (props) => {
    const {data, onItemClick} = props

    return (
        <Box id={"container__card-area"} xcss={cardNoShadowStyle} onClick={onItemClick}>
            <Box
                xcss={xcss({
                    padding: "space.150",
                })}
            >
                <Grid
                    testId="grid-basic"
                    rowGap="space.100"
                    columnGap="space.150"
                    templateColumns="40px 1fr"
                >
                    <CardImage src={data?.value} name={data?.caption} onError={()=>{}}/>
                    <Stack space="space.100" grow="fill">
                        <Inline alignBlock="start" spread="space-between">
                            <Inline space="space.100" alignBlock="center">
                                <Heading level="h600">{data?.caption}</Heading>
                            </Inline>
                            <Inline alignBlock="center" space="space.050" xcss={xcss({paddingTop: "space.050"})}>
                                <Lozenge appearance="inprogress">{data?.count || Math.floor(Math.random() * 50) + 10} Zone</Lozenge>
                            </Inline>
                        </Inline>
                    </Stack>
                </Grid>
            </Box>
        </Box>
    );
}
export default CardArea
