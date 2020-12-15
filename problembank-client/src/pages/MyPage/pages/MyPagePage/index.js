import React from "react";
import "./style.scss";
import Sidebar from "../../../../components/Sidebar/mypage";


function MyPagePage(props) {
	const {user} = props
	return (<Sidebar user = {user}/>)

}

export default MyPagePage;
