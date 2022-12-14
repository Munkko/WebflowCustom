function resetWebflow(data) {
  let parser = new DOMParser();
  let dom = parser.parseFromString(data.next.html, 'text/html');
  let webflowPageId = $(dom).find('html').attr('data-wf-page');
  $('html').attr('data-wf-page', webflowPageId);
  window.Webflow && window.Webflow.destroy();
  window.Webflow && window.Webflow.ready();
  window.Webflow && window.Webflow.require('ix2').init();
}

let percentTop;

$(document).on('click', function (e) {
  let mouseTop = e.pageY - $(window).scrollTop();
  let mouseLeft = e.pageX;
  percentTop = (mouseTop / $(window).height()) * 100;
});

barba.init({
  transitions: [
    {
      preventRunning: true,
      enter: function (data) {
        let transitionData = data;
        gsap.defaults({ duration: 0.8, ease: 'power2.inOut' });
        $(data.next.container).addClass('fixed');
        return gsap.fromTo(
          data.next.container,
          {
            clipPath: `polygon(0% ${percentTop}%, 0% ${percentTop}%, 0% ${percentTop}%, 0% ${percentTop}%, 100% ${percentTop}%, 100% ${percentTop}%, 0% ${percentTop}%, 0% ${percentTop}%, 100% ${percentTop}%, 100% ${percentTop}%)`,
          },
          {
            clipPath:
              'polygon(0% 0%, 0% 100%, 0% 100%, 0% 50%, 100% 50%, 100% 50%, 0% 50%, 0% 100%, 100% 100%, 100% 0%)',
            onComplete: () => {
              $(window).scrollTop(0);
              $(data.next.container).removeClass('fixed');
              $(data.next.container).css('clip-path', 'none');
              resetWebflow(transitionData);
            },
          }
        );
      },
    },
  ],
});

barba.hooks.enter((data) => {
  console.log('newpage');

  let cmsItem = $('.cms-item');
  $(cmsItem).each(function () {
    let cmsImgH = $(this).find('img').height();
    let cmsImgW = $(this).find('img').width();
    if (cmsImgH == cmsImgW) {
      $(this).addClass('span1');
    }
  });

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
});
