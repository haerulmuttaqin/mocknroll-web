import secureLocalStorage from "react-secure-storage";
import {MockProps} from "@api/data/interfaces/mock";

export const createKey = (input?: string) => input ? input.replace(/^(the|a|an)/, '').replace(/\s/g, '') : input;

export const filterByValue = (array: any, string: string) => {
    return array.filter((o: any) => {
        return Object.keys(o).some(k => {
            if (typeof o[k] === 'string') return o[k].toLowerCase().includes(string.toLowerCase());
        });
    });
}

export const passwordGenerator = () => {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 6) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return "ems" + result;
}

export const requiredValidator = (
    data: FormData,
    errors?: Record<string, string>,
    key?: string,
    message?: string,
) => {
    if (!(data as any)[key as any]) {
        return {
            ...errors,
            [key as any]: message,
        };
    }

    return errors;
};

export const imageExists = (image_url: any) => {
    const image = new Image();
    image.src = image_url ? image_url : ''
    return image.width > 0
}

export async function clearImageCache() {
    try {
        const prefix = 'img-cache-'
        let arr = []; // Array to hold the keys
        // Iterate over localStorage and insert the keys that meet the condition into arr
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i)?.substring(0, prefix.length) == prefix) {
                arr.push(localStorage.key(i));
            }
        }

        // Iterate over arr and remove the items by key
        for (let i = 0; i < arr.length; i++) {
            localStorage.removeItem(arr[i] as string);
        }
    } catch {
        console.error('failed clear image cache!')
    }
}

export async function setImageCache<T>(fn: () => Promise<T>, key: string, defaultValue: T) {
    let result;
    try {
        // retrieve the data from backend.
        result = await fn();
        // save the data to localStorage.
        const d = new Date();
        localStorage.setItem(`img-cache-${key}`, JSON.stringify(`${d.getTime()}$$${result}`));
    } catch {
        // if failed to retrieve the data from backend, try localStorage.
        const cached = localStorage.getItem(`img-cache-${key}`);
        // use the cached data if available, otherwise the default value.
        result = cached ? JSON.parse(cached as string) : defaultValue;
    }

    return result;
}

export const getImageCache = (key: string) => {
    const cached = localStorage.getItem(`img-cache-${key}`)
    if (cached == "") {
        return ""
    }
    if (cached == undefined) {
        return ""
    }
    const cachedData = JSON.parse(cached as string).split("$$") || ["", ""]
    const d = new Date();

    if ((d.getTime() - cachedData[0]) > 3600000) {
        // if ((d.getTime() - cachedData[0]) > 300000) {
        localStorage.setItem(`img-cache-${key}`, '')
        return ""
    }
    return cachedData[1];
}

export const getMethodType = (method: string) => {
    switch (method) {
        case "GET":
            return "success"
        case "POST":
            return "moved"
        case "PUT":
            return "inprogress"
        case "PATCH":
            return "new"
        case "DELETE":
            return "removed"
        default:
            return "default"

    }
}