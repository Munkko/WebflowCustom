function cmsSize() {
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
}

function godzilla() {
  function godzillaHover() {
    $('.hero-text').css({
      // 'font-family': 'Laluxesserif, serif',
      color: '#ff3b00',
      //"#FF3B00"
    });
    $('.hero-text-container').css({
      // 'mix-blend-mode': 'difference',
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
      color: '#050505',
    });
    $('.hero-text-container').css({
      'mix-blend-mode': 'normal',
    });
    // $('.hero-image').css({
    //   display: 'block',
    // });
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
}

function marquee() {
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
}
function galleryToggle() {
  const toggle = $('#gal-toggle');
  const galLeft = $('#gal-left');
  const galRight = $('#gal-right');
  const galBlock = $('.works-gallery_block');
  var toggleState = false;

  let tl = gsap.timeline({
    defaults: { duration: 0.8, ease: 'power2.inOut' },
  });

  function spread() {
    if ($(window).width() > 991) {
      if (toggleState === false) {
        tl.to('.overflow-container', {
          height: 0,
        });
        tl.to(galLeft, {
          width: 0,
        });
        toggleState = true;
        console.log('oi');
      } else {
        tl.to(galLeft, {
          width: '30%',
        });
        tl.to('.overflow-container', {
          height: 'auto',
        });

        toggleState = false;
        console.log('ah');
      }
    } else {
      gsap.set(galLeft, { width: 'auto' });
      if (toggleState === false) {
        tl.to('.overflow-container', {
          height: 0,
        });

        toggleState = true;
        console.log('oi');
      } else {
        tl.to('.overflow-container', {
          height: 'auto',
        });

        toggleState = false;
        console.log('ah');
      }
    }
  }

  toggle.click(function () {
    spread();
  });
}

galleryToggle();
cmsSize();
godzilla();
marquee();
