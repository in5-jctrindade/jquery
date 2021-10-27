var frase = $("#frase").text();
var numPalavras  = frase.split(" ").length;
var tamanhoFrase = $("#tamanho-frase");
let timerInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");
tamanhoFrase.text(numPalavras);


let frases  = [
        "Refletir sobre a vida é uma tarefa importante, inclusive, recomendada por muitos especialistas. Afinal, é quando se para para pensar na situação em que se está que acaba-se descobrindo muito sobre si mesmo",
        "Assim, você terá material o suficiente para compartilhar no Whatsapp ou usar como legenda para aquela foto pensativa. Participe dessa corrente de contemplação e positividade!",
        "O que está esperando? Escolha as melhores mensagens e compartilhe por Whatsapp, Facebook, Instagram ou marque no seu status as melhores citações, com certeza muitas delas também lhe servirão como ótimas legendas de fotos. É tudo o que precisa para facilitar ainda mais as suas publicações!",
        "Está procurando mensagens para enviar para os seus contatos no Whatsapp e Facebook? Quando a inspiração falta ou você já enjoou de todos os memes da sua galeira de imagens aqui consta uma seleção completa com as melhores citações",
        "Seja estranho. Seja aleatório. Seja quem você é. Porque você nunca sabe quem amaria a pessoa que você esconde.",
        "Um ato aleatório de bondade, por menor que seja, pode ter um tremendo impacto na vida de outra pessoa."
];

let qtdPalavras;
let qtdCaracteres;

$(()=>{
        inicializaContadores();
        inicializaCronometro();
        reiniciaFormulario();
        comparandoTexto();         

 });

//Inicializa os contadores das palavras
function inicializaContadores(){
    gerarFrase();
    
    campo.on("input", function() {
        var conteudo = campo.val();
        qtdPalavras = conteudo.split(/\S+/).length - 1;
        qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);

    });
}



//Inicializa o cronometro de tempo para o usuario digitar 
function inicializaCronometro(){
    let timer = $("#tempo-digitacao").text();
    campo.one("focus",()=>{
        let idInterval = setInterval(()=>{
            $("#reinicia").attr("disabled",true)
            .css("opacity", "0.6")
            $('#nome').attr("disabled",false);

            timer--;
            $("#tempo-digitacao").text(timer);
                if(timer < 1){
                    campo.attr("disabled", true);
                   
                    campo.css("background-color", "lightgrey");     
                    $("#reinicia").attr("disabled",false)
                    .css("opacity", "1");    
                    clearInterval(idInterval);
                    salvarDados();
                }
        },1000); 
       
         
    });  
}

// Reinicia o formulairo e o timer para uma nova tenttiva 
function reiniciaFormulario(){

    $("#reinicia").click(function(){
        campo.attr("disabled", false);
        campo.css("background-color", "white"); 
        campo.val("");
        $("#tempo-digitacao").text(timerInicial)
        $("#contador-palavras").text("0"); 
        $("#contador-caracteres").text('0');
        $('#nome').val(""),
        inicializaCronometro();
        gerarFrase();
        comparandoTexto();
    });
}

//gera dinamicamente uma frase para se escrita pelo usuario
function gerarFrase(){
    
    $("#frase").text(frases[Math.floor(Math.random() * 5)]);
   
}


//funçao para comparar se o que esta sendo escrito esta certo 
function comparandoTexto(){
    var fraseAtual= $("#frase").text();
    campo.on("input",function(){
    var digitado = campo.val();
    var comparavel = fraseAtual.substr(0, digitado.length);
  
    if(digitado == comparavel){
        campo.css("background", "rgb(125, 214, 125)");    
        $("#contador-palavras").text(qtdPalavras);
        console.log("chegou");
    }else{
       // campo.addClass("borda-erro");
       campo.css("background", "rgb(216, 98, 98)");
        console.log("chegou");

    }});
}

function salvarDados(){
    let nome =  $('#nome').val();
    let qtdPalavras = $("#contador-palavras").text();
    let qtdCaracteres = $("#contador-caracteres").text();
    let corpoTabela = $(".result").find("tbody");
    
    $("#salvar").one("click", function(e){
        e.preventDefault();
          
        let linha = novaLinha(nome,qtdPalavras,qtdCaracteres);    
        linha.find(".botao-remover").click(remove);

        corpoTabela.prepend(linha);
        
    })
    
}


function novaLinha(a,b,c){
    var linha = $("<tr>"); 
    var colunaNome = $("<td>").text(a);  
    var colunaPalavras= $("<td>").text(b); 
    var caracteres = $("<td>").text(c);
    var colunaRemover = $("<td>");

    
    var link = $('<a>').addClass("botao-remover").attr("href","#");
    var icone = $('<i>').addClass('small').addClass("material-icons").addClass("icone").text("delete");

    link.append(icone);
    colunaRemover.append(link);
    linha.append(colunaNome);
    linha.append(colunaPalavras);
    linha.append(caracteres);
    linha.append(colunaRemover);

    return linha;

}

function remove(){
    $(this).parent().parent().remove();
    console.log("entrou aqui");
};


