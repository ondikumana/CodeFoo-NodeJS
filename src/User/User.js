module.exports = function (app, client) {

  app.get('/', async (req, res) => {



  })

  app.get('/get_user', async (req, res) => {

    //check if it has valid params
    if (!req.query.userId) {
      res.status(404).send({ error: "missing params" })
      return
    }

    try {
      const result = await client.query(`select * from user_account where user_id = ${req.query.userId}`)

      res.status(200).send({ data: result.rows })
    }
    catch (err) {
      console.log(err)
      res.status(404).send(err)
    }
    return
  })

  app.post('/create_user', async (req, res) => {

    // check if it has valid body
    if (!req.body) {
      res.status(404).send({ error: "missing body" })
      return
    }

    // inserts new user and sends back their user id

    try {
      const result = await client.query(`insert into user_account (first_name, last_name) values ('${req.body.firstName}', '${req.body.lastName}'); SELECT last_value FROM user_id_seq`)

      res.status(200).send({ userId: parseInt(result[1].rows[0].last_value) })
    }
    catch (err) {
      console.log(err)
      res.status(404).send(err)
    }
    return

  })


  app.post('/delete_user', async (req, res) => {

    // check if it has valid body
    if (!req.body) {
      res.status(404).send({ error: "missing body" })
      return
    }

    const userId = parseInt(req.body.userId)

    // deletes user then the session they created is also delete because of cascade in DB. The messages Table is also deleted because of a function in the DB
    try {
      await client.query(`delete from user_account where user_id = ${userId}`)

      res.status(200).send({ message: "User Deleted" })
    }
    catch (err) {
      console.log(err)
      res.status(404).send(err)
    }
    return

  })



}
