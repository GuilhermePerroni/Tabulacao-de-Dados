var banco; //global
var numeroEscola;


function criarAbrirBanco() {
	banco = openDatabase('ProClin','1.0','Sistema de Proteses Dentarias', 2 * 1024 * 1024);
	//status.innerHTML = 'Banco Banco Criado e Aberto';
	
	/*alert('ok, Banco Criado e Aberto!');*/
	
	criarTabelas();
	
	
}
	

function criarTabelas() {
	banco.transaction(function (tx) {
		//tx.executeSql('drop table TEscola',
		tx.executeSql('create table if not exists TEscola (IdEscola int unique, Descricao text, Ano int)',
		[],
		function (tx) {/*alert('Tabela Tipos de Serviço Criou Certo')*/; mostrarEscola()},
		seDerErro);
	});
}


function validou() {
	if (document.getElementById('descricaoEscola').value == "") {
		var $toastContent = $('<span>Preencha o Campo Nome!</span>');
        Materialize.toast($toastContent, 5000);
		return false;			
	} else {
		return true;	
	}
}

//TipoServico
function inserirEscola() {
	if (MsgRegistro(1) == true) {
		var descricao = document.getElementById('descricaoEscola');
		novoIdEscola();
		
		if (validou()) {
		
			banco.transaction(function (tx) {
				var codigo    = document.getElementById('idEscola').value;
				var descricao = document.getElementById('descricaoEscola').value;
				var Ano = document.getElementById('Ano').value;
			    descricao = descricao.toUpperCase();
				
				tx.executeSql('insert into TEscola (IdEscola, Descricao, Ano) values (?,?,?)',
				[codigo, descricao, Ano],
				
				function (tx) {/*alert('Registro Inserido com sucesso'); mostrarDentistas()*/; 
					seDerCerto(1);
					mostrarEscola(); 	
					
				},
				seDerErro);
			});
			
		}
	}
	
}

function novoIdEscola() {
	banco.transaction(function (tx) {
		var codigo    = document.getElementById('idEscola');
	
	    texto = 'select MAX(IdEscola) Id from TEscola'
	
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


function mostrarEscola() {
	banco.transaction(function (tx) {
		tx.executeSql('select * from TEscola ',
		[],
		function (tx, results) {
			var tamanho = results.rows.length;
			var listaEscola = document.getElementById('listaEscola');
			
			listaEscola.innerHTML = "---";
			novoIdEscola();
			
			var i;
			var item = null;
			
			document.getElementById('descricaoEscola').value = "";
				
			var cabecalho = "";
			var linhas = "";
			var rodape = "";
			
			cabecalho = ' <table class="bordered striped highlight">                    ' +
			            ' <tr>                                  ' + 
						'	<th class="">Nº</th>         ' +
						'	<th class="" >Escola</th>        ' +
						'	<th class="">Ano</th>        ' +
						' </tr>                                 ';
			rodape = '</table>';
			
						
			for(i=0; i < tamanho; i++) {
				item = results.rows.item(i);
				
				
				//texto = ' <div class="paragrafo" onclick="alterarEscola('+item['IdEscola']+')"> <b>Nº</b> : ' + item['IdEscola'] + '       |     <b>Escola :</b> ' + item['Descricao']+' </div> <br>'
				
				
				linhas = linhas + '<tr onclick="alterarEscola('+item['IdEscola']+')" >' +
							  '<td class="">' + item['IdEscola'] +' </td>    ' +
							  '<td class="">' + item['Descricao']       +' </td>    ' +
							  '<td class="">' + item['Ano']       +' </td>    ' +
							  
							  
							  
							  '</tr>                                                  ';
				
			}
			
			listaEscola.innerHTML += cabecalho + linhas + rodape; 
			
			},	
		seDerErro);
	});
}

function excluirEscola() {
	if (MsgRegistro(3) == true) {
		var IdEscola = document.getElementById('idEscola').value;
		banco.transaction(function (tx) {
		tx.executeSql(' delete from TEscola where IdEscola = ?', 
		[IdEscola], 
		function (tx, results) {
			seDerCerto(3);
			mostrarEscola();
			novoIdEscola();
		}, 
			seDerErro);
		});
	}
}

function atualizarEscola() {
	
	if (MsgRegistro(2) == true) {
	
		var IdEscola = document.getElementById('idEscola').value;
		var Descricao = document.getElementById('descricaoEscola').value;
		var Ano = document.getElementById('Ano').value;
		Descricao = Descricao.toUpperCase();
		
		banco.transaction(function (tx) {
		tx.executeSql(' update TEscola set Descricao = ?, Ano = ? where IdEscola = ?', 
		[Descricao, Ano, IdEscola], 
		function (tx, results) {
			mostrarEscola();
			seDerCerto(2);		
		}, 
			seDerErro);
		});
	
	}
}

function alterarEscola(IdEscola) {	
	banco.transaction(function (tx) {
		tx.executeSql('select * from TEscola where IdEscola = ?',
		[IdEscola],
		function (tx, results) {
			var item = results.rows.item(0);
			
			var codigo    = document.getElementById('idEscola');
			var descricao = document.getElementById('descricaoEscola');
			var Ano = document.getElementById('Ano');
			
			codigo.value = IdEscola;
			descricao.value = item['Descricao'];
			Ano.value = item['Ano'];
		},	
		seDerErro);
	});
	
}
//TipoServico


















