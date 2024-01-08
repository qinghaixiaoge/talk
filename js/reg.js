const loginIdValidator = new FieldValidator('txtLoginId',async function (val) {
    if (!val) {
        return '请填写账号'
    }
    let result = await API.exists(val)
    if (result.data) {
        //账号已存在
        return '该账号已被占用，请重新选择一个账户名'
    }
})
const nicknameValidator = new FieldValidator('txtNickname',async function (val) {
    if (!val) {
        return '请填写昵称'
    }
})

const loginPwdValidator = new FieldValidator('txtLoginPwd',async function (val) {
    if (!val) {
        return '请填写密码'
    }
})

const loginPwdConfirmValidator = new FieldValidator('txtLoginPwdConfirm',async function (val) {
    if (!val) {
        return '请填写确认密码'
    }
    if (val !== loginPwdValidator.input.value) {
        return '两次密码不一致'
        
    }
})
/* function test(){
    FieldValidator.validate(loginIdValidator,nicknameValidator,loginPwdValidator,loginPwdConfirmValidator).then(
        (result)=>{
            console.log(result);
        }
    )
} */

const form = $('.user-form')
form.onsubmit = async function(e){
    e.preventDefault()
    const result = await FieldValidator.validate(loginIdValidator,nicknameValidator,loginPwdValidator,loginPwdConfirmValidator)
    console.log("表单正在提交",result);
    if (!result) {
        return //验证未通过
    }
    const formData = new FormData(this)
    const data = Object.fromEntries(formData.entries())
    console.log(data);
    const resp = await API.reg(data)
    if (resp.code === 0) {
        alert("注册成功")
        location.href = './login.html'
    }
    /* const resp = await API.reg({
        loginId: loginIdValidator.input.value,
        loginPwd: loginPwdValidator.input.value,
        nickname: nicknameValidator.input.value
    }) */
}