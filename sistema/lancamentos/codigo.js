var banco; //global


function criarAbrirBanco() {
	banco = openDatabase('ProClin','1.0','Sistema de Proteses Dentarias', 2 * 1024 * 1024);
	banco2 = openDatabase('ProClin','1.0','Sistema de Proteses Dentarias', 2 * 1024 * 1024);
	//status.innerHTML = 'Banco Banco Criado e Aberto';
	
	/*alert('ok, Banco Criado e Aberto!');*/
	
	
	//document.getElementById('descricaoAluno').value = numeroaluno;
	
	criarTabelas();
	
	montaComboEscola();
	montaComboTurma();
	montaComboAluno();
	
	
	montaComboProcedimento1();
	
	
}
	


function criarTabelas() {
	banco.transaction(function (tx) {
		//tx.executeSql('drop table TLancamento',
		tx.executeSql('create table if not exists TLancamento                                  '+
		              '   (IdLancamento int unique, idAluno int, datalancamento date, dente text, idProcedimento1 int, operador text,obs text)',
		[],
		function (tx) {/*alert('Tabela Tipos de Serviço Criou Certo')*/; },
		seDerErro);
	});
}


function validou() {
	if (document.getElementById('dente').value == "") {
		var $toastContent = $('<span>Preencha o Campo Nome!</span>');
        Materialize.toast($toastContent, 5000);
		return false;			
	} else {
		return true;	
	}
}

//TipoServico
function inserirLancamento() {
	//var descricao = document.getElementById('nota');
	
	//alert(veficaSeNecessitaDeProcedimento(2));
	
	if (MsgRegistro(1) == true) {
	
		novoIdLancamento();
	
		if (validou()) {
	
		banco.transaction(function (tx) {
			var codigo    = document.getElementById('idLancamento').value;
		
			
		//	var idAluno               = document.getElementById('comboAlunos').selectedIndex  + 1;;
			var idAluno               = document.getElementById('comboAlunos').value;
			
			
			var idProcedimento1        = document.getElementById('comboProcedimentos1').selectedIndex  + 1;
			
			var dente        = document.getElementById('dente').value;
			
			
			var datalancamento                  = document.getElementById('datalancamento').value;
			
			var obs                   = document.getElementById('obs').value;
			
			var operador                   = document.getElementById('operador').value;
			
			
		    
			operador = operador.toUpperCase();
			
			obs = obs.toUpperCase();
			
			tx.executeSql('insert into TLancamento (IdLancamento, idAluno,datalancamento, idProcedimento1, dente, obs, operador) values (?,?,?,?,?,?,?)',
			[codigo, idAluno, datalancamento,idProcedimento1,dente, obs, operador],
			
			function (tx) {/*alert('Registro Inserido com sucesso'); mostrarDentistas()*/; 
				seDerCerto(1);
				mostrarLancamento();
				montaComboAluno(); 	
				
			},
			seDerErro);
		});
		
	}

	}	
}

function novoIdLancamento() {
	banco.transaction(function (tx) {
		var codigo    = document.getElementById('idLancamento');
	
	    texto = 'select MAX(IdLancamento) Id from TLancamento'
	
		tx.executeSql(texto ,
		[],
		
		function (tx, results) {
			
			item = results.rows.item(0);
			
			valor = 0;
			valor = item['Id'];
			
			if (valor >=0 ) {
				codigo.value = item['Id'] + 1 ; 
			} else {
				codigo.value = 1; 	
			}
				
		},
		seDerErro);
	});
}

function abreLancamento(){
	window.open('http://www.google.com.br');
}

