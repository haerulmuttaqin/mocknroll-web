import {useCallback, useEffect, useMemo, useState} from 'react';
import {useRouter} from "next/router";
import secureLocalStorage from "react-secure-storage";
import {Role} from "@/resources/role";

export const useUserRole = () => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const user = JSON.parse(secureLocalStorage.getItem("user") as string || `{"user_role": "user"}`)
            return user.user_role
        } catch (error) {
            console.error('Error retrieving data from local storage user:', error);
            return Role.User
        }
    });

    useEffect(() => {
        const user = JSON.parse(secureLocalStorage.getItem("user") as string || `{"user_role": "user"}`)
        setStoredValue(user.user_role)
    }, []);

    return storedValue;
};

export const useUserId = () => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const user = JSON.parse(secureLocalStorage.getItem("user") as string || `{"id": "0"}`)
            return user.id
        } catch (error) {
            console.error('Error retrieving data from local storage user:', error);
            return 0
        }
    });

    useEffect(() => {
        const user = JSON.parse(secureLocalStorage.getItem("user") as string || `{"id": "0"}`)
        setStoredValue(user.id)
    }, []);

    return storedValue;
};

export const useCompany = () => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            return JSON.parse(secureLocalStorage.getItem("company_id") as string)
        } catch (error) {
            console.error('Error retrieving data from local storage company_id:', error);
            return Role.User
        }
    });

    useEffect(() => {
        const data = JSON.parse(secureLocalStorage.getItem("company_id") as string)
        setStoredValue(data)
    }, []);

    return storedValue;
};

export const useIsTabActive = () => {
    const [isTabVisible, setIsTabVisible] = useState(true);

    const handleVisibilityChange = useCallback(() => {
        setIsTabVisible(document.visibilityState === 'visible');
    }, []);

    useEffect(() => {
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return isTabVisible;
};

/**
 *
 * @param key the query key
 * @param pathIndex the path number, null for get the last
 * @returns the query value to the query key
 */
export const useNextQueryParam = (key: string, pathIndex?: number): string | undefined => {
    const {asPath} = useRouter();
    const paths = asPath.split("/")
    return useMemo(() => {
        const match = asPath.match(new RegExp(`[&?]${key}=(.*?)(&|$)`));
        if (match == undefined) {
            const pathParam = paths[pathIndex ? pathIndex : paths.length - 1]
            if (pathParam === `[${key}]`) return undefined;
            if (!pathParam) return undefined;
            return pathParam
        }
        return decodeURIComponent(match[1]);
    }, [asPath, key]);
};