import React from 'react'
import Header from '../components/Header';

function ListCategoryLayout(props) {
    const { children } = props;
    return (
        <div className="row">
            <div className="body-container">
                { children }
            </div>
        </div>
    )
}


export default ListCategoryLayout