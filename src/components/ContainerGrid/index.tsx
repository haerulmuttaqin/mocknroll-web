import React, {FC} from "react";
import {Container} from "react-grid-system";

const ContainerGrid: FC<ContainerProps> = ({children}) => {
    return (
        <Container fluid className={"container-grid"} style={{width: "100%", padding: '0 !important'}}>
            {children}
        </Container>
    )
}

export default ContainerGrid