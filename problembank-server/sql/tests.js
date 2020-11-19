module.exports = {

    // SELECT
    selectTests: "SELECT * FROM problems.pb_tests",
    selectTestProblemsByTestId: "SELECT problem_id FROM problems.pb_test_problems WHERE test_id = ?",
    selectTestProblemContentsByProblemId: "SELECT * FROM problems.pb_test_problem_contents WHERE id = ?",
    selectTestProblemNameByProblemId: "SELECT name FROM problems.pb_test_problem_contents WHERE id = ?",
    selectTestCaseByProblemId: "SELECT * FROM problems.pb_test_testcases WHERE problem_id = ?",
    selectFeedBackByProblemId: "SELECT * FROM problems.pb_test_feedback WHERE test_id = ?",
    selectSubjectsByAdminId: "SELECT * FROM problems.pb_subjects WHERE admin_id = ?",
    selectSubjectUsersBySubjectId: "SELECT * FROM problems.pb_subject_users WHERE subject_id = ?",
    selectTestUsersByTestId: "SELECT * FROM problems.pb_test_users WHERE test_id = ?",
    selectTestUsersByUserId: "SELECT * FROM problems.pb_test_users WHERE user_id = ?",
    
    // INSERT
    insertTestContent: "INSERT INTO problems.pb_test_problem_contents (name, content, input, output) VALUES (?, ?, ?, ?)",
    insertTest: "INSERT INTO problems.pb_test_problems (test_id, problem_id) VALUES (?, ?)",

    // UPDATE
    updateTestUserScoreByTestUserId: "UPDATE problems.pb_test_users SET score = ?, correct = ?, wrong = ?, applied = ? WHERE test_id = ? AND user_id = ?",


    // DELETE
}