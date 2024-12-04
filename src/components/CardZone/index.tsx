import React, {FC, Suspense, useEffect, useState} from "react";
import {Box, Inline, Stack, Text, xcss,} from "@atlaskit/primitives";
import Heading from "@atlaskit/heading";
import {CardZoneProps} from "@component/CardZone/card-zone";
import {
    cardNoShadowNoBackgroundNoBorderStyle,
    cardNoShadowNoBackgroundNoBorderStyleSelected
} from "@component/Common/style-util";
import Thumbnail from "@component/Thumbnail";
import {SimpleTag as Tag} from '@atlaskit/tag';
import {useTranslation} from "next-i18next";
import VidPlayIcon from '@atlaskit/icon/glyph/vid-play'
import {useColorMode} from "@atlaskit/app-provider";

let thumbnailBoxStyle = xcss({
    width: "160px",
    height: "100px",
    textAlign: "left",
    borderWidth: "border.width",
    borderColor: "color.border",
    borderRadius: "border.radius.100",
    borderStyle: "solid"
});

const CardImage: FC<ImageProps> = ({src, name, provider, selected, onError, onLoaded}) => {
    const {t} = useTranslation(['common', 'zone'])
    const colorMode = useColorMode()
    const [error, setError] = useState(false)
    const [loaded, setLoaded] = useState(false)
    return (
        <Box xcss={thumbnailBoxStyle} id="image-containter"
             style={{backgroundColor: colorMode === 'dark' ? '#22272b' : 'rgb(100 102 104)'}}>
            {(selected && !error) && (
                <Box as={'span'} xcss={xcss({position: "absolute"})}
                     id={colorMode === 'dark' ? 'tag-playing-dark' : 'tag-playing-light'}>
                    <Tag elemBefore={<span style={{paddingTop: '2px', paddingLeft: '4px'}}>
                        <VidPlayIcon size="small"
                                     label="playing"/></span>}
                         text={t('playing')} color="redLight"/>
                </Box>)}
            <Thumbnail
                src={src}
                name={name}
                provider={provider}
                selected={selected}
                onError={() => setError(true)}
                onLoaded={() => setTimeout(() => setLoaded(true), 100)}/>
        </Box>
    )
}

const CardZone: FC<CardZoneProps> = (props) => {
    const {t} = useTranslation(['common', 'zone'])
    const {data, selected, onItemClick} = props
    return (
        <Box
            xcss={selected ? cardNoShadowNoBackgroundNoBorderStyleSelected : cardNoShadowNoBackgroundNoBorderStyle}
            onClick={onItemClick}>
            <Box
                xcss={xcss({
                    padding: "space.150",
                })}
            >
                <Stack space="space.200">
                    <Stack space="space.100" grow="fill">
                        <Inline alignBlock="start" space="space.200">
                            <Inline alignBlock="center" space="space.050">
                                <Box>
                                    <CardImage src={data?.value} name={data?.caption} provider={data?.provider}
                                               selected={selected} onError={() => {
                                    }}/>
                                </Box>
                            </Inline>
                            <Inline space="space.100" alignBlock="start">
                                <Stack>
                                    <Heading level="h400">{data?.caption}</Heading>
                                    <Text
                                        size={"small"}>{`${data?.provider === 'webview' ? t('live_streaming') + '.' : t('live_streaming')}`}</Text>
                                    <Text size={"small"}>{`${data?.views || 0} ${t('x_views')}`}</Text>
                                </Stack>
                            </Inline>
                        </Inline>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    );
}
export default CardZone
