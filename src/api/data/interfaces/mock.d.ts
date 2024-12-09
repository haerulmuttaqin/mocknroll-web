import {OnSubmitHandler} from "@atlaskit/form";

interface MockProps {
    idx: number
    id: string
    name: string
    endpoint: string
    content: string
    header: string
    body: string
    code: string
    charset: string
    content_type: string
    is_active?: string
    expired_at?: string
    created_at?: string
    updated_at?: string
    sid?: string
    pid?: string
}

interface MockFormProps {
    data: MockProps
    setData: (data: any) => void
    type?: string;
    onHandleCancel?: () => void;
    onHandleSubmit: OnSubmitHandler<{}>
}

interface MockPayloadProps {
    name: string
    endpoint: string
    content: string
    header: string
    body: string
    code: string
    charset: string
    content_type: string
    is_active?: string
    expired_at?: string
    created_at?: string
    updated_at?: string
    sid?: string
    pid?: string
}