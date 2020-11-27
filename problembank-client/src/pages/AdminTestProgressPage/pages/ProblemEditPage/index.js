import React, {Component} from "react";
import testAPI from '../../../../apis/tests';
import './style.scss'

class ProblemEditPage extends Component {
    // 서버에서 받아온 다음 onChange 함수 만들어줘야함
	constructor(props) {
		super(props);
		this.state = {
			code: false,
			datas: [],
			selected_problem_data: {
				id: -1,
				name: "",
				content: "",
				input: "",
				output: "",
				testcases: []
			}
		}
		this.handleChangeSelect = this.handleChangeSelect.bind(this);
	}

	getTestProblems = async() => {
		const response = await testAPI.getTestProblems({test_id: 1});
		this.setState({
			code: response.result,
			datas: response.data,
		});
		console.log(response.data)
	}

	getTestProblemData = async(id) => {
		const response = await testAPI.getTestProblemData({problem_id: id});
		this.setState({
			selected_problem_data: response.data[0]
		});
		console.log(response.data[0])
	}

	getTestProblemsInit = async() => { // 페이지 처음 열렸을 때 실행할 통신 함수
		const response = await testAPI.getTestProblems({test_id: 1});
		this.setState({
			code: response.result,
			datas: response.data,
		});
		this.getTestProblemData(response.data[0].problem_id)
	}

	componentDidMount() {
		this.getTestProblemsInit();
	}

	handleChangeSelect(event) {
		const selected_data = this.state.datas.find((data) => data.problem_id === Number(event.target.value))
		console.log("selected id : "+String(selected_data.problem_id))
		this.getTestProblemData(selected_data.problem_id)
	}

	render() {
    	return(
			<div className="progress__container">
				<div id="select-area">
					<select className="select_problem" id="select_problem" name="type" onChange={this.handleChangeSelect}>
						{
							this.state.datas.map((item,index) => {
								return (
									<option key={index} label={item.name} value={item.problem_id}/>
								)
							})
						}
					</select>
				</div>
				<div id="input-area">
					<input
						id="problem-name"
						name="title"
						type="text"
						placeholder="문제 제목"
						value={this.state.selected_problem_data.name}
					/>
					<p>문제 정의</p>
					<input
						id="problem-define"
						name="problem_definition"
						type="text"
						placeholder="문제 정의"
						value={this.state.selected_problem_data.content}
					/>

					<p>입력</p>
					<input
						id="problem-input"
						name="input"
						type="text"
						placeholder="입력 조건"
						value={this.state.selected_problem_data.input}
						width={200}
					/>

					<p>출력</p>
					<input
						id="problem-output"
						name="output"
						type="text"
						placeholder="출력 조건"
						value={this.state.selected_problem_data.output}
					/>
					<div id="example-data">
						<div id="input-data">
							<p>입력 예제</p>
							{
								this.state.selected_problem_data.testcases.map((item,index) => {
									return (
										<input
											name={"input_case"+(index+1)}
											type="text"
											placeholder="입력 테스트케이스"
											value={item.input_exp}
										/>
									)
								})
							}
						</div>
						<div id="output-data">
							<p>출력 예제</p>
							{
								this.state.selected_problem_data.testcases.map((item,index) => {
									return (
										<input
											name={"output_case"+(index+1)}
											type="text"
											placeholder="출력 테스트케이스"
											value={item.output_exp}
										/>
									)
								})
							}
						</div>
					</div>
					<button>수정</button>
				</div>
			</div>
		)
	}
}

export default ProblemEditPage
