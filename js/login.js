var baseurl = 'https://www.soke.network/api/'
if (localStorage.getItem('token')) {
    window.location.href = '../userinfo.html'
}
var mreg = new RegExp(/^1[345789]\d{9}$/)

$('.innertime').click(() => {


    if (!mreg.test($('#phonenum').val())) {
        $('.notice').html(
            `
            <div class="alert alert-danger" role="alert">请输入正确的电话号码</div>  

            `
        )
        setTimeout(() => {
            $('.notice').html('')
        }, 2500)
        return false
    }
    $('.innerconetent').html(`  <iframe style="z-index: 99999999999999999999;" width="100%" height="500px" src="./verification.html?scene=nc_message_h5&platform=web&language=zh" frameborder="0"></iframe>`)


})

$(document).keyup(function(event) {
    if (event.keyCode == 13) {
        if (!mreg.test($('#phonenum').val())) {
            $('.notice').html(
                `
                <div class="alert alert-danger" role="alert">请输入正确的电话号码</div>  
                
                `
            )
            setTimeout(() => {
                $('.notice').html('')
            }, 2500)
            return false
        }
        if ($('#code').val().length !== 6) {
            $('.notice').html(
                `
                <div class="alert alert-danger" role="alert">请输入正确的验证码</div>  
                
                `
            )
            setTimeout(() => {
                $('.notice').html('')
            }, 2500)
            return false
        }
        var data = {
            verification_code: $('#code').val(),
            mobile: $('#phonenum').val()
        }
        $.ajax({
            url: baseurl + 'auth/login',
            type: 'POST',
            data: data,
            success: function(res) {

                if (res.code == 200) {
                    localStorage.setItem('token', res.data.access_token)
                    location.href = '../userinfo.html'
                }
            },
            error: function(err) {
                if (err) {

                    $('.notice').html(
                        `
                        <div class="alert alert-danger" role="alert">${err.responseJSON.message}</div>  
                        
                        `
                    )
                    setTimeout(() => {
                        $('.notice').html('')
                    }, 2500)
                }
            }
        })
    }
});
$('.login_in').click(() => {
    if (!mreg.test($('#phonenum').val())) {
        $('.notice').html(
            `
            <div class="alert alert-danger" role="alert">请输入正确的电话号码</div>  
            
            `
        )
        setTimeout(() => {
            $('.notice').html('')
        }, 2500)
        return false
    }
    if ($('#code').val().length !== 6) {
        $('.notice').html(
            `
            <div class="alert alert-danger" role="alert">请输入正确的验证码</div>  
            
            `
        )
        setTimeout(() => {
            $('.notice').html('')
        }, 2500)
        return false
    }
    var data = {
        verification_code: $('#code').val(),
        mobile: $('#phonenum').val()
    }
    $.ajax({
        url: baseurl + 'auth/login',
        type: 'POST',
        data: data,
        success: function(res) {

            if (res.code == 200) {
                localStorage.setItem('token', res.data.access_token)
                location.href = '../userinfo.html'
            }
        },
        error: function(err) {
            if (err) {

                $('.notice').html(
                    `
                    <div class="alert alert-danger" role="alert">${err.responseJSON.message}</div>  
                    
                    `
                )
                setTimeout(() => {
                    $('.notice').html('')
                }, 2500)
            }
        }
    })





})
window.addEventListener('message', function(e) {

    if (e) {
        $('#exampleModal').modal('hide')
    }
    var data = {
        mobile: $('#phonenum').val(),
        type: 'login',
        nc_sessionid: e.data.sessionid,
        nc_token: e.data.nc_token,
        nc_sig: e.data.sig
    }
    $.ajax({
        url: baseurl + 'verification/code',
        type: "POST",
        data: data,
        success: function(data) {
            var timecode = 60
            if (data.code == 200) {
                $('.time').show()
                $('.innertime').hide()
                var timer = setInterval(() => {
                    if (timecode == 0) {
                        $('.time').hide()
                        $('.innertime').show()
                        clearInterval(timer)
                        timecode = 60
                        $('.time').html('60s')
                    } else {
                        timecode = timecode - 1
                        $('.time').html(timecode + 's')


                    }


                }, 1000);
            }

        },
        error: function(err) {

            if (err) {

                $('.notice').html(
                    `
                    <div class="alert alert-danger" role="alert">${err.responseJSON.message}</div>  

                    `
                )
                setTimeout(() => {
                    $('.notice').html('')
                }, 2500)
            }
        }
    })


})