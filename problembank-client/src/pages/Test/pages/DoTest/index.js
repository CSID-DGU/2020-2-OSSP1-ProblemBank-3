import React, { useEffect, useRef, useState } from 'react'
import './style.scss'
import { ControlledEditor } from "@monaco-editor/react";
import SampleCode from '../../../../constansts/SampleCode';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string'
import { getProblemData } from '../../../../_actions/problemAction';
import projectsAPI from '../../../../apis/projects';
import problemsBank from '../../../../apis/problemsBank';
import WrapperLoading from '../../../../components/WrapperLoading';
import Loading from '../../../../components/Loading/Loading';
import DetailProblemLayout from '../../../../layouts/DetailProblemLayout';

import Timer from '../../../../assets/images/timer.png';
import Button from '../../../../components/DesignComponent/Button';
import Dropup from '../../../../components/DesignComponent/Dropup';

var moment = require('moment'); //?

function DoTest(props) {
    const [problems, setProblems] = useState([])
    const [problem, setProblem] = useState({})
    const {problemsAllData} = useSelector(state => state.problem);

    const [language, setLanguage] = useState("c")
    const [contentEditor, setContentEditor] = useState(SampleCode["c"])
    const [submit, setSubmit] = useState(false)
    const [theme, setTheme] = useState("white")
    const [timer, setTimer] = useState();
    const [time, setTime] = useState("");
    
    const dispatch = useDispatch();
    
    const [loading, setLoading] = useState(true)
    
    const { id } = queryString.parse(props.location.search);

    useEffect(() => {
        if(problemsAllData){
            const { data }  = problemsAllData;
            const [ problem ] = data.filter(element =>Number(element.id) === Number(id))
            setProblems(data)
            setLoading(false)
            setProblem(problem)
        }else{
            dispatch(getProblemData()).then(response => {
                const { data } = response.payload
                const [ problem ] = data.filter(element =>Number(element.id) === Number(id))
                
                console.log(problem)
                setProblem(problem)
                setProblems(data)
                setLoading(false)
            })
        }
        if(!timer){
            CheckTime();
        }
    }, [id])

    const handleEditorChange = (env, value) => {
        setContentEditor(value)
    }
    const resetEditor = () => {
        setContentEditor(SampleCode[language]);
    }
    
    //submit content editor & problem
    const onSubmit = async () => {
        try {
    
            setSubmit(true);
                        
            const problemId = queryString.parse(window.location.search).id;
    
            // const IO_URL = process.env.REACT_APP_SERVER_API + "/projects";
    
            const params = {
                sourceCode: contentEditor,
                language,
                problemId: Number(problemId)
            }
    
            const response = await projectsAPI.compile(params); 
            
            const { data } = response;
            
            var timeOutSubmit = function(){
                alert(`채점 결과 ${data.correctCount} / ${data.count}`);
                setSubmit(false);
            };
            setTimeout(timeOutSubmit, 1000);
            
        } catch (error) {
            setSubmit(false);
            alert("서버 오류입니다. 잠시 후 다시 시도해주세요.");
            console.log(error)
        }

    }
    
    const CheckTime= () => {
        const m = 0.1;
        const countDownDate = new Date().getTime() + (m*60*1000);
        var x = setInterval(function() {
            var now = new Date().getTime();
            var distance = countDownDate - now;
            var minutes = Math.floor((distance%(1000*60*60))/(1000*60));
            var seconds = Math.floor((distance%(1000*60))/1000);
            setTime(minutes+' : '+seconds);
            if(distance<0) {
                clearInterval(x);
                setTime("EXPIRED");
            }
        },1000);
        setTimer(x);
    }

    if(loading){
        return <Loading  type={'bars'} color={'black'}  />
    }
    return (
        <DetailProblemLayout>
            <div className="problem__detail">
                <div className="problem__detail--content">
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
                                <p>츨력</p>
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
                    <div className="tab__footer">
                        <div className="review__listproblem">
                            <Dropup icon="fa fa-list">
                                <button onClick={() => props.history.push("/test/view?id=1")}>test1</button>
                                <button onClick={() => props.history.push("/test/view?id=2")}>test2</button>
                                <button onClick={() => props.history.push("/test/view?id=3")}>test3</button>
                            </Dropup>
                        </div>
                        <div className="pre-next-problem">
                            {
                                problems.length !== 0 ?
                                    <>
                                    <Button onPress={() => props.history.push(`/test/view?id=${problem.id - 1}`)} disabled={problem.id === problems[0].id} >이전</Button>&nbsp;
                                        <span>{problem.id}/{problems.length}</span>&nbsp;
                                    <Button onPress={() => props.history.push(`/test/view?id=${problem.id + 1}`)} disabled={problem.id === problems[problems.length-1].id}>다음</Button>
                                    </>
                                : ""
                                
                            }
                        </div>
                    </div>
                    
                </div>
                <div className="problem__detail--vseditor">
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
                        <Button distance onPress={() => onSubmit()}>실행</Button>
                        <Button test >제출</Button>
                    </div>
                </div>
            </div>
        </DetailProblemLayout>
    )
}


export default DoTest

