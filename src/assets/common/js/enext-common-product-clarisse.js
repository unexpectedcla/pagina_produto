const lupa = document.querySelector("#lupa");
const busca = document.querySelector(".search");
const menuMobile =  document.querySelector(".menu_mobile");
const menuConteudo = document.querySelector(".header_menu nav ul");
const tamanhos = document.querySelector("#tamanho");
const botaoAdicionar = document.querySelector("#adicionar");
const botaoCadastrar = document.querySelector("#cadastrar");
const seletorqtd = document.querySelector(".quantitySelector input");
var preco = document.querySelector("#produto_valor");
const cep = document.querySelector("#cep");
const slidesContainer = document.querySelector(".shelfClarisse ul");
const slide = document.querySelector(".relacionado_card");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");
const botaoCalcular = document.querySelector("#calcular");
const itensCart = document.querySelector("#cartCount");
const divFrete = document.querySelector("#valorFrete");



//Menu Responsivo

window.onload = function(){
    menuMobile.addEventListener("click", function(){
        if(menuConteudo.style.display == "flex") {
            menuConteudo.style.display = "none";
        } else {
            menuConteudo.style.display = "flex";
        }
    });
};


//Menu Busca

lupa.addEventListener("click", mostrarBusca);
    
function mostrarBusca(){
    if(busca.style.display == "block") {
        busca.style.display = "none";
    } else {
        busca.style.display = "block";
        event.preventDefault()
    }
};



const dadosProduto = skuJson
const dadosSKUs = dadosProduto.skus; 

//Seletor de Tamanhos
var lista = "";


for(let i = 0; i < dadosSKUs.length; i = i + 1 ) {
    lista += '<option value="' +  i + '">' + dadosSKUs[i].skuname + '</option>';
}



tamanhos.innerHTML = lista;

//Mostrar preço de acordo com SKU


if (dadosSKUs[tamanhos.value].installments > 0){
    preco.innerHTML = dadosSKUs[0].bestPriceFormated + '<br /> <span> ou até <strong>' + dadosSKUs[0].installments + 'x </strong> de <strong>' + 'R$ ' + (dadosSKUs[0].installmentsValue / 100).toFixed(2).replace(".", ",") + '</strong> sem juros</span>';
} else {
    preco.innerHTML = dadosSKUs[0].bestPriceFormated + "<span>à vista</span>";
}


tamanhos.onchange = function() {
    var parcela = 'R$ ' + (dadosSKUs[tamanhos.value].installmentsValue / 100).toFixed(2).replace(".", ",");

    var parcelamento = '<br /> <span> ou até <strong>' + dadosSKUs[tamanhos.value].installments + 'x </strong> de <strong>' + parcela + '</strong> sem juros</span>';

    if (dadosSKUs[tamanhos.value].installments > 0){
        preco.innerHTML = dadosSKUs[tamanhos.value].bestPriceFormated + parcelamento
    } else {
        preco.innerHTML = dadosSKUs[tamanhos.value].bestPriceFormated + "<span>à vista</span>"
    }
}



//Adicionar ao carrinho

var quantidade = seletorqtd.value;
 seletorqtd.onchange = function(){
    quantidade = seletorqtd.value;
 }



  botaoAdicionar.addEventListener("click", ()=>{adicionarItem(dadosSKUs[tamanhos.value].sku, quantidade)});

  function adicionarItem(id, quantity, seller="1"){
   vtexjs.checkout.getOrderForm()
   .done(function (){
    vtexjs.checkout.addToCart([{
        id,
        quantity,
        seller,
      }], null, 1)
        .done(function(orderForm) {
          alert('Item adicionado!');
          console.log(orderForm);
          console.log(quantidade);
          itensCart.innerHTML = orderForm.items.length;
        });
   });
  
}


//Mensagens dos botões

botaoAdicionar.addEventListener("click", adicionou);
botaoCadastrar.addEventListener("click", cadastrar);

function adicionou() {
    alert("Seu produto foi adicionado ao carrinho.");
}

function cadastrar() {
    alert ("Seu e-mail foi cadastrado");
    document.querySelector("#email").value = "";
}

//Carrossel
nextButton.addEventListener("click", (event) => {
    const slideWidth = slide.clientWidth;
      slidesContainer.scrollLeft += slideWidth + 10;
  });
  
  prevButton.addEventListener("click", () => {
    const slideWidth = slide.clientWidth;
    slidesContainer.scrollLeft -= slideWidth + 10;
  });


  //Campo CEP
  cep.addEventListener('keydown', mascara);


function mascara() {
    cep.value=mCEP(cep.value)
}

function mCEP(cep){
    cep=cep.replace(/\D/g,"")
    cep=cep.replace(/^(\d{5})(\d)/,"$1-$2")
    return cep
}

 //Calcular frete
 botaoCalcular.addEventListener("click", calcularFrete)
 
    function calcularFrete() {
    vtexjs.checkout.getOrderForm()
    .then(function(orderForm) {
        var postalCode = cep.value;  // também pode ser sem o hífen
        var country = 'BRA';
        var address = {
        "postalCode": postalCode,
        "country": country
        };
        return vtexjs.checkout.calculateShipping(address)
    })
    .done(function(orderForm) {
        alert('Frete calculado.');
        console.log(orderForm.shippingData);
        console.log(orderForm.totalizers);
        console.log(orderForm.totalizers[1].value);
        const freteSimples = orderForm.totalizers[1].value;
        const freteFormatado = 'R$ ' + (freteSimples / 100).toFixed(2).replace(".", ",");
        divFrete.innerHTML = '<p>Frete para a sua regiâo: <span><strong>' + freteFormatado + '</span></strong></p>'
        
    });
    }
    