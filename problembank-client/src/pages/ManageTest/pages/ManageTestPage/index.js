import React, { useState } from "react";
import "./style.scss";
import ManageTestLayout from "../../../../layouts/ManageTestLayout";
import InlineList from "../../../../components/DesignComponent/InlineList";
import Input from "../../../../components/DesignComponent/Input";
import Text from "../../../../components/DesignComponent/Text";
import Spacing from "../../../../components/DesignComponent/Spacing";

function TestPage(props) {
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState(false);
	const {user} = props
    return (
	<ManageTestLayout user = {user}>
        <div class="ManageTestPage">
	    <div class="testName1">
                <Text id="name-label">시험명</Text>
	        <select id="name-text">
	            <option label="웹프로그래밍 중간고사"/>
	            <option label="웹프로그래밍 기말고사"/>
	        </select>
	        <button class="button">조회</button>
	    </div>

	    <div class="testDate">
	        <Text id="data-label">시험 일자</Text>
	        <input type='date' class="data-calander"></input>  
	        <Text>~</Text>
	        <input type='date' class="data-calander"></input>
	    </div>

	    <div class="testName2">
	        <Text id="name-label">시험명</Text>
	        <input type="text" id="name-text"/>
	    </div>

	    <div class="termExam">
	        <input type="checkbox" id="checkbox"/>
	        <Text>과목 중간/기말고사</Text>
	    </div>

	    <div class="className">
	        <Text>과목명</Text>
	        <select id="select">
	            <option label="기초프로그래밍"/>
	            <option label="웹프로그래밍"/>
	        </select>
	    </div>

	    <div class="testContent">
	        <Text>시험 내용</Text>
	        <input type="textarea" id="textarea"/>
	    </div>

	    <div class="selectProblem">
	        <Text>문제 선택</Text>
	        <select multiple="multiple" id="select">
	            <option label="자료구조"/>
	            <option label="알고리즘"/>
	        </select>
	        <button class="button">목록 수정</button>
	    </div>
	    <div class="save">
	        <button class="button">저장</button>
	    </div>
        </div>
	</ManageTestLayout>
    );
}

export default TestPage;
