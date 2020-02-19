const express = require('express')
const app = express()

app.use(require('cors')())
app.use(express.json())

require('./router/admin')(app)
require('./plugins/db')(app)
// // require('./router/web')(app)

app.listen(3000, () => {
    console.log('running...')
})