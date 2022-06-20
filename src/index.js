
const ANIMATE_TIMES = 20;

export function init(obj) {
  const s = new Scroller(obj);
  s.init();
}

class Scroller {
  constructor(props){
    this.navElement = null;
    this.scrollElement = props.scrollElement;
    this.navList = props.navList;
    this.scrollSetNavActiveFlag = true;
    this.times = ANIMATE_TIMES;
    this.step = 0;
  }

  init(){
    this.addDom();
    this.initScroll();
    this.initClick();
  }

  addDom(){
    this.navElement = document.createElement('ul');
    this.navElement.className = 'scroll-anchor-nav';
    let tpl = '';
    this.navList.forEach(item => {
      tpl += `<li>${item}</li>`;
    });
    this.navElement.innerHTML = tpl;
    this.scrollElement.after(this.navElement)
  }

  initScroll(){
    this.scrollElement.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 100))
  }

  handleScroll(){
    if(this.scrollSetNavActiveFlag){
      const scrollTop = this.scrollElement.scrollTop;
      const topIndex = this.getTopIndex(scrollTop);
      const topLabel = this.navElement.children[topIndex].innerText;
      this.setNavActive(topLabel);
    }
  }

  setNavActive(topLabel){
    for (let i = 0; i < this.navElement.children.length; i++) {
      this.navElement.children[i].setAttribute('class', this.navElement.children[i].innerText === topLabel ? 'active' : '');
    }
  }

  getTopIndex(scrollTop){
    let index;
    for(let i = 0; i < this.navList.length ; i++){
      const element = this.scrollElement.querySelector(`[data-anchor=${this.navList[i]}]`);
      const top = element.offsetTop;
      if(top > scrollTop){
        index = i;
        break;
      }
    }
    return index;
  }

  initClick(){
    const self = this;
    this.navElement.addEventListener('click', function(e){
      this.scrollSetNavActiveFlag = false;
      const label = e.target.innerText;
      this.setNavActive(label);
      const element = this.scrollElement.querySelector(`[data-anchor=${label}]`);
      const top = element.offsetTop;
      this.scrollTo(top);
    }.bind(this))
  }

  scrollTo(top){
    const currentTop = this.scrollElement.scrollTop;
    const gap = top - currentTop;
    // const durition = 1000;
    this.step = gap / this.times;
    this.animateScroll();
  }

  animateScroll(){
    this.scrollElement.scrollTop = this.scrollElement.scrollTop + this.step;
    this.times= this.times - 1;
    if(this.times > 0){
      window.requestAnimationFrame(this.animateScroll.bind(this))
    } else {
      this.times = ANIMATE_TIMES;
      this.scrollSetNavActiveFlag = true;
    }
  }

  throttle(fn, delay) {
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
}

