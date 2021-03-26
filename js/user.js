$(document).ready(function() {
    var baseurl = 'https://www.soke.network/api/'
        // var baseurl = 'http://192.168.101.26:8600/'


    if (localStorage.getItem('token')) {
        $.ajax({
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                Accept: "application/json; charset=utf-8",
            },
            url: baseurl + 'user/info',
            type: "GET",

            success: function(res) {
                if (res.code == 200) {
                    $('#mobile').val(res.data.mobile)
                    $('#banlance').val(res.data.balance == null ? 0 : res.data.balance)
                    $('#status').val(res.data.bindAddress == false ? '未绑定钱包' : '已绑定钱包')
                    $('#wallet').val(res.data.address == null ? '' : res.data.address)
                    if ($('#wallet').val() !== '') {
                        $('#wallet').attr('disabled', true)
                    }
                }
            },
            error: function(err) {
                if (err.responseJSON.code == 401) {
                    localStorage.removeItem('token')
                    location.href = '../login.html'
                }
            }
        })
    } else {
        window.location.href = '../login.html'
    }
    $('.sendbtn').click(() => {
        if ($('#wallet').val().length !== 42) {
            $('.notice').html(`
                <div class="alert alert-danger" role="alert">请输入正确的钱包地址</div>  
                `)
            setTimeout(() => {
                $('.notice').html('')
            }, 2500)
            return false
        }
        var data = {
            address: $('#wallet').val()
        }

        $.ajax({
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                Accept: "application/json; charset=utf-8",
            },
            url: baseurl + 'bind/wallet',
            type: 'POST',
            data: data,
            success: function(res) {
                if (res.code == 200) {
                    $('.notice').html(
                        `
                    <div class="alert alert-success" role="alert">绑定成功</div>  
                    
                    `
                    )
                    setTimeout(() => {
                        $('.notice').html('')
                        location.reload()
                    }, 2500)
                }
            },
            error: function(err) {
                $('.notice').html(
                    `
                    <div class="alert alert-danger" role="alert">${err.responseJSON.message}</div>  
                    
                    `
                )
                setTimeout(() => {
                    $('.notice').html('')
                }, 2500)
            }

        })
    })
    $('.logout').click(() => {
        $.ajax({
            url: baseurl + 'auth/logout',
            type: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                Accept: "application/json; charset=utf-8",
            },
            success: function(res) {
                console.log(res)
                if (res.code == 200) {
                    $('.slide-bar').hide()
                    $('.body-overlay').hide()
                    $('.notice').html(
                        `
                    <div class="alert alert-success" role="alert">退出成功</div>  
                    
                    `
                    )
                    setTimeout(() => {
                        $('.notice').html('')
                        location.href = '../index.html'
                        localStorage.removeItem('token')
                    }, 1500)
                }
            },
            error: function(err) {
                console.log(err)
            }
        })
    })

})