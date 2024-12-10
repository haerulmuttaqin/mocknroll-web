import useSWR from "swr";
import {getProject, getProjects} from "@api/data/services/project";

export const useFetchProjects = () => useSWR(
    ['project'],
    () => getProjects().then((res) => res.data.data),
    {
        revalidateIfStale: false,
        revalidateOnFocus: false
    }
)

export const useFetchProject = (pid: string, sid: string) => useSWR(
    ['project', pid, sid],
    () => getProject(pid, sid).then((res) => res.data.data),
    {
        revalidateIfStale: false,
        revalidateOnFocus: false
    }
)