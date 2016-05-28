var db;
var shortName = 'Diario';
var version = '1.0';
var displayName = 'Diario';
var maxSize = 65535;


function iniciarBanco(){

 if (!window.openDatabase) {
   alert('Navegador não suporte SQLite.');
   return;
 }

 db = openDatabase(shortName, version, displayName,maxSize);

 db.transaction(function(tx){
   tx.executeSql( 'CREATE TABLE IF NOT EXISTS Anotacoes(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, Titulo TEXT NOT NULL, conteudo TEXT NOT NULL, imagem TEXT, published DATE)',
   [],function(){},errorHandler);
          },errorHandler,function(){});

}

function gravarBanco(anotacao) {

  iniciarBanco();

  db.transaction(function(transaction) {
   transaction.executeSql('INSERT INTO Anotacoes(Titulo, conteudo, imagem, published) VALUES (?,?,?,?)',
    [anotacao.titulo, anotacao.conteudo, anotacao.imagem, anotacao.published], function(){}, errorHandler);
   },errorHandler,successCallBack);

}

function successCallBack(){
  alert("Operação realizada com sucesso");
    VoltarIndex();
}

function errorHandler(error){
  alert('Código do erro: ' + error.code);
}

function ListDBValues() {

  iniciarBanco();

  db.transaction(function(transaction) {
    transaction.executeSql('SELECT * FROM Anotacoes;', [],
      mostrarRegistros ,errorHandler);
  });

   return;

}

function mostrarRegistros(transaction, result){

  var listaAnotacoes = document.getElementById("listaAnotacoes");
  var lista = '';

  if (result != null && result.rows != null) {

    for (var i = 0; i < result.rows.length; i++) {
      var row = result.rows.item(i);
       lista = lista + '<li class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-c">';
       lista = lista + '<div class="ui-btn-inner ui-li"><div class="ui-btn-text">';
       lista = lista + '<a class="ui-link-inherit page_params" data-params="id=' + row.id + '" href="#visualizar">';
       lista = lista + '<img src="' + row.imagem + '" class="ui-li-thumb" />';
       lista = lista + '<h3 class="ui-li-heading">' + row.Titulo + '</h3>';
       lista = lista + '<p class="ui-li-desc">' + row.published + '</p>';
       lista = lista + '</a></div></div></li>';
    }

    if(lista)
       listaAnotacoes.innerHTML = lista;

  }

}

/*
Banco: Diário
Tabela: Anotacao
Campo: id inteiro, chave primária, auto incremento;
Campo: Titulo, texto, não nulo;
Campo: conteudo, texto, não nulo;
Campo: imagem, texto;
Campo: published, data.
*/