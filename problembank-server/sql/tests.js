module.exports = {

    // SELECT
    selectTests: "SELECT * FROM problems.pb_tests",
    selectTestByTestId: "SELECT * FROM problems.pb_tests WHERE id = ?",
    selectTestTimeByTestId: "SELECT start, end FROM problems.pb_tests WHERE id = ?",
    selectTestProblemsByTestId: "SELECT problem_id FROM problems.pb_test_problems WHERE test_id = ?",
    selectTestProblemContentsByProblemId: "SELECT * FROM problems.pb_test_problem_contents WHERE id = ?",
    selectTestProblemNameByProblemId: "SELECT name FROM problems.pb_test_problem_contents WHERE id = ?",
    selectTestCaseByProblemId: "SELECT * FROM problems.pb_test_testcases WHERE problem_id = ?",
    selectTwoTestCaseByProblemId: "SELECT * FROM problems.pb_test_testcases WHERE problem_id = ? ORDER BY id LIMIT 2",
    selectFeedBackByTestId: "SELECT * FROM problems.pb_test_feedback WHERE test_id = ?",
    selectSubjectsByAdminId: "SELECT * FROM problems.pb_subjects WHERE admin_id = ?",
    selectSubjectUsersBySubjectId: "SELECT * FROM problems.pb_subject_users WHERE subject_id = ?",
    selectSubjectNameById: "SELECT name FROM problems.pb_subjects WHERE id = ?", 
    selectTestUsersByTestId: "SELECT * FROM problems.pb_test_users WHERE test_id = ?",
    selectTestUsersByUserId: "SELECT * FROM problems.pb_test_users WHERE user_id = ?",
    selectTestsByUserId: "SELECT test_id FROM problems.pb_test_users WHERE user_id = ?",
    selectUserNameById: "SELECT user_name FROM problems.pb_users WHERE id = ?",
    selectUserAnswerByIds: "SELECT content FROM problems.pb_test_answers WHERE test_id = ? AND problem_id = ? AND user_id = ?",
    selectProblemScoreByIds: "SELECT score FROM problems.pb_test_problems WHERE test_id = ? AND problem_id = ?",
    selectInsertedId: "SELECT @@IDENTITY",
    
    // INSERT
    insertTest: "INSERT INTO problems.pb_tests (name, content, is_exam, start, end, admin_id, subject_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
    insertProblemIntoTest: "INSERT INTO problems.pb_test_problems (test_id, problem_id, score) VALUES (?, ?, ?)",
    insertProblem: "INSERT INTO problems.pb_test_problem_contents (name, content, input, output) VALUES (?, ?, ?, ?)",
    insertTestCases: "INSERT INTO problems.pb_test_testcases (input_example, output_example, problem_id) VALUES (?, ?, ?)",
    insertProblemFromProblemBank: "INSERT INTO problems.pb_test_contents (name, content, input, output) SELECT name, content, input, output FROM problems.plass_problems WHERE id = ?",
    insertTestUser: "INSERT INTO pb_test_users (user_id, test_id) VALUES (?, ?)",
    insertTestUsers: "INSERT INTO pb_test_users (user_id, test_id) SELECT user_id FROM problems.pb_subject_users WHERE subject_id = ? VALUES (?)",
    insertUserAnswers: "INSERT INTO pb_test_answers (test_id, problem_id, user_id, content) VALUES (?, ?, ?, ?)",

    // UPDATE
    updateProblemScore: "UPDATE problems.pb_test_problems SET score = ? WHERE test_id = ? and problem_id = ?",
    updateTestUserScoreByTestUserId: "UPDATE problems.pb_test_users SET correct = ?, wrong = ?, applied = 1 WHERE test_id = ? AND user_id = ?",

    // DELETE
}