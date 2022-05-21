$(function() {
    const form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        same:(value) => {
            if(value ===$('[name=oldPwd]').val()) return "新旧密码不能相同！"
        },
        repwd:(value) => {
            if(value !==$('[name=newPwd]').val()) return "前后密码不相同！"
        }
    });
    $('.layui-form').submit(function(e){
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:(res)=>{
                if(res.status !== 0) return layer.msg("更改密码失败")
                layer.msg("更改密码成功")
                localStorage.removeItem('token')
                window.parent.location.href='/login.html'
            }
        })
    })
})