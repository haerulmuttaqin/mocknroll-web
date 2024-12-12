import {ProjectProps} from "@api/data/interfaces/project";
import {GroupedOptionsType} from "@atlaskit/select/types";
import {OptionType} from "@atlaskit/select";

export interface ContentProjectProps {
    area?: ProjectProps
    loading: boolean
    onItemClick: (param: ProjectProps) => void
}

export const methodOption: OptionType[] = [
    {
        label: "GET",
        value: "GET",
    },
    {
        label: "POST",
        value: "POST",
    },
    {
        label: "PUT",
        value: "PUT",
    },
    {
        label: "PATCH",
        value: "PATCH",
    },
    {
        label: "DELETE",
        value: "DELETE",
    },
]
export const codeOption: GroupedOptionsType<OptionType> = [
    {
        label: '1xx Informational response',
        options: [
            {value: '100', label: '100 - Continue'},
            {value: '101', label: '101 - Switching Protocols'},
            {value: '102', label: '102 - Processing'},
        ],
    },
    {
        label: '2xx Success',
        options: [
            {value: '200', label: '200 - OK', highlight: true},
            {value: '201', label: '201 - Created', highlight: true},
            {value: '202', label: '202 - Accepted'},
            {value: '203', label: '203 - Non-Authoritative Information'},
            {value: '204', label: '204 - No Content', highlight: true},
            {value: '205', label: '205 - Reset Content'},
            {value: '206', label: '206 - Partial Content'},
            {value: '207', label: '207 - Multi-Status'},
            {value: '208', label: '208 - Already Reported'},
            {value: '226', label: '226 - IM Used'},
        ],
    },
    {
        label: '3xx Redirection',
        options: [
            {value: '300', label: '300 - Multiple Choices'},
            {value: '301', label: '301 - Moved Permanently'},
            {value: '302', label: '302 - Found'},
            {value: '303', label: '303 - See Other'},
            {value: '304', label: '304 - Not Modified'},
            {value: '305', label: '305 - Use Proxy'},
            {value: '306', label: '306 - Switch Proxy'},
            {value: '307', label: '307 - Temporary Redirect'},
            {value: '308', label: '308 - Permanent Redirect'},
        ],
    },
    {
        label: '4xx Client errors',
        options: [
            {value: '400', label: '400 - Bad Request', highlight: true},
            {value: '401', label: '401 - Unauthorized', highlight: true},
            {value: '402', label: '402 - Payment Required', highlight: true},
            {value: '403', label: '403 - Forbidden', highlight: true},
            {value: '404', label: '404 - Not Found', highlight: true},
            {value: '405', label: '405 - Method Not Allowed'},
            {value: '406', label: '406 - Not Acceptable'},
            {value: '407', label: '407 - Proxy Authentication Required'},
            {value: '408', label: '408 - Request Timeout'},
            {value: '409', label: '409 - Conflict'},
            {value: '410', label: '410 - Gone'},
            {value: '411', label: '411 - Length Required'},
            {value: '412', label: '412 - Precondition Failed'},
            {value: '413', label: '413 - Request Entity Too Large'},
            {value: '414', label: '414 - Request-URI Too Long'},
            {value: '415', label: '415 - Unsupported Media Type'},
            {value: '416', label: '416 - Requested Range Not Satisfiable'},
            {value: '417', label: '417 - Expectation Failed'},
            {value: '418', label: '418 - Im a teapot'},
            {value: '420', label: '420 - Enhance Your Calm'},
            {value: '422', label: '422 - Unprocessable Entity', highlight: true},
            {value: '423', label: '423 - Locked'},
            {value: '424', label: '424 - Failed Dependency'},
            {value: '425', label: '425 - Unordered Collection'},
            {value: '426', label: '426 - Upgrade Required'},
            {value: '428', label: '428 - Precondition Required'},
            {value: '429', label: '429 - Too Many Requests'},
            {value: '431', label: '431 - Request Header Fields Too Large'},
            {value: '444', label: '444 - No Response'},
            {value: '449', label: '449 - Retry With'},
            {value: '450', label: '450 - Blocked by Windows Parental Controls'},
            {value: '499', label: '499 - Client Closed Request'},
        ],
    },
    {
        label: '5xx Server errors',
        options: [
            {value: '500', label: '500 - Internal Server Error', highlight: true},
            {value: '501', label: '501 - Not Implemented'},
            {value: '502', label: '502 - Bad Gateway'},
            {value: '503', label: '503 - Service Unavailable', highlight: true},
            {value: '504', label: '504 - Gateway Timeout'},
            {value: '505', label: '505 - HTTP Version Not Supported'},
            {value: '506', label: '506 - Variant Also Negotiates'},
            {value: '507', label: '507 - Insufficient Storage'},
            {value: '509', label: '509 - Bandwidth Limit Exceeded'},
            {value: '510', label: '510 - Not Extended'},
        ],
    },
]