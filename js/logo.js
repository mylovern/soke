var baseurl = 'https://www.soke.network/api/'

$.ajax({
    url: baseurl + 'website/news?pageSize=6&pageNum=1',
    type: "GET",
    success: function(res) {
        var str = ''
        for (let v of res.data.records) {
            str += `
          <div class="news-item mb-40">

          <div class="post-content">
              <div class="post-text">
                  <h3 class="post-title"><a href="news-details.html?id=${v.id}">${v.title}</a></h3>
                  <p>${v.summary}</p>
              </div>

          </div>
      </div>
          
          `
        }
        $('.newwrapper').html(str)
        $('.M-box').pagination({
            totalData: res.data.total == 0 ? 1 : res.data.total,
            showData: 6,
            mode: 'fixed',
            callback: function(api) {
                $.ajax({
                    url: baseurl + 'website/news?pageSize=6&pageNum=' + api.getCurrent(),
                    type: "GET",
                    success: function(res) {
                        window.scrollTo({
                            top: 0
                        })
                        var str = ''
                        for (let v of res.data.records) {
                            str += `
                      <div class="news-item mb-40">
            
                      <div class="post-content">
                          <div class="post-text">
                              <h3 class="post-title"><a href="news-details.html?id=${v.id}">${v.title}</a></h3>
                              <p>${v.summary}</p>
                          </div>
            
                      </div>
                  </div>
                      
                      `
                        }
                        $('.newwrapper').html(str)

                    },
                    error: function(err) {
                        console.log(err)
                    }

                })
            }
        })
    },
    error: function(err) {
        console.log(err)
    }

})