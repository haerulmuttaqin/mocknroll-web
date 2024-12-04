import React, {FC, useEffect, useRef, useState} from 'react';
import Image from "next/image";
import {useInView} from "react-intersection-observer";
import ReactPlayer from "react-player";
import {useScreenshot} from "@breezeos-dev/use-react-screenshot";

const Thumbnail: FC<ImageProps> = ({src, name, provider, onError, selected, onLoaded}) => {
    const {ref, inView} = useInView({
        fallbackInView: true,
        triggerOnce: true
    });

    const [image, setImage] = useState<string>(`https://hls-thumbnail-api.pasbe.id/thumbnail?url=${src}`)
    // const [image, setImage] = useState<string>(`http://localhost:8111/thumbnail?url=${src}`)

    const [imageErr, setImageErr] = useState<boolean>(false)
    const [progressCount, setProgressCount] = useState(0)
    const refPlayer = useRef<HTMLDivElement>(null)
    const [imageScreenShoot, takeScreenshot] = useScreenshot()
    const [errorLoadingThumb, setErrorLoadingThumb] = useState<string>("")

    useEffect(() => {
        if (progressCount > 1 && refPlayer?.current) {
            takeScreenshot(refPlayer?.current as HTMLDivElement)
        }
    }, [progressCount]);

    const handleOnError = (e: any) => {
        setImageErr(true)
    }

    if (imageScreenShoot && imageErr) {
        return (
            <Image
                id="image__card-thumbnail"
                width={0}
                height={100}
                sizes="100vw"
                style={{
                    width: '100%',
                    height: '98px',
                    opacity: (selected) ? 0.3 : 1,
                    transitionTimingFunction: "ease-out",
                }}
                src={imageScreenShoot as string}
                key={name}
                alt={name || 'thumbnail'}
                placeholder={'blur'}
                blurDataURL={'/assets/images/video_cctv.svg'}
                onError={handleOnError}
                priority={true}
            />
        )
    }

    if (!imageScreenShoot && imageErr) {
        return (
            <div ref={ref}>
                {
                    inView ?
                        (
                            <div ref={refPlayer} style={{clipPath: 'content-box'}}>
                                <ReactPlayer
                                    id='image__card-thumbnail'
                                    url={src}
                                    width="100%"
                                    height="100px"
                                    playing={false}
                                    muted={true}
                                    style={{filter: 'blur(8px)'}}
                                    onProgress={() => setProgressCount(progressCount + 1)}
                                    onError={(e) => {
                                        setErrorLoadingThumb(`/assets/images/video_off.svg`)
                                    }}
                                    config={{
                                        file: {
                                            attributes: {
                                                crossOrigin: "anonymous",
                                            }
                                        },
                                    }}
                                />
                            </div>
                        ) : null
                }
            </div>
        )
    }

    return (
        <div ref={ref}>
            {
                inView ?
                    (
                        <Image
                            id="image__card-thumbnail"
                            width={0}
                            height={100}
                            sizes="100vw"
                            style={{
                                width: '100%',
                                height: '98px',
                                opacity: (selected) ? 0.3 : 1,
                                transitionTimingFunction: "ease-out",
                            }}
                            src={provider == 'stream' ? image || imageScreenShoot as string : image.replaceAll('&', '%26') as string}
                            key={name}
                            alt={name || 'thumbnail'}
                            placeholder={'blur'}
                            blurDataURL={'/assets/images/video_cctv.svg'}
                            onError={handleOnError}
                            priority={true}
                        />
                    )
                    : null
            }
        </div>
    )
}

export default Thumbnail