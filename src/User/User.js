module.exports = function (app, client) {

  app.get('/', async (req, res) => {

    try {
      const name = 'Rutwe'
      const result = await client.query(`select * from user_account where first_name = '${name}'`)
      console.log(result.rows)
      res.status(200).send(result.rows)
    }
    catch (err) {
      console.log(err)
      res.status(404).send(err)
    }
    return

  })

  app.get('/get_user', async (req, res) => {

  })

  app.post('/create_user', async (req, res) => {

  })


}
