const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function(){
  searchInputEl.focus();
});

// 플레이스 홀더를 추가하는 매소드 setAttribute
searchInputEl.addEventListener('focus',function(){
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder','통합검색');
});

// 포커스가 해제되었을 때를 정의하는 메소드 remove
searchInputEl.addEventListener('blur',function(){
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder','');
});

const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

//rodash(html에서 연결한 함수)에서 제공하는 throttle이라는 메소드를 활용. 0.3 초마다 함수가 실행되게 제한을 걸음
//(방법)_.throttle(함수,시간)
window.addEventListener('scroll', _.throttle(function(){
  console.log(window.scrollY);
  if(window.scrollY > 500){
    //배지 숨기기
    //먼저 gsap cdn을 구글 검색하여, 라이브러리를 index.html에 추가한 후 > gsap.to(요소,지속시간,옵션)을 작성한다.
    gsap.to(badgeEl, .6, {
      opacity: 0,
      //js에서는 문자의 경우 ''를 작성해야 한다.
      display: 'none'
    });
    //버튼 보이기
    gsap.to(toTopEl, .2, {
      x: 0
    });
  } else{
    //배지 보이기
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
    //버튼 숨기기
    gsap.to(toTopEl, .2, {
      x: 100
    });

  }
}, 300));
//_.throttle(함수, 시간)

toTopEl.addEventListener('click', function(){
  gsap.to(window, .7, {
    scrollTo :0
  });

});

const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl, index){
  //gsap.to(요소, 지속시간, 옵션);
  gsap.to(fadeEl, 1, {
    delay:(index +1) * .7,//첫번째 요소(index:1)는 0.7, 두번째는 1.4, 세번째는 2.1, 네번째는 2.7초 뒤에 opacity 1로 된다.
    opacity: 1
  });
});

//new Swiper(선택자, 옵션); swiper함수를 실행한다.
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical', // 수직 슬라이드 (기본값은 수평)
  autoplay: true, // 자동 재생 여부 
  loop: true // 반복 재생 여부
});

//new Swiper(선택자, 옵션); swiper함수를 실행한다.
new Swiper('.promotion .swiper-container', {
  slidesPerView: 3, // 한번에 보여줄 슬라이드 갯수
  spaceBetween: 10, // 슬라이드 사이 여백
  centersedSlides: true, //1번 슬라이드가 가운데 보이기
  loop: true, // 반복 재생 여부
  // autoplay: { //객체 데이터를 생성하여 함수를 넣어줄 수 있다.
  //   delay: 5000 //딜레이를 5초 걸어라라는 뜻
  // },
  pagination: {
    el: '.promotion .swiper-pagination', //페이지 번호 요소 선택자
    clickable: true //사용자의 페이지 번호 요소 제어
  },
  navigation:{
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next', 
  }
});

new Swiper('.awards .swiper-container', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation:{
    prevEl:'.awards .swiper-prev',
    nextEl:'.awards .swiper-next'
  }
});

const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function(){
  //뒤쪽에 있는 값이 반대가 되게 해주세요라는 뜻이 =! 이다.
  isHidePromotion = !isHidePromotion
  if(isHidePromotion){
    //()안에 들어가는건 true가 기본이므로 숨김 처리!
    //classList.add는 hide라는 클래스를 추가시켜라
    promotionEl.classList.add('hide');
  }else{
    //노출 처리
    //classList.add는 hide라는 클래스를 삭제시켜라
    promotionEl.classList.remove('hide');
  }
})

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}
function floatingObject(selector, delay, size){
  // gsap.to(요소, 시간, 옵션);
  gsap.to(
    selector, //선택자
    random(1.5, 2.5), //애니메이션 동작 시간
    { //옵션
      y: size, 
      repeat: -1,
      yoyo: true,
      ease: Power1.easeInOut,
      delay: random(0, delay)
    }
  );
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

//스크롤 위치 계산 애니메이션 ScrollMagic
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function(spyEl){
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, //보여짐 여부를 감시할 요소를 지정
      triggerHook: .8 //화면을 0~1까지라고 했을 때 0.8 지점에서 해당 애니메이션을 실행하라는 뜻
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller);
});

//올해가 몇년도인지 알려주는 코드
const thisYear = document.querySelector('.this-year');
//textContent는 텍스트 안의 글자 내용을 알아내거나 지정하는 용도로 사용
thisYear.textContent = new Date().getFullYear(); //2023