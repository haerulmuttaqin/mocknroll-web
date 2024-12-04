import React, {FC} from "react";
import {Col} from "react-grid-system";

const ColumnGrid: FC<ContainerProps> = ({children}) => {
    return (
        <Col style={{}}>
            {children}
        </Col>
    )
}

export default ColumnGrid