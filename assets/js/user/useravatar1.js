$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $("#image");
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);

  $("#choosepic").click(function () {
    $("#file").click();
  });

  const layer = layui.layer;
  $("#file").change(function (e) {
    const filelist = e.target.files;
    if (filelist.length === 0) return layer.msg("请选择图片");
    const file = e.target.files[0];
    // 2. 将文件，转化为路径
    var imgURL = URL.createObjectURL(file);
    // 3. 重新初始化裁剪区域
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", imgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });
  $('#btnupload').click(function () {
       // 1、拿到用户裁切之后的头像
    // 直接复制代码即可
    const dataURL = $image.cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
    })
    .toDataURL("image/png");
    // 2、发送 ajax 请求，发送到服务器
    $.ajax({
        type:'post',
        url:'/my/update/avatar',
        data:{avatar:dataURL},
        success:(res)=>{
            if (res.status !== 0) return layer.msg("更换图片失败")
            layer.msg("更改图片成功")
            window.parent.getUserInfo()
        }

    })
  })
});
