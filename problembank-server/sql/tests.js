module.exports = {

    // SELECT
    selectTests: "SELECT * FROM problems.pb_tests",
    selectTestNameByTestId: "SELECT name FROM problems.pb_tests WHERE id = ?",
    selectTestProblemsByTestId: "SELECT problem_id FROM problems.pb_test_problems WHERE test_id = ?",
    selectTestProblemContentsByProblemId: "SELECT * FROM problems.pb_test_problem_contents WHERE id = ?",
    selectTestProblemNameByProblemId: "SELECT name FROM problems.pb_test_problem_contents WHERE id = ?",
    selectTestCaseByProblemId: "SELECT * FROM problems.pb_test_testcases WHERE problem_id = ?",
    selectFeedBackByTestId: "SELECT * FROM problems.pb_test_feedback WHERE test_id = ?",
    selectSubjectsByAdminId: "SELECT * FROM problems.pb_subjects WHERE admin_id = ?",
    selectSubjectUsersBySubjectId: "SELECT * FROM problems.pb_subject_users WHERE subject_id = ?",
    selectTestUsersByTestId: "SELECT * FROM problems.pb_test_users WHERE test_id = ?",
    selectTestUsersByUserId: "SELECT * FROM problems.pb_test_users WHERE user_id = ?",
    selectUserNameById: "SELECT user_name FROM problems.pb_users WHERE id = ?",
    
    // INSERT
    insertTest: "INSERT INTO problems.pb_tests (name, content, is_exam, start, end, admin_id, subject_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
    insertProblemIntoTest: "INSERT INTO problems.pb_test_problems (test_id, problem_id) VALUES (?, ?)",
    insertProblem: "INSERT INTO problems.pb_test_problem_contents (name, content, input, output) VALUES (?, ?, ?, ?)",
    insertTestCases: "INSERT INTO problems.pb_test_testcases (input_example, output_example, problem_id) VALUES (?, ?, ?)",

    // UPDATE
    updateTestUserScoreByTestUserId: "UPDATE problems.pb_test_users SET score = ?, correct = ?, wrong = ?, applied = 1 WHERE test_id = ? AND user_id = ?",


    // DELETE
}