var Slider = function(id) {
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
    that = this;
    
    this.init = function() {
        var sliderEl = document.createElement('div');
        sliderEl.classList.add('slider');
        this.newEl.appendChild(sliderEl);
        
        this.prevBtn = document.createElement('button');
        this.prevBtn.classList.add('btn');
        this.prevBtn.classList.add('btnPrev');
        this.prevBtn.innerHTML = 'prev';
        this.prevBtn.addEventListener('click', that.showPrevSlide);
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
        this.nextBtn.addEventListener('click', that.showNextSlide);
        sliderEl.appendChild(this.nextBtn);

        for (var i = 0; i < this.imgUrls.length; i++) {
            var switcher = document.createElement('div');
            switcher.classList.add('switcher');
            switcher.dataset.number = i;
            this.switchers.appendChild(switcher);
        }
        this.currentIndex = 0;
    };
    
    this.showSlide = function() {
        that.currentIndexCheck();
        that.sliderImg.src = that.imgUrls[that.currentIndex];
    };
    
    this.showNextSlide = function() {
        ++(that.currentIndex);
        that.showSlide();
    };
    
    this.showPrevSlide = function() {
        --(that.currentIndex);
        that.showSlide();
    };
    
    this.currentIndexCheck = function() {
        if(that.currentIndex < 0) {
            that.currentIndex = that.imgUrls.length-1;
        }
        if(that.currentIndex == that.imgUrls.length) {
            that.currentIndex = 0;
        }
    };
};

var slider1 = new Slider('newEl');
slider1.init();
var slider2 = new Slider('newEl2');
slider2.init();
var slider3 = new Slider('newEl3');
slider3.init();

