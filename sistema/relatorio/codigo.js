var banco; //global
var numeroEscola;


function criarAbrirBanco() {
	banco = openDatabase('ProClin','1.0','Sistema de Proteses Dentarias', 2 * 1024 * 1024);

	montaComboEscola();
	montaComboTurma();

	
		
}


function criarAbrirBanco2() {
	banco = openDatabase('ProClin','1.0','Sistema de Proteses Dentarias', 2 * 1024 * 1024);

	
		
}



function ExecutaPesquisarART() {
	PesquisarART();
}

function ExecutaPesquisarPorEscola() {
	PesquisarPorEscola();
}

function ExecutaPesquisarPorTurma() {
	//PesquisarART();
	PesquisarPorTurma();
}

function ExecutaPesquisarPorAluno() {
	PesquisarPorAlunos();
}


function PesquisarART() {
	banco.transaction(function (tx) {
		tx.executeSql(' '+
					  ' select ALUNOS,                                                           '+
                      ' (select count(LANC.rowid) from TLancamento LANC join TAluno ALU on (ALU.IdAluno = LANC.IdAluno) WHERE LANC.IdProcedimento1 = 9 and ALU.Turma = T.IdTurma) as qtdeProcedimentoArtExecutado,  ' +
					  
					 
					  '		   E.Descricao || " / " || E.Ano as NomeEscola,                             '+
					//  '        count(L.rowid) as qtdeProcedimentoArtExecutado,                   '+
					  ' 	   T.Descricao || " / " || T.Ano  as NomeTurma,                                      '+
					  ' 	   sum(cpo) as somaCOP, sum(art0) as numeroNecessarioARTCOP,         '+
					  '        sum(ceo) as somaCEO, sum(art1) as numeroNecessarioARTCEO          '+
					  '   from TAluno as A left join TTurma      T on (A.Turma    = T.IdTurma)   '+
					//  ' 		           left join TLancamento L on (A.IdAluno  = L.IdAluno)   '+
					  ' 		           left join TEscola     E on (E.IdEscola = T.IdEscola)  '+
					  
					  //'  where L.IdProcedimento1 = 9                                             '+
					  ' group by Turma 						                                     '+
		'',
		[],
		function (tx, results) {
			var tamanho = results.rows.length;
			var listaRelatorio = document.getElementById('listaRelatorio');
			
			listaRelatorio.innerHTML = "---";
			
			var i;
			var item = null;
			
				
			var cabecalho = "";
			var linhas = "";
			var rodape = "";
			
			cabecalho = ' <h5 class="center-align"> Relatorios de Necessidade de ART | ART Realizados | Divididos por Turmas </h5>' +
						' <table class="bordered striped highlight">' +
			            ' <tr>                                      ' + 
						'	<th class="">Escola/Ano</th>                ' +
						'	<th class="">Turma/Ano</th>                 ' +
						'	<th class="">CPO</th>                   ' +
						'	<th class="">CPO Necessario</th>        ' +
						'	<th class="">CEO</th>                   ' +
						'	<th class="">CEO Necessario</th>        ' +
						'	<th class="">Total ART Realizados</th>  ' +
						' </tr>                                     ';
			rodape = '</table>';
			
						
			for(i=0; i < tamanho; i++) {
				item = results.rows.item(i);
				
				
				
				
				linhas = linhas + '<tr>' +
							  '<td class="">' + item['NomeEscola']                   +' </td>    ' +
							  '<td class="">' + item['NomeTurma']                    +' </td>    ' +
							  '<td class="">' + item['somaCOP']                      +' </td>    ' +
							  '<td class="">' + item['numeroNecessarioARTCOP']       +' </td>    ' +
							  '<td class="">' + item['somaCEO']                      +' </td>    ' +
							  '<td class="">' + item['numeroNecessarioARTCEO']       +' </td>    ' +
							  '<td class="">' + item['qtdeProcedimentoArtExecutado'] +' </td>    ' +
							  '</tr>                                                  ';
				
			}
			
			listaRelatorio.innerHTML += cabecalho + linhas + rodape; 
			
			},	
		seDerErro);
	});
}

