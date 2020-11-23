import React from 'react';
import "../style.scss";
import styled from 'styled-components';
import { Link, NavLink} from 'react-router-dom';

function Sidebar(props) {

    function SidebarClick(evt) {

        var panel = evt.target.nextElementSibling;
	var state = panel.style.display;

	var panelList = document.getElementsByClassName("panel");
	
	var i;
	for(i = 0; i < panelList.length; i++){
	    panelList[i].style.display = "none";
	}

	if(state == "block") {
	    panel.style.display = "none";
	}
	else {
	    panel.style.display = "block";
	}
    }

    return (
	<div className="Sidebar">
	    <ul className="Sidebar-list">
	        <li>
	            <div id="Sidebar1">
	                <button class="accordion" onClick={SidebarClick}>회원 정보 수정</button>
	                <div class="panel">
	                    <ul>
	                        <li>test1</li>
	                        <li>test2</li>
	                    </ul>
	                </div>
	            </div>
	        </li>
	        <li>
	            <div id="Sidebar2">
	                <button class="accordion" onClick={SidebarClick}>내 시험/대회</button>
	                <div class="panel">
	                    <ul>
	                        <li>시험 결과 조회</li>
	                        <li>시험 조회 및 수정</li>
	                        <li>시험 생성</li>
	                    </ul>
	                </div>
	            </div>
	        </li>
	    </ul>
	</div>
    )
}

export default Sidebar
