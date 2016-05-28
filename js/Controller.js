function gravarAnotacao(){

  anotacao = new Object();
  anotacao.titulo = document.getElementById('titulo').value;
  anotacao.conteudo = document.getElementById('conteudo').value;
  anotacao.imagem = imagemURL;
  anotacao.published = new Date();

  gravarBanco(anotacao);

}

function capturarImagem(){

    navigator.camera.getPicture(capturarSuccess, capturarFail,
        {
            destinationType : Camera.DestinationType.FILE_URI,
            sourceType : Camera.PictureSourceType.CAMERA
        }
    );
}

function capturarSuccess(imageCaminho) {
    imagemURL = imageCaminho;

    img = document.getElementById('img');
    img.innerHTML = '<span>Imagem Capturada:</span><br/><img src="' + imageCaminho + '" />';
}

function capturarFail(message) {
    alert('Erro: ' + message);
}

function visualizarAnotacao(id){
  db.transaction(function(transaction) {
   transaction.executeSql('SELECT * FROM Anotacoes WHERE id = ?', [id],
     mostrarAnotacao ,errorHandler);
 });
}

function mostrarAnotacao(transaction, result) {
  var anotacao = '<strong>ID: </strong>' + result.rows.item(0).id + "<br/>";
  anotacao = anotacao + '<strong>Título: </strong>' + result.rows.item(0).Titulo + "<br/>";
  anotacao = anotacao + '<strong>Conteudo: </strong>' + result.rows.item(0).conteudo + "<br/>";
  anotacao = anotacao + '<strong>Data Criação: </strong>' + result.rows.item(0).published + "<br/>";
  anotacao = anotacao + '<div class="img"><strong>Imagem: </strong><br/><img src="' + result.rows.item(0).imagem + '" /></div>';

  var detalhesAnotacao = document.getElementById("detalhesAnotacao");
  detalhesAnotacao.innerHTML = anotacao;

}

// Ao usar o jQuery Mobile precisamos de um evento especial para executar uma tarefa ao carregar a página, o <strong>pageshow</strong>:
/*
Se existe um parâmetro id, carregamos a função <strong>visualizarAnotacao</strong> que mostra todos detalhes da anotação na página <strong>visualizar.html</strong>, se não tiver id chamamos a função <strong>ListDBValues</strong> para exibir a lista.
*/

$(document).on("pageshow",  function(){
   
        var url = $("#visualizar").attr("data-url-params");

        if (_GET("id", url) != null){

            visualizarAnotacao(_GET("id", url));
        }else{
            ListDBValues();
        }
});