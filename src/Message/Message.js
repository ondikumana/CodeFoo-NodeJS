module.exports = function (app, client) {


    client.query('LISTEN new_message');

    client.on('notification', (message) => {
        console.log(JSON.parse(message.payload))
    })

    app.get('/get_messages', async (req, res) => {

        //check if it has valid params
        if (!req.query) {
            res.status(404).send({ error: "missing params" })
            return
        }

        try {
            const result = await client.query(`select * from ` + `messages_${req.query.sessionId}`)

            res.status(200).send({ data: result.rows })
        }
        catch (err) {
            console.log(err)
            res.status(404).send(err)
        }
        return
    })

    app.post('/create_message', async (req, res) => {

        // check if it has valid body
        if (!req.body) {
            res.status(404).send({ error: "missing body" })
            return
        }

        const sessionId = req.body.sessionId

        // creates new message in the table that has the same name as the session id. This table is created by DB when a session is created
        try {
            await client.query(`insert into ` + `messages_${(sessionId)}` + `(session_id, type, sender_id, body) values (${sessionId}, '${req.body.type}', ${req.body.senderId}, '${req.body.body}')`)

            res.status(200).send({ message: "Message Created" })
        }
        catch (err) {
            console.log(err)
            res.status(404).send(err)
        }
        return

    })


}