function PesquisarPorTurma() {
	banco.transaction(function (tx) {
		tx.executeSql(  ' Select T.Descricao || "/" || T.Ano as Turma, E.Descricao || "/" || E.Ano as Escola, P.Descricao Procedimento, Count(IdProcedimento1) as QTDE      '+
						' From TLancamento L left join TProcedimento P on (P.IdProcedimento = L.IdProcedimento1)  '+
						 					'left join TAluno        A on (A.IdAluno        = L.IdAluno)          '+
						 					'left join TTurma        T on (T.IdTurma        = A.Turma)	          '+
											'left join TEscola       E on (E.IdEscola       = T.IdEscola)         '+  
						'                                                                                         '+
						' group by T.IdTurma, L.IdProcedimento1   order by T.IdEscola                                                '+
		'',
		[],
		function (tx, results) {
			var tamanho = results.rows.length;
			var listaRelatorio2 = document.getElementById('listaRelatorio2');
			
			listaRelatorio2.innerHTML = "---";
			
			var i;
			var item = null;
			
				
			var cabecalho = "";
			var linhas = "";
			var rodape = "";
			
			cabecalho = ' <h5 class="center-align"> Relatorios de Procedimentos Executados por Turma </h5>' +
						' <table class="bordered striped highlight">' +
			            ' <tr>                                      ' + 
						'	<th class="">Escola/Ano</th>                ' +
						'	<th class="">Turma/Ano</th>                ' +
						'	<th class="">Procedimento</th>                 ' +
						'	<th class="">Qtde</th>                   ' +
					
						' </tr>                                     ';
			rodape = '</table>';
			
						
			for(i=0; i < tamanho; i++) {
				item = results.rows.item(i);
				
				
				
				
				linhas = linhas + '<tr>' +
							  '<td class="">' + item['Escola']                   +' </td>    ' +
							  '<td class="">' + item['Turma']                   +' </td>    ' +
							  '<td class="">' + item['Procedimento']                      +' </td>    ' +
							  '<td class="">' + item['QTDE']       +' </td>    ' +
							  
							  '</tr>                                                  ';
				
			}
			
			listaRelatorio2.innerHTML += cabecalho + linhas + rodape; 
			
			},	
		seDerErro);
	});
}

/* 
Serão utilizadas as variáveis referentes aos índices de ceo-d e CPO-D, 
alunos atendidos, aplicação tópica de flúor, atividade educativa, 
escovação supervisionada, índice de ART necessários e concluídos e faltas.
 */
