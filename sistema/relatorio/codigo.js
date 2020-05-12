var banco; //global
var numeroEscola;


function criarAbrirBanco() {
	banco = openDatabase('ProClin','1.0','Sistema de Proteses Dentarias', 2 * 1024 * 1024);
		
}


function ExecutaPesquisar() {
	PesquisarART();
	PesquisarQTDEProcedimento();
}

function PesquisarART() {
	banco.transaction(function (tx) {
		tx.executeSql(' '+
					  ' select ALUNOS,                                                           '+
                      ' (select count(LANC.rowid) from TLancamento LANC join TAluno ALU on (ALU.IdAluno = LANC.IdAluno) WHERE LANC.IdProcedimento1 = 9 and ALU.Turma = T.IdTurma) as qtdeProcedimentoArtExecutado,  ' +
					  '					  E.Descricao as NomeEscola,                             '+
					//  '        count(L.rowid) as qtdeProcedimentoArtExecutado,                   '+
					  ' 	   T.Descricao    as NomeTurma,                                      '+
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
						'	<th class="">Escola</th>                ' +
						'	<th class="">Turma</th>                 ' +
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

function PesquisarQTDEProcedimento() {
	banco.transaction(function (tx) {
		tx.executeSql(  ' Select T.Descricao Turma, E.Descricao Escola, P.Descricao Procedimento, Count(IdProcedimento1) as QTDE      '+
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
						'	<th class="">Escola</th>                ' +
						'	<th class="">Turma</th>                ' +
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




function esconder() {
	document.getElementById('esconde').style.display = "none";
	
	//document.getElementById('form-style-3').style.width = "99%";
}