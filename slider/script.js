var btnPrev = document.querySelector('.btnPrev');
var btnNext = document.querySelector('.btnNext');
var sliderImg = document.querySelector('.slider_img');
var switchers = document.querySelector('.switchers');
var currentIndex = 0;
var imgUrls = [
    'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&h=350',
    'https://images.pexels.com/photos/371633/pexels-photo-371633.jpeg?auto=compress&cs=tinysrgb&h=350',
    'https://cdn.fstoppers.com/styles/med-16-9/s3/lead/2017/08/iceland-unique-compositions-landscape-photography.jpg',
    'https://st.hzcdn.com/fimgs/cb716b6209cd4e47_7165-w458-h268-b0-p0--modern-exterior.jpg'
];

for(var i = 0; i < imgUrls.length; i++) {
    var switcher = document.createElement('div');
    switcher.classList.add('switcher');
    switcher.dataset.number = i;
    switchers.appendChild(switcher);
}

var switcherEl = document.querySelectorAll('.switcher');

btnPrev.addEventListener('click', prevImg);
btnNext.addEventListener('click', nextImg);

for (var i = 0; i < switcherEl.length; i++) {
    switcherEl[i].addEventListener('click', function() {
    currentIndex = this.dataset.number;
        changeImg();
    });
}

function changeImg() {
    checkCurentIndex();
    sliderImg.src = imgUrls[currentIndex];
    clearSwitchers();
    markSwitcher();
}

function nextImg() {
    ++currentIndex;
    changeImg();
    btnPrev.style.visibility = "visible";
}

function prevImg() {
    --currentIndex;
    changeImg();
    btnNext.style.visibility = "visible";
}

function checkCurentIndex() {
    if (currentIndex < 0) {
        currentIndex = 0;
        btnPrev.style.visibility = "hidden";
    }
    if (currentIndex > imgUrls.length-1) {
        currentIndex = imgUrls.length - 1;
        btnNext.style.visibility = "hidden";
    }
}

function markSwitcher() {
    switcherEl[currentIndex].classList.add('current_switcher');
}

function clearSwitchers() {
    for (var i = 0; i < switcherEl.length; i++)
    switcherEl[i].classList.remove('current_switcher');
}