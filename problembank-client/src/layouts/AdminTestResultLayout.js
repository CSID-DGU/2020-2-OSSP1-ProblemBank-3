import React from 'react';
import Sidebar from '../components/Sidebar/mypage';

function AdminTestResultLayout(props) {
    const { children } = props;
    return (
        <div>
	    <Sidebar></Sidebar>
            <div>
                { children }
            </div>
        </div>
    );
}

export default AdminTestResultLayout;
