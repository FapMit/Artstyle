
//шум
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
    }
}
var Grain = function() {
function Grain(el) {
_classCallCheck(this, Grain);
/**
* Options
*/
this.patternSize = 200;
this.patternScaleX = 1;
this.patternScaleY = 1;
this.patternRefreshInterval = 4; // 8
this.patternAlpha = 15; // int between 0 and 255,
/**
* Create canvas
*/
this.canvas = el;
this.ctx = this.canvas.getContext('2d');
this.ctx.scale(this.patternScaleX, this.patternScaleY);
/**
* Create a canvas that will be used to generate grain and used as a
* pattern on the main canvas.
*/
this.patternCanvas = document.createElement('canvas');
this.patternCanvas.width = this.patternSize;
this.patternCanvas.height = this.patternSize;
this.patternCtx = this.patternCanvas.getContext('2d');
this.patternData = this.patternCtx.createImageData(this.patternSize, this.patternSize);
this.patternPixelDataLength = this.patternSize * this.patternSize * 4; // rgba = 4
this.resize = this.resize.bind(this);
this.loop = this.loop.bind(this);
this.frame = 0;
window.addEventListener('resize', this.resize);
this.resize();
window.requestAnimationFrame(this.loop);
}
Grain.prototype.resize = function resize() {
this.canvas.width = window.innerWidth * devicePixelRatio;
this.canvas.height = window.innerHeight * devicePixelRatio;
};
Grain.prototype.update = function update() {
var patternPixelDataLength = this.patternPixelDataLength;
var patternData = this.patternData;
var patternAlpha = this.patternAlpha;
var patternCtx = this.patternCtx;
// put a random shade of gray into every pixel of the pattern
for (var i = 0; i < patternPixelDataLength; i += 4) {
// const value = (Math.random() * 255) | 0;
var value = Math.random() * 255;
patternData.data[i] = value;
patternData.data[i + 1] = value;
patternData.data[i + 2] = value;
patternData.data[i + 3] = patternAlpha;
}
patternCtx.putImageData(patternData, 0, 0);
};
Grain.prototype.draw = function draw() {
var ctx = this.ctx;
var patternCanvas = this.patternCanvas;
var canvas = this.canvas;
var viewHeight = this.viewHeight;
var width = canvas.width;
var height = canvas.height;
// clear canvas
ctx.clearRect(0, 0, width, height);
// fill the canvas using the pattern
ctx.fillStyle = ctx.createPattern(patternCanvas, 'repeat');
ctx.fillRect(0, 0, width, height);
};
Grain.prototype.loop = function loop() {
// only update grain every n frames
var shouldDraw = ++this.frame % this.patternRefreshInterval === 0;
if (shouldDraw) {
this.update();
this.draw();
}
window.requestAnimationFrame(this.loop);
};
return Grain;
}();
var el = document.querySelector('.grain');
var grain = new Grain(el);


//1. Анимация заголовков по скроллу страницы

//получаем все эелементы с классом js-splitText
let splitTargets = document.querySelectorAll('.js-splitText')

//оборачивае в span каждую букву заголовка
splitTargets.forEach((target) => {

    let textContent = target.textContent; //получаем текст каждого элемента
    let newText = '';

    //оборачиваем каждую букву в тег span
    for (let i = 0; i < textContent.length; i++) {
        newText += `<span>${textContent[i]}</span>`
    }

    //изменяем содержание заголовов
    target.innerHTML = newText;
})

//получаем все элементы с классом js-text-effect
let targets = document.querySelectorAll('.js-text-effect')

//добавляем анимацию для каждого тега span
targets.forEach((target) => {
    //получаем все элементы с тегом span 
    let spans = target.querySelectorAll('span');

    //функция для добавления класса js-splitText__animate для запуска анимации
    function animateSpans(){
        spans.forEach((span, index) => {
            setTimeout(() => {
                span.classList.add('animate');
            }, index * 50);
        });
    }


    const headlineObserver = new IntersectionObserver (entries => {
        entries.forEach (entry => {
            if (entry.isIntersecting) {
                animateSpans();
                headlineObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 1,
        rootMargin: `0px 0px -8% 0px`,
    });

    headlineObserver.observe(target);
})

console.log(targets)


//2. Анимация для всплытия фотографий по скроллу
const elementForAnimationOnScroll = document.querySelectorAll('.animationUp')
const animationUpObserver = new IntersectionObserver(showTextAnimation,{threshold:0.1})

function addOpacity(){
    elementForAnimationOnScroll.forEach(function(elem){
        elem.style.opacity = 0;
    })
}

addOpacity();

function showTextAnimation(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animationContainer');
        animationUpObserver.unobserve(entry.target);
      }
    });
  }
  
elementForAnimationOnScroll.forEach((element) => {
    animationUpObserver.observe(element);
  });

//3. Анимация списков
const listForAnimationOnScroll = document.querySelectorAll('.showList')
const listUpObserver = new IntersectionObserver(showListAnimation,{threshold:0})

function addOpacityList(){
    listForAnimationOnScroll.forEach(function(elem){
        elem.style.opacity = 0;
    })
}

addOpacityList();

function showListAnimation(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('showSlide');
        listUpObserver.unobserve(entry.target);
      }
    });
  }
  
  listForAnimationOnScroll.forEach((element) => {
    listUpObserver.observe(element);
  });

