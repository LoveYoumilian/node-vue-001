module.exports = Option => {

    return async(req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop()
        Option.assert(token, 401, '请先登录')
        const { id } = Option.jwt.verify(token, req.app.get('secret'))
        Option.assert(id, 401, '请先登录')
        req.user = await Option.AdminUser.findById(id)
        Option.assert(req.user, 401, '请先登录')
        await next()
    }
}