module.exports = Option => {
    return async(req, res) => {
        let { username, password } = req.body
        const user = await Option.AdminUser.findOne({ username }).select('+password')
        Option.assert(user, 422, '用户不存在')
            // 2.校验密码
        const isValid = require('bcrypt').compareSync(password, user.password)
        Option.assert(isValid, 422, '密码错误')
            // 3.返回token
        const token = Option.jwt.sign({ id: user._id }, req.app.get('secret'))
        res.send({ token })
    }
}