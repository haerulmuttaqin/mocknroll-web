import useSWR from "swr";
import {getMocks} from "@api/data/services/mock";

export const useFetchMocks = (pid: string, sid: string) => useSWR(
    ['mocks', pid, sid],
    () => getMocks(pid, sid).then((res) => res.data.data),
    {
        revalidateIfStale: false,
        revalidateOnFocus: false
    }
)