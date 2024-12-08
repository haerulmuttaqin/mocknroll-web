import {OnSubmitHandler} from "@atlaskit/form";

interface ProjectProps {
    idx: string
    id: string
    name: string
    key: string
    prefix: string
    is_active?: number
    created_at?: string
    updated_at?: string
    sid?: string
}

interface ProjectFormProps {
    data: ProjectProps
    setData: (data: any) => void
    type?: string;
    onHandleCancel?: () => void;
    onHandleSubmit: OnSubmitHandler<{}>
}

interface ProjectPayloadProps {
    name: string
    prefix: number
    is_active?: number
    created_at?: string
    updated_at?: string
    sid?: string
}