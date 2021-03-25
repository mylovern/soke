var baseurl = 'https://www.soke.network/api/'

$.ajax({
    url: baseurl + 'website/news?pageSize=3&pageNum=1',
    type: "GET",
    success: function(res) {
        var str = ''
        for (let v of res.data.records) {
            str += `
          <div class="col-lg-4 col-md-6">
          <div class="single-news mb-30">

              <div class="news-content">

                  <h3 ><a style="max-width:286px;overflow: hidden;
                  text-overflow:ellipsis;
                  white-space: nowrap;" href="news-details.html?id=${v.id}">${v.title}</a></h3>
                  <p style="display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 3;
                  overflow: hidden;">${v.summary}</p>
                  <ul class="news-meta pt-10">
                      <li>By <a href="javascript:void(0)">Admin</a></li>
                      <li class="cmt"><a href="javascript:void(0)">24 Comments</a></li>
                  </ul>
              </div>
          </div>
      </div>
          
          `
        }
        $('.news_conetnt').html(str)
    },
    error: function(err) {
        console.log(err)
    }
})