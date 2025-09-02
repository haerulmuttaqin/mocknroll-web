import React, {FC} from "react";
import {Box, Inline, Stack, Text, xcss,} from "@atlaskit/primitives";
import Heading from "@atlaskit/heading";
import Lozenge from "@atlaskit/lozenge";
import {ImageContainer} from "../ContainerImage";
import {useColorMode} from "@atlaskit/app-provider";
import {CardRegionProps} from "@component/CardRegion/card-region";
import {cardNoShadowStyle} from "@component/Common/style-util";
import Image from "next/image"

const CardImage: FC<ImageProps> = ({src, name}) => {

    const colorMode = useColorMode()

    return (
        <ImageContainer>
            <Image
                id="image__card-meter"
                style={{
                    width: "100%",
                    height: "auto",
                    aspectRatio: 16 / 9,
                    objectFit: "cover",
                    objectPosition: "50% center",
                    borderRadius: 2,
                    opacity: colorMode === "light" ? 1 : 0.8,
                }}
                src={`https://ui-avatars.com/api/?name=${name?.replace(" ", "+")}&background=062b70&color=579cff&font-size=0.21`}
                alt={name as string}
                width={0}
                height={0}
                sizes="100vw"
            />
        </ImageContainer>
    )
}

const CardRegion: FC<CardRegionProps> = (props) => {
    const {data, onItemClick} = props

    return (
        <Box id={"container__card-meter"} xcss={cardNoShadowStyle} onClick={onItemClick}>
            <Box
                xcss={xcss({
                    padding: "space.150",
                })}
            >
                <Stack space="space.200">
                    <CardImage src={data?.value} name={data?.caption} onError={()=>{}}/>
                    <Stack space="space.100" grow="fill">
                        <Inline alignBlock="start" spread="space-between">
                            <Inline space="space.100" alignBlock="center">
                                <Heading level="h600">{data?.caption}</Heading>
                            </Inline>
                            <Inline alignBlock="center" space="space.050" xcss={xcss({paddingTop: "space.050"})}>
                                <Lozenge appearance="inprogress">{data?.count || Math.floor(Math.random() * 30) + 1} Area</Lozenge>
                            </Inline>
                        </Inline>
                        <Text size={"small"}>
                            {data?.data || ""}
                        </Text>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    );
}
export default CardRegion
