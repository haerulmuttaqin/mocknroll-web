import {ReactNode} from "react";

type BreadcrumbProps = {
    homeElement: ReactNode,
    separator?: ReactNode,
    containerClasses?: string,
    listClasses?: string,
    activeClasses?: string,
    capitalizeLinks?: boolean
}