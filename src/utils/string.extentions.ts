import {BaseResponse} from "../api/data/interfaces";

declare global {
    interface String {
        toErrorResponse(): BaseResponse;
    }
}

String.prototype.toErrorResponse = function (): BaseResponse {
    return {success: false, message: "err"}
};

export const toKebabCase = (str: string): string => {
    return str.replace(/[A-Z]/g, (substring: string, index: number) => {
        if (index === 0) {
            return substring.toLowerCase();
        }
        return `-${substring.toLowerCase()}`;
    });
};

export const toTitleCase = (str: string): string => {
    return str.replace(
        /\w\S*/g,
        text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
}