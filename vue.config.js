module.exports = {
    devServer: {
        proxy: {
            '/api': {//http://192.168.xx.xx/api/xx/  后台接口：相对路径 
                target: 'http://localhost:8888',//目的地址路径 本地研发环境
                changeOrigin: true,//允许跨域
                pathRewrite: {//重定向
                    "^/api": ""
                }
            },
            //.... 
        }
    }
}