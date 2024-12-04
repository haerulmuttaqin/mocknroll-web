export interface AreaProps {
    site: Site
    region: Region
    areas: Area[]
}

export interface Site {
    caption: string
    value: string
}

export interface Region {
    caption: string
    value: string
    data?: string
}

export interface Area {
    caption: string
    value: string
    count?: string
}