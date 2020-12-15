import React, { Component } from "react";
import "./style.scss";
import CreateTestLayout from "../../../../layouts/CreateTestLayout";
import testAPI from "../../../../apis/tests";
import Text from "../../../../components/DesignComponent/Text";
import problemsBank from "../../../../apis/problemsBank";
import { ThemeProvider } from "styled-components";

class CreateTestPage extends Component {

    constructor(props){
		super(props);
		this.state={
			subject : [],
			problem : []
		}
    };

    async componentDidMount(){  

		const _subject = await problemsBank.getCategory();  // subject name select input
		let { data } = _subject;
		this.setState({
			subject : data
		})

		for(var i = 0; i < 2; i++)  // input calander setting
			document.getElementsByClassName("data-calander")[i].value = new Date().toISOString().slice(0, 16);
		
		document.getElementsByClassName("data-calander")[1].min = document.getElementsByClassName("data-calander")[0].value
		document.getElementsByClassName("data-calander")[0].onchange = function() {
			document.getElementsByClassName("data-calander")[1].min = document.getElementsByClassName("data-calander")[0].value
		};
	};

    saveTest = (props) => {
		if(document.getElementById("name-text").value === "")
			alert("시험명을 입력해주세요");
		else{
			var params = {
				'testName' : document.getElementById("name-text").value,
				'testContent' : document.getElementById("textarea").value,
				'start' : document.getElementsByClassName("data-calander")[0].value,
				'end' : document.getElementsByClassName("data-calander")[1].value,
				'admin_id' : props.id,
				'subject_id' : document.getElementsByClassName("select")[0].value,
				'problems' : this.state.problem
			};

			if (document.getElementById("checkbox").value === "on")
				params.is_exam = 1;
			else
				params.is_exam = 0;

			const response = testAPI.createTest(params);
			/* for debug
			alert(params.testName);
			alert(params.testContent);
			alert(params.is_exam);
			alert(params.start);
			alert(params.end);
			alert(params.admin_id);
			alert(params.subject_id);
			alert(params.problems);
			*/
		}
		
    };
    
    render(){

    return (
	<CreateTestLayout user = {this.props.user}>
	<div id="CreateTestLayoutBody">
	    <div class="testDate">
	        <Text id="data-label">시험 일자</Text>
	        <input type='datetime-local' class="data-calander" onchange="calanderChange"></input>  
	        <Text>~</Text>
	        <input type='datetime-local' class="data-calander"></input>
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
	        <select class="select">
				{
					this.state.subject.map(subject =>
						( <option label={subject.name}/> )
					)
				}
	        </select>
	    </div>

	    <div class="testContent">
	        <Text>시험 내용</Text>
	        <input type="textarea" id="textarea"/>
	    </div>

	    <div class="selectProblem">
	        <Text>문제 선택</Text>
	        <select multiple="multiple" id="select">
				{
					this.state.problem.map(problem =>
						( <option label={problem}/> )
					)
				}
	        </select>
	        <button class="button">목록 수정</button>
	    </div>
	    <div class="save">
	        <button class="button" onClick={this.saveTest}>저장</button>
	    </div>
	</div>
	</CreateTestLayout>
    );
    }
}

export default CreateTestPage;
