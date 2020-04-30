// Main Game Play
let kartElements = document.getElementsByClassName('game-card');
let kartElementsArray = [...kartElements];
let imgElements = document.getElementsByClassName('game-card-img');
let imgElementsArray = [...imgElements];
let yildizElements = document.getElementsByClassName('yildiz');
let yildizElementsArray = [...yildizElements];
let counter = document.getElementById('hamleSayac');
let timer = document.getElementById('timer');
let modelElement = document.getElementById('oyunBittiModel');
let toplamOyunHamleElement = document.getElementById('toplamOyunHamle');
let toplamOyunZamaniElement = document.getElementById('toplamOyunZamani');
let sonYildizDereceElement = document.getElementById('sonYildizDerece');
let kapanisModelIcon = document.getElementById('kapanisModel');
let kartAcilis = [];
let eslesenKart =  [];
let hamleler;
let saniye = 0,
    dakika = 0,
    saat = 0,
    interval,
    toplamOyunZamani,
    yildizDerece;

function karistir(array) {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex;

    while (currentIndex !==0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
function oyunBaslat() {
  
    let karistirmaImages = karistir(imgElementsArray);

    for(i=0; i<karistirmaImages.length; i++) {
        
        kartElements[i].innerHTML = "";

        kartElements[i].appendChild(karistirmaImages[i]);
        kartElements[i].type = `${karistirmaImages[i].alt}`;

        kartElements[i].classList.remove("show", "open", "eslesme", "disabled");
        kartElements[i].children[0].classList.remove("show-img");
    }

    
    for(let i = 0; i < kartElementsArray.length; i++) {
        kartElementsArray[i].addEventListener("click", displayCard)
    }

    
    flashCards();
    hamleler = 0;
    counter.innerText = `${hamleler} hamle(s)`;
    for(let i=0; i<yildizElementsArray.length; i++) {
        yildizElementsArray[i].style.opacity = 1;
    }
    timer.innerHTML = '0 dk 0 sn';
    clearInterval(interval);
}
function flashCards() {
    for(i=0; i<kartElements.length; i++) {
        kartElements[i].children[0].classList.add("show-img")
    }
    setTimeout(function(){
        for(i=0; i<kartElements.length; i++) {
            kartElements[i].children[0].classList.remove("show-img")
        }
    }, 1000)
}
function displayCard() {
    this.children[0].classList.toggle('show-img');
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
    kartAc(this);
}

function kartAc(card) {
    kartAcilis.push(card);
    let len = kartAcilis.length;
    if(len === 2) {
        hamleSayac();
        if(kartAcilis[0].type === kartAcilis[1].type) {
            eslesen();
        } else {
            eslesmeyen();
        }
    }
}

function eslesen() {
    kartAcilis[0].classList.add("eslesme");
    kartAcilis[1].classList.add("eslesme");
    kartAcilis[0].classList.remove("show", "open");
    kartAcilis[1].classList.remove("show", "open");
    eslesenKart.push(kartAcilis[0]);
    eslesenKart.push(kartAcilis[1]);
    kartAcilis = [];
    if(eslesenKart.length == 16) {
        oyunSonu();
    }
}

function eslesmeyen() {
    kartAcilis[0].classList.add("eslesmeyen");
    kartAcilis[1].classList.add("eslesmeyen");
    disable();
    setTimeout(function() {
        kartAcilis[0].classList.remove("show", "open", "eslesmeyen");
        kartAcilis[1].classList.remove("show", "open", "eslesmeyen");
        kartAcilis[0].children[0].classList.remove('show-img');
        kartAcilis[1].children[0].classList.remove('show-img');
        enable();
        kartAcilis = [];
        
    }, 1100)
}

function disable() {
    kartElementsArray.filter((card, i, kartElementsArray) => {
        card.classList.add('disabled');
    })
}

function enable() {
    kartElementsArray.filter((card, i, kartElementsArray) => {
        card.classList.remove('disabled');
        for(let i=0; i<eslesenKart.length; i++) {
            eslesenKart[i].classList.add('disabled');
        }
    })
}

function hamleSayac() {
    hamleler++;
    counter.innerHTML = `${hamleler} hamle(s)`;

    if(hamleler == 1) {
        saniye = 0;
        dakika = 0;
        saat = 0;
        startTimer();
    }

    
    if(hamleler > 8 && hamleler <= 12) {
        for(let i=0; i<5; i++) {
            yildizElementsArray[i].opacity = 1; 
        }
    } else if(hamleler > 12 && hamleler <= 16) {
        for(let i=0; i<5; i++) {
            if(i > 3) {
                yildizElementsArray[i].style.opacity = 0.1;
            }
        }
    } else if(hamleler > 16 && hamleler <= 20) {
        for(let i=0; i<5; i++) {
            if(i > 2) {
                yildizElementsArray[i].style.opacity = 0.1;
            }
        }
    } else if(hamleler > 20 && hamleler <= 24) {
        for(let i=0; i<5; i++) {
            if(i > 1) {
                yildizElementsArray[i].style.opacity = 0.1;
            }
        }
    } else if(hamleler > 24){
        for(let i=0; i<5; i++) {
            if(i > 0) {
                yildizElementsArray[i].style.opacity = 0.1;
            }
        }
    }
}

function startTimer() {
    interval = setInterval(function(){
        timer.innerHTML = `${dakika} dk ${saniye} sn`;
        saniye++;
        if(saniye == 60) {
            dakika++;
            saniye = 0;
        }
        if(dakika == 60) {
            saat++;
            dakika = 0;
        }
    }, 1000)
}

function oyunSonu() {
    clearInterval(interval);
    toplamOyunZamani = timer.innerHTML;
    yildizDerece = document.querySelector('.rating').innerHTML;
    modelElement.classList.add("show-modal");
    
    
    toplamOyunZamaniElement.innerHTML = toplamOyunZamani;
    toplamOyunHamleElement.innerHTML = hamleler;
    sonYildizDereceElement.innerHTML = yildizDerece;

    eslesenKart = [];
    kapanisModel();
}

function kapanisModel() {
    kapanisModelIcon.addEventListener("click", function() {
        modelElement.classList.remove("show-modal");
        oyunBaslat();
    })
}

function tekrarOyna() {
    modelElement.classList.remove("show-modal");
    oyunBaslat();
}


window.onload = function () {
    setTimeout(function() {
        oyunBaslat()
    }, 1200);
}