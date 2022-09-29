let cmsItem = $('.cms-item');

$(cmsItem).each(function () {
  let cmsImgH = $(this).find('img').height();
  let cmsImgW = $(this).find('img').width();

  console.log(cmsImgH);
  console.log(cmsImgW);

  if (cmsImgH != cmsImgW) {
    $(this).addClass('span3');
  }
});

$(document).ready(function () {
  var pageID = '632a790350c5e397d90938bc';

  barba.init({
    transitions: [
      {
        sync: true,
        beforeLeave: function (data) {
          let end = data.next.html.indexOf(' data-wf-site="');
          let start = data.next.html.indexOf('data-wf-page="');
          let string = data.next.html.slice(start, end);
          let arr = string.split('"');
          pageID = arr[1];
        },
        leave: function (data) {
          const done = this.async();
          //do some crazy outro animations using GSAP or ANIMEJS (our fav), then place the following in the complete callback:
          done();
        },
        beforeEnter: function (data) {
          $('html').attr('data-wf-page', pageID);
          window.Webflow && window.Webflow.destroy();
          window.Webflow && window.Webflow.ready();
          window.Webflow && window.Webflow.require('ix2').init();
          document.dispatchEvent(new Event('readystatechange'));
        },
        enter: function (data) {
          return gsap.to(data.current.container, {
            opacity: 0,
          });
        },
      },
    ],
  });
});

function godzillaHover() {
  $('.hero-text').css({
    'font-family': 'Laluxesserif, serif',
    color: '#c8ff00',
    //"#FF3B00"
  });
  $('.hero-text-container').css({
    'mix-blend-mode': 'difference',
  });
  $('.hero-image').css({
    display: 'none',
  });
  $('.hero-godzilla').css({
    display: 'block',
  });
}

function godzillaHoverOut() {
  $('.hero-text').css({
    'font-family': 'Ppneuemontreal,sans-serif',
    color: '#fbfbfb',
  });
  $('.hero-text-container').css({
    'mix-blend-mode': 'normal',
  });
  $('.hero-image').css({
    display: 'block',
  });
  $('.hero-godzilla').css({
    display: 'none',
  });
}

//animation
$(document)
  .on('mouseenter', '#circle', function () {
    godzillaHover();
  })
  .on('mouseleave', '#circle', function () {
    godzillaHoverOut();
  });

function marqueeOpen() {
  let tl = gsap.timeline();
  tl.to('.marquee', {
    height: '15rem',
    duration: 0.6,
    ease: 'power2.inOut',
  });
}

function marqueeClose() {
  let tl = gsap.timeline();
  tl.to('.marquee', {
    height: '0rem',
    duration: 0.3,
    ease: 'power2.out',
  });
}

$(document)
  .on('mouseenter', '.home-link', function (e) {
    var newText = $(this).attr('id');
    let marqueeText = `${newText} `.repeat(10);

    $('#marquee-text').text(marqueeText);

    marqueeOpen();
  })
  .on('mouseleave', '.home-link', function () {
    marqueeClose();
  });
