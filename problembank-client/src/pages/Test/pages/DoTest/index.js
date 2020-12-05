import React, { useEffect, useRef, useState } from 'react'
import './style.scss'
import { ControlledEditor } from "@monaco-editor/react";
import SampleCode from '../../../../constansts/SampleCode';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string'
import { getProblemData } from '../../../../_actions/problemAction';
import projectsAPI from '../../../../apis/projects';
import testsAPI from '../../../../apis/tests';
import problemsBank from '../../../../apis/problemsBank';
import WrapperLoading from '../../../../components/WrapperLoading';
import Loading from '../../../../components/Loading/Loading';
import DetailProblemLayout from '../../../../layouts/DetailProblemLayout';

import Timer from '../../../../assets/images/timer.png';
import Button from '../../../../components/DesignComponent/Button';
import Dropup from '../../../../components/DesignComponent/Dropup';
import Toast from '../../../../components/DesignComponent/Toast';
import {debounce} from '../../components/Debounce'
import { Redirect } from 'react-router-dom';

var moment = require('moment'); //?
const debounceRunner = debounce(action=> action(), 4000);
function DoTest(props) {
    const [problems, setProblems] = useState();
    const [problem, setProblem] = useState({testcases:[]});
    // const [index, setIndex] = useState(0);

    const [language, setLanguage] = useState("c");
    const [contentEditor, setContentEditor] = useState(SampleCode["c"]);
    const [sourceCodes, setSourceCodes] = useState(); // 소스 코드 담기용 (problems: [{sourceCode, problem_id, language},...]) 형태
    const [submit, setSubmit] = useState(false)
    const [theme, setTheme] = useState("white")
    const [timer, setTimer] = useState(); // 시험 시칸 체크용
    const [startTimer, setStartTimer] = useState(); // 시험 시작 시간 체크용
    const [timeData, setTimeData] = useState({end:"", start:""});

    const [time, setTime] = useState("before test"); // 시간 텍스트용
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState("");
    
    const [loading, setLoading] = useState(true);
    
    const { test_id, index } = queryString.parse(props.location.search); // index는 0부터 문제 개수-1 까지
    const [prevIndex, setPrevIndex] = useState();
    const {user} = props;

    useEffect(() => {
        if(!problems){
            setTestList();
        } else if(!problem.id || prevIndex !=index){ // 문제 설정이 되어있지 않거나 문제의 인덱스가 변했을 때만
            setPrevIndex(index);
            setTestProblem(problems[index].problem_id)
            
        }
        console.log("updated");
        if((!timer && !startTimer )&& timeData.end){
            CheckStartTime();
        }
    },[index, problems,timeData, submit])

    const handleEditorChange = (env, value) => {
        setContentEditor(value)
        handelSourceCodeChange(index, value);
    }

    const handelSourceCodeChange = (nextIndex, currentValue=false) => {
        // {problem_id: data.problem_id, language: "c", sourceCode: SampleCode["c"] }
        if(nextIndex == Number(index)){ // handleEditorChange에 의해서 코드가 변경될 때 마다 즉시 반영
            const changeCodes = sourceCodes.map((value, cIndex)=>{
                if(cIndex==nextIndex) { // 현제 문제에 대하여
                    return {
                        problem_id: value.problem_id,
                        language: language,
                        sourceCode: currentValue||contentEditor,
                    };
                } else return value; // 그 이외의 문제에 대하여
            });
            setSourceCodes(changeCodes);
        } else{ // 이전, 다음 또는 목록에 의한 버튼을 눌렀을 때 해당 문제로 언어와 소스코드 변경
            const changeCodes = sourceCodes.map((value, cIndex)=>{
                if(cIndex==nextIndex) { // 현제 문제에 대하여
                    setLanguage(value.language)
                    setContentEditor(value.sourceCode);
                    return value;
                } else return value; // 그 이외의 문제에 대하여
            });
            setSourceCodes(changeCodes);
        }
    }
    const resetEditor = () => {
        setContentEditor(SampleCode[language]);
    }
    
    //test content editor & problem
    const onTest = async () => {
        try {
    
            setSubmit(true);
                        
            const problem_id = problems[index].problem_id;
    
            // const IO_URL = process.env.REACT_APP_SERVER_API + "/projects";
    
            const params = {
                sourceCode: contentEditor,
                language,
                problem_id: Number(problem_id)
            }
    
            const response = await testsAPI.testRun(params); 
            
            const { data } = response;
            console.log(response);
            
            var timeOutSubmit = function(){
                // alert(`채점 결과 ${data.correctCount} / ${data.count}`);
                alert(response.message);
                setSubmit(false);
            };
            setTimeout(timeOutSubmit, 1000);
            
        } catch (error) {
            setSubmit(false);
            alert("서버 오류입니다. 잠시 후 다시 시도해주세요.");
            console.log(error)
        }

    }
    const CheckStartTime = () => {
        // const startTime = timeData.start; // 시작 시간이 됬을 때 시작하기
        const startTime = new Date().getTime() + 10*1000; // 테스트 용으로 들어온 시간의 10초 후 타이머 시작
        var x =setInterval(function() {
            var now = new Date().getTime();
            if(startTime <= now){
                CheckTime();
                clearInterval(x);
            }
        },1000);
        setStartTimer(x);
    }

    const CheckTime= () => {
        const limitTime = 9;
        const minC = 60*1000;
        const hourC = 1000*60*60;
        // const timeDiff = new Date(timeData.end).getTime() - new Date().getTime(); // 끝나는 시간과의 차로 제한시간 설정 (삭제 될 수도 있음)
        const timeDiff = 10*60*1000;
        const countDownDate = new Date().getTime() + timeDiff;
        var x = setInterval(function() {
            var now = new Date().getTime();
            var distance = countDownDate - now;
            // var distance = new Date(timeData.end).getTime() - now; // 끝나는 시간 - 현재 시간
            var minutes = Math.floor((distance%(hourC))/(minC));
            var seconds = Math.floor((distance%(minC))/1000);
            setTime(minutes+' : '+seconds);
            if((minutes === limitTime) && (seconds>=0 && seconds <=1)){
                setMessage("시간이 " +limitTime+"분 남았습니다.")
                setShowToast(true);
                debounceRunner(()=>setShowToast(false)) // 만약 초가 2번 반복되는 상황이 발생할 때를 위한 코드
            }
            if(distance<0) {
                clearInterval(x);
                setTime("EXPIRED");
            }
        },1000);
        setTimer(x);
    }

    const TestButton =  () => {
        try{
            setSubmit(true);
            console.log(sourceCodes);
            setSubmit(false);
        } catch (error) {
            alert("서버 오류입니다. 잠시 후 다시 시도해주세요.");
            console.log(error)
            setSubmit(false);
        }
    }

    // 추가적으로 시간 데이터까지 가져오기
    const setTestList = async () => {
        try{
            const params = {
                test_id: test_id,
            };
            const response = await testsAPI.getTestProblems(params);
            const timeData = await testsAPI.getTestTimes(params);
            setTimeData(timeData.data[0]);
            const result = response.data.map((data)=>{
                return {problem_id: data.problem_id, name: data.name };
            });
            result.sort(function(a,b){return Number(a.problem_id)-Number(b.problem_id)})
            setProblems(result); // 배열 형태
            const codes = response.data.map((data)=>{
                return {problem_id: data.problem_id, language: "c", sourceCode: SampleCode["c"] };
            });
            codes.sort(function(a,b){return Number(a.problem_id)-Number(b.problem_id)}) // 문제 아이디 별로 정렬
            setSourceCodes(codes);
        } catch (error) {
            alert("서버 오류입니다. 잠시 후 다시 시도해주세요.");
            console.log(error);
        }  
    }

    const setTestProblem = async (id) => {
        try{
            const params = {
                problem_id: id,
            };
            const response = await testsAPI.getTestProblemData(params);
            setProblem(response.data[0]); // 객체 형태
            setLoading(false);
        } catch (error) {
            alert("서버 오류입니다. 잠시 후 다시 시도해주세요.");
            console.log(error);
        }
        
    }

    const onSubmit = async () => {
        try{
            setSubmit(true);
            const params = {
                test_id: test_id,
                user_id: user.id,
                problems: sourceCodes,
            };
            const response = await testsAPI.submit(params);
            console.log(response);
            setSubmit(false);
        } catch (error) {
            setSubmit(false);
            alert("서버 오류입니다. 잠시 후 다시 시도해주세요.");
            console.log(error)
        }
    }

    if(loading){
        return <Loading  type={'bars'} color={'black'}  />
    }
    return (
        <DetailProblemLayout>
            <div className="problem__detail__test">
                <div className="problem__detail__test--content">
                    <div className="tab__header">
                        <ul className="tab__header--content">
                            <li>
                                <img src={Timer} alt="timer"/>
                                <p>{time}</p>
                            </li>
                            
                        </ul>
                    </div>
                    <div className="wrapper__content">
                        <h3>{problem.id}. {problem.name}</h3>
                        <div className="problem__infor">
                            <div className="problem__infor--desc">
                                <p>문재 정의</p>
                                <span>{problem.content}</span>
                            </div>
                            <div className="problem__infor--input">
                                <p>입력</p>
                                <span>{problem.input}</span>
                            </div>
                            <div className="problem__infor--output">
                                <p>출력</p>
                                <span>{problem.output}</span>
                            </div>
                            <div className="problem__infor--example">
                                <div className="problem__infor--inputexp">
                                    <p>입력 예제</p>
                                    {
                                        problem.testcases.length !== 0 &&
                                            problem.testcases.map(testcase => <span>{testcase.input_exp}</span>)
                                    }
                                </div>
                                <div className="problem__infor--outputexp">
                                    <p>출력 예제</p>
                                    {
                                        problem.testcases.length !== 0 &&
                                            problem.testcases.map(testcase => <span>{testcase.output_exp}</span>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab__footer__dropup">
                        <div className="review__listproblem">
                            <Dropup icon="fa fa-list">
                                {
                                    problems.length !==0 &&
                                    problems.map((value, index)=>
                                <button onClick={() => {handelSourceCodeChange(index); props.history.push(`/test/view?index=${Number(index)}&test_id=${test_id}`)}}>
                                    {problems[index].name}</button>)
                                }
                            </Dropup>
                        </div>
                        <div className="pre-next-problem">
                            {
                                problems.length !== 0 ?
                                    <>
                                    <Button onPress={() => {handelSourceCodeChange(Number(index)- 1); props.history.push(`/test/view?index=${Number(index)- 1}&test_id=${test_id}`)}} 
                                        disabled={index==0} >이전</Button>&nbsp;
                                        <span>{Number(index)+1}/{problems.length}</span>&nbsp;
                                    <Button onPress={() => {handelSourceCodeChange(Number(index)+ 1); props.history.push(`/test/view?index=${Number(index)+ 1}&test_id=${test_id}`);}} 
                                        disabled={index == (problems.length-1)}>다음</Button>
                                    </>
                                : ""
                                
                            }
                        </div>
                    </div>
                    
                </div>
                <div className="problem__detail__test--vseditor">
                    <div className="tab__header--editor">
                        <ul>
                            <li>
                                <span>언어 </span>
                                <select name="" id="" className="language" value = {language} onChange={e => { setLanguage(e.target.value); setContentEditor(SampleCode[e.target.value])}}>
                                    <option value="c">C</option>
                                    <option value="cpp">C++</option>
                                    <option value="java">Java</option>
                                    <option value="python">Python</option>
                                    <option value="r">R</option>
                                </select>
                            </li>
                            <li>
                                <span>Editor Theme </span>
                                <select name="" id="" className="language" value={theme} onChange={(e) => setTheme(e.target.value)}>
                                    <option value="white">White</option>
                                    <option value="dark">Dark</option>
                                </select>
                            </li>
                        </ul>
                    </div>
                    <div className="wrapper__editor">
                            {
                                submit ? 
                                <div className="wrapper__editor--submit">
                                    <WrapperLoading />
                                </div> : ""
                            }
                            <ControlledEditor
                                width="100%"
                                height="100%"
                                theme={theme}
                                language={language}
                                value={contentEditor}
                                onChange={handleEditorChange}
                                loading={<WrapperLoading />}
                                
                            /> 
                    </div>
                    <div className="tab__footer">
                        <Button distance>오류 보고</Button>
                        <Button distance onPress={()=>resetEditor()}>초기화</Button>
                        <Button distance onPress={() => onTest()}>실행</Button>
                        <Button distance test onPress={() => onSubmit()}>제출</Button>
                        <Button test onPress={()=>TestButton()}>실험용</Button>
                    </div>
                </div>
            </div>
            {showToast && 
            <Toast message={message} warning/>}
        </DetailProblemLayout>
    )
}


export default DoTest

