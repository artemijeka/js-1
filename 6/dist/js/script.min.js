
// 1. Доработать функцию замены картинки в галерее таким образом,
// чтобы она проверяла наличие картинки по указанному в src адресу.
// 2. Реализовать модуль корзины. Создать блок товаров и блок корзины.
// У каждого товара есть кнопка «Купить», при нажатии на которую происходит
// добавление имени и цены товара в блок корзины. Корзина должна уметь
// считать общую сумму заказа.
// 3. *Добавить в галерею функцию перехода к следующему изображению.
// По сторонам от большой картинки должны быть стрелки «вперед» и «назад»,
// по нажатию на которые происходит замена изображения на
// следующее или предыдущее.
'use strict';

let arImgsBigSrc = [];
let arrowPrev = document.querySelector('#arrowPrev');
let arrowNext = document.querySelector('#arrowNext');
let elemImgBig = document.querySelector('#imgBig');
let elemsImgSmall = document.querySelectorAll('.gallery__img-small');
let objImgBig = {
  elem: document.querySelector('#imgBig'),
  next: '',
  prev: '',
  links: [],//array of all links to big images
  nSrc: elemsImgSmall.length,
  setPrevSrc: function(src) {//0
    for (let i = 0; i < this.nSrc; i++) {
      if (src === this.links[i]) {
        if (i === 0) {
          return this.links[this.nSrc-1];
        } else {
          return this.links[i-1];
        }
      }
    }
  },
  setNextSrc: function(src) {
    for (let i = 0; i < this.nSrc; i++) {
      if (src === this.links[i]) {
        if (i === this.nSrc-1) {
          // console.log(i);
          return this.links[0];
        } else {
          return this.links[i+1];
        }
      }
    }
  },
  setImgBig: function(src) {
    return src.replace('300x300', '1080x1080');
  }
}
//https://miro.com/welcomeonboard/YzUJdf2uvjCApGhsTAUINrMryIFqQv5jKQNIVthI6z7JimrrrQwiCiGBSiDy2Gh4
for (let i = 0; i < elemsImgSmall.length; i++) {
  // objImgBig.setImgBig(elemsImgSmall[i].src);
  objImgBig.links[i] = objImgBig.setImgBig(elemsImgSmall[i].src);//создание массива с путями больших изображений
  //добавление слушателей нажатия на маленькие изображения
  elemsImgSmall[i].addEventListener('click', function(e) {
    //установка большого изображения
    elemImgBig.src = objImgBig.links[i];
    arrowPrev.setAttribute('data-src', objImgBig.setPrevSrc(objImgBig.links[i]));
    // console.log(objImgBig.setPrevSrc(objImgBig.links[i]));
    arrowNext.setAttribute('data-src', objImgBig.setNextSrc(objImgBig.links[i]));
    // console.log(objImgBig.setNextSrc(objImgBig.links[i]));
    arrowPrev.style.display = 'inline-block';
    arrowNext.style.display = 'inline-block';
  });
}

arrowPrev.addEventListener('click', function(e) {
  let dataSrc = e.target.getAttribute('data-src');
  elemImgBig.src = dataSrc;
  arrowPrev.setAttribute('data-src', objImgBig.setPrevSrc(dataSrc));
  arrowNext.setAttribute('data-src', objImgBig.setNextSrc(dataSrc));
});
arrowNext.addEventListener('click', function(e) {
  let dataSrc = e.target.getAttribute('data-src');
  elemImgBig.src = dataSrc;
  arrowNext.setAttribute('data-src', objImgBig.setNextSrc(dataSrc));
  arrowPrev.setAttribute('data-src', objImgBig.setPrevSrc(dataSrc));
});

function showNoImg() {/* в html вызывается по умолчанию и по ошибке */
  elemImgBig.src = '../img/gallery/no-img.png';
}