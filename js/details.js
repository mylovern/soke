var baseurl = 'https://www.soke.network/api/'
var id = location.search.split('=')[1]
$.ajax({
    url: baseurl + 'website/news/' + id,
    type: 'GET',
    success: function(res) {
        console.log(res)
        $('.news_title').html(res.data.title)
        $('.time').html(
            `
<i class="ti-calendar"></i> ${res.data.createAt}
`)
        $('.contentwrapper').html(res.data.content)

    },
    error: function(err) {
        console.log(err)
    }
})