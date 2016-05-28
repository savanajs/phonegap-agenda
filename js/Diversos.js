document.addEventListener("deviceready", CreateShortcut, false);

var imagemURL;

function VoltarIndex(){
    location.href="index.html";
}

function _GET(nome, urlEntrada){
    if (urlEntrada != null) {
      // urlEntrada = urlEntrada.slice(35);
      // alert(urlEntrada)
      var url   = urlEntrada.replace("?", "&");
      var itens = url.split("&");

      for(n in itens){
          if( itens[n].match(nome) ){
              return decodeURIComponent(itens[n].replace(nome+"=", ""));
          }
      }
      return null;
    }
}

function CreateShortcut() { 
    if(!window.localStorage.getItem("agphone")){
         window.plugins.Shortcut.CreateShortcut("Phone-gap", successfunc, failfunc ); 
    }else{
        alert("O atalho ja foi criado na Homescreen!");
    }
}

function successfunc(r){
    alert(r + ", atalho criado na Homescreen!");
    window.localStorage.setItem("agphone", true);
}

function failfunc(e){
     alert(e)
}

$(document).ready(function(){
    $("body").on("click","a.page_params", function(e){
        var $this = $(this);
        var id = $this.attr("href");
        var params = $this.attr("data-params");
        $(id).attr("data-url-params", id+"?"+params);
    });
});