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
        let [testcases] = await db.query(sql.tests.selectTestCaseByProblemId, [problem_id])
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

// TODO:
// 새 문제 생성 및 추가
router.post('/createproblem', async function(req, res){
    const {
        name, content, input_cases, output_cases
    } = req.body
})

// 기존 문제 추가
router.post('/addproblem', async function(req, res) {
    const { problem_ids } = req.body
})

// 테스트 생성
router.post('/createtest', async function(req, res){
    const {
        name, content, is_exam, start, end, admin_id, subject_id,
        problem_ids
    } = req.body
})

module.exports = router;