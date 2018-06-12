var Slider = function (id) {

    this.imgUrls = [
    'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&h=350',
    'https://images.pexels.com/photos/371633/pexels-photo-371633.jpeg?auto=compress&cs=tinysrgb&h=350',
    'https://cdn.fstoppers.com/styles/med-16-9/s3/lead/2017/08/iceland-unique-compositions-landscape-photography.jpg',
    'https://st.hzcdn.com/fimgs/cb716b6209cd4e47_7165-w458-h268-b0-p0--modern-exterior.jpg'];
    this.currentIndex = 0;
    this.newEl = document.querySelector('#' + id),
    this.nextBtn = null;
    this.prevBtn = null;
    this.sliderImg = null;
    this.switchers = null;
    this.switcherEl = [];

    this.init();
};

Slider.prototype.init = function () {
    var sliderEl = document.createElement('div');
    sliderEl.classList.add('slider');
    this.newEl.appendChild(sliderEl);

    this.prevBtn = document.createElement('button');
    this.prevBtn.classList.add('btn');
    this.prevBtn.classList.add('btnPrev');
    this.prevBtn.innerHTML = 'prev';
    this.prevBtn.addEventListener('click', this.showPrevSlide.bind(this));
    sliderEl.appendChild(this.prevBtn);

    this.sliderImg = document.createElement('img')
    this.sliderImg.classList.add('slider_img');
    this.sliderImg.src = this.imgUrls[this.currentIndex];
    sliderEl.appendChild(this.sliderImg);

    this.switchers = document.createElement('div');
    this.switchers.classList.add('switchers');
    sliderEl.appendChild(this.switchers);

    this.nextBtn = document.createElement('button');
    this.nextBtn.classList.add('btn');
    this.nextBtn.classList.add('btnNext');
    this.nextBtn.innerHTML = 'next';
    this.nextBtn.addEventListener('click', this.showNextSlide.bind(this));
    sliderEl.appendChild(this.nextBtn);

    for (var i = 0; i < this.imgUrls.length; i++) {
        var switcher = document.createElement('div');
        switcher.classList.add('switcher');
        switcher.dataset.number = i;
        this.switcherEl.push(switcher);
        this.switchers.appendChild(switcher);
    }

    for (var i = 0; i < this.switcherEl.length; i++) {
        this.switcherEl[i].addEventListener('click', this.setImgBySwitcher.bind(this));
    }
    this.currentIndex = 0;
    this.showSlide();
};

Slider.prototype.showSlide = function () {
    this.currentIndexCheck();
    this.sliderImg.src = this.imgUrls[this.currentIndex];
    this.clearSwitchers();
    this.markSwitcher();
};

Slider.prototype.showNextSlide = function () {
    this.currentIndex++;
    this.showSlide();
};

Slider.prototype.showPrevSlide = function () {
    this.currentIndex--;
    this.showSlide();
};

Slider.prototype.setImgBySwitcher = function (e) {
    this.currentIndex = e.currentTarget.dataset.number;
    this.showSlide();
};

Slider.prototype.markSwitcher = function () {
    this.switcherEl[this.currentIndex].classList.add('current_switcher');
};

Slider.prototype.clearSwitchers = function () {
    for (var i = 0; i < this.switcherEl.length; i++) {
        this.switcherEl[i].classList.remove('current_switcher');
    }
};

Slider.prototype.currentIndexCheck = function () {
    if (this.currentIndex < 0) {
        this.currentIndex = this.imgUrls.length - 1;
    }
    if (this.currentIndex == this.imgUrls.length) {
        this.currentIndex = 0;
    }
};

var slider1 = new Slider('newEl');
var slider2 = new Slider('newEl2');
var slider3 = new Slider('newEl3');