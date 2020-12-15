import React, { Component } from "react";
import "./style.scss";
import testAPI from "../../../../apis/tests";

class ModifyListModal extends Component {
    
	constructor(props){
		super(props);
	};

    render() {

		const { isOpen, close } = this.props;

		return (
			<>
				{ isOpen ? (
					<div id="out" onClick={close}>
						<div id="modalWindow">
							<span id="close" onClick={close}>
								&times;
							</span>
							<div id="modifyList" onClick={isOpen}>
								<div id="problem-list-block">
									<div id="problem-list">
										<div class="text">
											<p>문제 목록</p>
										</div>
										<select multiple="multiple" id="problem-list-select">
											<option label="몫과 나머지"/>
											<option label="합과 곱"/>
										</select>
									</div>
									<div id="button-box">
										<button>+</button>
										&nbsp;&nbsp;
										<button>-</button>
									</div>
									<div id="test-problem-list">
										<div class="text">
											<p>추가된 문제</p>
										</div>
										<select multiple="multiple" id="test-problem-list-select">ㅑ
											<option label="주식 계산"/>
										</select>
									</div>
								</div>
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