function PesquisarPorAlunos() {
	banco.transaction(function (tx) {
		where = '';
		
		//var aluno = document.getElementById('comboAlunos').selectedIndex  + 1;
		var turma = document.getElementById('comboTurma');
		
		texte = turma.value;
		
	

		where = ' T.IdTurma = ' + texte;

		console.log(where);
		tx.executeSql(
			
			//ALU.Turma = T.IdTurma and 


			//1 não realizado, 2 concluído, 3 educação em saúde, 4 evidenciação de placa, 
			//5 escovação, 6 aplicação tópica de fluor, 7 raspagem, 8 selante, 
			//9 ART, 10 exame e 11 não compareceu, conforme observa-se na Figura 5.
			
			' '+
			'Select L.*,                             ' +
			'       P.Descricao as NomeProcedimento, ' +
			'       T.Descricao || "/" || T.Ano as NomeTurma,        ' +

			'       (select count(LANC.rowid) from TLancamento LANC join TAluno ALU on (ALU.IdAluno = LANC.IdAluno)     ' +
			'        WHERE ALU.IdAluno = A.IdAluno and LANC.IdProcedimento1 = 1)   as naoRealizado,                     ' + 
			'                                                                                                           ' +
			'       (select count(LANC.rowid) from TLancamento LANC join TAluno ALU on (ALU.IdAluno = LANC.IdAluno)     ' +
			'        WHERE ALU.IdAluno = A.IdAluno and LANC.IdProcedimento1 = 2)   as concluido,                        ' + 
			'                                                                                                           ' +
			'       (select count(LANC.rowid) from TLancamento LANC join TAluno ALU on (ALU.IdAluno = LANC.IdAluno)     ' +
			'        WHERE ALU.IdAluno = A.IdAluno and LANC.IdProcedimento1 = 3)   as educacaoEmSaude,                  ' + 
			'                                                                                                           ' +
			'       (select count(LANC.rowid) from TLancamento LANC join TAluno ALU on (ALU.IdAluno = LANC.IdAluno)     ' +
			'        WHERE ALU.IdAluno = A.IdAluno and LANC.IdProcedimento1 = 4)   as evidenciacaoDePlaca,              ' + 
			'                                                                                                           ' +
			'       (select count(LANC.rowid) from TLancamento LANC join TAluno ALU on (ALU.IdAluno = LANC.IdAluno)     ' +
			'        WHERE ALU.IdAluno = A.IdAluno and LANC.IdProcedimento1 = 5)   as escovacao,                        ' + 
			'                                                                                                           ' +
			'       (select count(LANC.rowid) from TLancamento LANC join TAluno ALU on (ALU.IdAluno = LANC.IdAluno)     ' +
			'        WHERE ALU.IdAluno = A.IdAluno and LANC.IdProcedimento1 = 6)   as aplicacaoTopicaDeFluor,           ' + 
			'                                                                                                           ' +
			'       (select count(LANC.rowid) from TLancamento LANC join TAluno ALU on (ALU.IdAluno = LANC.IdAluno)     ' +
			'        WHERE ALU.IdAluno = A.IdAluno and LANC.IdProcedimento1 = 7)   as raspagem,                         ' + 
			'                                                                                                           ' +
			'       (select count(LANC.rowid) from TLancamento LANC join TAluno ALU on (ALU.IdAluno = LANC.IdAluno)     ' +
			'        WHERE ALU.IdAluno = A.IdAluno and LANC.IdProcedimento1 = 8)   as selante,                          ' + 
			'                                                                                                           ' +
			'       (select count(LANC.rowid) from TLancamento LANC join TAluno ALU on (ALU.IdAluno = LANC.IdAluno)     ' +
			'        WHERE ALU.IdAluno = A.IdAluno and LANC.IdProcedimento1 = 9)   as ART,                              ' + 
			'                                                                                                           ' +
			'       (select count(LANC.rowid) from TLancamento LANC join TAluno ALU on (ALU.IdAluno = LANC.IdAluno)     ' +
			'        WHERE ALU.IdAluno = A.IdAluno and LANC.IdProcedimento1 = 10)   as exame,                           ' + 
			'                                                                                                           ' +
			'       (select count(LANC.rowid) from TLancamento LANC join TAluno ALU on (ALU.IdAluno = LANC.IdAluno)     ' +
			'        WHERE ALU.IdAluno = A.IdAluno and LANC.IdProcedimento1 = 11)   as naoCompareceu,                   ' + 
            '                                                                                                           ' +
			'       (select count(LANC.rowid) from TLancamento LANC join TAluno ALU on (ALU.IdAluno = LANC.IdAluno)     ' +
			'        WHERE ALU.IdAluno = A.IdAluno and LANC.IdProcedimento1 = 12)   as transferido,                     ' + 
            '                                                                                                           ' +
			
			'       A.ALUNOS                         ' +
			'From TAluno        A                      ' +
			'                   Left Join TLancamento   L on (L.IdAluno        = A.IdAluno)         '+
			'                   Left Join TProcedimento P on (P.IdProcedimento = L.IdProcedimento1) '+
			'                   Left Join TTurma        T on (T.IdTurma        = A.Turma)	          '+
			' where ' + where +
		
		' group by A.ALUNOS '+			
		'',
		[],
		function (tx, results) {
			var tamanho = results.rows.length;
			var listaRelatorio = document.getElementById('listaRelatorioCPO');
			
			listaRelatorio.innerHTML = "---";
			
			var i;
			var item = null;
			
				
			var cabecalho = "";
			var linhas = "";
			var rodape = "";
			
			cabecalho = ' <h5 class="center-align"> Relatorios de Procedimentos Executados Por Alunos </h5>' +
						' <table class="bordered striped highlight">' +
			            ' <tr>                                      ' + 
						'	<th class="">Turma/Ano</th>                 ' +
						'	<th class="">Aluno</th>                 ' +
						'	<th class="">Não Realizado</th>     ' +
						'	<th class="">Concluido</th>     ' +
						'	<th class="">Edu. em Saúde</th>     ' +
						'	<th class="">Evi. de Placa</th>     ' +
						'	<th class="">Escovacao</th>     ' +
						'	<th class="">Aplic. Topica de Fluor</th>     ' +
						'	<th class="">Raspagem</th>     ' +
						'	<th class="">Selante</th>     ' +
						'	<th class="">ART</th>     ' +
						'	<th class="">Exame</th>     ' +
						'	<th class="">Nao Compareceu</th>     ' +
						'	<th class="">Transferido</th>     ' +


						

						' </tr>                                     ';
			rodape = '</table>';
			
						
			for(i=0; i < tamanho; i++) {
				item = results.rows.item(i);
				
				
				
				
				linhas = linhas + '<tr>' +
							  '<td class="">' + item['NomeTurma']                   +' </td>    ' +
							  '<td class="">' + item['ALUNOS']                   +' </td>    ' +
							 
							  '<td class="">' + item['naoRealizado']  +' </td>    ' +
							  '<td class="">' + item['concluido']  +' </td>    ' +
							  '<td class="">' + item['educacaoEmSaude']  +' </td>    ' +
							  '<td class="">' + item['evidenciacaoDePlaca']  +' </td>    ' +
							  '<td class="">' + item['escovacao']  +' </td>    ' +
							  '<td class="">' + item['aplicacaoTopicaDeFluor']  +' </td>    ' +
							  '<td class="">' + item['raspagem']  +' </td>    ' +
							  '<td class="">' + item['selante']  +' </td>    ' +
							  '<td class="">' + item['ART']  +' </td>    ' +
							  '<td class="">' + item['exame']  +' </td>    ' +
							  '<td class="">' + item['naoCompareceu']  +' </td>    ' +
							  '<td class="">' + item['transferido']  +' </td>    ' +


							  '</tr>                                                  ';
				
			}
			
			listaRelatorio.innerHTML += cabecalho + linhas + rodape; 
			
			},	
		seDerErro);
	});
}

