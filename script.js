/* Elemento HTML referente a categoria */
const categoria = document.querySelector("#category");
/* Elemento HTML referente a lista das letras erradas*/
const letrasErradas = document.querySelector(".wrongLetters");
/* Elemento HTML referente a palavra oculta
   Serve para exibir as mensagens do jogo*/
const palavraInterface = document.querySelector(".dashes");
/* Array com elementos HTML referentes aos olhos do personagem */
const olhos = Array.from(document.querySelectorAll(".eyes"));
/* Array com elementos HTML referentes as partes do corpo */
let partesBoneco = Array.from(document.querySelectorAll("#person div"));
partesBoneco = partesBoneco.slice(2, partesBoneco.length);
/* Palavra corrente */
let palavraProposta;
/* Lista das letras erradas */
let letrasErradasArray = [];
/* Index da parte do corpo corrente */
let indiceBoneco;
/* Numero de chances do jogador */
const numTentativas = 7;
/* Valor para opacidade dos olhos */
const opacidadeOlhos = 0.3;

const categorias = {
    frutas: [
        "abacaxi", "abacate", "amora", "banana", "bacuri", "buriti", "caju"
        , "carambola", "cacau", "damasco", "duriao", "embauba", "figo", "framboesa"
        , "goiaba", "graviola", "groselha", "heisteria", "inga", "jambo", "jabuticaba"
        , "kiwi", "laranja", "limao", "lichia", "mamao", "melancia", "marmelo"
        , "nectarina", "nespera", "pera", "pessego", "physalis", "quina", "roma"
        , "seriguela", "sapoti", "tamara", "tamarindo", "tangerina", "umbu", "uva"
        , "veludo", "wampee", "xixa", "yamamomo", "zimbro"],
    profissoes: [
        "agronomo","biotecnico","ecologista","gestor","geologo","oceanografo","medico"
        ,"veterinario","meteorologista","zootecnista","bioquimico","biofisico","biomedico","cientista"
        ,"instrutor","professor","enfermeiro","esteticista","farmaceutico","fisioterapeuta","fonoaudiologo"
        ,"gerontologista","musico","nutricionista","obstreta","odontologista","quiropraxista","radiologista"
        ,"terapeuta","analista","astronomo","programador","estatistico","fisico","geofisico","matematico"
        ,"meteorologista","oceanografo","quimico","engenheiro","antropologo","arqueologo","filosofo"
        ,"geografo","historiador","psicologo","sociologo","teologo","administrador","arquivologista"
        ,"arquiteto","bibliotecario","contador","advogado","delegado","economista","comunicador"
        ,"apresentador","jornalista","pedagogo","produtor","publicitario","secretario","artista"
        ,"cineasta","dancarino","designer","fotografo","linguista","escritor","musico","ator","interprete"],
    cores: [
        "amarelo","ambar","ametista","anil","azul","bege","bordo","branco","bronze","caqui"
        ,"caramelo","carmesim","carmim","castanho","ciano","cinza","cobre","creme","dourado","escarlate"
        ,"esmeralda","ferrugem","fucsia","gelo","grena","gris","indigo","jade","jambo","laranja","lavanda"
        ,"lilas","loiro","magenta","malva","marfim","marrom","mostarda","negro","ocre","oliva","prata"
        ,"preto","purpura","rosa","roxo","rubro","salmao","sepia","terracota","turquesa","uva","verde"
        ,"vermelho","vinho","violeta"],
    animais: [
        "abelha","andorinha","babuino","baleia","cachorro","camaleao","dragao de komodo"
        ,"dromedario","ema","elefante","foca","flamingo","golfinho","guaxinim","hipopotamo","hiena"
        ,"iguana","impala","jaguar","jacare","kakapo","kiwi","leao","lagarto","macaco","musaranho","naja"
        ,"narval","ovelha","orangotango","papagaio","perdiz","quati","queixada","raposa","rato","sardinha"
        ,"sagui","tartaruga","tamandua bandeira","urso polar","urubu","veado","vaca","wallaby","xexeu"
        ,"xareu","yak","zebra","zebu"]
};

