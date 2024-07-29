function getQuotes() {
  $('.loader').addClass('d-block');
  $.ajax({
    url: 'https://smileschool-api.hbtn.info/quotes',
    method: 'GET',
    success: function(data) {
      $('.loader').removeClass('d-block');
      $('#quoteCarousel').empty();

      data.forEach(function(quote, index) {
        let activeQuote = index === 0 ? 'active' : '';
        let quoteHTML = `
        <div class="carousel-item ${activeQuote}">
          <div class="row m-4 align-items-center justify-content-center">
            <div class="col-12 col-sm-2 col-lg-2 text-center px-4">
              <img src="${quote.pic_url}" class="d-block align-self-center" alt="Quote person">
              </div>
              <div class="col-12 col-sm-7 col-lg-9 px-4">
                <div class="quote-text">
                  <p class="text-white">${quote.text}</p>
                  <h4 class="text-white">${quote.name}</h4>
                  <span class="text-white">${quote.title}</span>
                </div>
              </div>
            </div>
          </div>`;
          $('#quoteCarousel').append(quoteHTML);
        });
        $('#carouselExampleControls').carousel({
        interval: false
      });
      },
    });
  }

  function getPopularVideos() {
    $('.video-loader').addClass('d-block');
    $.ajax({
      url: 'https://smileschool-api.hbtn.info/popular-tutorials',
      method: 'GET',
      success: function(data) {
        $('.video-loader').removeClass('d-block');
        $('#videoCarousel').empty();

        const carouselItems = 4;
        let carouselIndex = 0;

        while (carouselIndex < data.length) {
          let activeClass = carouselIndex === 0 ? 'active' : '';
          let carouselItemHTML = `
          <div class="carousel-item ${activeClass}">
            <div class="row">
          `;

          for (let i = 0; i < carouselItems && carouselIndex < data.length; i++, carouselIndex++) {
            const video = data[carouselIndex];
            const subTitle = video['sub-title'] || '';
            let starHTML = '';
            for (let j = 0; j < video.star; j++) {
              starHTML += `<img src="images/star_on.png" alt="star rating" width="15px">`;
          }
          
          carouselItemHTML += `
          <div class="col-12 col-sm-6 col-md-3 mb-4">
            <div class="card">
              <img src="${video.thumb_url}" class="card-img-top" alt="Video thumbnail"/>
                <div class="card-img-overlay text-center">
                  <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay"/>
                </div>
                <div class="card-body">
                  <h5 class="card-title font-weight-bold">${video.title}</h5>
                  <p class="card-text text-muted">${subTitle}</p>
                  <div class="creator d-flex align-items-center">
                    <img src="${video.author_pic_url}" alt="Creator of Video" width="30px" class="rounded-circle"/>
                    <h6 class="pl-3 m-0 main-color">${video.author}</h6>
                  </div>
                  <div class="info pt-3 d-flex justify-content-between">
                    <div class="rating">${starHTML}
                  </div>
                  <span class="main-color">${video.duration}</span>
                </div>
              </div>
            </div>
          </div>
          `;
        }
        carouselItemHTML += `
        </div>
          </div>
          `;
        $('#videoCarousel').append(carouselItemHTML);
      }
      $('#carouselExampleControls2').carousel({ interval: false });
    },
  });
}
$(document).ready(function() {
  getQuotes();
  getPopularVideos();
});
