import React from 'react';
import Sidebar from '../components/Sidebar/mypage';

function CreateTestLayout(props) {
    const { children } = props;
    const { user } = props;
    return (
        <div>
            <Sidebar user = {user}></Sidebar>
            <div>
                { children }
            </div>
        </div>
    );
}

export default CreateTestLayout;