function PesquisarPorEscola() {
	banco.transaction(function (tx) {
		//where = '';
		
		//var aluno = document.getElementById('comboAlunos').selectedIndex  + 1;
		//var turma = document.getElementById('comboTurma');
		
		//texte = turma.value;
		
	

		//where = ' T.IdTurma = ' + texte;

		console.log(where);
		tx.executeSql(
		
			' '+
			'Select E.*,                             ' +
		
			'       (select count(LANC.rowid) from TLancamento LANC join TAluno ALU on (ALU.IdAluno = LANC.IdAluno) Left Join TTurma  Tur on (Tur.IdTurma        = ALU.Turma)    ' +
			'        WHERE Tur.IdEscola = E.IdEscola and LANC.IdProcedimento1 = 1)   as naoRealizado ,                  ' + 
			 '                                                                                                           ' +
			'       (select count(LANC.rowid) from TLancamento LANC join TAluno ALU on (ALU.IdAluno = LANC.IdAluno) Left Join TTurma  Tur on (Tur.IdTurma        = ALU.Turma)     ' +
			'        WHERE Tur.IdEscola = E.IdEscola and LANC.IdProcedimento1 = 2)   as concluido,                        ' + 
			'                                                                                                           ' +
			'       (select count(LANC.rowid) from TLancamento LANC join TAluno ALU on (ALU.IdAluno = LANC.IdAluno) Left Join TTurma  Tur on (Tur.IdTurma        = ALU.Turma)     ' +
			'        WHERE Tur.IdEscola = E.IdEscola and LANC.IdProcedimento1 = 3)   as educacaoEmSaude,                  ' + 
			'                                                                                                           ' +
			'       (select count(LANC.rowid) from TLancamento LANC join TAluno ALU on (ALU.IdAluno = LANC.IdAluno) Left Join TTurma  Tur on (Tur.IdTurma        = ALU.Turma)     ' +
			'        WHERE Tur.IdEscola = E.IdEscola and LANC.IdProcedimento1 = 4)   as evidenciacaoDePlaca,              ' + 
			'                                                                                                           ' +
			'       (select count(LANC.rowid) from TLancamento LANC join TAluno ALU on (ALU.IdAluno = LANC.IdAluno) Left Join TTurma  Tur on (Tur.IdTurma        = ALU.Turma)     ' +
			'        WHERE Tur.IdEscola = E.IdEscola and LANC.IdProcedimento1 = 5)   as escovacao,                        ' + 
			'                                                                                                           ' +
			'       (select count(LANC.rowid) from TLancamento LANC join TAluno ALU on (ALU.IdAluno = LANC.IdAluno) Left Join TTurma  Tur on (Tur.IdTurma        = ALU.Turma)     ' +
			'        WHERE Tur.IdEscola = E.IdEscola and LANC.IdProcedimento1 = 6)   as aplicacaoTopicaDeFluor,           ' + 
			'                                                                                                           ' +
			'       (select count(LANC.rowid) from TLancamento LANC join TAluno ALU on (ALU.IdAluno = LANC.IdAluno) Left Join TTurma  Tur on (Tur.IdTurma        = ALU.Turma)     ' +
			'        WHERE Tur.IdEscola = E.IdEscola and LANC.IdProcedimento1 = 7)   as raspagem,                         ' + 
			'                                                                                                           ' +
			'       (select count(LANC.rowid) from TLancamento LANC join TAluno ALU on (ALU.IdAluno = LANC.IdAluno) Left Join TTurma  Tur on (Tur.IdTurma        = ALU.Turma)     ' +
			'        WHERE Tur.IdEscola = E.IdEscola and LANC.IdProcedimento1 = 8)   as selante,                          ' + 
			'                                                                                                           ' +
			'       (select count(LANC.rowid) from TLancamento LANC join TAluno ALU on (ALU.IdAluno = LANC.IdAluno) Left Join TTurma  Tur on (Tur.IdTurma        = ALU.Turma)     ' +
			'        WHERE Tur.IdEscola = E.IdEscola and LANC.IdProcedimento1 = 9)   as ART,                              ' + 
			'                                                                                                           ' +
			'       (select count(LANC.rowid) from TLancamento LANC join TAluno ALU on (ALU.IdAluno = LANC.IdAluno) Left Join TTurma  Tur on (Tur.IdTurma        = ALU.Turma)     ' +
			'        WHERE Tur.IdEscola = E.IdEscola and LANC.IdProcedimento1 = 10)   as exame,                           ' + 
			'                                                                                                           ' +
			'       (select count(LANC.rowid) from TLancamento LANC join TAluno ALU on (ALU.IdAluno = LANC.IdAluno) Left Join TTurma  Tur on (Tur.IdTurma        = ALU.Turma)     ' +
			'        WHERE Tur.IdEscola = E.IdEscola and LANC.IdProcedimento1 = 11)   as naoCompareceu,                   ' + 
            '                                                                                                           ' + 
			'       (select count(LANC.rowid) from TLancamento LANC join TAluno ALU on (ALU.IdAluno = LANC.IdAluno) Left Join TTurma  Tur on (Tur.IdTurma        = ALU.Turma)     ' +
			'        WHERE Tur.IdEscola = E.IdEscola and LANC.IdProcedimento1 = 12)   as transferido                    ' + 
            '                                                                                                           ' + 
			
			
			'From TEscola        E                      ' +
		//	'                   Left Join TLancamento   L on (L.IdAluno        = A.IdAluno)         '+
	//		'                   Left Join TProcedimento P on (P.IdProcedimento = L.IdProcedimento1) '+
	//		'                   Left Join TTurma        T on (T.IdTurma        = A.Turma)	          '+
			//' where ' + where +
		
	//	' group by A.ALUNOS '+			
		'',
		[],
		function (tx, results) {
			var tamanho = results.rows.length;
			var listaRelatorio = document.getElementById('listaRelatorioPorEscola');
			
			listaRelatorio.innerHTML = "---";
			
			var i;
			var item = null;
			
				
			var cabecalho = "";
			var linhas = "";
			var rodape = "";
			
			cabecalho = ' <h5 class="center-align"> Relatorios de Procedimentos Executados Por Escola </h5>' +
						' <table class="bordered striped highlight">' +
			            ' <tr>                                      ' + 
						'	<th class="">Escola/Ano</th>                 ' +
						'	<th class="">Não Realizado</th>     ' +
						'	<th class="">Concluido</th>     ' +
						'	<th class="">Edu. em Saúde</th>     ' +
						'	<th class="">Evi. de Placa</th>     ' +
						'	<th class="">Escovacao</th>     ' +
						'	<th class="">Aplic. Topica de Fluor</th>     ' +
						'	<th class="">Raspagem</th>     ' +
						'	<th class="">Selante</th>     ' +
						'	<th class="">ART</th>     ' +
						'	<th class="">Exame</th>     ' +
						'	<th class="">Nao Compareceu</th>     ' +
						'	<th class="">Transferido</th>     ' +

						
						' </tr>                                     ';
			rodape = '</table>';
			
						
			for(i=0; i < tamanho; i++) {
				item = results.rows.item(i);
				
				
				
				
				linhas = linhas + '<tr>' +
							  '<td class="">' + item['Descricao'] + " / "  + item['Ano']                +' </td>    ' +
							 
							  '<td class="">' + item['naoRealizado']  +' </td>    ' +
							  '<td class="">' + item['concluido']  +' </td>    ' +
							  '<td class="">' + item['educacaoEmSaude']  +' </td>    ' +
							  '<td class="">' + item['evidenciacaoDePlaca']  +' </td>    ' +
							  '<td class="">' + item['escovacao']  +' </td>    ' +
							  '<td class="">' + item['aplicacaoTopicaDeFluor']  +' </td>    ' +
							  '<td class="">' + item['raspagem']  +' </td>    ' +
							  '<td class="">' + item['selante']  +' </td>    ' +
							  '<td class="">' + item['ART']  +' </td>    ' +
							  '<td class="">' + item['exame']  +' </td>    ' +
							  '<td class="">' + item['naoCompareceu']  +' </td>    ' +
							  '<td class="">' + item['transferido']  +' </td>    ' +


							  '</tr>                                                  ';
				
			}
			
			listaRelatorio.innerHTML += cabecalho + linhas + rodape; 
			
			},	
		seDerErro);
	});
}