function arrayCategorias(){
    return Object.keys(categorias);
}

/*
Gera um indice aleatorio para sortear a categoria e a palavra
*/
function geradorIndice(quantidade){
    return Math.floor(Math.random() * quantidade);
}

/*
Sorteia a categoria da palavra para o jogo
*/
function retornaCategoria(){
    const categoriaArray = arrayCategorias();
    let indiceCategoria = geradorIndice(categoriaArray.length);
    return categoriaArray[indiceCategoria];
}

/*
Exibe a categoria da palavra sorteada
*/
function exibeCategoria(){
    categoria.innerHTML = retornaCategoria();
}

/*
Sorteia a palavra do array de categoria
*/
function escolhePalavra(){
    const palavrasArray = categorias[categoria.innerHTML];
    let indicePalavra = geradorIndice(palavrasArray.length);
    palavraProposta = palavrasArray[indicePalavra];
    ocultaPalavra();
}

/*
Responsavel para exibir a palavra no jogo
*/
function exibePalavra(palavra){
    palavraInterface.innerHTML = palavra;
}

/*
Transforma a palavra sorteada em espaços com "-"
*/
function ocultaPalavra(){
    let palavraOcultada = "";
    for(let i = 0; i < palavraProposta.length; i++){
        palavraOcultada += "-";
    }
    exibePalavra(palavraOcultada);
}

/*
Atualiza a palavra que será exibida por rodada
*/
function atualizaPalavra(letra){
    let palavraAux = "";
    for(let i = 0; i < palavraProposta.length; i++){
        if(palavraProposta[i] === letra){
            palavraAux += letra;
        }else if(palavraInterface.innerHTML[i] != "-"){
            palavraAux += palavraInterface.innerHTML[i];
        }else{
            palavraAux += "-";
        }   
    }
    exibePalavra(palavraAux);
}

/*
Verifica se a letra está na palavra ou não
*/
function tentativa(letra){
    if(palavraProposta.includes(letra)){
        atualizaPalavra(letra)
    }else{
        letrasErradasArray.push(letra);
        letrasErradas.innerHTML = "Letras erradas: " + letrasErradasArray;
        if(partesBoneco.length > indiceBoneco){
            desenhaBoneco();
        }
    }
    verificaFim();
}

/*
Verifica o fim do jogo a cada letra digitada
*/
function verificaFim(){
    if(!palavraInterface.innerHTML.includes("-")){
        exibePalavra("Você venceu!!!")
        window.removeEventListener("keypress", retornaLetra);
    }else if (letrasErradasArray.length >= numTentativas){
        desenhaOlhos();
        exibePalavra("Você perdeu :(");
        window.removeEventListener("keypress", retornaLetra);
    }
}

/*
Recebe o evento do teclado e passa apenas o valor da letra para a função tentativa
*/
function retornaLetra(e){ 
    tentativa(e.key);
}

/*
Desenha a parte do corpo corrente
*/
function desenhaBoneco(){
    partesBoneco[indiceBoneco].classList.remove("hide");
    indiceBoneco++; 
}

/* 
Desenha os olhos do personagem
*/
function desenhaOlhos(){
    olhos.forEach((olho => {
        olho.style.opacity = 1;
        olho.style.zIndex = 10;
    }));
}

/*
Oculta as partes do corpo do personagem
*/
function ocultaBoneco(){
    olhos.forEach((olho => {
        olho.style.opacity = opacidadeOlhos; 
    }));
    partesBoneco.forEach(parteBoneco => {
        parteBoneco.classList.add("hide");
    });
}

/*
Inicia as configurações do jogo
*/
function iniciaJogo(){
    ocultaBoneco();
    exibeCategoria();
    escolhePalavra();
    indiceBoneco = 0;
    letrasErradasArray = [];
    letrasErradas.innerHTML = "Letras erradas: ";
    window.addEventListener("keypress", retornaLetra);
}

window.addEventListener("load", iniciaJogo);
