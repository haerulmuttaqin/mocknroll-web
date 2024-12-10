import {OnSubmitHandler} from "@atlaskit/form";

interface ProjectProps {
    idx: number
    id: string
    name: string
    key: string
    prefix: string
    is_active?: string
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
    prefix: string
    is_active?: string
    created_at?: string
    updated_at?: string
    sid?: string
}