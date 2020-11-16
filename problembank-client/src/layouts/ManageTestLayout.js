import React from 'react'
import Spacing from "../components/DesignComponent/Spacing";

function TestLayout(props) {
    const { children } = props;
    return (
        <div className="row">
            <Spacing horizontal={50}/>
            <div className="body-container">
                { children }
            </div>
        </div>
    );
}


export default TestLayout;
