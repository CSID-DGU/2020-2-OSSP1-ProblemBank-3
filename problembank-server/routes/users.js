var express = require('express');
var router = express.Router();
var db = require('../modules/db-connection');
var sql = require('../sql');


// 로그인
router.get('/userinfo', async function(req, res) {
    const { user_id, user_pass } = req.query
    try {
        const [user] = await db.query(sql.users.selectUserByIdPass, [user_id, user_pass])

        res.status(200).send({
            result: true,
            data: {
                "name": user[3],
                "is_admin": user[4]
            },
            message: '사용자 정보'
        })

    } catch (error) {
        console.log("User info" + error)
    }
})

module.exports = router;