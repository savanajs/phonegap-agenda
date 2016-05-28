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

$(document).ready(function(){
    $("body").on("click","a.page_params", function(e){
        var $this = $(this);
        var id = $this.attr("href");
        var params = $this.attr("data-params");
        $(id).attr("data-url-params", id+"?"+params);
    });
});