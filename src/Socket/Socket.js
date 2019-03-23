module.exports = function (app, client, io) {

    client.query('LISTEN friend_connected');
    client.query('LISTEN new_message');

    io.on('connection', (socket) => {
        // console.log('connected on Session', socket)

        client.on('notification', (message) => {
            // console.log(message)
            if (!message) return
            const channel = message.channel
            if (channel == 'new_message') {
                // console.log('new Message', JSON.parse(message.payload))
                sessionId = sessionId.toString()

                let payload = JSON.parse(message.payload)
                payload['type'] = 'newMessage'

                socket.emit(sessionId, payload)
            }
            else if (channel == 'friend_connected') {
                // console.log('friend Connected', JSON.parse(message.payload))
                let sessionId = JSON.parse(message.payload).session_id
                sessionId = sessionId.toString()

                let payload = JSON.parse(message.payload)
                payload['type'] = 'friendConnected'

                socket.emit(sessionId, payload)
            }

        })

    })



}
