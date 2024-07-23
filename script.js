$(document).ready(function() {
  function getQuotes() {
    $('.loader').addClass('d-block');
    $.ajax({
      url: 'https://smileschool-api.hbtn.info/quotes',
      method: 'GET',
      success: function(data) {
        $('.loader').removeClass('d-block');
        $('.carousel-inner').empty();

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
            $('.carousel-inner').append(quoteHTML);
        });
        $('.carousel').carousel();
      }
    });
  }
  getQuotes();
});