function mostrarLancamento() {
	
	listaLancamento.innerHTML = "   ";
	
	banco.transaction(function (tx) {
		
		
		where = '';
		
		//var aluno = document.getElementById('comboAlunos').selectedIndex  + 1;
		var aluno = document.getElementById('comboAlunos');
		
		texte = aluno.value;
		
		where = ' where Alu.idAluno = ' + texte;
		
		
		
		tx.executeSql('select Lan.*, Alu.CPO, Alu.Observacao, Alu.CEO, Alu.Alunos as NomeAluno, Proc1.Descricao as Procedimento1, (select count(IdProcedimento1) from TLancamento Where (IdProcedimento1 = 9 and IdAluno=Alu.IdAluno)) as qtdeProc   '+
                    	'  from TLancamento as Lan left join TAluno        as Alu   on (Lan.IdAluno = Alu.IdAluno)     				'+
			  			'                          left join TProcedimento as Proc1 on (Lan.idProcedimento1 = Proc1.IdProcedimento)   '+
			  			
			  			
			  			' ' + where,
			  
			  
			 
			  [],
		function (tx, results) {
			var tamanho = results.rows.length;
			var listaLancamento = document.getElementById('listaLancamento');
			
			listaLancamento.innerHTML = "   ";
			novoIdLancamento();
			
			
			//document.getElementById('comboAlunos').value = '';
			
			
			 document.getElementById('datalancamento').value = '';
			
			//document.getElementById('nota').value = '';
			document.getElementById('obs').value = '';
		    
			item = results.rows.item(0);
			
			TotaisAlunos = "";
			TotaisAlunos = ' (CPO:' + item['CPO'] + ')(CEO:' + item['CEO'] + ')(ART Feito: ' + item['qtdeProc']+')';
			
			
			var concluido = "";
			concluido = document.getElementById("concluido");
			
			
			
			 
			
			montaPainel =   ' <div class="col s12">                                                         '+
							' <div class="card blue-grey darken-1">                                            '+
							' 	<div class="card-content white-text">                                          '+
							
							' 	<span class="card-title">Necessidades</span>                                     '+
							
							
							' Total de CPO: ' + item['CPO'] +
							' <br> '+
							' Total de CEO: ' + item['CEO'] +
							' <br> '+
							' Total de ART Realizados: ' + item['qtdeProc'] +
							' <br> '+
							' Observações Sobre Aluno: ' + item['Observacao'] +
							
							
							' 	</div>                                                                         '+
							
							
							
							' </div>                                                                           '+
							' </div>                                                                           ';
			concluido.innerHTML = montaPainel;
			
			
			var i;
			var item = null;
			
				
			var cabecalho = "";
			var linhas = "";
			var rodape = "";
			
			cabecalho = ' <table class="bordered striped highlight">                    ' +
			            ' <tr>                                  ' + 
						'	<th class="">Nº</th>         ' +
						
						'	<th class="">Aluno</th>        ' +
						'	<th class="">Data</th>        ' +
						'	<th class="">Procedimento 1</th>        ' +
						'	<th class="">Dente</th>        ' +
						'	<th class="">Operador</th>        ' +
						
						'	<th class="">Obs</th>        ' +
						
						
						' </tr>                                 ';
			rodape = '</table>';
			
						
			for(i=0; i < tamanho; i++) {
				item = results.rows.item(i);
				
				
				
				item['datalancamento'] = formataData(item['datalancamento']);
				
				linhas = linhas + '<tr onclick="alterarLancamento('+item['IdLancamento']+')" >' +
							  '<td class="">' + item['IdLancamento'] +' </td>    ' +
							  
							  '<td class="">' + item['NomeAluno']       +' </td>    ' +
							  '<td class="">' + item['datalancamento']       +' </td>    ' +
							  
							  '<td class="">' + item['Procedimento1']       +' </td>    ' +
							  '<td class="">' + item['dente']       +' </td>    ' +
							  '<td class="">' + item['operador']       +' </td>    ' +
							  '<td class="">' + item['obs']       +' </td>    ' +
							  '</tr>                                                  ';
				
			}
			
			listaLancamento.innerHTML += cabecalho + linhas + rodape; 
			
			},	
		seDerErro);
	});
}

function excluirLancamento() {
	if (MsgRegistro(3) == true) {
		var IdLancamento = document.getElementById('idLancamento').value;
		banco.transaction(function (tx) {
		tx.executeSql(' delete from TLancamento where IdLancamento = ?', 
		[IdLancamento], 
		function (tx, results) {
			seDerCerto(3);
			montaComboAluno();
			mostrarLancamento();
			novoIdLancamento();
			 	
		}, 
			seDerErro);
		});
	}
}

