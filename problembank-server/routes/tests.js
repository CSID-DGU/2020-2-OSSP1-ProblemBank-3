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
router.get('/testproblems', async function(req, res){
    const { test_id } = req.query
    try {
        let [rows] = await db.query(sql.tests.selectTestProblemsByTestId, [test_id])
        for(let i = 0; i < rows.length; i++)
        {
            let {problem_id} = rows[i]
            let [problem] = await db.query(sql.tests.selectTestProblemNameByProblemId, [problem_id])
            rows[i]["name"] = problem;
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
router.get('/testproblemdata', async function(req, res){
    const { problem_id } = req.query
    try {
        let [rows] = await db.query(sql.tests.selectTestProblemContentsByProblemId, [problem_id])
        console.log(rows)
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
router.get('/testfeedback', async function(req, res){
    const { test_id } = req.query
    try {
        let [rows] = await db.query(sql.tests.selectFeedBackByTestId, [test_id])
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
router.get('/adminresult', async function(req, res){
    const { test_id } = req.query
    try {
        let [rows] = await db.query(sql.tests.selectTestUsersByTestId, [test_id])
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
router.get('/userresult', async function(req, res){
    const { user_id } = req.query
    try {
        let [rows] = await db.query(sql.tests.selectTestUsersByUserId, [user_id])
        res.status(200).send({
            result: true,
            data: rows,
            message: '사용자 결과'
        })
    } catch (error) {
        console.log("User Result Data" + error)
    }
})

module.exports = router;