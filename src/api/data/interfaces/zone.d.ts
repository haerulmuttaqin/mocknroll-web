export interface ZoneProps {
    site: Site
    region: Region
    area: Area
    zones: Zone[]
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
}

export interface Zone {
    id: number
    caption: string
    value: string
    provider: string
    views?: string | undefined
}