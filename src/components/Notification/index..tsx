import React from "react";
import { NotificationIndicator } from '@atlaskit/notification-indicator';
const NotificationsBadge = () => (
    <NotificationIndicator
        onCountUpdated={console.log}
        notificationLogProvider={Promise.resolve({}) as any}
    />
);

export default NotificationsBadge