function atualizarLancamento() {
	if (MsgRegistro(2) == true) {
		var IdLancamento = document.getElementById('idLancamento').value;
		
		
		
				var idAluno               = document.getElementById('comboAlunos').value;
				
				
				var idProcedimento1       = document.getElementById('comboProcedimentos1').selectedIndex    + 1;
				var dente                 = document.getElementById('dente').value;
				
				
				
				var datalancamento        = document.getElementById('datalancamento').value;
				
				var obs                   = document.getElementById('obs').value;
				var operador                   = document.getElementById('operador').value;
				
		operador = operador.toUpperCase();
		obs = obs.toUpperCase();
		
		
		
		
		banco.transaction(function (tx) {
		tx.executeSql(' update TLancamento set idAluno = ?, datalancamento=?,idProcedimento1 = ?,dente = ?, obs = ?, operador=? where IdLancamento = ?', 
		[idAluno,datalancamento,  idProcedimento1, dente, obs,operador, IdLancamento], 
		function (tx, results) {
			seDerCerto(2);
			montaComboAluno();
			mostrarLancamento();	
		}, 
			seDerErro);
		});
	}
}

function alterarLancamento(IdLancamento) {	
	banco.transaction(function (tx) {
		tx.executeSql('select * from TLancamento where IdLancamento = ?',
		[IdLancamento],
		function (tx, results) {
			var item = results.rows.item(0);
			
			
			
			
			var codigo    = document.getElementById('idLancamento');
			
			
			var idAluno               = document.getElementById('comboAlunos');
			
			
			
			
			
			
			
			var comboProcedimento1 = document.getElementById('comboProcedimentos1');
			var dente = document.getElementById('dente');
			
			
			
			var datalancamento        = document.getElementById('datalancamento');
		
			var obs                   = document.getElementById('obs');
			var operador                   = document.getElementById('operador');
			
			codigo.value = IdLancamento;
			
			
			
			
			
			comboProcedimento1.selectedIndex = item['idProcedimento1']-1;
			dente.value = item['dente'];
			
			
			datalancamento.value                   = item['datalancamento'];
			
			obs.value                    = item['obs'];
			operador.value = item['operador'];

		
			$(document).ready(function(){
				$('select').formSelect();
			});	
			
		},	
		
		
		
		
		seDerErro);
	});
	
}
//TipoServico

function pegarValorComboAluno() {

}
function montaComboAluno() {
	banco.transaction(function (tx) {
		
		
		where = '';
		
		var turma = document.getElementById('comboTurma').value;
		
		where = ' where turma = ' + turma;
		
		
		tx.executeSql('select Alu.IdAluno, Alu.ALUNOS, Alu.CPO,Alu.CEO,(select count(IdProcedimento1) from TLancamento Where (IdProcedimento1 = 9 and IdAluno=Alu.IdAluno)) as qtdeProc from TAluno Alu ' + where,
		[],
		function (tx, results) {
			var tamanho = results.rows.length;
			var listaAlunos = document.getElementById('listaAlunos');
			
			listaAlunos.innerHTML = " ";
			
			var corpo;
			var i;
			var item = null;
	
			cabecalho = '<div class="input-field col s4">'+
						'<select class="" onchange="mostrarLancamento()" class="uppercase" id="comboAlunos" name="comboAlunos"> ';
	
							
			for(i=0; i < tamanho; i++) {
				item = results.rows.item(i);
				
				//var artceo = "";
				//var artceo = veficaSeNecessitaDeProcedimento(item['IdAluno']);
				
				TotaisAlunos = "";
				TotaisAlunos = ' (CPO:' + item['CPO'] + ')(CEO:' + item['CEO'] + ')(ART Feito: ' + item['qtdeProc']+')'; 
				
				
				corpo =  corpo + ' <option class="teal lighten-2" value="' + item['IdAluno'] + '">' + item['ALUNOS'] + TotaisAlunos + ' </option> ';
					
			}
			
			rodape = ' </select> <label for="comboAlunos"> Aluno </label> </div> ';
			
			listaAlunos.innerHTML += cabecalho + corpo + rodape;
			
			
			$(document).ready(function(){
				$('select').formSelect();
			});	
			
			},	
		seDerErro);
	});
}

