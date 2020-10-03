const express = require('express')
const app = express()
const goods = require('./data/goods.json')
const seller = require('./data/seller.json')
const ratings = require('./data/ratings.json')

const apiRoutes = express.Router()
app.use('/api', apiRoutes)

module.exports = {
  devServer: {
    before(app) {
      app.get('/api/seller', function (req, res) {
        res.json({
          data: seller
        })
      })
      app.get('/api/goods', function (req, res) {
        res.json({
          data: goods
        })
      })
      app.get('/api/ratings', function (req, res) {
        res.json({
          data: ratings
        })
      })
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 路径指向本地主机地址及端口号
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/data' // 路径转发代理
        }
      }
    }
  }
}