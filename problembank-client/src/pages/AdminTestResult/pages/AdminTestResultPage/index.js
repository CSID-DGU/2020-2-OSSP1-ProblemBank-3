import React, { useState } from "react";
import "./style.scss";
import AdminTestResultLayout from "../../../../layouts/AdminTestResultLayout";
import AdminResultTable from "../../components/AdminResultTable";

function AdminTestResultPage(props) {
	const {user} = props
    return(
        <AdminTestResultLayout user = {user}>
	    <div id="content">
	        <div id="content-header">
	            <div id="testDate">
	                <text>시험 일자</text>
	                <input type="datetime-local" class="data-calander"></input>
	                <text>&nbsp;~&nbsp;</text>
	                <input type="datetime-local" class="data-calander"></input>
	            </div>
	            <div id="testName">
	                <text>시험명</text>
	                <select id="select">
	                    <option label="2020 동국대학교 프로그래밍 경진대회"/>
	                    <option label="2021 동국대학교 프로그래밍 경진대회"/>
	                </select>
	            </div>
	            <button>조회</button>
	        </div>
	        <div id="content-table">
	            <AdminResultTable></AdminResultTable>
	        </div>
	    </div>
	</AdminTestResultLayout>
    );
}

export default AdminTestResultPage;
