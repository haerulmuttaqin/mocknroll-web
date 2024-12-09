import useSWR from "swr";
import {getProjects} from "@api/data/services/project";

export const useFetchProjects = () => useSWR(
    ['project'],
    () => getProjects().then((res) => res.data.data),
    {
        revalidateIfStale: false,
        revalidateOnFocus: false
    }
)