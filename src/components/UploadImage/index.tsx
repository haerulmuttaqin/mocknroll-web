import React, {FC, useRef} from "react";
import {Box, xcss, Text, media} from "@atlaskit/primitives"
import Image from "@atlaskit/image";
import ContainerGrid from "../ContainerGrid";
import {Row, Col} from "react-grid-system"
import Button from '@atlaskit/button';


const boxImageStyles = xcss({
    width: "100%",
    textAlign: "center",
    borderWidth: "border.width",
    borderColor: "color.border",
    borderRadius: "border.radius.100",
    borderStyle: "dashed",
    backgroundColor: "color.background.neutral.subtle.hovered"
});

const UploadImages: FC<any> = ({image, onChange}) => {

    const buttonRef = useRef<HTMLInputElement>(null);
    const handleClick = () => {
        buttonRef.current?.click();
    }
    const handleLoadImageError = (e: any) => {
        e.target.src = "/assets/icons/icon__upload_cloud.svg"
    }
    return <ContainerGrid>
        <Row>
            <Col md={6}>
                <Box xcss={boxImageStyles}>
                    <Image
                        style={{
                            backgroundSize: 'cover',
                            objectFit: "cover",
                            borderRadius: 2,
                            height: "100%",
                            width: "100%"
                        }}
                        src={image} alt="Group-Image" testId="image"
                        onError={handleLoadImageError}
                    />
                </Box>
            </Col>
            <Col md={6}>
                <input ref={buttonRef} type="file" className="hidden" onChange={onChange} accept=".png,.jpg,.jpeg"/>
                <Button onClick={handleClick} accept=".png,.jpg,.jpeg" style={{marginLeft: "10px"}}>Change
                    Picture</Button>
            </Col>
        </Row>
    </ContainerGrid>
};

export default UploadImages;