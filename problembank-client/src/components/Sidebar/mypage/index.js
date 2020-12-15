import React from 'react';
import "../style.scss";
import styled from 'styled-components';
import { Link, NavLink, useLocation} from 'react-router-dom';

function Sidebar(props) {
	const location = useLocation();
    function SidebarClick(evt) {

        var panel = evt.target.nextElementSibling;
		var state = panel.style.display;

		var panelList = document.getElementsByClassName("panel");
		var accordionList = document.getElementsByClassName("accordion");
		
		var i;
		for(i = 0; i < panelList.length; i++){
			panelList[i].style.display = "none";
		}
		for(i = 0; i < accordionList.length; i++){
			accordionList[i].style.color = "#000000";
			accordionList[i].style.backgroundColor = "#FFFFFF";
		}

		if(state == "block") {  // click when menu is selected
			panel.style.display = "none";
			evt.target.style.color = "#000000";
			evt.target.style.backgroundColor = "#FFFFFF";
		}
		else {  // click when menu is not selected
			panel.style.display = "block";
			evt.target.style.color = "#FFFFFF";
			evt.target.style.backgroundColor = "#FF9900";
		}
    }

    return (
	<div className="Sidebar">
	    <ul className="Sidebar-list">
	        <li>
	            <div id="Sidebar1">
	                <button class="accordion" onClick={SidebarClick}>회원 정보 수정</button>
	                <div class="panel">
	                </div>
	            </div>
	        </li>
	        <li>
	            <div id="Sidebar2">
	                <button className={`accordion ${location.pathname === '/createtest' && 'active'}`} onClick={SidebarClick}>내 시험/대회</button>
	                <div class="panel">
	                    <ul>
							{props.user.is_admin ? (
								<li>
									<NavLink to="/admintestresult" className="navLink">시험 결과 조회</NavLink>
								</li>
							) : (
								<li>
									<NavLink to="/" className="navLink">시험 결과 조회</NavLink>
								</li>
							)}

							{props.user.is_admin ? (
								<li>
									<NavLink to="/test/admin" className="navLink">시험 조회 및 수정</NavLink>
								</li>
							) : (
								<li>
									<NavLink to="/mytests" className="navLink">시험 조회 및 수정</NavLink>
								</li>
							)}

							{props.user.is_admin ? (
								<li>
									<NavLink to="/createtest" className="navLink">시험 생성</NavLink>
								</li>
							) : (
								<li/>
							)}

	                    </ul>
	                </div>
	            </div>
	        </li>
	    </ul>
	</div>
    )
}


export default Sidebar
