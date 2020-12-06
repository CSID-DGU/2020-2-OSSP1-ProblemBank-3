import React, { Component } from "react";
import "./style.scss";
import CreateTestLayout from "../../../../layouts/CreateTestLayout";
import testAPI from "../../../../apis/tests";
import Text from "../../../../components/DesignComponent/Text";

class CreateTestPage extends Component {

    constructor(props){
        super(props);
	this.state = {
	    params : {
	        testName : "",
		testContent : "",
		is_exam : 0,
		start : null,
		end : null,
		admin_id : -1,
		subject_id : -1,
		problems : []
	    }
	};
    };

    componentDidMount(){
	for(var i = 0; i < 2; i++)
            document.getElementsByClassName("data-calander")[i].value = new Date().toISOString().slice(0, 16);
    }

    //getUserInfo = async() => 

    saveTest = (props) => {
	alert("asdf");
        this.setState(params => ({
	    testName : document.getElementById("name-text").value,
	    testContent : document.getElementById("textarea").value,
	    is_exam : document.getElementById("checkbox").value,
	    start : document.getElementsByClassName("data-calander")[0].value,
	    end : document.getElementsByClassName("data-calander")[1].value
	    // admin_id : 
 	    // subject_id : 
	    // problems :
	}));
	console.log("asdf");
	console.log(this.params);
    }

    /*
    const createTest = async (value)=>{
        
	setLoading(true);
	const ret = {
            testName : document.getElementById("name-label").value,
	    testContent : document.getElementById("textarea").value,
	    is_exam : document.getElementById("checkbox").value,
	    start : document.getElementsByClassName("data-calander")[0].value,
	    end : document.getElementsByClassName("data-calender")[1].value
	    // admin_id : 
	    // subject_id : 
	    // problems :  
	};
	alert(ret);

	//const response = await testAPI.regTest(ret);
	console.log(ret);
    }*/
    
    render(){
    return (
	<CreateTestLayout>
	<div id="CreateTestLayoutBody">
	    <div class="testDate">
	        <Text id="data-label">시험 일자</Text>
	        <input type='datetime-local' class="data-calander"></input>  
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
	        <button class="button" onClick={this.saveTest}>저장</button>
	    </div>
	</div>
	</CreateTestLayout>
    );
    }
}

export default CreateTestPage;
