const app = require('./app')
const { createServer } = require('http')

const port = 3005
const servidor = createServer(app)
servidor.listen(port,()=>{
    console.log('Server is running on port: ' + port)
})