import React, { useState } from 'react';
import "../style.scss";
import styled from 'styled-components';
import { Link, NavLink, useLocation } from 'react-router-dom';

function Sidebar(props) {
	const location = useLocation();

	const [isShown, setIsShown] = useState(false);

	function handleInfoEditClick() {
		alert("준비중입니다.");
	}


    return (
	<div className="Sidebar">
	    <ul className="Sidebar-list">
	        <li>
	            <div id="Sidebar1">
	                <button class="buttonStyle accordion" onMouseEnter={() => setIsShown(false)} onClick={handleInfoEditClick}>회원 정보 수정</button>
	                <div class="panel">
	                </div>
	            </div>
	        </li>
	        <li>
	            <div id="Sidebar2">
					<button className={`buttonStyle accordion ${location.pathname.includes('/mypage/mytest') && 'active'}`} 
						onMouseEnter={() => setIsShown(true)}>내 시험/대회</button>
	                {	isShown ?
						<div class="panel">
	                    <ul>
							{props.user.is_admin ? (
								<li>
									<NavLink to="/admintestresult" className="navLink">시험 결과 조회</NavLink>
								</li>
							) : (
								<li>
									<NavLink to="/studenttestresult" className="navLink">시험 결과 조회</NavLink>
								</li>
							)}

							{props.user.is_admin ? (
								<li>
									<NavLink to="/test/admin" className="navLink">시험 조회 및 수정</NavLink>
								</li>
							) : (
								<li>
									<NavLink to="/mytests" className="navLink">신청 시험 조회</NavLink>
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
	                </div> : null}
	            </div>
	        </li>
	    </ul>
	</div>
    )
}


export default Sidebar
