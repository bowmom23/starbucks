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

//올해가 몇년도인지 알려주는 코드
const thisYear = document.querySelector('.this-year');
//textContent는 텍스트 안의 글자 내용을 알아내거나 지정하는 용도로 사용
thisYear.textContent = new Date().getFullYear(); //2023