function esconder() {
	document.getElementById('esconde').style.display = "none";
	
	//document.getElementById('form-style-3').style.width = "99%";
}



function montaComboTurma() {
	banco.transaction(function (tx) {
		where = '';
		
		//var aluno = document.getElementById('comboAlunos').selectedIndex  + 1;
		var escola = document.getElementById('comboEscola');
		
		texte = escola.value;
		
		where = ' where IdEscola = ' + texte;
		tx.executeSql('select * from TTurma ' + where,
		[],
		function (tx, results) {
			var tamanho = results.rows.length;
			var listaTurmas = document.getElementById('listaTurmas');
			
			listaTurmas.innerHTML = " ";
			
			var corpo;
			var i;
			var item = null;
	
			cabecalho = '<div class="input-field col s3">'+
						'<select onchange="mostrarAlunos();" class="uppercase" id="comboTurma" name="comboTurma"> ';
	
							
			for(i=0; i < tamanho; i++) {
				item = results.rows.item(i);
				
				
			corpo =  corpo + ' <option value="' + item['IdTurma'] + '">' + item['Descricao'] + ' </option> ';
					
			}
			
			rodape = ' </select>  <label for="comboTurma"> Turma </label> </div> ';
			
			listaTurmas.innerHTML += cabecalho + corpo + rodape;
			
			
			$(document).ready(function(){
				$('select').formSelect();
			});	
			
			},	
		seDerErro);
	});
}

function montaComboEscola() {
	banco.transaction(function (tx) {
		tx.executeSql('select * from TEscola ',
		[],
		function (tx, results) {
			var tamanho = results.rows.length;
			var listaTurmas = document.getElementById('listaEscolas');
			
			listaTurmas.innerHTML = " ";
			
			var corpo;
			var i;
			var item = null;
	
			cabecalho = '<div class="input-field col s3">'+
						'<select onchange="montaComboTurma();" class="uppercase" id="comboEscola" name="comboEscola"> ';
	
							
			for(i=0; i < tamanho; i++) {
				item = results.rows.item(i);
				
				
			corpo =  corpo + ' <option value="' + item['IdEscola'] + '">' + item['Descricao'] + ' </option> ';
					
			}
			
			rodape = ' </select>  <label for="comboEscola"> Escola </label> </div> ';
			
			listaTurmas.innerHTML += cabecalho + corpo + rodape;
			
			
			$(document).ready(function(){
				$('select').formSelect();
			});	
			
			},	
		seDerErro);
	});
}