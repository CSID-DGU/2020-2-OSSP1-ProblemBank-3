var express = require('express');
var router = express.Router();
var db = require('../modules/db-connection');
var sql = require('../sql');
var compiler = require('../modules/compile-run');
const { updateTestUserScoreByTestUserId } = require('../sql/tests');
var { PROBLEM_START_DELEMETER: startDelem, PROBLEM_END_DELEMETER: endDelem } = process.env;

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
            // console.log(rows)
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

// 학생 시험 조회
router.get('/usertests', async function(req, res) {
    const { user_id } = req.query
    try {
        let [tests] = await db.query(sql.tests.selectTestsByUserId, [user_id])
        for(let i = 0; i < tests.length; i++) {
             const { test_id } = tests[i]
            // console.log(tests)
            const [testname] = await db.query(sql.tests.selectTestNameByTestId, [test_id])
            tests[i]["test_name"] = testname[0].name
            tests[i]["timestamp"] = testname[0].start
        }
        res.status(200).send({
            result: true,
            data: tests,
            message: '사용자 전체 시험 목록'
        })
    } catch (error) {
        console.log("User Test Data " + error)
    }
})

// 테스트 생성 : 테스트 필요
router.post('/createtest', async function(req, res) {
    const {
        testName, testContent, is_exam, start, end, admin_id, subject_id,
        problems
    } = req.body

    await db.query(sql.tests.insertTest, [testName, testContent, is_exam, start, end, admin_id, subject_id])
    const {test_id} = await db.query(sql.tests.selectInsertedId)
    if(is_exam) {
        const [subjectUsers] = await db.query(sql.tests.selectSubjectUsersBySubjectId, [subject_id])
        for(let i = 0; i < subjectUsers.length; i++) {
            const {user_id} = subjectUsers[i]
            db.query(sql.tests.insertTestUser, [user_id, test_id])
        }
        // db.query(sql.tests.insertSubjectUsers, [subject_id])
    }

    for(let i = 0; i < problems.length; i++) {
        const {problem_id, score} = problems[i]
        if(problem_id) {
            await db.query(sql.tests.insertProblemFromProblemBank, [problem_id])
            const inserted = await db.query(sql.tests.selectInsertedId)
            await db.query(sql.tests.insertProblemIntoTest, [test_id[0].test_id, inserted, score])
        }
        else {
            const {problemName, problemContent, input, output} = problems[i]
            const {testcases} = problems[i]

            await db.query(sql.tests.insertProblem, [problemName, problemContent, input, output])
            const inserted = await db.query(sql.tests.selectInsertedId)
            await db.query(sql.tests.insertProblemIntoTest, [test_id[0].test_id, inserted, score])

            for(let j = 0; j < testcases; j++) {
                const {input_ex, output_ex} = testcases[i]

                await db.query(sql.tests.insertTestCases, [input_ex, output_ex, problem_id])
            }
        }
    }
})

//시험 중 테스트
router.post('/testrun', async function(req, res) {
    const { sourceCode, problem_id, language } = req.body;
    const [testCases] = await db.query(sql.tests.selectTwoTestCaseByProblemId, [problem_id]);
    let errormsg, output
    try {
        let result = [], count = 0;

        const promises = testCases.map(testcase => {
            return new Promise((resolve) => {
                const docker = compiler.getProblemDocker(sourceCode, language);
                let isStarted = false;
                docker.stderr.on("data", (data) => {
                    errormsg = data.toString('utf-8');
                })
    
                docker.stdout.on("data", (data) => {
                    if(!isStarted) return;
                    const line = (data.toString('utf-8')).split('\n')
                    output = line[0]
                    for(let i = 1; i < line.length - 2; i++) {
                        output = [output, line[i]].join('\n')
                    }
                    result[count] = {input_example: testcase.input_example, output}
                    count++;
                })

                docker.stdout.on("data", (data) => {
                    const line = data.toString('utf-8');
                    if(line.includes(startDelem)) {
                        isStarted = true;
                        docker.stdin.write(Buffer.from(testcase.input_example + "\n"));
                    } else if(line.includes(endDelem)) {
                        isStarted = false;
                        resolve();
                    }
                });
            });
        })
    
        for(let i = 0 ; i < promises.length; i++) { await promises[i] }
        if(errormsg) errormsg = "컴파일 에러"
        
        res.status(200).send({
            result: true,
            data:  { errormsg, result },
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

// 채점 : 답안 저장 필요, 테스트 필요
router.post('/submit', async function(req, res){
    const { sourceCode, test_id, user_id, problem_id, language } = req.body;
    const [testCases] = await db.query(sql.tests.selectTestCaseByProblemId, [problem_id]);
    let correctCount = 0, totalScore = 0;
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
                    if(line.includes(testcase.output)) {
                        const {score} = await db.query(sql.tests.selectProblemScoreByIds, [test_id, problem_id])
                        totalSocre += score;
                        correctCount++;
                    }
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

        let wrong = testCases.length - correctCount
        await db.query(sql.tests.updateTestUserScoreByTestUserId, [totalScore, correctCount, wrong, test_id, user_id])
        await db.query(sql.tests.insertUserAnswers, [test_id, problem_id, user_id, sourceCode])
        
        res.status(200).send({
            result: true,
            data:  { correctCount, count: testCases.length, totalScore },
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