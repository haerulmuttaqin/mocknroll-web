import React, {useState} from "react";
import {Profile} from "@atlaskit/atlassian-navigation";
import Avatar from "@atlaskit/avatar";
import {Box, xcss} from '@atlaskit/primitives';

import Popup from '@atlaskit/popup';
import ProfilePopupMenu from "@component/Profile/content/popup-menu";
import {useSession} from "next-auth/react";

const DefaultProfile = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {data, status} = useSession()

    const onClick = () => {
        setIsOpen(!isOpen);
    };

    const onClose = () => {
        setIsOpen(false);
    };
    return (
        <Popup
            isOpen={isOpen}
            onClose={onClose}
            placement="bottom-end"
            content={() => <ProfilePopupMenu/>}
            trigger={(triggerProps) => (
                <Profile
                    icon={
                        <Avatar
                            size="small"
                            src={data?.user?.image as string}
                            name={data?.user?.name as string}
                            onClick={() => setIsOpen(!isOpen)}
                        />
                    }
                    onClick={onClick}
                    isSelected={isOpen}
                    tooltip="Your profile"
                    {...triggerProps}
                />
            )}
        />
    )
};

export default DefaultProfile