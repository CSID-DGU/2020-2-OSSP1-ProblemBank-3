import React from 'react';
import Sidebar from '../components/Sidebar/mypage';

function CreateTestLayout(props) {
    const { children } = props;
    return (
        <div className="page">
	    <Sidebar></Sidebar>
            <div className="body-container">
                { children }
            </div>
        </div>
    );
}

export default CreateTestLayout;
