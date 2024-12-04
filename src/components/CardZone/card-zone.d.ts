import {Zone} from "@/api/data/interfaces/zone";

interface CardZoneProps {
    data?: Zone
    selected?: boolean
    onItemClick?: () => void
}