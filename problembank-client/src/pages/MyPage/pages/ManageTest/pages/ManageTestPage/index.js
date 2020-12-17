import React, { Component } from "react";
import "./style.scss";
import ManageTestLayout from "../../../../../../layouts/ManageTestLayout";
import testAPI from "../../../../../../apis/tests";
import Text from "../../../../../../components/DesignComponent/Text";
import ModifyListModal from "../../../../component/ModifyListModal";

class ManageTestPage extends Component {

    constructor(props){
		super(props);
		this.state={
			isModalOpen : false,
			subject : [],
			testArray : [],
			test : [],
			DB_problem : [],  // problem_id and problem_name
			new_problem : []  // new problem
		};
    };

	openModal = () => {
		this.setState({ isModalOpen : true });
	};

	closeModal = () => {
		this.setState({ isModalOpen : false });
	};

	// if option == 0, edit DB_problem
	// else if option == 1, edit new_problem
	editProblemArray = (option, list) => {
		if(option == 0) {
			this.setState({ DB_problem : list });
		}
		else if(option == 1) {
			this.setState({ new_problem : list });
		}
	};

	selectTest = async () => {
		const e = document.getElementById("name-select");
		for(var i = 0; i < this.state.testArray.length; i++){
			if(this.state.testArray[i].id == e.value){
				var test = this.state.testArray[i];
				document.getElementsByClassName("data-calander")[0].value = test.start.slice(0, -1);;
				document.getElementsByClassName("data-calander")[1].value = test.end.slice(0, -1);;
				alert(test.start);
				document.getElementById("name-text").value = test.name;
				document.getElementById("textarea").value = test.content;

				const _problemArray = await testAPI.getTestProblems({ test_id : test.id });
				var problemArray = new Array();
				for(var i = 0; i < _problemArray.data.length; i++){
					var obj = new Object();
					obj.problem_id = _problemArray.data[i].problem_id;
					obj.problem_name = _problemArray.data[i].name;
					problemArray.push(obj);
				}
				console.log(problemArray);
				this.setState({
					DB_problem : problemArray
				})
			}
		}
	}

    async componentDidMount(){  
		const _subject = await testAPI.getSubjectList({ user_id : this.props.user.id });
		this.setState({
			subject : _subject.data
		});

		const _testArray = await testAPI.getAdminTestList({ admin_id : this.props.user.id });
		this.setState({
			testArray : _testArray.data
		});

		this.selectTest();

		for(var i = 0; i < 2; i++)  // input calander setting
			document.getElementsByClassName("data-calander")[i].value = new Date().toISOString().slice(0, 16);
		
		document.getElementsByClassName("data-calander")[1].min = document.getElementsByClassName("data-calander")[0].value
		document.getElementsByClassName("data-calander")[0].onchange = function() {
			document.getElementsByClassName("data-calander")[1].min = document.getElementsByClassName("data-calander")[0].value
		};
	};

    saveTest = async () => {
		if(document.getElementById("name-text").value === "")
			alert("시험명을 입력해주세요");
		else{
			var DBArray = new Array();
			for(var i = 0; i < this.state.DB_problem.length; i++){
				const _problem = await testAPI.getTestProblemData({ problem_id : this.state.DB_problem[i].problem_id});
				DBArray.push(_problem);
			}
			const problemArray = DBArray.concat(this.state.new_problem);
			var params = {
				'test_id' : document.getElementById("name-select").value,
				'testName' : document.getElementById("name-text").value,
				'testContent' : document.getElementById("textarea").value,
				'start' : document.getElementsByClassName("data-calander")[0].value,
				'end' : document.getElementsByClassName("data-calander")[1].value,
				'admin_id' : this.props.user.id,
				'subject_id' : document.getElementsByClassName("select")[0].value,
				'problems' : problemArray
			};

			if (document.getElementById("checkbox").value === "on")
				params.is_exam = 1;
			else
				params.is_exam = 0;
			
			console.log(params);
			const response = await testAPI.updateTest(params);
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
	<>
	<ManageTestLayout user = {this.props.user}>
	<div class="ManageTestPage">
	    <div class="testName1">
            <Text id="name-label">시험명</Text>
	        <select id="name-select" onChange={this.selectTest}>
	            {
					this.state.testArray.map(testArray => 
						( <option value={testArray.id} label={testArray.name} /> )	
					)
				}
	        </select>
	    </div>
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
	        <select class="select">
				{
					this.state.subject.map(subject =>
						( <option value={subject.id} label={subject.name}/> )
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
					this.state.DB_problem.map(problem =>
						( <option value={problem.problem_id}>{problem.problem_id}. {problem.problem_name}</option> )
					)
				}
				{
					this.state.new_problem.map(problem =>
						( <option value={problem.problemName}>+ {problem.problemName}</option> )
					)
				}
	        </select>
	        <button class="button" onClick={this.openModal}>목록 수정</button>
			<ModifyListModal 
				isOpen={this.state.isModalOpen} 
				open={this.openModal}
				close={this.closeModal}
				DB_problem={this.state.DB_problem}
				new_problem={this.state.new_problem}
				editProblemArray={this.editProblemArray}
			/>
	    </div>
	    <div class="save">
	        <button class="button" onClick={this.saveTest}>저장</button>
		</div>
	</div>
	</ManageTestLayout>
	</>
    );
    }
}

export default ManageTestPage;
