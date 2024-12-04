import React, {useState} from 'react';
import {Search} from "@atlaskit/atlassian-navigation";

const DefaultSearchBar = () => {
    const [value, setValue] = useState('');
    const onChange = (event: any) => {
        setValue(event.target.value)
    }
    return (
        <div>
            <Search
                onClick={onChange}
                placeholder="Search..."
                tooltip="Search"
                label="Search"
                value={value}
            />
        </div>
    );
};

export default DefaultSearchBar;