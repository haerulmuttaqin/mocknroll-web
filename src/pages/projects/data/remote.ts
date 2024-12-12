import useSWR from "swr";
import {getProject, getProjects} from "@api/data/services/project";

export const useFetchProjects = () => useSWR(
    ['project'],
    () => getProjects().then((res) => res.data.data),
    {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        onErrorRetry: (error, key, config, revalidate, {retryCount}) => {
            if (retryCount >= 5) return
            setTimeout(() => revalidate({retryCount}), 5000)
        }
    }
)

export const useFetchProject = (pid: string, sid: string) => useSWR(
    ['project', pid, sid],
    () => getProject(pid, sid).then((res) => res.data.data),
    {
        revalidateIfStale: false,
        revalidateOnFocus: false,
    }
)