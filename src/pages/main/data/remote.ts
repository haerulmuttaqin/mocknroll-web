import {getRegions} from "@/api/data/services/region";
import useSWR from "swr";

export const useFetchRegion = () => useSWR(
    'region',
    () => getRegions().then((res) => res.data),
    {
        revalidateIfStale: false,
        revalidateOnFocus: false,
    }
)