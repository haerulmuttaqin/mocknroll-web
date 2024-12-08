import React from 'react';

import Button from '@atlaskit/button/new';

import {ModalBody, ModalFooter, ModalHeader, ModalTitle, useModal,} from '@atlaskit/modal-dialog';
import type {UIAnalyticsEvent} from "@atlaskit/analytics-next";
import {KeyboardOrMouseEvent} from "@atlaskit/modal-dialog/types";
import {useRouter} from "next/router";
import {signOut} from "next-auth/react";

const LogoutModal = () => {
    const {onClose} = useModal();
    const router = useRouter()

    const handleLogout = (e: KeyboardOrMouseEvent, analyticEvent: UIAnalyticsEvent) => {
        if (onClose) {
            onClose(e, analyticEvent)
            router.push("/auth/logout")
        }
    }

    return (
        <>
            <ModalHeader>
                <ModalTitle appearance="danger">
                    Confirm Logout
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                <p>
                    Are you sure you want to logout?
                </p>
            </ModalBody>
            <ModalFooter>
                <Button appearance="subtle">Cancel</Button>
                <Button appearance="danger" onClick={handleLogout}>
                    Yes, Logout
                </Button>
            </ModalFooter>
        </>
    );
};

export default LogoutModal