export interface RegionProps {
    site?: Site
    regions?: Region[]
}

export interface Site {
    caption: string
    value: string
}

export interface Region {
    caption: string
    value: string
    data?: string
    count?: string
}