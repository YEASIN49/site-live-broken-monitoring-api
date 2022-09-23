/*
*   Title; site up-down monitor
*   Description: This api notify user when a site is up or down 
*   Author: Md. Yeasin Ali( github.com/YEASIN49 )
*   Date: 23/09/2022
*/

const http = require( 'http' )
const url = require( 'url' )
const{ StringDecoder } = require( 'string_decoder' )

// module - scaffolding
const app = {}

/// configuration
app.config = {
    port: 3000
}

// create server
app.createServer = () => {
    const server = http.createServer( app.handleReqRes )
    server.listen(app.config.port, () => {
        console.log(`listening to port : ${app.config.port}`)
    })
}

app.handleReqRes = (req, res) => {
    // parsing data from url
    const parsedUrl = url.parse(req.url, true)
    const path = parsedUrl.pathname
    // trimming start and ending 'slash'
    const startEndSlashPattern = /^\/+|\/+$/g
    const trimmedPath = path.replace(startEndSlashPattern, '')
    const method = req.method.toLowerCase()
    const queryStringObj = parsedUrl.query
    const headerObj = req.headers

    // decoder for decodinf buffer data hat comes from api body
    const decoder = new StringDecoder('utf-8')
    let realData = ''

    // on data receive event
    req.on('data', (buffer) => {
        realData += decoder.write(buffer)
    })
    //on data receive end event
    req.on('end', () => {
        realData += decoder.end()
        console.log({ realData })
        res.end('realdata')
    })

}

app.createServer()