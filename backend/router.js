const user = require('./api/user')
const auth = require('./api/auth')
const upload = require('./api/upload')
const category = require('./api/category')

const router = (app) => {
    app.use('/api/user', user)
    app.use('/api/auth', auth)
    app.use('/api/upload', upload)
    app.use('/api/category', category)
}

module.exports = router