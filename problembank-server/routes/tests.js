var express = require('express');
var router = express.Router();
var db = require('../modules/db-connection');
var sql = require('../sql');

// 전체 시험 출력
router.get('/alltestdata', async function(req, res) {
    try {
        const [rows] = await db.query(sql.tests.selectTests)
        res.status(200).send({
            result: true,
            data: rows,
            message: '전체 시험 리스트'
        })
    } catch (error) {
        console.log(`전체 시험 출력 API 오류 ${error}`)
    }
})

// 시험 문제 목록
router.get('/testproblems', async function(req, res) {
    const { test_id } = req.query
    try {
        let [rows] = await db.query(sql.tests.selectTestProblemsByTestId, [test_id])
        for(let i = 0; i < rows.length; i++)
        {
            let {problem_id} = rows[i]
            let [problem] = await db.query(sql.tests.selectTestProblemNameByProblemId, [problem_id])
            rows[i]["name"] = problem[0].name;
        }
        res.status(200).send({
            result : true,
            data: rows,
            message : '시험 문제 목록'
        })
        
    } catch (error) {
        console.log("Problems List" + error)
    }
})

// 시험 문제 세부 정보
router.get('/testproblemdata', async function(req, res) {
    const { problem_id } = req.query
    try {
        let [rows] = await db.query(sql.tests.selectTestProblemContentsByProblemId, [problem_id])
        let [testcases] = await db.query(sql.tests.selectTwoTestCaseByProblemId, [problem_id])
        let filterTestCase = testcases.map(testcase => ({
            input_exp: testcase.input_example, 
            output_exp: testcase.output_example
            }
        ))
        rows[0]["testcases"] = filterTestCase;
        res.status(200).send({
            result : true,
            data: rows,
            message : '시험 문제 정보'
        })
        
    } catch (error) {
        console.log("Problems Data" + error)
    }
})

// 피드백 목록 출력
router.get('/testfeedback', async function(req, res) {
    const { test_id } = req.query
    try {
        const [rows] = await db.query(sql.tests.selectFeedBackByTestId, [test_id])
        for(let i = 0; i < rows.length; i++) {
            const { author_id } = rows[i]
            const [name] = await db.query(sql.tests.selectUserNameById, [author_id])
            rows[i]["author_name"] = name[0].user_name;
        }
        res.status(200).send({
            result : true,
            data: rows,
            message : '피드백 목록'
        })
        
    } catch (error) {
        console.log("Feedback Data" + error)
    }
})

//전체 응시자 결과 출력
router.get('/adminresult', async function(req, res) {
    const { test_id } = req.query
    try {
        let [rows] = await db.query(sql.tests.selectTestUsersByTestId, [test_id])
        for(let i = 0; i < rows.length; i++) {
            const { user_id } = rows[i]
            const [name] = await db.query(sql.tests.selectUserNameById, [user_id])
            rows[i]["user_name"] = name[0].user_name;
        }
        res.status(200).send({
            result: true,
            data: rows,
            message: '전체 결과'
        })
    } catch (error) {
        console.log("Result Data" + error)
    }
})

//개인 시험 결과 출력
router.get('/userresult', async function(req, res) {
    const { user_id } = req.query
    try {
        let [rows] = await db.query(sql.tests.selectTestUsersByUserId, [user_id])
        for(let i = 0; i < rows.length; i++) {
            const { test_id } = rows[i]
            const [testname] = await db.query(sql.tests.selectTestNameByTestId, [test_id])
            rows[i]["test_name"] = testname[0].name;
        }
        res.status(200).send({
            result: true,
            data: rows,
            message: '사용자 결과'
        })
    } catch (error) {
        console.log("User Result Data" + error)
    }
})

// 이하 개발중

// 학생 시험 조회
router.post('/usertests', async function(req, res) {
    const { user_id } = req.query
    try {
        let [tests] = await db.query(sql.tests.selectTestsByUserId, [user_id])
        for(let i = 0; i < tests.length; i++) {
            const { test_id } = problems[i]
            const [testname] = await db.query(sql.tests.selectTestNameByTestId, [test_id])
            rows[i] = testname[0].name;
        }
        res.status(200).send({
            result: true,
            data: rows,
            message: '사용자 결과'
        })
    } catch (error) {
        console.log("User Test Data " + error)
    }
})

