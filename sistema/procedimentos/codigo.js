var banco; //global
var numeroProcedimento;


function criarAbrirBanco() {
	banco = openDatabase('ProClin','1.0','Sistema de Proteses Dentarias', 2 * 1024 * 1024);
	//status.innerHTML = 'Banco Banco Criado e Aberto';
	
	/*alert('ok, Banco Criado e Aberto!');*/
	
	criarTabelas();
	
	abreLancamento();
	
}
	

function criarTabelas() {
	banco.transaction(function (tx) {
		//tx.executeSql('drop table TProcedimento',
		tx.executeSql('create table if not exists TProcedimento (IdProcedimento int unique, Descricao text, valorPadrao text)',
		[],
		function (tx) {/*alert('Tabela Tipos de Serviço Criou Certo')*/; mostrarProcedimento()},
		seDerErro);
	});
}


function validou() {
	if (document.getElementById('descricaoProcedimento').value == "") {
		var $toastContent = $('<span>Preencha o Campo Nome!</span>');
        Materialize.toast($toastContent, 5000);
		return false;			
	} else {
		return true;	
	}
}

//TipoServico
function inserirProcedimento() {
	if (MsgRegistro(1) == true) {
		var descricao = document.getElementById('descricaoProcedimento');
		novoIdProcedimento();
		
		if (validou()) {
	
		banco.transaction(function (tx) {
			var codigo    = document.getElementById('idProcedimento').value;
			var descricao = document.getElementById('descricaoProcedimento').value;
			var valorPadrao = document.getElementById('valorPadrao').value;
		    descricao = descricao.toUpperCase();
			
			tx.executeSql('insert into TProcedimento (IdProcedimento, Descricao, valorPadrao) values (?,?,?)',
			[codigo, descricao, valorPadrao],
			
			function (tx) {/*alert('Registro Inserido com sucesso'); mostrarDentistas()*/; 
				seDerCerto(1);
				mostrarProcedimento(); 	
				
			},
			seDerErro);
		});
		
	}

	}
}

function novoIdProcedimento() {
	banco.transaction(function (tx) {
		var codigo    = document.getElementById('idProcedimento');
	
	    texto = 'select MAX(IdProcedimento) Id from TProcedimento'
	
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


function mostrarProcedimento() {
	banco.transaction(function (tx) {
		tx.executeSql('select * from TProcedimento ',
		[],
		function (tx, results) {
			var tamanho = results.rows.length;
			var listaProcedimento = document.getElementById('listaProcedimento');
			
			listaProcedimento.innerHTML = "--";
			novoIdProcedimento();
			
			var i;
			var item = null;
			
			document.getElementById('descricaoProcedimento').value = "";
				
			var cabecalho = "";
			var linhas = "";
			var rodape = "";
			
			cabecalho = ' <table class="bordered striped highlight">                    ' +
			            ' <tr>                                  ' + 
						'	<th class="">Nº</th>         ' +
						'	<th class="" >Procedimento</th>        ' +
						'	<th class="">Obs</th>        ' +
						' </tr>                                 ';
			rodape = '</table>';
			
						
			for(i=0; i < tamanho; i++) {
				item = results.rows.item(i);
				
				
				//texto = ' <div class="paragrafo" onclick="alterarProcedimento('+item['IdProcedimento']+')"> <b>Nº</b> : ' + item['IdProcedimento'] + '       |     <b>Procedimento :</b> ' + item['Descricao']+' </div> <br>'
				
				
				linhas = linhas + '<tr onclick="alterarProcedimento('+item['IdProcedimento']+')" >' +
							  '<td class="">' + item['IdProcedimento'] +' </td>    ' +
							  '<td class="">' + item['Descricao']       +' </td>    ' +
							  '<td class="">' + item['valorPadrao']       +' </td>    ' +
							  
							 
							 
							 
							 // '<td class=""> <button class="waves-effect waves-light btn" onclick="abreLancamento();"> <i class="material-icons ">create</i> </button> </td>    ' +
							 
							  
							  
							  '</tr>                                                  ';
				
			}
			
			listaProcedimento.innerHTML += cabecalho + linhas + rodape; 
			
			},	
		seDerErro);
	});
}

function excluirProcedimento() {
	if (MsgRegistro(3) == true) {	
		var IdProcedimento = document.getElementById('idProcedimento').value;
		banco.transaction(function (tx) {
		tx.executeSql(' delete from TProcedimento where IdProcedimento = ?', 
		[IdProcedimento], 
		function (tx, results) {
			seDerCerto(3);
			mostrarProcedimento();
			novoIdProcedimento();
		}, 
			seDerErro);
		});
	}
}

function atualizarProcedimento() {
	if (MsgRegistro(2) == true) {
		var IdProcedimento = document.getElementById('idProcedimento').value;
		var Descricao = document.getElementById('descricaoProcedimento').value;
		var valorPadrao = document.getElementById('valorPadrao').value;
		Descricao = Descricao.toUpperCase();
		
		banco.transaction(function (tx) {
		tx.executeSql(' update TProcedimento set Descricao = ?, valorPadrao = ? where IdProcedimento = ?', 
		[Descricao, valorPadrao, IdProcedimento], 
		function (tx, results) {
			seDerCerto(2);
			mostrarProcedimento();	
		}, 
			seDerErro);
		});
	}
}

function alterarProcedimento(IdProcedimento) {	
	banco.transaction(function (tx) {
		tx.executeSql('select * from TProcedimento where IdProcedimento = ?',
		[IdProcedimento],
		function (tx, results) {
			var item = results.rows.item(0);
			
			var codigo    = document.getElementById('idProcedimento');
			var descricao = document.getElementById('descricaoProcedimento');
			var valorPadrao = document.getElementById('valorPadrao');
			
			codigo.value = IdProcedimento;
			descricao.value = item['Descricao'];
			valorPadrao.value = item['valorPadrao'];
		},	
		seDerErro);
	});
	
}
//TipoServico

