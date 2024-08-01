// loader variables //
let quoteLoading = false;
let videoLoading = false;
let courseLoading = false;
let priceLoading = false;

// loader functions //
function showLoader(elementID) {
  $(elementID).addClass('d-block');
}

function hideLoader(elementID) {
  $(elementID).removeClass('d-block');
}

// simulated delay to check loader //

function simulateDelay(callback, delay = 2000) {
  setTimeout(callback, delay);
}

// quote section function //

function getQuotes() {
  quoteLoading = true;
  showLoader('.loader');
  $.ajax({
    url: 'https://smileschool-api.hbtn.info/quotes',
    method: 'GET',
    success: function(data) {
      console.log('quotes data:', data);
      if (Array.isArray(data)) {
        $('#carouselExampleControls .carousel-inner').empty();

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
          $('#carouselExampleControls .carousel-inner').append(quoteHTML);
        });
        $('#carouselExampleControls').carousel({ interval: false });

        simulateDelay(() => {
          hideLoader('#loader');
        });
      } else {
        console.error('expected array', data);
      }
      hideLoader('#loader');
    },
  });
}

// popular tutorials function //

  function getPopularVideos() {
    videoLoading = true;
    showLoader('#video-loader');
    $.ajax({
      url: 'https://smileschool-api.hbtn.info/popular-tutorials',
      method: 'GET',
      success: function(data) {
        console.log(data);

        if (Array.isArray(data)) {
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
          </div>`;
        }
        carouselItemHTML += `
        </div>
          </div>
          `;
        $('#videoCarousel').append(carouselItemHTML);
      }
      $('#carouselExampleControls2').carousel({ interval: false });
    } else {
      console.error('expected array', data);
    }
    hideLoader('#video-loader');
   },
  });
}

// pricing dynamic loading //
  function getPricing() {
    priceLoading = true;
    showLoader('#pricing-loader');
    
    $.ajax({
    url: 'https://smileschool-api.hbtn.info/quotes',
    method: 'GET',
    success: function(data) {
      console.log('pricing data:', data);

      if (Array.isArray(data)) {
        $('#pricingCarousel').empty();

        data.forEach(function(quote, index) {
        let activeClass = index === 0 ? 'active' : '';
        let priceHTML = `
        <div class="carousel-item ${activeClass}">
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
          $('#pricingCarousel').append(priceHTML);
        });
        $('#carouselExampleControls').carousel({ interval: false });
      } else {
        console.error('expected array', data);
      }
      hideLoader('#pricing-loader');
    },
  });
}

// courses page functions //

// event listeners for sorting //

$(document).ready(function() {

  getCourses();
  getQuotes();
  getPopularVideos();
  getPricing();
  
  $('#keywords input').on('input', function() {
    getCourses();
  });
  
  
  $('#topic .dropdown-menu').on('click', 'a', function(event) {
    event.preventDefault();
    const topicValue = $(this).data('value');
    $('#topic .dropdown-toggle span').text($(this).text()).data('value', topicValue);
    getCourses();
  });
  

  $('#sort .dropdown-menu').on('click', 'a', function(event) {
    event.preventDefault();
    const sortValue = $(this).data('value');
    $('#sort .dropdown-toggle span').text($(this).text()).data('value', sortValue);
    getCourses();
  });
});

function getCourses() {
  const searchValue = $('#keywords input').val();
  const topicValue = $('#topic .dropdown-toggle span').data('value') || 'all';
  const sortValue = $('#sort .dropdown-toggle span').data('value') || 'most_popular';

    showLoader('.course-loader');

    let queryParameters = {};
    if (searchValue) queryParameters.q = searchValue;
    if (topicValue && topicValue !== 'all') queryParameters.topic = topicValue;
    if (sortValue) queryParameters.sort = sortValue;

    $.ajax({
      url: 'https://smileschool-api.hbtn.info/courses',
      method: 'GET',
      data: queryParameters,
      success: function(response) {
        const courses = response.courses;
        const topics = response.topics;
        const sorts = response.sorts;

        dynamicDropdown(topics, sorts);
        displayCourses(courses);
        hideLoader('.course-loader');
      },
    });
  }

  function dynamicDropdown(topics, sorts) {
    const topicDropdown = $('#topic .dropdown-menu');
    const sortDropdown = $('#sort .dropdown-menu');

    topicDropdown.empty();
    sortDropdown.empty();

    topicDropdown.append('<a class="dropdown-item" href="#" data-value="all">All Topics</a>')
    topics.forEach(topic => {
      topicDropdown.append(`<a class="dropdown-item" href="#" data-value="${topic}">${topic}</a>`)
    });

    sorts.forEach(sort => {
      sortDropdown.append(`<a class="dropdown-item" href="#" data-value="${sort}">${formatSortValue(sort)}</a>`)
    });
  }
  function formatSortValue(value) {
    switch (value) {
      case 'most_popular':
        return 'Most Popular';
      case 'most_recent':
        return 'Most Recent';
      case 'most_viewed':
        return 'Most Viewed';
      default:
        return value;
    }
  }

  function displayCourses(courses) {
    const courseList = $('#course-list');
    courseList.empty();

    courses.forEach(course => {
      const stars = '<img src="images/star_on.png" alt="star rating" width="15px">'.repeat(course.star);
      const courseHTML = `
      <div class="course-item col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
        <div class="card">
          <img src="${course.thumb_url}" class="card-img-top course-thumbnail" alt="course thumbnail">
          <div class="card-body">
            <h3 class="card-title">${course.title}</h3>
            <p class="card-text">${course['sub-title']}</p>
            <div class="d-flex align-items-center mb-2">
              <img src=${course.author_pic_url}" alt="author picture">
              <span>${course.author}</span>
            </div>
            <div class="d-flex mb-2">${stars}</div>
              <p class="card-text">${course.duration}</p>
          </div>
        </div>
        `;
      courseList.append(courseHTML);
    });
  }
