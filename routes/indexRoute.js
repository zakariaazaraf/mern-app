const express = require('express')
const router = express.Router()

router.get('/', (req, res) =>{
    /* res.send({
        req: req.method,
        message: 'hello you visted the root',
        originalUrl: req.originalUrl,
        params: req.params,
        path: req.path,
        protocol: req.protocol,
        query: req.query,
        body: "body " + req.body,
        app: "app " + req.app,
        cookies: "cookies " + req.cookies,
        headers: req.headers,
        hostname: req.hostname

    }) */

    res.render('index')
    
})

module.exports = router