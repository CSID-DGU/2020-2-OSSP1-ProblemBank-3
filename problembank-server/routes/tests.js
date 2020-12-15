var express = require('express');
var router = express.Router();
var db = require('../modules/db-connection');
var sql = require('../sql');
var compiler = require('../modules/compile-run');
var { PROBLEM_START_DELEMETER: startDelem, PROBLEM_END_DELEMETER: endDelem } = process.env;

// 전체 시험 출력
router.get('/alltestdata', async function (req, res) {
    const { user_id } = req.query
    try {
        const [rows] = await db.query(sql.tests.selectTests)
        for(let i = 0; i < rows.length; i++) {
            const [admin_name] = await db.query(sql.tests.selectUserNameById, [rows[i].admin_id])
            rows[i]["admin_name"] = admin_name[0].user_name
            if (rows[i].is_exam == '1') {
                const [subject] = await db.query(sql.tests.selectSubjectNameById, [rows[i].subject_id])
                rows[i]["subject_name"] = subject[0].name
            }
            const [userlist] = await db.query(sql.tests.selectTestUserByIds, [rows[i].id, user_id])
            if (userlist != 0)
                rows[i]["in_entry"] = 1
            else
                rows[i]["in_entry"] = 0
        }
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
router.get('/testproblems', async function (req, res) {
    const { test_id } = req.query
    try {
        let [rows] = await db.query(sql.tests.selectTestProblemsByTestId, [test_id])
        for (let i = 0; i < rows.length; i++) {
            let { problem_id } = rows[i]
            let [problem] = await db.query(sql.tests.selectTestProblemNameByProblemId, [problem_id])
            rows[i]["name"] = problem[0].name;
        }
        res.status(200).send({
            result: true,
            data: rows,
            message: '시험 문제 목록'
        })

    } catch (error) {
        console.log("Problems List" + error)
    }
})

//시험 진행시간
router.get('/testtimes', async function (req, res) {
    const { test_id } = req.query
    try {
        let [rows] = await db.query(sql.tests.selectTestTimeByTestId, [test_id])
        res.status(200).send({
            result: true,
            data: rows,
            message: '시험 진행 시간'
        })
    } catch (error) {
        console.log("test time" + error);
    }
})

// 시험 문제 세부 정보
router.get('/testproblemdata', async function (req, res) {
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
            result: true,
            data: rows,
            message: '시험 문제 정보'
        })

    } catch (error) {
        console.log("Problems Data" + error)
    }
})

// 피드백 목록 출력
router.get('/testfeedback', async function (req, res) {
    const { test_id } = req.query
    try {
        const [rows] = await db.query(sql.tests.selectFeedBackByTestId, [test_id])
        for (let i = 0; i < rows.length; i++) {
            const { author_id } = rows[i]
            const [name] = await db.query(sql.tests.selectUserNameById, [author_id])
            rows[i]["author_name"] = name[0].user_name;
        }
        res.status(200).send({
            result: true,
            data: rows,
            message: '피드백 목록'
        })

    } catch (error) {
        console.log("Feedback Data" + error)
    }
})

