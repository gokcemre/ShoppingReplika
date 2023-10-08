// ! İstek atılacak değişkeni oluşturalım
let url = "https://fakestoreapi.com/products";

document.addEventListener("DOMContentLoaded", function(){
    fetch(url)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
        data.forEach(function(resim){
            // console.log(resim)
            ekranaYazdir(resim)
        })
    })
})


// ! Apiden gelen verileri ekrana yazdırmak için
const row = document.querySelector(".row");
function ekranaYazdir(resim){
    row.innerHTML += `
    <div class="col-4 mb-4">
    <div class="card boyut">
        <img width="400px" height="400px"  src="${resim.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${resim.title}</h5>
          <h5 class="card-price">${resim.price}$</h5>
          <a href="#" class="add-to-cart btn btn-danger pozisyon">Sepete Ekle</a>
        </div>
      </div>
    </div>
    `
}


// ! Ürünler İçerisinde Arama Algoritması
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");

searchBtn.addEventListener("click", aramaYap);

function aramaYap(){
    let searchText = searchInput.value.toLowerCase().trim();
    console.log(searchText)
    searchInput.value = "";

    let cards = document.querySelectorAll(".col-4");
    // console.log(cards)

    cards.forEach(function(card){
        let title = card.querySelector(".card-title");
        if(title.innerHTML.toLowerCase().trim().includes(searchText)){
            card.style.display = "block";
        }else{
            card.style.display = "none";
        }
    })
}

// ! Sepete Ekle Butonun Basıldığında Değeri artırmak
row.addEventListener("click", ekle)

function ekle(e){
    console.log(e.target)
    if(e.target.classList.contains("add-to-cart")){
        const parentDiv = e.target.parentElement.parentElement
        console.log(parentDiv)
        const littleBox = document.querySelector(".little-box");
        littleBox.innerHTML++;
        sepeteEkle(parentDiv)
    }
}

// ! Sepet İçerisindeki İşlemler İçin

function sepeteEkle(parentDiv){
    const li = document.querySelector(".modal-li");
    const price = parentDiv.children[1].children[1].innerHTML;
    const title = parentDiv.children[1].children[0].innerHTML;
    const image = parentDiv.children[0].src;

    const urunBilgisi = document.createElement("div");
    urunBilgisi.classList.add("ürün-bilgisi", "d-flex", "justify-content-around", "align-items-center")

    urunBilgisi.innerHTML = `
        <div class="fotograf">
            <img width="200px" height="200px" id="ürün-img" src="${image}" alt="">
        </div>
        <div class="baslik">${title}</div>
        <div class="butonlar">
            <button id="azalt" class="btn btn-danger">-</button> 
            <span class="adet">1</span>
            <button id="arttir" class="btn btn-success">+</button>
        </div>
        <div class="fiyat">${price}</div>
        <div class="toplamFiyat">${price}</div>
        <button class="btn btn-danger rounded-circle">
        <i class="btn-close fa-solid fa-xmark"></i>
        </button>
    `
    li.appendChild(urunBilgisi)

    // ! Arttır butonuna bastığım zaman ürün sayını artırmak için;

    const arttir = urunBilgisi.querySelector("#arttir")
    const azalt = urunBilgisi.querySelector("#azalt")
    const adet = urunBilgisi.querySelector(".adet");
    const toplamFiyat = urunBilgisi.querySelector(".toplamFiyat");

    arttir.addEventListener("click",function(){
        adet.innerHTML++;
        toplamFiyat.innerHTML = (parseFloat(price) * parseFloat(adet.innerHTML)).toFixed(2) + "$"
    })

    azalt.addEventListener("click", function(){
        if(adet.innerHTML != 1){
            adet.innerHTML--;
            toplamFiyat.innerHTML = (parseFloat(price) * parseFloat(adet.innerHTML)).toFixed(2) + "$"
        }
    })
}

// ! Ekrandan Sipariş Silmek İçin;
document.addEventListener("click",function(e){
    if(e.target.classList.contains("btn-close")){
        const productElement = e.target.parentElement.parentElement;
        console.log(productElement)
        productElement.remove()

        // ! Çarpı butonuna tıkladığımda sepetteki sayıyı da azaltsın.
        const littleBox = document.querySelector(".little-box");
        if(littleBox.innerHTML != 0){
            littleBox.innerHTML--;
        }
    }
})