// 테스트 생성
router.post('/createtest', async function(req, res) {
    const {
        testName, testContent, is_exam, start, end, admin_id, subject_id,
        problems
    } = req.body

    db.query(sql.tests.insertTest, [testName, testContent, is_exam, start, end, admin_id, subject_id])
    const {test_id} = db.query(sql.tests.selectInsertedId)

    for(let i = 0; i < problems.length; i++) {
        const {problem_id} = problems[i]
        if(problem_id) {
            db.query(sql.tests.insertProblemFromProblemBank, [problem_id])
            db.query(sql.tests.insertProblemIntoTest, [test_id[0].test_id, problem_id])
        }
        else {
            const {problemName, problemContent, input, output} = problems[i]
            const {testcases} = problems[i]

            db.query(sql.tests.insertProblem, [problemName, problemContent, input, output])

            for(let j = 0; j < testcases; j++) {
                const {input_ex, output_ex} = testcases[i]

                db.query(sql.tests.insertTestCases, [input_ex, output_ex, problem_id])
            }
        }
    }
})

//시험 중 테스트, testcase와 결과를 같이 표시하도록 리빌드 필요
router.post('/testrun', async function(req, res) {
    const { sourceCode, problem_id, language } = req.body;
    const [testCases] = await db.query(sql.tests.selectTwoTestCaseByProblemId, [problem_id]);
    let correctCount = 0;
    try {
        const promises = testCases.map(testcase => {
            return new Promise((resolve) => {
                const docker = compiler.getProblemDocker(sourceCode, language);
                let isStarted = false;
                docker.stderr.on("data", (data) => {
                    //console.log(data.toString('utf-8'));
                    errormsg = data.toString;
                })
    
                docker.stdout.on("data", (data) => {
                    if(!isStarted) return;
                    const line = data.toString('utf-8');
                    output = data.toString;
                })
    
                docker.stdout.on("data", (data) => {
                    const line = data.toString('utf-8');
                    if(line.includes(startDelem)) {
                        isStarted = true;
                        docker.stdin.write(Buffer.from(testcase.input + "\n"));
                    } else if(line.includes(endDelem)) {
                        isStarted = false;
                        resolve();
                    }
                });
            });
        })
    
        for(let i = 0 ; i < promises.length; i++) { await promises[i] }
        
        res.status(200).send({
            result: true,
            data:  { errormsg, output },
            message: 'testrun success'
        })
    } catch (error) {
        console.log(error)
        res.status(404).send({
            result: false,
            data: [],
            message: error
        })
    }
})

// 채점, 문제별 점수 반영 필요
router.post('/submit', async function(req, res){
    const { sourceCode, problemId, language } = req.body;
    const [testCases] = await db.query(sql.tests.selectTestCaseByProblemId, [problemId]);
    let correctCount = 0;
    try {
        const promises = testCases.map(testcase => {
            return new Promise((resolve) => {
                const docker = compiler.getProblemDocker(sourceCode, language);
                let isStarted = false;
                docker.stderr.on("data", (data) => {
                    console.log(data.toString('utf-8'));
                })
    
                docker.stdout.on("data", (data) => {
                    if(!isStarted) return;
                    const line = data.toString('utf-8');
                    if(line.includes(testcase.output)) correctCount++;
                })
    
                docker.stdout.on("data", (data) => {
                    const line = data.toString('utf-8');
                    if(line.includes(startDelem)) {
                        isStarted = true;
                        docker.stdin.write(Buffer.from(testcase.input + "\n"));
                    } else if(line.includes(endDelem)) {
                        isStarted = false;
                        resolve();
                    }
                });
            });
        })
    
        for(let i = 0 ; i < promises.length; i++) { await promises[i] }
        
        res.status(200).send({
            result: true,
            data:  { correctCount, count: testCases.length },
            message: 'compile success'
        })
    } catch (error) {
        console.log(error)
        res.status(404).send({
            result: false,
            data: [],
            message: error
        })
    }
})

module.exports = router;