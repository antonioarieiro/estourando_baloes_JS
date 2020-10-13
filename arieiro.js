// ANTONIO ARIEIRO 



var IdTempo = null; //Variavel que vai armazenar a chamada da função TIME OUT



function iniciaJogo(){
	
	var url = window.location.search;

	var nivel_jogo = url.replace("?", "");

	var TempoSegundos = 0;


	// FACIL -> 120 SEGUNDOS
	// NORMAL -> 60 SEGUNDOS
	// DIFICIL -> 30 SEGUNDOS


	if(nivel_jogo == 1){
		TempoSegundos =30;

	}
	 if(nivel_jogo == 2){
		TempoSegundos = 20;
	}if(nivel_jogo == 3){
		TempoSegundos = 15;
	}
	


	//INSERINDO OS SEGUNDOS NO CRONOMETRO DO INICIO
	document.getElementById('tempo-cronometro').innerHTML = TempoSegundos;


    //
    // QUANTIDADE DE BALÕES
    var qtde_baloes = 30;

    CriaBaloes(qtde_baloes);

   //MOSTRAR A QUANTIDADE DE BALÕES INTEIROS
   document.getElementById('baloes-inteiros').innerHTML = qtde_baloes;
   //MOSTRAR A QUANTIDADE DE BALÕES ESTOURADOS
   document.getElementById('baloes-estourados').innerHTML = 0;

   ContagemTempo(TempoSegundos + 1)


}

function ContagemTempo(segundos){
    //DECREMENTANDO A CONTAGEM
	segundos = segundos - 1;
    // PARA QUE O NOSSO CRONOMETRO NÃO ATINJA UMA CONTAGEM NEGATIVA USAREMOS UMA ESTRUTURA CONDICIONAL PARA PARALO QUANDO CHEGAR A 0
	if(segundos == -1){
		//a função 'clearTimeout()' é usada para parar a função 'setTimeout'
		 clearTimeout(IdTempo);//PARANDO A EXECUÇÃO DO setTimeout
         //USAREMOS A CONDIÇÃO EM -1 PARA FACILITAR NOSSO CODIGO , AFINAL SE O USUARIO CHEGAR -1 LOGO ELE PERDEU O JOGO
		 FimDeJogo();//FUNÇÃO QUE ENCERRA O JOGO
		 window.location.href = 'index.html';
		 return false;
		 

	}
	//RECUPERANDO O VALOR DO CRONOMETRO E ATRIBUINDO A ELA O PARAMETRO DA FUNÇÃO SEGUNDOS
	document.getElementById('tempo-cronometro').innerHTML = segundos;
    //CONTAGEM EM MILISEGUNDOS '1000' MILISEGUNDOS = 1 S
	IdTempo=setTimeout("ContagemTempo("+segundos+")",1000)



}
//CRIAR A FUNÇÃO QUE AVISARA AO USUARIO QUANDO PERDER
function FimDeJogo(){
	alert('DERROTA : VOCÊ NÃO CONSEGUIU ESTOURAR TODOS OS BALÕES A TEMPO');
}


function CriaBaloes(qtde_baloes){
	for ( var i = 1; i<= qtde_baloes; i++ ){
         //APARTIR DA FUNCAO DOM CREATE ELEMENT VOCE PODE CRIAR ELEMENTOS DENTRO DE UMA PAGINA HTML . NO NOSSO CASO CRIAREMOS BALÕES
		var balao = document.createElement("img");
		balao.src = 'imagens/balao_azul_pequeno.png';

		balao.style.margin = "10px";
		balao.style.padding = "20px";

		balao.id = 'b'+i;
        
        //CRIAREMOS UMA FUNÇÃO PARA QUANDO CLICARMOS NO BALAO ELE ESTOURAR
		balao.onclick = function(){ Estourar(this); }//O COMANDO''this'' QUER DIZER A FUNÇÃO QUE VAI USAR CADA UM DOS ELEMENTOS

          //USAREMOS A FUNÇÃO appendChild para criar os balões no cenario  E DAREMOS A ELA A NOSSA VARIAVEL 'BALAO' QUE FOI DEFINIDA COM A IMAGEM LOGO ACIMA
          // AO DISER A ELA QUE ELE RECEBERA A VARIAVEL 'BALAO' QUER DIZER QUE ELA CRIAR O CONTEUDO DA VARIAVEL 'BALAO' EM NOSSO CASO A IMG DO BALAO
		document.getElementById('cenario').appendChild(balao);
	}
}

function Estourar(e){

	var IdBalao = e.id;

	document.getElementById(IdBalao).setAttribute("onclick","")

	document.getElementById(IdBalao).src = 'imagens/balao_azul_pequeno_estourado.png';

	Pontuacao(-1);

}

function Pontuacao(acao){
    //
	var baloes_inteiros = document.getElementById('baloes-inteiros').innerHTML;
	var baloes_estourados = document.getElementById('baloes-estourados').innerHTML;

	//FORÇANDO O VALOR DOS BALOES A SEMPRE SEREM VALORES INTEIROS
 
   baloes_inteiros = parseInt(baloes_inteiros);
   baloes_estourados = parseInt(baloes_estourados);

   baloes_inteiros = baloes_inteiros + acao;
   baloes_estourados = baloes_estourados - acao;

   //ALTERAR A PONTUACAO


	document.getElementById('baloes-inteiros').innerHTML =baloes_inteiros;
	document.getElementById('baloes-estourados').innerHTML = baloes_estourados;

	SituacaoJogo(baloes_inteiros, baloes_estourados);
}
function SituacaoJogo(baloes_inteiros){

	if(baloes_inteiros == 0 ){
		alert('PARABENS VOCÊ CONSEGUIU ESTOURAR TODOS OS BALOES EM ');
		PararJogo();
		window.location.href = 'index.html';
	}
}

function PararJogo(){
	clearTimeout(IdTempo);
}