//전체 응시자 결과 출력
router.get('/adminresult', async function (req, res) {
    const { test_id } = req.query
    try {
        let [rows] = await db.query(sql.tests.selectTestUsersByTestId, [test_id])
        for (let i = 0; i < rows.length; i++) {
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

// 개인 시험 결과 출력
router.get('/userresult', async function (req, res) {
    const { user_id } = req.query
    try {
        let [rows] = await db.query(sql.tests.selectTestUsersByUserId, [user_id])
        for (let i = 0; i < rows.length; i++) {
            const { test_id } = rows[i]
            const [testname] = await db.query(sql.tests.selectTestByTestId, [test_id])
            rows[i]["test_name"] = testname[0].name;
            rows[i]["date"] = testname[0].start;
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

// 답안 조회
router.get('/useranswer', async function (req, res) {
    const { test_id, user_id } = req.query
    try {
        const [rows] = await db.query(sql.tests.selectTestProblemsByTestId, [test_id])
        for(let i = 0; i < rows.length; i++) {
            const [answer] = await db.query(sql.tests.selectUserAnswerByIds, [test_id, rows[i].problem_id, user_id])
            rows[i]["answer"] = answer[0]
        }
        res.status(200).send({
            result: true,
            data: rows,
            message: '사용자 답안'
        })
    } catch (error) {
        console.log("User Answer Error" + error)
    }
})

// 학생 시험 조회
router.get('/usertests', async function (req, res) {
    const { user_id } = req.query
    try {
        let [tests] = await db.query(sql.tests.selectTestsByUserId, [user_id])
        for (let i = 0; i < tests.length; i++) {
            const { test_id } = tests[i]
            const [test] = await db.query(sql.tests.selectTestByTestId, [test_id])
            tests[i]["test_name"] = test[0].name
            tests[i]["date"] = test[0].start
            tests[i]["is_exam"] = test[0].is_exam
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

// 테스트 생성
router.post('/createtest', async function (req, res) {
    const {
        testName, testContent, is_exam, start, end, admin_id, subject_id,
        problems
    } = req.body
    try {
        await db.query(sql.tests.insertTest, [testName, testContent, is_exam, start, end, admin_id, subject_id])
        const [test_id] = await db.query(sql.tests.selectInsertedId)
        if (is_exam != 0) {
            const [subjectUsers] = await db.query(sql.tests.selectSubjectUsersBySubjectId, [subject_id])
            for (let i = 0; i < subjectUsers.length; i++) {
                const { user_id } = subjectUsers[i]
                await db.query(sql.tests.insertTestUser, [user_id, test_id[0].id])
            }
        }

        for (let i = 0; i < problems.length; i++) {
            const { problem_id } = problems[i]
            if (problem_id) { // 문제은행 db에 존재하는 문제
                await db.query(sql.tests.insertProblemFromProblemBank, [problem_id])
                const [inserted] = await db.query(sql.tests.selectInsertedId)
                await db.query(sql.tests.insertProblemIntoTest, [test_id[0].id, inserted[0].id])
                const [testcases] = await db.query(sql.problems.selectTestCaseByProblemId, [problem_id])

                for (let j = 0; j < testcases.length; j++) {
                    const { input, output } = testcases[j]

                    await db.query(sql.tests.insertTestCases, [input, output, inserted[0].id])
                }
            }
            else { // 존재하지 않는 문제
                const { problemName, problemContent, input, output } = problems[i]
                const { testcases } = problems[i]

                await db.query(sql.tests.insertProblem, [problemName, problemContent, input, output])
                const [inserted] = await db.query(sql.tests.selectInsertedId)
                await db.query(sql.tests.insertProblemIntoTest, [test_id[0].id, inserted[0].id])

                for (let j = 0; j < testcases.length; j++) {
                    const { input_ex, output_ex } = testcases[j]

                    await db.query(sql.tests.insertTestCases, [input_ex, output_ex, inserted[0].id])
                }
            }
        }
        res.status(200).send({
            result: true,
            data: [],
            message: 'add test success'
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            result: false,
            data: [],
            message: e
        })
    }
})

// 테스트 수정
router.post('/updatetest', async function (req, res) {
    const {
        test_id, testName, testContent, is_exam, start, end, subject_id,
        problems
    } = req.body
    try {
        await db.query(sql.tests.updateTest, [testName, testContent, is_exam, start, end, subject_id, test_id])
        await db.query(sql.tests.deleteAllTestUsers, [test_id])
        if (is_exam != 0) {
            const [subjectUsers] = await db.query(sql.tests.selectSubjectUsersBySubjectId, [subject_id])
            for (let i = 0; i < subjectUsers.length; i++) {
                const { user_id } = subjectUsers[i]
                await db.query(sql.tests.insertTestUser, [user_id, test_id])
            }
        }

        for (let i = 0; i < problems.length; i++) {
            const { problem_id, problemName, problemContent, input, output } = problems[i]
            const { testcases } = problems[i]
            await db.query(sql.tests.updateProblem, [problemName, problemContent, input, output, problem_id])
            await db.query(sql.tests.deleteAllTestCases, [problem_id])

            for (let j = 0; j < testcases.length; j++) {
                const { input_ex, output_ex } = testcases[j]
                await db.query(sql.tests.insertTestCases, [input_ex, output_ex, problem_id])
            }
        }
        res.status(200).send({
            result: true,
            data: [],
            message: 'update test success'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            result: false,
            data: [],
            message: error
        })
    }
})

// 문제 수정
router.post('/updateproblem', async function (req, res) {
    const { problem_id, problemName, problemContent, input, output } = req.body
    const { testcases } = req.body
    try {
        await db.query(sql.tests.updateProblem, [problemName, problemContent, input, output, problem_id])
        await db.query(sql.tests.deleteAllTestCases, [problem_id])

        for (let j = 0; j < testcases.length; j++) {
            const { input_ex, output_ex } = testcases[j]
            await db.query(sql.tests.insertTestCases, [input_ex, output_ex, problem_id])
        }

        res.status(200).send({
            result: true,
            data: [],
            message: 'update problem success'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            result: false,
            data: [],
            message: error
        })
    }
})

// 시험 신청
router.post('/regtest', async function (req, res) {
    const { user_id, test_id } = req.body;
    try {
        await db.query(sql.tests.insertTestUser, [user_id, test_id])
        res.status(200).send({
            result: true,
            data: [],
            message: 'registered'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            result: false,
            data: [],
            message: error
        })
    }
})

// 시험 신청 취소
router.post('/cancelreg', async function(req, res) {
    const { user_id, test_id } = req.body;
    try {
        await db.query(sql.tests.deleteTestUser, [user_id, test_id])
        res.status(200).send({
            result: true,
            data: [],
            message: 'canceled'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            result: false,
            data: [],
            message: error
        })
    }
})

//시험 중 테스트
router.post('/testrun', async function (req, res) {
    const { sourceCode, problem_id, language } = req.body;
    const [testCases] = await db.query(sql.tests.selectTwoTestCaseByProblemId, [problem_id]);
    let errormsg
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
                    if (!isStarted) return;
                    const line = (data.toString('utf-8'))
                    let output = line.replace("\n" + endDelem + "\n", "")
                    output = output.replace(/\[[0-9]\]\ \"/, "")
                    output = output.replace(/\"\n$/, "\n")
                    if (output != "" && output != "\n" && output != "undefined") {
                        result[count] = { input_example: testcase.input_example, output }
                        if(output.replace(/\n$/, "") == testcase.output_example) console.log("correct")
                        count++;
                    }
                })

                docker.stdout.on("data", (data) => {
                    const line = data.toString('utf-8');
                    if (line.includes(startDelem)) {
                        isStarted = true;
                        docker.stdin.write(Buffer.from(testcase.input_example + "\n"));
                    } else if (line.includes(endDelem)) {
                        isStarted = false;
                        resolve();
                    }
                });
            });
        })

        await Promise.all(promises)
        if (errormsg) errormsg = "컴파일 에러"

        res.status(200).send({
            result: true,
            data: { errormsg, result },
            message: 'testrun success'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            result: false,
            data: [],
            message: error
        })
    }
})

// 채점
router.post('/submit', async function (req, res) {
    const { test_id, user_id, problems } = req.body;
    let correct = 0, wrong;
    try {
        const promises1 = problems.map(async problem => {
            let correctCount = 0;
            const { sourceCode, problem_id, language } = problem;
            const [testCases] = await db.query(sql.tests.selectTestCaseByProblemId, [problem_id]);
            const promises2 = testCases.map(testcase => {
                return new Promise((resolve) => {
                    const docker = compiler.getProblemDocker(sourceCode, language);
                    let isStarted = false;
                    docker.stderr.on("data", (data) => {
                        console.log(data.toString('utf-8'));
                    })

                    docker.stdout.on("data", (data) => {
                        if (!isStarted) return;
                        const line = data.toString('utf-8');
                        let output = line.replace("\n" + endDelem + "\n", "")
                        output = output.replace(/\[[0-9]\]\ \"/, "")
                        output = output.replace(/\"\n$/, "\n")
                        if (output != "" && output != "\n" && output != "undefined") {
                            if(output.replace(/\n$/, "") == testcase.output_example) correctCount++;
                        }
                    })

                    docker.stdout.on("data", (data) => {
                        const line = data.toString('utf-8');
                        if (line.includes(startDelem)) {
                            isStarted = true;
                            docker.stdin.write(Buffer.from(testcase.input_example + "\n"));
                        } else if (line.includes(endDelem)) {
                            isStarted = false;
                            resolve();
                        }
                    });
                });
            })
            await Promise.all(promises2)
            if (correctCount == testCases.length) {
                correct++
            }
            await db.query(sql.tests.insertUserAnswers, [test_id, problem_id, user_id, sourceCode])
            return Promise.resolve()
        })
        await Promise.all(promises1)

        wrong = problems.length - correct

        await db.query(sql.tests.updateTestUserScoreByTestUserId, [correct, wrong, test_id, user_id])

        res.status(200).send({
            result: true,
            data: { correct, wrong, problems },
            message: 'submit success'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            result: false,
            data: [],
            message: error
        })
    }
})

// 오류 보고
router.post('reporterror', async function (req, res) {
    const {test_id, user_id, content} = req.body;
    try {
        await db.query(sql.tests.insertfeedback, [test_id, user_id, content])
        req.status(200).send({
            result: true,
            data: [],
            message: 'report success'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            result: false,
            data: [],
            message: error
        })
    }
})

module.exports = router;