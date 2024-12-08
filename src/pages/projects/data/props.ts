import {ProjectProps} from "@api/data/interfaces/project";

export interface ContentProjectProps {
    area?: ProjectProps
    loading: boolean
    onItemClick: (param: ProjectProps) => void
}