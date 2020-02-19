module.exports = app => {
    const express = require('express')
    const assert = require('http-assert')
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../../models/AdminUser')
    const loginMid = require('../../middleWare/loginMiddle')
    const resource = require('../../middleWare/resource')
    const route = express.Router({
            mergeParams: true
        })
        // const  req.model = require('../../models/ req.model')
    route.post('/', async(req, res) => { // 分类列表添加接口
        let model = await req.Model.create(req.body)
        res.send(model)
    })
    route.put('/:id', async(req, res) => { // 单个内容更新添加接口
        let model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    route.delete('/:id', async(req, res) => { // 单个内容更新添加接口
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({ sucess: true })
    })
    route.get('/', loginMid({ assert, jwt, AdminUser }), async(req, res) => { // 分类列表展示接口
        let option = {}
        if (req.Model.modelName === 'Category') {
            option.populate = 'parent'
        }
        let model = await req.Model.find().setOptions(option).limit(100)
            // console.log(model)
        res.send(model)
    })
    route.get('/:id', async(req, res) => { // 分类列表详情展示接口
        let model = await req.Model.findById(req.params.id)
            // console.log(model)
        res.send(model)
    })
    app.use('/admin/api/rest/:resource', loginMid({ assert, jwt, AdminUser }), (req, res, next) => {
        let modelOption = require('inflection').classify(req.params.resource)
        req.Model = require(`../../models/${modelOption}`)
        next()
    }, route)

    const multer = require('multer')
    const upload = multer({ dest: __dirname + '/../../uploads' })
    app.post('/admin/api/upload', upload.single('file'), (req, res) => {
        const file = req.file
        file.url = ` http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })


    app.post('/admin/api/login', resource({ assert, jwt, AdminUser }))

    //错误处理机制
    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}