let navElement, scrollElement, navList, scrollSetNavActiveFlag = true;
const ANIMATE_TIMES = 20;

export function init(obj) {
  scrollElement = obj.scrollElement;
  addDom(obj);
  initScroll();
  initClick();
}

function addDom(obj){
  navList = obj.navList;
  navElement = document.createElement('ul');
  navElement.className = 'scroll-anchor-nav';
  let tpl = '';
  navList.forEach(item => {
    tpl += `<li>${item}</li>`;
  });
  navElement.innerHTML = tpl;
  scrollElement.after(navElement)
}

function initScroll(){
  scrollElement.addEventListener('scroll', throttle(handleScroll, 100))
}

function handleScroll(){
  if(scrollSetNavActiveFlag){
    const scrollTop = scrollElement.scrollTop;
    const topIndex = getTopIndex(scrollTop);
    const topLabel = navElement.children[topIndex].innerText;
    setNavActive(topLabel);
  }
}

function setNavActive(topLabel){
  for (let i = 0; i < navElement.children.length; i++) {
    navElement.children[i].setAttribute('class', navElement.children[i].innerText === topLabel ? 'active' : '');
  }
}

function getTopIndex(scrollTop){
  let index;
  for(let i = 0; i < navList.length ; i++){
    const element = scrollElement.querySelector(`[data-anchor=${navList[i]}]`);
    const top = element.offsetTop;
    if(top > scrollTop){
      index = i;
      break;
    }
  }
  return index;
}

function initClick(){
  navElement.addEventListener('click', function(e){
    scrollSetNavActiveFlag = false;
    const label = e.target.innerText;
    setNavActive(label);
    const element = scrollElement.querySelector(`[data-anchor=${label}]`);
    const top = element.offsetTop;
    scrollTo(top);
  })
}

let times = ANIMATE_TIMES;
let step;

function scrollTo(top){
  const currentTop = scrollElement.scrollTop;
  const gap = top - currentTop;
  // const durition = 1000;
  step = gap / times;
  animateScroll();
}

function animateScroll(){
  scrollElement.scrollTop = scrollElement.scrollTop + step;
  times= times - 1;
  if(times > 0){
    window.requestAnimationFrame(animateScroll)
  } else {
    times = ANIMATE_TIMES;
    scrollSetNavActiveFlag = true;
  }
}

function throttle(fn, delay) {
  let flag = true;
  return () => {
    if (!flag) return;
    flag = false;
    let timer = setTimeout(() => {
      fn();
      flag = true;
    }, delay);
  };
}