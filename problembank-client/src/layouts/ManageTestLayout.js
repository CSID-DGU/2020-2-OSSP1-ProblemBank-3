import React from 'react';
import Sidebar from '../components/Sidebar/mypage';

function ManageTestLayout(props) {
    const { children } = props;
    return (
        <div className="page">
	    <Sidebar style={{
	        display : 'block'
	    }}></Sidebar>
            <div className="body-container" style={{
	        position : 'relative',
	        left : '5px'
	    }}>
                { children }
            </div>
        </div>
    );
}

export default ManageTestLayout;