function montaComboProcedimento1() {
	banco.transaction(function (tx) {
		tx.executeSql('select * from TProcedimento ',
		[],
		function (tx, results) {
			var tamanho = results.rows.length;
			var listaProcedimentos = document.getElementById('listaProcedimentos1');
			
			listaProcedimentos.innerHTML = " ";
			
			var corpo;
			var i;
			var item = null;
	
			cabecalho = '<div class="input-field col s2">'+
			            
						'<select class="uppercase" id="comboProcedimentos1" name="comboProcedimentos1"> ';
	
							
			for(i=0; i < tamanho; i++) {
				item = results.rows.item(i);
				
				
			corpo =  corpo + ' <option value="' + item['IdProcedimento'] + '">' + item['Descricao'] + ' </option> ';
					
			}
			
			rodape = '   </select> <label for="comboProcedimentos"> Procedimento 1 </label> </div> ';
			
			listaProcedimentos.innerHTML += cabecalho + corpo + rodape;
			
			
			$(document).ready(function(){
				$('select').formSelect();
			});	
			
			},	
		seDerErro);
	});
}


function formataData(data){
	//2017-06-15
	
	var xdata = data;
	
	var ano = xdata.substring(0, [4]);
	var mes = xdata.substring(6, [7]);
	var dia = xdata.substring(8, [10]);
	
	if (dia.length==1) {
		dia = '0'+dia;		
	}
	if (mes.length==1) {
		mes = '0'+mes;		
	}
	
	var xdata = dia+'/'+mes+'/'+ano;
	
	return xdata;

}

function montaComboTurma() {
	banco.transaction(function (tx) {
		
		listaAlunos.innerHTML = " ";
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
						'<select onchange="montaComboAluno();" class="uppercase" id="comboTurma" name="comboTurma"> ';
	
							
			for(i=0; i < tamanho; i++) {
				item = results.rows.item(i);
				
				
			corpo =  corpo + ' <option value="' + item['IdTurma'] + '">' + item['Descricao'] + " / Ano: "+ item['Ano'] + ' </option> ';
					
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



function esconder() {
	document.getElementById('esconde').style.display = "none";
	
	//document.getElementById('form-style-3').style.width = "99%";
}

function mostrar() {
	document.getElementById('esconde').style.display = "block";
	//document.getElementById('form-style-3').style.width = "80%";
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
				
				
			corpo =  corpo + ' <option value="' + item['IdEscola'] + '">' + item['Descricao'] + " / Ano: "+ item['Ano'] + ' </option> ';
					
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





function veficaSeNecessitaDeProcedimento(id) {
	var NCPO = "";
	var NCEO = "";
	var QtdeARTFeito = "";
	var wheres = "";
	//var where = id;	
	
	
	banco2.transaction(function (txb) {
		wheres = ' where IdAluno = ' + id;
		txb.executeSql('select *  from TAluno ' + wheres,
		 [],
		function (txb, results) {
			var tamanho = results.rows.length;
			
			var i;
			var item = null;
			item = results.rows.item(0);
			
			NCPO = item['CPO'];
			NCEO = item['CEO'];	
			
			alert(NCPO + NCEO);
			
			},	
		seDerErro);
	});
	
//	banco.transaction(function (tx) {
//		
//		where = '';
//		
//		where = ' where (idAluno = ' + id + ' and idProcedimento1 = 9)';
//		
//		tx.executeSql('select Lan.*                '+
//                      '  from TLancamento as Lan '+
//			  		  ' ' + where,
//		 [],
//		function (tx, results) {
//			var tamanho = results.rows.length;
//			
//			var i;
//			var item = null;
//			//item = results.rows.item(i);
//			
//			QtdeARTFeito = results.rows.length;
//			
//			},	
//		seDerErro);
//	});
	
	
	//return NCPO + NCEO + QtdeARTFeito;
	return NCPO + NCEO;
	
	
}
