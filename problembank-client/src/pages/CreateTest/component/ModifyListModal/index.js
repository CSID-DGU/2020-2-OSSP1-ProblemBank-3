import React, { Component } from "react";
import "./style.scss";
import { getProblemData } from "../../../../_actions/problemAction";
import problemsBank from "../../../../apis/problemsBank";

class ModifyListModal extends Component {
    
	constructor(props){
		super(props);
		this.state={
			keyword : "",
			problems : [],  // total problem
			resultProblem : []  // searched problem
		};
	};

	async componentDidMount(){
		const request = await problemsBank.getProblemAllData();
		this.setState({ problems : request.data })
		this.setState({ resultProblem : request.data })
	};

	searchProblem = () => {  // operate when click search button
		const searchValue = document.getElementById("search-box").value;
		const filterProblems = this.state.problems.filter(
			element => element.id === Number(searchValue) || 
			element.name.match(new RegExp(searchValue, "i"))
		);
		this.setState({ keyword : searchValue });
		this.setState({ resultProblem : filterProblems });
	};

	addProblem = () => {
		// const insertProblemId = Document.getElementById("added-problem").value;
		// var obj = new Object();
		// obj.problem_id = insertProblemId;
		//
		// const index = this.state.problems.find(element => element.id == insertProblemId);
		// obj.problem_name = this.state.problems[index].name;
		//
		// var tempArray = this.props.DB_problem;
		// tempArray.push(obj)
		//
		// this.props.editProblemArray(tempArray);
		alert("asdf");
	};

	removeProblem = () => {

	};

    render() {

		const { isOpen, close, DB_problem, new_problem } = this.props;

		return (
			<>
				{ isOpen ? (
					<div id="out" onClick={close}>
						<div id="modalWindow">
							<span id="close" onClick={close}>
								&times;
							</span>
							<div id="modifyList">
								<div id="problem-list-block">
									<div id="problem-search-box">
										<div id="search-bar">
											<input 
												type="text" 
												id="search-box" 
												onChange={this.searchProblem}
												placeholder="문제 제목, 번호로 검색"
											/>
										</div>
										<select multiple id="problem-list-select">
											{
												this.state.resultProblem.map(resultProblem =>
													( <option value={resultProblem.id}>{resultProblem.id}. {resultProblem.name}</option> )
												)
											}
	        							</select>
										<div id="add-problem-button-div">
											<button onClick={this.addProblem}>+</button>
											&nbsp;&nbsp;&nbsp;
											<button>-</button>
										</div>
									</div>
									<div id="test-problem-list">
										<div class="text">
											<p>추가된 문제</p>
										</div>
										<select multiple id="added-problem">
											{
												DB_problem.map(DB_problem =>
													( <option value={DB_problem.id}>{DB_problem.id}. {DB_problem.name}</option> )	
												)
											}
											{
												new_problem.map(new_problem =>
													( <option value={new_problem.problemName}>+ {new_problem.problemName}</option> )	
												)
											}
										</select>
									</div>
								</div>
								<div id="middle-line"></div>
								<div id="new-problem">
									<div class="form">
										<input 
											type="text" 
											placeholder="문제 제목을 입력해주세요."
											id="problem-name"
										/>
									</div>
									<div class="form">
										<p>문제 정의</p>
										<input
											type="text"
											placeholder="문제 정의를 입력해주세요."
											id="problem-detail"
										/>
									</div>
									<div class="form">
										<p>입력</p>
										<input
											type="text"
											placeholder="입력 조건을 입력해주세요."
											id="input-detail"
										/>
									</div>
									<div class="form">
										<p>출력</p>
										<input
											type="text"
											placeholder="출력 조건을 입력해주세요."
											id="output-detail"
										/>
								      	</div>
									<div id="testcase-div">
										<div id="input-case">
											<p>입력 예제</p>
											<input type="text" class="testcase"/>
											<input type="text" class="testcase"/>
											<input type="text" class="testcase"/>
											<input type="text" class="testcase"/>
											<input type="text" class="testcase"/>
										</div>
										<div id="output-case">
											<p>출력 예제</p>
											<input type="text" class="testcase"/>
											<input type="text" class="testcase"/>
											<input type="text" class="testcase"/>
											<input type="text" class="testcase"/>
											<input type="text" class="testcase"/>
										</div>
									</div>
									<div id="addProblemButton">
										<button>문제 추가</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				) : null}
			</>
		)
	}
}

export default ModifyListModal;
