import React from "react";
import "./style.scss";
import MyTestsLayout from "../../../../layouts/MyTestsLayout";
import AdminTestResultLayout from "../../../../layouts/AdminTestResultLayout";


function MyPagePage(props) {
	const {user} = props
	if(user.is_admin) return (<AdminTestResultLayout user = {user}/>)
	else return (<MyTestsLayout user = {user}/>)

}

export default MyPagePage;
