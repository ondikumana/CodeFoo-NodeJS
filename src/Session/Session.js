module.exports = function (app, client) {

    app.get('/join_session', async (req, res) => {

        //check if it has valid params
        if (!req.query.sessionId && !req.query.code && !req.query.friendId) {
            res.status(404).send({ error: "missing params" })
            return
        }

        try {

            let sessionId = req.query.sessionId ? parseInt(req.query.sessionId) : null
            let code = req.query.code
            let friendId = req.query.friendId ? parseInt(req.query.friendId) : null

            // logic to get session id from code
            if (code && !sessionId) {
                code = code.toLowerCase()
                sessionId = ''
                const alphabetArr = ("abcdefghijklmnopqrstuvwxyz").split('')
                for (let i = 0; i < code.length; i++) {
                    sessionId += alphabetArr.indexOf(code.charAt(i))
                }

            }

            parseInt(sessionId)

            await client.query(`update session set friend_id = ${friendId} where session_id = ${sessionId} and friend_id is null`)

            const result = await client.query(`select * from session where session_id = ${sessionId}`)
            let isApproved = false
            if (result.rows[0].friend_id === friendId) isApproved = true

            res.status(200).send({ data: result.rows, approved: isApproved })
        }
        catch (err) {
            console.log(err)
            res.status(404).send(err)
        }
        return
    })

    app.get('/get_session', async (req, res) => {

        //check if it has valid params
        if (!req.query) {
            res.status(404).send({ error: "missing params" })
            return
        }

        let sessionId = req.query.sessionId ? parseInt(req.query.sessionId) : null
        let code = req.query.code
        let friendId = req.query.friendId ? parseInt(req.query.friendId) : null

        try {
            const result = await client.query(`select * from session where session_id = ${sessionId}`)

            res.status(200).send({ data: result.rows })
        }
        catch (err) {
            console.log(err)
            res.status(404).send(err)
        }
        return
    })

    app.post('/create_session', async (req, res) => {

        // check if it has valid body
        if (!req.body) {
            res.status(404).send({ error: "missing body" })
            return
        }

        // console.log('body', req.body)

        const creatorId = parseInt(req.body.creatorId)

        // creates new session and sends back session id 
        try {
            const result = await client.query(`insert into session (creator_id) values (${creatorId}); SELECT last_value FROM session_id_seq`)

            //logic to create a string code from int
            let sessionId = result[1].rows[0].last_value
            const alphabetArr = ("abcdefghijklmnopqrstuvwxyz").split('')
            let code = ''
            for (let i = 0; i < sessionId.length; i++) {
                code += alphabetArr[sessionId.charAt(i)]
            }

            res.status(200).send({ sessionId: sessionId, code: code.toUpperCase() })

        }
        catch (err) {
            console.log(err)
            res.status(404).send(err)
        }
        return

    })


}
