const API = (function(){
    const BASE_URL = "https://study.duyiedu.com"
    const TOKEN_KEY = "token"
    async function get(path) {
        const headers = {}
        const token = localStorage.getItem(TOKEN_KEY)
        if (token) {
            headers.authorization = 'Bearer ' + token
        }
        let result = await fetch(BASE_URL + path, { headers })
        return result
    }
    async function post(path, bodyObj) {
        const headers = { 'content-type': 'application/json' }
        const token = localStorage.getItem(TOKEN_KEY)
        if (token) {
            headers.authorization = 'Bearer ' + token
        }
        let result = await fetch(BASE_URL + path, { headers, method: 'POST', body: JSON.stringify(bodyObj) })
        return result
    }
    async function reg(userInfo) {
        //reg({"loginId":"111123","nickname":"111123","loginPwd":"1111"})
        let resp = await post('/api/user/reg', userInfo)
        let result = await resp.json()
        return result
    }
    
    async function login(loginInfo) {
        //login({"loginId":"xiaoyu1","loginPwd":"123456"})
        let resp = await post('/api/user/login', loginInfo)
        let result = await resp.json()
        if (result.code === 0) {
            //登录成功
            //将响应头中的token保存起来(localStorage)
            const token = resp.headers.get("authorization")
            localStorage.setItem(TOKEN_KEY, token)
        }
        return result
    }
    //验证账号是否存在
    async function exists(loginId) {
        //exists("123456")
        let resp = await get('/api/user/exists?loginId=' + loginId)
        let result = await resp.json()
        return result
    }
    //返回当前用户信息
    async function profile() {
        //profile()
        let resp = await get('/api/user/profile')
        let result = await resp.json()
        return result
    }
    
    async function sendChat(content) {
        //sendChat({content:"1111"})
        let resp = await post('/api/chat', content)
        let result = await resp.json()
        return result
    }
    
    async function getHistory() {
        //getHistory()
        let resp = await get('/api/chat/history')
        let result = await resp.json()
        return result
    }
    
    function loginOut(){
        localStorage.removeItem(TOKEN_KEY)
    }
    return {
        reg,
        login,
        exists,
        profile,
        sendChat,
        getHistory,
        loginOut
    }
})()
