import {OnSubmitHandler} from "@atlaskit/form";

interface ProjectProps {
    id: number
    name: string
    key: string
    prefix: string
    is_active?: number
}

interface ProjectFormProps {
    data: ProjectProps
    setData: (data: any) => void
    type?: string;
    onHandleCancel?: () => void;
    onHandleSubmit: OnSubmitHandler<{}>
}

interface BillingConfigPayloadProps {
    name: string
    prefix: number
    is_active?: number
}