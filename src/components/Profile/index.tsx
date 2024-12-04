import React, {useState} from "react";
import {Profile} from "@atlaskit/atlassian-navigation";
import Avatar from "@atlaskit/avatar";
import { Box, xcss } from '@atlaskit/primitives';

import Popup from '@atlaskit/popup';
import ProfilePopupMenu from "@component/Profile/content/popup-menu";

const DefaultProfile = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

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
            content={() => <ProfilePopupMenu />}
            trigger={(triggerProps) => (
                <Profile
                    icon={
                        <Avatar
                            size="small"
                            name="ATCS Account"
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