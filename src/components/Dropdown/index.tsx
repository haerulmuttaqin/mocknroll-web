import React from 'react';

import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';

const DropdownMenuItem= () => {
    return (
        <DropdownMenu trigger="Company">
            <DropdownItemGroup>
                <DropdownItem>PT ABC</DropdownItem>
                <DropdownItem>PT Djarum</DropdownItem>
                <DropdownItem>PT Nestle</DropdownItem>
                <DropdownItem>PT AHM</DropdownItem>

            </DropdownItemGroup>
        </DropdownMenu>
    );
};

export default DropdownMenuItem;