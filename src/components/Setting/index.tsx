import {Settings} from "@atlaskit/atlassian-navigation";
import {useRouter} from "next/router";

const DefaultSettings = () => {
    const router = useRouter()
    const handleGoToSetting = () => {
        router.push("/settings")
    }
    return (<Settings onClick={handleGoToSetting} tooltip="Settings" />)
};
export default DefaultSettings