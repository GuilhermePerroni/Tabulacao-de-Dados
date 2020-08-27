var banco; //global

function criarAbrirBanco() {
	banco = openDatabase('ProClin','1.0','Sistema de Proteses Dentarias', 2 * 1024 * 1024);
	
	criaTabela();
	montaComboEscola();
	montaComboTurma();
	
	
	$(document).ready(function(){
    $('select').formSelect();
	});
}
	
function criaTabela() {
	banco.transaction(function (tx) {
		//tx.executeSql('drop table TAluno',
		tx.executeSql('create table if not exists TAluno (IdAluno int unique, ClassRisco text,turma int, Educacao text,ALUNOS text,                     '+
		              '                                   CNS text, SEXO text, IDADE text, ED text, CP text, ATF text DEFAULT 0,                        '+
					  '							          CPO text DEFAULT 0, ART0 text DEFAULT 0, CEO	text DEFAULT 0, ART1 text DEFAULT 0,            '+
					  '									  RISCO text, Observacao text, Endereco text, Telefone text, Selante text, DataNascimento date, '+
					  '                                   Encaminhado text, Autorizado text, Evidenciacao text,                                         '+
					  '                                   Colaborativo text,                                                                            '+
					  ' 								  dente55 text,dente54 text,dente53 text,dente52 text,dente51 text,                             '+
					  ' 								  dente65 text,dente64 text,dente63 text,dente62 text,dente61 text,                             '+
					  ' 								  dente75 text,dente74 text,dente73 text,dente72 text,dente71 text,                             '+
					  ' 								  dente85 text,dente84 text,dente83 text,dente82 text,dente81 text,                             '+
					  ''+
					  ' 								  dente11 text, dente12 text,dente13 text,dente14 text,dente15 text, dente16 text, dente17 text, '+
					  ' 								  dente21 text, dente22 text,dente23 text,dente24 text,dente25 text, dente26 text, dente27 text, '+
					  ' 								  dente31 text, dente32 text,dente33 text,dente34 text,dente35 text, dente36 text, dente37 text, '+
					  ' 								  dente41 text, dente42 text,dente43 text,dente44 text,dente45 text, dente46 text, dente47 text  '+
					 


					 ')',
		[],
		function (tx) {
			mostrarAlunos();				
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
	
function mostrarAlunos() {
	novoIdAluno();
	banco.transaction(function (tx) {
		
		where = '';
		
		//var aluno = document.getElementById('comboAlunos').selectedIndex  + 1;
		var turma = document.getElementById('comboTurma');
		
		texte = turma.value;
		
		where = ' where A.turma = ' + texte;
		
		
		tx.executeSql('select A.*, T.Descricao as NomeTurma from TAluno as A left join TTurma as T on (A.turma = T.IdTurma) ' + where ,
		[],
		function (tx, results) {
			var tamanho = results.rows.length;
			var listaServicos = document.getElementById('listaAlunos');
			
			listaServicos.innerHTML = "";
			
			novoIdAluno();
			
			var i;
			var item = null;
			

			//document.getElementById('ALUNO').value = "";
			//document.getElementById('CNS').value = "";
			//document.getElementById('SEXO').value = "";
			//document.getElementById('IDADE').value = "";
			//document.getElementById('Endereco').value = "";
			//document.getElementById('CP').selectedIndex = 0;
			//document.getElementById('ATF').selectedIndex = 0;
			//document.getElementById('RISCO').selectedIndex = 0;
			//document.getElementById('ClassRisco').selectedIndex = 0;
			//document.getElementById('Selante').selectedIndex = 0;
			//document.getElementById('Encaminhado').selectedIndex = 0;
			//document.getElementById('Autorizado').selectedIndex = 0;
			//document.getElementById('Colaborativo').selectedIndex = 0;
			//document.getElementById('Educacao').selectedIndex = 0;
			//document.getElementById('CPO').value = "";
			//document.getElementById('ART0').value = "";
			//document.getElementById('CEO').value = "";
			//document.getElementById('ART1').value = "";
			//document.getElementById('Observacao').value = "";
			//document.getElementById('Telefone').value = "";
			//document.getElementById('DataNascimento').value = "";
			
						
				
			var cabecalho = "";
			var linhas = "";
			var rodape = "";
			
			cabecalho = ' <table class="bordered striped highlight  responsive-table">    ' +
			            ' <tr>                          				 ' + 
						'	<th class="center-align">N</th>          	 ' +
						'	<th class="">Aluno</th>                ' +
						'	<th class="">Turma</th>        ' +
						'	<th class="">Cartão SUS</th>                   ' +
						'	<th class="">Sexo</th>                  ' +
						'	<th class="">Idade</th>                 ' +
						'	<th class="">Data de Nasc.</th>                    ' +
						'	<th class="">Endereco</th>                    ' +
						'	<th class="">Telefone</th>                    ' +
						'	<th class="">CPO</th>                   ' +
						'	<th class="">ART (CPO)</th>                  ' +
						'	<th class="">CEO</th>                   ' +
						'	<th class="">ART (CEO)</th>                  ' +
						'	<th class="">RISCO</th>                 ' +	
						'	<th class="">Clas. Risco</th>                 ' +	
						'	<th class="">Enc. Fasipe</th>                 ' +	
						'	<th class="">Autorizado</th>                 ' +	
						'	<th class="">Colaborativo</th>                 ' +	
						'	<th class="">Observacao</th>                 ' +	
						' </tr>                                     ';
			rodape = '</table>';
		
			for(i=0; i < tamanho; i++) {
				item = results.rows.item(i);
				linhas = linhas + '<tr onclick="alterarAluno('+item['IdAluno']+')" >   ' +
								'<td class="center-align">' + item['IdAluno'] +' </td> ' +
								'<td class=""> ' + item['ALUNOS']         +' </td>     ' +
								'<td class=""> ' + item['NomeTurma']      +' </td>     ' +
								'<td class=""> ' + item['CNS']            +' </td>     ' +
								'<td class=""> ' + item['SEXO'] 		  +' </td>     ' +												
								'<td class=""> ' + item['IDADE']		  +' </td>     ' +
								'<td class=""> ' + item['DataNascimento'] +' </td>     ' +
								'<td class=""> ' + item['Endereco']       +' </td>     ' +
								'<td class=""> ' + item['Telefone']       +' </td>     ' +
								'<td class=""> ' + item['CPO']         	  +' </td>     ' +
								'<td class=""> ' + item['ART0']        	  +' </td>     ' +
								'<td class=""> ' + item['CEO']         	  +' </td>     ' +
								'<td class=""> ' + item['ART1']        	  +' </td>     ' +
								'<td class=""> ' + item['RISCO']       	  +' </td>     ' +
								'<td class=""> ' + item['ClassRisco']  	  +' </td>     ' +
								'<td class=""> ' + item['Encaminhado']    +' </td>     ' +
								'<td class=""> ' + item['Autorizado']     +' </td>     ' +
								'<td class=""> ' + item['Colaborativo']   +' </td>     ' +
								'<td class=""> ' + item['Observacao']     +' </td>     ' +
								'</tr>                                                 ';
								
			}
			listaServicos.innerHTML += cabecalho + linhas + rodape;  
			},	
		seDerErro);
	});
}

function validou() {
	if (document.getElementById('ALUNO').value == "") {
		var $toastContent = $('<span>Preencha o Campo Aluno!</span>');
        //Materialize.toast($toastContent, 5000);
		return false;			
	} else {
		return true;	
	}
}

function novoAluno() {	
	
	if (MsgRegistro(1) == true) {
		novoIdAluno();
		
		if (validou()) {
	
		banco.transaction(function (tx) {
			var idAluno        = document.getElementById('idAluno').value;
			var ALUNOS         = document.getElementById('ALUNO').value;
			var CNS	           = document.getElementById('CNS').value;
			var SEXO           = document.getElementById('SEXO').value;
			var IDADE          = document.getElementById('IDADE').value;
			var ED   	       = document.getElementById('Endereco').value;
			var CPO	 	       = document.getElementById('CPO').value;
			var ART0 	       = document.getElementById('ART0').value;
			var CEO	 	       = document.getElementById('CEO').value;
			var ART1 	       = document.getElementById('ART1').value;
			var RISCO          = document.getElementById('RISCO').value;
			var ClassRisco     = document.getElementById('ClassRisco').value;
			var Observacao     = document.getElementById('Observacao').value;
			var Telefone 	   = document.getElementById('Telefone').value;
			var DataNascimento = document.getElementById('DataNascimento').value;
			var Encaminhado    = document.getElementById('Encaminhado').value;
			var Autorizado     = document.getElementById('Autorizado').value;
			var Colaborativo   = document.getElementById('Colaborativo').value;
			var turma          = document.getElementById('comboTurma').value;
			
			//dentes
			var dente55        = document.getElementById('dente55').value;
			var dente54        = document.getElementById('dente54').value;
			var dente53        = document.getElementById('dente53').value;
			var dente52        = document.getElementById('dente52').value;
			var dente51        = document.getElementById('dente51').value;
			
			var dente65        = document.getElementById('dente65').value;
			var dente64        = document.getElementById('dente64').value;
			var dente63        = document.getElementById('dente63').value;
			var dente62        = document.getElementById('dente62').value;
			var dente61        = document.getElementById('dente61').value;
			
			var dente75        = document.getElementById('dente75').value;
			var dente74        = document.getElementById('dente74').value;
			var dente73        = document.getElementById('dente73').value;
			var dente72        = document.getElementById('dente72').value;
			var dente71        = document.getElementById('dente71').value;
			
			var dente85        = document.getElementById('dente85').value;
			var dente84        = document.getElementById('dente84').value;
			var dente83        = document.getElementById('dente83').value;
			var dente82        = document.getElementById('dente82').value;
			var dente81        = document.getElementById('dente81').value;
			
			var dente11        = document.getElementById('dente11').value;
			var dente12        = document.getElementById('dente12').value;
			var dente13        = document.getElementById('dente13').value;
			var dente14        = document.getElementById('dente14').value;
			var dente15        = document.getElementById('dente15').value;
			var dente16        = document.getElementById('dente16').value;
			var dente17        = document.getElementById('dente17').value;
			
			var dente21        = document.getElementById('dente21').value;
			var dente22        = document.getElementById('dente22').value;
			var dente23        = document.getElementById('dente23').value;
			var dente24        = document.getElementById('dente24').value;
			var dente25        = document.getElementById('dente25').value;
			var dente26        = document.getElementById('dente26').value;
			var dente27        = document.getElementById('dente27').value;
			
			var dente31        = document.getElementById('dente31').value;
			var dente32        = document.getElementById('dente32').value;
			var dente33        = document.getElementById('dente33').value;
			var dente34        = document.getElementById('dente34').value;
			var dente35        = document.getElementById('dente35').value;
			var dente36        = document.getElementById('dente36').value;
			var dente37        = document.getElementById('dente37').value;
						
			var dente41        = document.getElementById('dente41').value;
			var dente42        = document.getElementById('dente42').value;
			var dente43        = document.getElementById('dente43').value;
			var dente44        = document.getElementById('dente44').value;
			var dente45        = document.getElementById('dente45').value;
			var dente46        = document.getElementById('dente46').value;
			var dente47        = document.getElementById('dente47').value;
			

			ALUNOS 			= ALUNOS.toUpperCase(); 
			CNS	   			= CNS.toUpperCase();	  
			SEXO   			= SEXO.toUpperCase();  	
			IDADE  			= IDADE.toUpperCase(); 	
			ED     			= ED.toUpperCase();    
			CPO	   			= CPO.toUpperCase();	  
			ART0   			= ART0.toUpperCase();  
			CEO	   			= CEO.toUpperCase();	  
			ART1   			= ART1.toUpperCase();  
            RISCO  			= RISCO.toUpperCase();
			ClassRisco      = ClassRisco.toUpperCase();			
			Encaminhado     = Encaminhado.toUpperCase(); 
			Autorizado	    = Autorizado.toUpperCase(); 
			Colaborativo    = Colaborativo.toUpperCase(); 
			Observacao 		= Observacao.toUpperCase(); 		
			Telefone 		= Telefone.toUpperCase(); 		
			DataNascimento  = DataNascimento.toUpperCase();
			
			if (CPO=="") {
				CPO = "0";
			}
			
			if (ART0=="") {
				ART0 = "0";
			}
			
			if (CEO=="") {
				CEO = "0";
			}
			
			if (ART1=="") {
				ART1 = "0";
			}
			
			
			
			tx.executeSql('insert into TAluno (IdAluno, ClassRisco, turma, ALUNOS, CNS, SEXO, IDADE, CPO, ART0, CEO, ART1, RISCO,        '+
			              '                    Observacao, Endereco     , Telefone 	,DataNascimento, Encaminhado, Autorizado, Colaborativo, '+
						  '                                                                                                    '+
						  '                    dente55, dente54,dente53,dente52,dente51,dente65,dente64,dente63,dente62,dente61,                        '+
						  '                    dente85, dente84,dente83,dente82,dente81,dente75,dente74,dente73,dente72,dente71,                        '+
						  '  				   dente11, dente12, dente13 ,dente14, dente15, dente16, dente17, 											'+
						  '  				   dente21, dente22, dente23 ,dente24, dente25, dente26, dente27, 											'+
						  '  				   dente31, dente32, dente33 ,dente34, dente35, dente36, dente37, 											'+
						  '  				   dente41, dente42, dente43 ,dente44, dente45, dente46, dente47  											'+
					
						  
						  ''+
						  ')                                                                                                                            '+
						  '            values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?,?,?)',
			
			[idAluno, ClassRisco,turma,ALUNOS,CNS,SEXO,IDADE,CPO,ART0,CEO,ART1,RISCO,Observacao,ED,Telefone,DataNascimento,Encaminhado,Autorizado,Colaborativo,dente55,dente54,dente53,dente52,dente51,dente65,dente64,dente63,dente62,dente61, dente85,dente84,dente83,dente82,dente81,dente75,dente74,dente73,dente72,dente71, dente11, dente12, dente13 ,dente14, dente15, dente16, dente17, dente21, dente22, dente23 ,dente24, dente25, dente26, dente27, dente31, dente32, dente33 ,dente34, dente35, dente36, dente37, dente41, dente42, dente43 ,dente44, dente45, dente46, dente47],
			function (tx) {; 
				mostrarAlunos();
				seDerCerto(1);
				
			},
			seDerErro);
		});	
	}	

	}

}

function novoIdAluno() {
	banco.transaction(function (tx) {
		var idAluno = document.getElementById('idAluno');
	
	    texto = 'select MAX(IdAluno) Id from TAluno'
	
		tx.executeSql(texto ,
		[],
		
		function (tx, results) {
			
			item = results.rows.item(0);
			
			valor = 0;
			valor = item['Id'];
			
			if (valor >=0 ) {
				idAluno.value = item['Id'] + 1 ; 
			} else {
				idAluno.value = 1; 	
			}
				
		},
		seDerErro);
	});
}

function atualizaAluno() {
		
	if (MsgRegistro(2) == true) {
			var idAluno   = document.getElementById('idAluno').value;
	
			var ALUNOS			= document.getElementById('ALUNO').value;
			var CNS	    		= document.getElementById('CNS').value;
			var SEXO			= document.getElementById('SEXO').value;
			var IDADE	        = document.getElementById('IDADE').value;
			var ED   			= document.getElementById('Endereco').value;
			var CPO	 			= document.getElementById('CPO').value;
			var ART0 			= document.getElementById('ART0').value;
			var CEO	 			= document.getElementById('CEO').value;
			var ART1 			= document.getElementById('ART1').value;
			var RISCO      		= document.getElementById('RISCO').value;
			var ClassRisco 		= document.getElementById('ClassRisco').value;
			var Observacao 		= document.getElementById('Observacao').value;
			var Telefone 		= document.getElementById('Telefone').value;
			var DataNascimento  = document.getElementById('DataNascimento').value;
			var Encaminhado 	= document.getElementById('Encaminhado').value;
			var Autorizado  	= document.getElementById('Autorizado').value;
			var Colaborativo	= document.getElementById('Colaborativo').value;
			var turma           = document.getElementById('comboTurma').value;
	
			
			//dentes
			var dente55        = document.getElementById('dente55').value;
			var dente54        = document.getElementById('dente54').value;
			var dente53        = document.getElementById('dente53').value;
			var dente52        = document.getElementById('dente52').value;
			var dente51        = document.getElementById('dente51').value;
			
			var dente65        = document.getElementById('dente65').value;
			var dente64        = document.getElementById('dente64').value;
			var dente63        = document.getElementById('dente63').value;
			var dente62        = document.getElementById('dente62').value;
			var dente61        = document.getElementById('dente61').value;

			var dente75        = document.getElementById('dente75').value;
			var dente74        = document.getElementById('dente74').value;
			var dente73        = document.getElementById('dente73').value;
			var dente72        = document.getElementById('dente72').value;
			var dente71        = document.getElementById('dente71').value;
			
			var dente85        = document.getElementById('dente85').value;
			var dente84        = document.getElementById('dente84').value;
			var dente83        = document.getElementById('dente83').value;
			var dente82        = document.getElementById('dente82').value;
			var dente81        = document.getElementById('dente81').value;		

			var dente11        = document.getElementById('dente11').value;
			var dente12        = document.getElementById('dente12').value;
			var dente13        = document.getElementById('dente13').value;
			var dente14        = document.getElementById('dente14').value;
			var dente15        = document.getElementById('dente15').value;
			var dente16        = document.getElementById('dente16').value;
			var dente17        = document.getElementById('dente17').value;
			
			var dente21        = document.getElementById('dente21').value;
			var dente22        = document.getElementById('dente22').value;
			var dente23        = document.getElementById('dente23').value;
			var dente24        = document.getElementById('dente24').value;
			var dente25        = document.getElementById('dente25').value;
			var dente26        = document.getElementById('dente26').value;
			var dente27        = document.getElementById('dente27').value;
			
			var dente31        = document.getElementById('dente31').value;
			var dente32        = document.getElementById('dente32').value;
			var dente33        = document.getElementById('dente33').value;
			var dente34        = document.getElementById('dente34').value;
			var dente35        = document.getElementById('dente35').value;
			var dente36        = document.getElementById('dente36').value;
			var dente37        = document.getElementById('dente37').value;
						
			var dente41        = document.getElementById('dente41').value;
			var dente42        = document.getElementById('dente42').value;
			var dente43        = document.getElementById('dente43').value;
			var dente44        = document.getElementById('dente44').value;
			var dente45        = document.getElementById('dente45').value;
			var dente46        = document.getElementById('dente46').value;
			var dente47        = document.getElementById('dente47').value;			
			
			ALUNOS = ALUNOS.toUpperCase(); 
			CNS	   = CNS.toUpperCase();	  
			SEXO   = SEXO.toUpperCase();  	
			IDADE  = IDADE.toUpperCase(); 	
			ED     = ED.toUpperCase();    
			CPO	   = CPO.toUpperCase();	  
			ART0   = ART0.toUpperCase();  
			CEO	   = CEO.toUpperCase();	  
			ART1   = ART1.toUpperCase();  
            RISCO  = RISCO.toUpperCase(); 
			ClassRisco  = ClassRisco.toUpperCase(); 
			
			
			Encaminhado   = Encaminhado.toUpperCase(); 
			Autorizado	  = Autorizado.toUpperCase(); 
			Colaborativo  = Colaborativo.toUpperCase(); 
			
			
			
			Observacao 		= Observacao.toUpperCase(); 		
			//Endereco        = Endereco.toUpperCase();      
			Telefone 		= Telefone.toUpperCase(); 		
			DataNascimento  = DataNascimento.toUpperCase();
			
	
				
	
		banco.transaction(function (tx) {
		tx.executeSql(' update TAluno set ALUNOS=?,	ClassRisco = ?, turma = ? ,CNS=?	, SEXO=?	, IDADE=?	,           					'+
					'                   ED=?	,  CPO=?	, ART0=?	, CEO=?	, ART1=?	, RISCO=?,          					'+
					'                   Observacao=?, Endereco=?, Telefone=?,  DataNascimento=?, Encaminhado=?, 					'+ 
					'                   Autorizado=?, Colaborativo=?,                          					'+
					'                   dente55=?,dente54=?,dente53=?,dente52=?,dente51=?,dente65=?,dente64=?,dente63=?,dente62=?,dente61=?,  '+
					'                   dente85=?,dente84=?,dente83=?,dente82=?,dente81=?,dente75=?,dente74=?,dente73=?,dente72=?,dente71=?,  '+
					'  				  dente11 = ?, dente12 = ?, dente13 = ?, dente14 = ?, dente15 = ?, dente16 = ?, dente17 = ?, 			'+
					'  				  dente21 = ?, dente22 = ?, dente23 = ?, dente24 = ?, dente25 = ?, dente26 = ?, dente27 = ?, 			'+
					'  				  dente31 = ?, dente32 = ?, dente33 = ?, dente34 = ?, dente35 = ?, dente36 = ?, dente37 = ?, 			'+
					'  				  dente41 = ?, dente42 = ?, dente43 = ?, dente44 = ?, dente45 = ?, dente46 = ?, dente47 = ?  			'+
						
					
					'where IdAluno = ?                                                                                     ', 
					
		[ALUNOS,	ClassRisco,turma,CNS	, SEXO	, IDADE	, ED	,  CPO	, ART0	, CEO	, ART1	, RISCO, Observacao, ED, Telefone,  DataNascimento, Encaminhado, Autorizado, Colaborativo, dente55,dente54,dente53,dente52,dente51,dente65,dente64,dente63,dente62,dente61,   dente85,dente84,dente83,dente82,dente81,dente75,dente74,dente73,dente72,dente71, dente11, dente12, dente13 ,dente14, dente15, dente16, dente17, dente21, dente22, dente23 ,dente24, dente25, dente26, dente27, dente31, dente32, dente33 ,dente34, dente35, dente36, dente37, dente41, dente42, dente43 ,dente44, dente45, dente46, dente47,idAluno], 
		function (tx, results) {
			seDerCerto(2);
			mostrarAlunos();	
		}, 
			seDerErro);
		});
		
	}
	
}

function excluiAluno() {
	
	if (MsgRegistro(3) == true) {
		var IdAluno = document.getElementById('idAluno').value;
		banco.transaction(function (tx) {
		tx.executeSql(' delete from TAluno where IdAluno = ?', 
		[IdAluno], 
		function (tx, results) {
			seDerCerto(3);
			mostrarAlunos();
			novoIdAluno();		
		}, 
			seDerErro);
		});
	}
}

function alterarAluno(IdAluno) {	
	banco.transaction(function (tx) {
		tx.executeSql('select * from TAluno where IdAluno = ?',
		[IdAluno],
		function (tx, results) {
			var item = results.rows.item(0);
			
			
			var idAluno         = document.getElementById('idAluno');
			
			var ALUNOS	 		= document.getElementById('ALUNO');
			var CNS	     		= document.getElementById('CNS');
			var SEXO	 		= document.getElementById('SEXO');
			var IDADE	 		= document.getElementById('IDADE');
			var ED  			= document.getElementById('Endereco');
			var CPO				= document.getElementById('CPO');
			var ART0			= document.getElementById('ART0');
			var CEO				= document.getElementById('CEO');
			var ART1			= document.getElementById('ART1');
			var RISCO       	= document.getElementById('RISCO');
			var ClassRisco  	= document.getElementById('ClassRisco');
			var Observacao 		= document.getElementById('Observacao');
			var Endereco   		= document.getElementById('Endereco');
			var Telefone   		= document.getElementById('Telefone');
			var DataNascimento  = document.getElementById('DataNascimento');
			var Encaminhado     = document.getElementById('Encaminhado');
			var Autorizado      = document.getElementById('Autorizado');
			var Colaborativo    = document.getElementById('Colaborativo');
			//var turma           = document.getElementById('comboTurma');
			
			//dentes
			
			var dente55        = document.getElementById('dente55');
			var dente54        = document.getElementById('dente54');
			var dente53        = document.getElementById('dente53');
			var dente52        = document.getElementById('dente52');
			var dente51        = document.getElementById('dente51');
			
			var dente65        = document.getElementById('dente65');
			var dente64        = document.getElementById('dente64');
			var dente63        = document.getElementById('dente63');
			var dente62        = document.getElementById('dente62');
			var dente61        = document.getElementById('dente61');

			var dente75        = document.getElementById('dente75');
			var dente74        = document.getElementById('dente74');
			var dente73        = document.getElementById('dente73');
			var dente72        = document.getElementById('dente72');
			var dente71        = document.getElementById('dente71');
			
			var dente85        = document.getElementById('dente85');
			var dente84        = document.getElementById('dente84');
			var dente83        = document.getElementById('dente83');
			var dente82        = document.getElementById('dente82');
			var dente81        = document.getElementById('dente81');

			var dente11        = document.getElementById('dente11');
			var dente12        = document.getElementById('dente12');
			var dente13        = document.getElementById('dente13');
			var dente14        = document.getElementById('dente14');
			var dente15        = document.getElementById('dente15');
			var dente16        = document.getElementById('dente16');
			var dente17        = document.getElementById('dente17');
			
			var dente21        = document.getElementById('dente21');
			var dente22        = document.getElementById('dente22');
			var dente23        = document.getElementById('dente23');
			var dente24        = document.getElementById('dente24');
			var dente25        = document.getElementById('dente25');
			var dente26        = document.getElementById('dente26');
			var dente27        = document.getElementById('dente27');
			
			var dente31        = document.getElementById('dente31');
			var dente32        = document.getElementById('dente32');
			var dente33        = document.getElementById('dente33');
			var dente34        = document.getElementById('dente34');
			var dente35        = document.getElementById('dente35');
			var dente36        = document.getElementById('dente36');
			var dente37        = document.getElementById('dente37');
						
			var dente41        = document.getElementById('dente41');
			var dente42        = document.getElementById('dente42');
			var dente43        = document.getElementById('dente43');
			var dente44        = document.getElementById('dente44');
			var dente45        = document.getElementById('dente45');
			var dente46        = document.getElementById('dente46');
			var dente47        = document.getElementById('dente47');			
			
			idAluno.value        = IdAluno;
        	ALUNOS.value	 	 = item['ALUNOS'];
			CNS.value		 	 = item['CNS'];
			IDADE.value		 	 = item['IDADE'];
			ED.value   		 	 = item['Endereco'];
			CPO.value		 	 = item['CPO'];
			ART0.value 		 	 = item['ART0'];
			CEO.value		 	 = item['CEO'];
			ART1.value 		 	 = item['ART1'];
			Observacao.value 	 = item['Observacao'];
			Telefone.value 		 = item['Telefone'];
			DataNascimento.value = item['DataNascimento'];
			//turma.selectedIndex  = item['turma']-1;
			
			if (item['SEXO'] == "MASCULINO") {
				SEXO.selectedIndex = 0;	
			}
			
			if (item['SEXO'] == "FEMININO") {
				SEXO.selectedIndex = 1;	
			}
			
			
			
			if (item['Encaminhado'] == "SIM") {
				Encaminhado.selectedIndex = 1;	
			}
			
			if (item['Encaminhado'] == "NAO") {
				Encaminhado.selectedIndex = 0;
			}
			
			if (item['Autorizado'] == "SIM") {
				Autorizado.selectedIndex = 0;	
			}
			
			if (item['Autorizado'] == "NAO") {
				Autorizado.selectedIndex = 1;
			}
			
			if (item['Colaborativo'] == "SIM") {
				Colaborativo.selectedIndex = 0;	
			}
			
			if (item['Colaborativo'] == "NAO") {
				Colaborativo.selectedIndex = 1;
			}
			
				
	
			if (item['RISCO'] == "0") {
				RISCO.selectedIndex = 0;	
			}			
			
			if (item['RISCO'] == "ALTO") {
				RISCO.selectedIndex = 1;	
			}
			
			if (item['RISCO'] == "MEDIO") {
				RISCO.selectedIndex = 2;
			}
			
			if (item['RISCO'] == "BAIXO") {
				RISCO.selectedIndex = 3;
			}			
			
			if (item['ClassRisco'] == "1") {
				ClassRisco.selectedIndex = 1;
			}
			
			if (item['ClassRisco'] == "2") {
				ClassRisco.selectedIndex = 2;
			}
			
			if (item['ClassRisco'] == "3") {
				ClassRisco.selectedIndex = 3;
			}
			
			//dentes 55	
			if (item['dente55'] != "") {	
				var indice = "";
				var valorDente = item['dente55'];	
				if (valorDente=="A") {
					indice = 0	
				} else if (valorDente=="B") {
					indice = 1
				} else if (valorDente=="C") {
					indice = 2
				} else if (valorDente=="D") {
					indice = 3
				} else if (valorDente=="E") {
					indice = 4
				} else if (valorDente=="F") {
					indice = 5
				} else if (valorDente=="G") {
					indice = 6
				} else if (valorDente=="T") {
					indice = 7
				}			
				dente55.selectedIndex = indice;
			}
			
			if (item['dente54'] != "") {	
				var indice = "";
				var valorDente = item['dente54'];	
				if (valorDente=="A") {
					indice = 0	
				} else if (valorDente=="B") {
					indice = 1
				} else if (valorDente=="C") {
					indice = 2
				} else if (valorDente=="D") {
					indice = 3
				} else if (valorDente=="E") {
					indice = 4
				} else if (valorDente=="F") {
					indice = 5
				} else if (valorDente=="G") {
					indice = 6
				} else if (valorDente=="T") {
					indice = 7
				}			
				dente54.selectedIndex = indice;
			}
			
			if (item['dente53'] != "") {	
				var indice = "";
				var valorDente = item['dente53'];	
				if (valorDente=="A") {
					indice = 0	
				} else if (valorDente=="B") {
					indice = 1
				} else if (valorDente=="C") {
					indice = 2
				} else if (valorDente=="D") {
					indice = 3
				} else if (valorDente=="E") {
					indice = 4
				} else if (valorDente=="F") {
					indice = 5
				} else if (valorDente=="G") {
					indice = 6
				} else if (valorDente=="T") {
					indice = 7
				}			
				dente53.selectedIndex = indice;
			}
						
			if (item['dente52'] != "") {	
				var indice = "";
				var valorDente = item['dente52'];	
				if (valorDente=="A") {
					indice = 0	
				} else if (valorDente=="B") {
					indice = 1
				} else if (valorDente=="C") {
					indice = 2
				} else if (valorDente=="D") {
					indice = 3
				} else if (valorDente=="E") {
					indice = 4
				} else if (valorDente=="F") {
					indice = 5
				} else if (valorDente=="G") {
					indice = 6
				} else if (valorDente=="T") {
					indice = 7
				}			
				dente52.selectedIndex = indice;
			} 

			if (item['dente51'] != "") {	
				var indice = "";
				var valorDente = item['dente51'];	
				if (valorDente=="A") {
					indice = 0	
				} else if (valorDente=="B") {
					indice = 1
				} else if (valorDente=="C") {
					indice = 2
				} else if (valorDente=="D") {
					indice = 3
				} else if (valorDente=="E") {
					indice = 4
				} else if (valorDente=="F") {
					indice = 5
				} else if (valorDente=="G") {
					indice = 6
				} else if (valorDente=="T") {
					indice = 7
				}			
				dente51.selectedIndex = indice;
			}

			if (item['dente65'] != "") {	
				var indice = "";
				var valorDente = item['dente65'];	
				if (valorDente=="A") {
					indice = 0	
				} else if (valorDente=="B") {
					indice = 1
				} else if (valorDente=="C") {
					indice = 2
				} else if (valorDente=="D") {
					indice = 3
				} else if (valorDente=="E") {
					indice = 4
				} else if (valorDente=="F") {
					indice = 5
				} else if (valorDente=="G") {
					indice = 6
				} else if (valorDente=="T") {
					indice = 7
				}			
				dente65.selectedIndex = indice;
			}

			if (item['dente64'] != "") {	
				var indice = "";
				var valorDente = item['dente64'];	
				if (valorDente=="A") {
					indice = 0	
				} else if (valorDente=="B") {
					indice = 1
				} else if (valorDente=="C") {
					indice = 2
				} else if (valorDente=="D") {
					indice = 3
				} else if (valorDente=="E") {
					indice = 4
				} else if (valorDente=="F") {
					indice = 5
				} else if (valorDente=="G") {
					indice = 6
				} else if (valorDente=="T") {
					indice = 7
				}			
				dente64.selectedIndex = indice;
			}

			if (item['dente63'] != "") {	
				var indice = "";
				var valorDente = item['dente63'];	
				if (valorDente=="A") {
					indice = 0	
				} else if (valorDente=="B") {
					indice = 1
				} else if (valorDente=="C") {
					indice = 2
				} else if (valorDente=="D") {
					indice = 3
				} else if (valorDente=="E") {
					indice = 4
				} else if (valorDente=="F") {
					indice = 5
				} else if (valorDente=="G") {
					indice = 6
				} else if (valorDente=="T") {
					indice = 7
				}			
				dente63.selectedIndex = indice;
			}
	
			if (item['dente62'] != "") {	
				var indice = "";
				var valorDente = item['dente62'];	
				if (valorDente=="A") {
					indice = 0	
				} else if (valorDente=="B") {
					indice = 1
				} else if (valorDente=="C") {
					indice = 2
				} else if (valorDente=="D") {
					indice = 3
				} else if (valorDente=="E") {
					indice = 4
				} else if (valorDente=="F") {
					indice = 5
				} else if (valorDente=="G") {
					indice = 6
				} else if (valorDente=="T") {
					indice = 7
				}			
				dente62.selectedIndex = indice;
			}

			if (item['dente61'] != "") {	
				var indice = "";
				var valorDente = item['dente61'];	
				if (valorDente=="A") {
					indice = 0	
				} else if (valorDente=="B") {
					indice = 1
				} else if (valorDente=="C") {
					indice = 2
				} else if (valorDente=="D") {
					indice = 3
				} else if (valorDente=="E") {
					indice = 4
				} else if (valorDente=="F") {
					indice = 5
				} else if (valorDente=="G") {
					indice = 6
				} else if (valorDente=="T") {
					indice = 7
				}			
				dente61.selectedIndex = indice;
			}
	
	
			if (item['dente75'] != "") {	
				var indice = "";
				var valorDente = item['dente75'];	
				if (valorDente=="A") {
					indice = 0	
				} else if (valorDente=="B") {
					indice = 1
				} else if (valorDente=="C") {
					indice = 2
				} else if (valorDente=="D") {
					indice = 3
				} else if (valorDente=="E") {
					indice = 4
				} else if (valorDente=="F") {
					indice = 5
				} else if (valorDente=="G") {
					indice = 6
				} else if (valorDente=="T") {
					indice = 7
				}			
				dente75.selectedIndex = indice;
			}

			if (item['dente74'] != "") {	
				var indice = "";
				var valorDente = item['dente74'];	
				if (valorDente=="A") {
					indice = 0	
				} else if (valorDente=="B") {
					indice = 1
				} else if (valorDente=="C") {
					indice = 2
				} else if (valorDente=="D") {
					indice = 3
				} else if (valorDente=="E") {
					indice = 4
				} else if (valorDente=="F") {
					indice = 5
				} else if (valorDente=="G") {
					indice = 6
				} else if (valorDente=="T") {
					indice = 7
				}			
				dente74.selectedIndex = indice;
			}

			if (item['dente73'] != "") {	
				var indice = "";
				var valorDente = item['dente73'];	
				if (valorDente=="A") {
					indice = 0	
				} else if (valorDente=="B") {
					indice = 1
				} else if (valorDente=="C") {
					indice = 2
				} else if (valorDente=="D") {
					indice = 3
				} else if (valorDente=="E") {
					indice = 4
				} else if (valorDente=="F") {
					indice = 5
				} else if (valorDente=="G") {
					indice = 6
				} else if (valorDente=="T") {
					indice = 7
				}			
				dente73.selectedIndex = indice;
			}
	
			if (item['dente72'] != "") {	
				var indice = "";
				var valorDente = item['dente72'];	
				if (valorDente=="A") {
					indice = 0	
				} else if (valorDente=="B") {
					indice = 1
				} else if (valorDente=="C") {
					indice = 2
				} else if (valorDente=="D") {
					indice = 3
				} else if (valorDente=="E") {
					indice = 4
				} else if (valorDente=="F") {
					indice = 5
				} else if (valorDente=="G") {
					indice = 6
				} else if (valorDente=="T") {
					indice = 7
				}			
				dente72.selectedIndex = indice;
			}

			if (item['dente71'] != "") {	
				var indice = "";
				var valorDente = item['dente71'];	
				if (valorDente=="A") {
					indice = 0	
				} else if (valorDente=="B") {
					indice = 1
				} else if (valorDente=="C") {
					indice = 2
				} else if (valorDente=="D") {
					indice = 3
				} else if (valorDente=="E") {
					indice = 4
				} else if (valorDente=="F") {
					indice = 5
				} else if (valorDente=="G") {
					indice = 6
				} else if (valorDente=="T") {
					indice = 7
				}			
				dente71.selectedIndex = indice;
			}


			if (item['dente85'] != "") {	
				var indice = "";
				var valorDente = item['dente85'];	
				if (valorDente=="A") {
					indice = 0	
				} else if (valorDente=="B") {
					indice = 1
				} else if (valorDente=="C") {
					indice = 2
				} else if (valorDente=="D") {
					indice = 3
				} else if (valorDente=="E") {
					indice = 4
				} else if (valorDente=="F") {
					indice = 5
				} else if (valorDente=="G") {
					indice = 6
				} else if (valorDente=="T") {
					indice = 7
				}			
				dente85.selectedIndex = indice;
			}

			if (item['dente84'] != "") {	
				var indice = "";
				var valorDente = item['dente84'];	
				if (valorDente=="A") {
					indice = 0	
				} else if (valorDente=="B") {
					indice = 1
				} else if (valorDente=="C") {
					indice = 2
				} else if (valorDente=="D") {
					indice = 3
				} else if (valorDente=="E") {
					indice = 4
				} else if (valorDente=="F") {
					indice = 5
				} else if (valorDente=="G") {
					indice = 6
				} else if (valorDente=="T") {
					indice = 7
				}			
				dente84.selectedIndex = indice;
			}

			if (item['dente83'] != "") {	
				var indice = "";
				var valorDente = item['dente83'];	
				if (valorDente=="A") {
					indice = 0	
				} else if (valorDente=="B") {
					indice = 1
				} else if (valorDente=="C") {
					indice = 2
				} else if (valorDente=="D") {
					indice = 3
				} else if (valorDente=="E") {
					indice = 4
				} else if (valorDente=="F") {
					indice = 5
				} else if (valorDente=="G") {
					indice = 6
				} else if (valorDente=="T") {
					indice = 7
				}			
				dente83.selectedIndex = indice;
			}
	
			if (item['dente82'] != "") {	
				var indice = "";
				var valorDente = item['dente82'];	
				if (valorDente=="A") {
					indice = 0	
				} else if (valorDente=="B") {
					indice = 1
				} else if (valorDente=="C") {
					indice = 2
				} else if (valorDente=="D") {
					indice = 3
				} else if (valorDente=="E") {
					indice = 4
				} else if (valorDente=="F") {
					indice = 5
				} else if (valorDente=="G") {
					indice = 6
				} else if (valorDente=="T") {
					indice = 7
				}			
				dente82.selectedIndex = indice;
			}

			if (item['dente81'] != "") {	
				var indice = "";
				var valorDente = item['dente81'];	
				if (valorDente=="A") {
					indice = 0	
				} else if (valorDente=="B") {
					indice = 1
				} else if (valorDente=="C") {
					indice = 2
				} else if (valorDente=="D") {
					indice = 3
				} else if (valorDente=="E") {
					indice = 4
				} else if (valorDente=="F") {
					indice = 5
				} else if (valorDente=="G") {
					indice = 6
				} else if (valorDente=="T") {
					indice = 7
				}			
				dente81.selectedIndex = indice;
			}


			if (item['dente11'] != "") {	
				var indice = "";
				var valorDente = item['dente11'];	
				if (valorDente=="0") {
					indice = 0	
				} else if (valorDente=="1") {
					indice = 1
				} else if (valorDente=="2") {
					indice = 2
				} else if (valorDente=="3") {
					indice = 3
				} else if (valorDente=="4") {
					indice = 4
				} else if (valorDente=="5") {
					indice = 5
				} else if (valorDente=="6") {
					indice = 6
				} else if (valorDente=="7") {
					indice = 7
				} else if (valorDente=="8") {
					indice = 8
				} else if (valorDente=="9") {
					indice = 9
				} else if (valorDente=="T") {
					indice = 10
				}							
				dente11.selectedIndex = indice;
			}

			if (item['dente12'] != "") {	
				var indice = "";
				var valorDente = item['dente12'];	
				if (valorDente=="0") {
					indice = 0	
				} else if (valorDente=="1") {
					indice = 1
				} else if (valorDente=="2") {
					indice = 2
				} else if (valorDente=="3") {
					indice = 3
				} else if (valorDente=="4") {
					indice = 4
				} else if (valorDente=="5") {
					indice = 5
				} else if (valorDente=="6") {
					indice = 6
				} else if (valorDente=="7") {
					indice = 7
				} else if (valorDente=="8") {
					indice = 8
				} else if (valorDente=="9") {
					indice = 9
				} else if (valorDente=="T") {
					indice = 10
				}							
				dente12.selectedIndex = indice;
			}

			if (item['dente13'] != "") {	
				var indice = "";
				var valorDente = item['dente13'];	
				if (valorDente=="0") {
					indice = 0	
				} else if (valorDente=="1") {
					indice = 1
				} else if (valorDente=="2") {
					indice = 2
				} else if (valorDente=="3") {
					indice = 3
				} else if (valorDente=="4") {
					indice = 4
				} else if (valorDente=="5") {
					indice = 5
				} else if (valorDente=="6") {
					indice = 6
				} else if (valorDente=="7") {
					indice = 7
				} else if (valorDente=="8") {
					indice = 8
				} else if (valorDente=="9") {
					indice = 9
				} else if (valorDente=="T") {
					indice = 10
				}							
				dente13.selectedIndex = indice;
			}

			if (item['dente14'] != "") {	
				var indice = "";
				var valorDente = item['dente14'];	
				if (valorDente=="0") {
					indice = 0	
				} else if (valorDente=="1") {
					indice = 1
				} else if (valorDente=="2") {
					indice = 2
				} else if (valorDente=="3") {
					indice = 3
				} else if (valorDente=="4") {
					indice = 4
				} else if (valorDente=="5") {
					indice = 5
				} else if (valorDente=="6") {
					indice = 6
				} else if (valorDente=="7") {
					indice = 7
				} else if (valorDente=="8") {
					indice = 8
				} else if (valorDente=="9") {
					indice = 9
				} else if (valorDente=="T") {
					indice = 10
				}							
				dente14.selectedIndex = indice;
			}

			if (item['dente15'] != "") {	
				var indice = "";
				var valorDente = item['dente15'];	
				if (valorDente=="0") {
					indice = 0	
				} else if (valorDente=="1") {
					indice = 1
				} else if (valorDente=="2") {
					indice = 2
				} else if (valorDente=="3") {
					indice = 3
				} else if (valorDente=="4") {
					indice = 4
				} else if (valorDente=="5") {
					indice = 5
				} else if (valorDente=="6") {
					indice = 6
				} else if (valorDente=="7") {
					indice = 7
				} else if (valorDente=="8") {
					indice = 8
				} else if (valorDente=="9") {
					indice = 9
				} else if (valorDente=="T") {
					indice = 10
				}							
				dente15.selectedIndex = indice;
			}

			if (item['dente16'] != "") {	
				var indice = "";
				var valorDente = item['dente16'];	
				if (valorDente=="0") {
					indice = 0	
				} else if (valorDente=="1") {
					indice = 1
				} else if (valorDente=="2") {
					indice = 2
				} else if (valorDente=="3") {
					indice = 3
				} else if (valorDente=="4") {
					indice = 4
				} else if (valorDente=="5") {
					indice = 5
				} else if (valorDente=="6") {
					indice = 6
				} else if (valorDente=="7") {
					indice = 7
				} else if (valorDente=="8") {
					indice = 8
				} else if (valorDente=="9") {
					indice = 9
				} else if (valorDente=="T") {
					indice = 10
				}							
				dente16.selectedIndex = indice;
			}

			if (item['dente17'] != "") {	
				var indice = "";
				var valorDente = item['dente17'];	
				if (valorDente=="0") {
					indice = 0	
				} else if (valorDente=="1") {
					indice = 1
				} else if (valorDente=="2") {
					indice = 2
				} else if (valorDente=="3") {
					indice = 3
				} else if (valorDente=="4") {
					indice = 4
				} else if (valorDente=="5") {
					indice = 5
				} else if (valorDente=="6") {
					indice = 6
				} else if (valorDente=="7") {
					indice = 7
				} else if (valorDente=="8") {
					indice = 8
				} else if (valorDente=="9") {
					indice = 9
				} else if (valorDente=="T") {
					indice = 10
				}							
				dente17.selectedIndex = indice;
			}


			if (item['dente21'] != "") {	
				var indice = "";
				var valorDente = item['dente21'];	
				if (valorDente=="0") {
					indice = 0	
				} else if (valorDente=="1") {
					indice = 1
				} else if (valorDente=="2") {
					indice = 2
				} else if (valorDente=="3") {
					indice = 3
				} else if (valorDente=="4") {
					indice = 4
				} else if (valorDente=="5") {
					indice = 5
				} else if (valorDente=="6") {
					indice = 6
				} else if (valorDente=="7") {
					indice = 7
				} else if (valorDente=="8") {
					indice = 8
				} else if (valorDente=="9") {
					indice = 9
				} else if (valorDente=="T") {
					indice = 10
				}							
				dente21.selectedIndex = indice;
			}

			if (item['dente22'] != "") {	
				var indice = "";
				var valorDente = item['dente22'];	
				if (valorDente=="0") {
					indice = 0	
				} else if (valorDente=="1") {
					indice = 1
				} else if (valorDente=="2") {
					indice = 2
				} else if (valorDente=="3") {
					indice = 3
				} else if (valorDente=="4") {
					indice = 4
				} else if (valorDente=="5") {
					indice = 5
				} else if (valorDente=="6") {
					indice = 6
				} else if (valorDente=="7") {
					indice = 7
				} else if (valorDente=="8") {
					indice = 8
				} else if (valorDente=="9") {
					indice = 9
				} else if (valorDente=="T") {
					indice = 10
				}							
				dente22.selectedIndex = indice;
			}

			if (item['dente23'] != "") {	
				var indice = "";
				var valorDente = item['dente23'];	
				if (valorDente=="0") {
					indice = 0	
				} else if (valorDente=="1") {
					indice = 1
				} else if (valorDente=="2") {
					indice = 2
				} else if (valorDente=="3") {
					indice = 3
				} else if (valorDente=="4") {
					indice = 4
				} else if (valorDente=="5") {
					indice = 5
				} else if (valorDente=="6") {
					indice = 6
				} else if (valorDente=="7") {
					indice = 7
				} else if (valorDente=="8") {
					indice = 8
				} else if (valorDente=="9") {
					indice = 9
				} else if (valorDente=="T") {
					indice = 10
				}							
				dente23.selectedIndex = indice;
			}

			if (item['dente24'] != "") {	
				var indice = "";
				var valorDente = item['dente24'];	
				if (valorDente=="0") {
					indice = 0	
				} else if (valorDente=="1") {
					indice = 1
				} else if (valorDente=="2") {
					indice = 2
				} else if (valorDente=="3") {
					indice = 3
				} else if (valorDente=="4") {
					indice = 4
				} else if (valorDente=="5") {
					indice = 5
				} else if (valorDente=="6") {
					indice = 6
				} else if (valorDente=="7") {
					indice = 7
				} else if (valorDente=="8") {
					indice = 8
				} else if (valorDente=="9") {
					indice = 9
				} else if (valorDente=="T") {
					indice = 10
				}							
				dente24.selectedIndex = indice;
			}

			if (item['dente25'] != "") {	
				var indice = "";
				var valorDente = item['dente25'];	
				if (valorDente=="0") {
					indice = 0	
				} else if (valorDente=="1") {
					indice = 1
				} else if (valorDente=="2") {
					indice = 2
				} else if (valorDente=="3") {
					indice = 3
				} else if (valorDente=="4") {
					indice = 4
				} else if (valorDente=="5") {
					indice = 5
				} else if (valorDente=="6") {
					indice = 6
				} else if (valorDente=="7") {
					indice = 7
				} else if (valorDente=="8") {
					indice = 8
				} else if (valorDente=="9") {
					indice = 9
				} else if (valorDente=="T") {
					indice = 10
				}							
				dente25.selectedIndex = indice;
			}

			if (item['dente26'] != "") {	
				var indice = "";
				var valorDente = item['dente26'];	
				if (valorDente=="0") {
					indice = 0	
				} else if (valorDente=="1") {
					indice = 1
				} else if (valorDente=="2") {
					indice = 2
				} else if (valorDente=="3") {
					indice = 3
				} else if (valorDente=="4") {
					indice = 4
				} else if (valorDente=="5") {
					indice = 5
				} else if (valorDente=="6") {
					indice = 6
				} else if (valorDente=="7") {
					indice = 7
				} else if (valorDente=="8") {
					indice = 8
				} else if (valorDente=="9") {
					indice = 9
				} else if (valorDente=="T") {
					indice = 10
				}							
				dente26.selectedIndex = indice;
			}

			if (item['dente27'] != "") {	
				var indice = "";
				var valorDente = item['dente27'];	
				if (valorDente=="0") {
					indice = 0	
				} else if (valorDente=="1") {
					indice = 1
				} else if (valorDente=="2") {
					indice = 2
				} else if (valorDente=="3") {
					indice = 3
				} else if (valorDente=="4") {
					indice = 4
				} else if (valorDente=="5") {
					indice = 5
				} else if (valorDente=="6") {
					indice = 6
				} else if (valorDente=="7") {
					indice = 7
				} else if (valorDente=="8") {
					indice = 8
				} else if (valorDente=="9") {
					indice = 9
				} else if (valorDente=="T") {
					indice = 10
				}							
				dente27.selectedIndex = indice;
			}

			if (item['dente31'] != "") {	
				var indice = "";
				var valorDente = item['dente31'];	
				if (valorDente=="0") {
					indice = 0	
				} else if (valorDente=="1") {
					indice = 1
				} else if (valorDente=="2") {
					indice = 2
				} else if (valorDente=="3") {
					indice = 3
				} else if (valorDente=="4") {
					indice = 4
				} else if (valorDente=="5") {
					indice = 5
				} else if (valorDente=="6") {
					indice = 6
				} else if (valorDente=="7") {
					indice = 7
				} else if (valorDente=="8") {
					indice = 8
				} else if (valorDente=="9") {
					indice = 9
				} else if (valorDente=="T") {
					indice = 10
				}							
				dente31.selectedIndex = indice;
			}

			if (item['dente32'] != "") {	
				var indice = "";
				var valorDente = item['dente32'];	
				if (valorDente=="0") {
					indice = 0	
				} else if (valorDente=="1") {
					indice = 1
				} else if (valorDente=="2") {
					indice = 2
				} else if (valorDente=="3") {
					indice = 3
				} else if (valorDente=="4") {
					indice = 4
				} else if (valorDente=="5") {
					indice = 5
				} else if (valorDente=="6") {
					indice = 6
				} else if (valorDente=="7") {
					indice = 7
				} else if (valorDente=="8") {
					indice = 8
				} else if (valorDente=="9") {
					indice = 9
				} else if (valorDente=="T") {
					indice = 10
				}							
				dente32.selectedIndex = indice;
			}

			if (item['dente33'] != "") {	
				var indice = "";
				var valorDente = item['dente33'];	
				if (valorDente=="0") {
					indice = 0	
				} else if (valorDente=="1") {
					indice = 1
				} else if (valorDente=="2") {
					indice = 2
				} else if (valorDente=="3") {
					indice = 3
				} else if (valorDente=="4") {
					indice = 4
				} else if (valorDente=="5") {
					indice = 5
				} else if (valorDente=="6") {
					indice = 6
				} else if (valorDente=="7") {
					indice = 7
				} else if (valorDente=="8") {
					indice = 8
				} else if (valorDente=="9") {
					indice = 9
				} else if (valorDente=="T") {
					indice = 10
				}							
				dente33.selectedIndex = indice;
			}

			if (item['dente34'] != "") {	
				var indice = "";
				var valorDente = item['dente34'];	
				if (valorDente=="0") {
					indice = 0	
				} else if (valorDente=="1") {
					indice = 1
				} else if (valorDente=="2") {
					indice = 2
				} else if (valorDente=="3") {
					indice = 3
				} else if (valorDente=="4") {
					indice = 4
				} else if (valorDente=="5") {
					indice = 5
				} else if (valorDente=="6") {
					indice = 6
				} else if (valorDente=="7") {
					indice = 7
				} else if (valorDente=="8") {
					indice = 8
				} else if (valorDente=="9") {
					indice = 9
				} else if (valorDente=="T") {
					indice = 10
				}							
				dente34.selectedIndex = indice;
			}

			if (item['dente35'] != "") {	
				var indice = "";
				var valorDente = item['dente35'];	
				if (valorDente=="0") {
					indice = 0	
				} else if (valorDente=="1") {
					indice = 1
				} else if (valorDente=="2") {
					indice = 2
				} else if (valorDente=="3") {
					indice = 3
				} else if (valorDente=="4") {
					indice = 4
				} else if (valorDente=="5") {
					indice = 5
				} else if (valorDente=="6") {
					indice = 6
				} else if (valorDente=="7") {
					indice = 7
				} else if (valorDente=="8") {
					indice = 8
				} else if (valorDente=="9") {
					indice = 9
				} else if (valorDente=="T") {
					indice = 10
				}							
				dente35.selectedIndex = indice;
			}

			if (item['dente36'] != "") {	
				var indice = "";
				var valorDente = item['dente36'];	
				if (valorDente=="0") {
					indice = 0	
				} else if (valorDente=="1") {
					indice = 1
				} else if (valorDente=="2") {
					indice = 2
				} else if (valorDente=="3") {
					indice = 3
				} else if (valorDente=="4") {
					indice = 4
				} else if (valorDente=="5") {
					indice = 5
				} else if (valorDente=="6") {
					indice = 6
				} else if (valorDente=="7") {
					indice = 7
				} else if (valorDente=="8") {
					indice = 8
				} else if (valorDente=="9") {
					indice = 9
				} else if (valorDente=="T") {
					indice = 10
				}							
				dente36.selectedIndex = indice;
			}

			if (item['dente37'] != "") {	
				var indice = "";
				var valorDente = item['dente37'];	
				if (valorDente=="0") {
					indice = 0	
				} else if (valorDente=="1") {
					indice = 1
				} else if (valorDente=="2") {
					indice = 2
				} else if (valorDente=="3") {
					indice = 3
				} else if (valorDente=="4") {
					indice = 4
				} else if (valorDente=="5") {
					indice = 5
				} else if (valorDente=="6") {
					indice = 6
				} else if (valorDente=="7") {
					indice = 7
				} else if (valorDente=="8") {
					indice = 8
				} else if (valorDente=="9") {
					indice = 9
				} else if (valorDente=="T") {
					indice = 10
				}							
				dente37.selectedIndex = indice;
			}

			if (item['dente41'] != "") {	
				var indice = "";
				var valorDente = item['dente41'];	
				if (valorDente=="0") {
					indice = 0	
				} else if (valorDente=="1") {
					indice = 1
				} else if (valorDente=="2") {
					indice = 2
				} else if (valorDente=="3") {
					indice = 3
				} else if (valorDente=="4") {
					indice = 4
				} else if (valorDente=="5") {
					indice = 5
				} else if (valorDente=="6") {
					indice = 6
				} else if (valorDente=="7") {
					indice = 7
				} else if (valorDente=="8") {
					indice = 8
				} else if (valorDente=="9") {
					indice = 9
				} else if (valorDente=="T") {
					indice = 10
				}							
				dente41.selectedIndex = indice;
			}

			if (item['dente42'] != "") {	
				var indice = "";
				var valorDente = item['dente42'];	
				if (valorDente=="0") {
					indice = 0	
				} else if (valorDente=="1") {
					indice = 1
				} else if (valorDente=="2") {
					indice = 2
				} else if (valorDente=="3") {
					indice = 3
				} else if (valorDente=="4") {
					indice = 4
				} else if (valorDente=="5") {
					indice = 5
				} else if (valorDente=="6") {
					indice = 6
				} else if (valorDente=="7") {
					indice = 7
				} else if (valorDente=="8") {
					indice = 8
				} else if (valorDente=="9") {
					indice = 9
				} else if (valorDente=="T") {
					indice = 10
				}							
				dente42.selectedIndex = indice;
			}
			
			if (item['dente43'] != "") {	
				var indice = "";
				var valorDente = item['dente43'];	
				if (valorDente=="0") {
					indice = 0	
				} else if (valorDente=="1") {
					indice = 1
				} else if (valorDente=="2") {
					indice = 2
				} else if (valorDente=="3") {
					indice = 3
				} else if (valorDente=="4") {
					indice = 4
				} else if (valorDente=="5") {
					indice = 5
				} else if (valorDente=="6") {
					indice = 6
				} else if (valorDente=="7") {
					indice = 7
				} else if (valorDente=="8") {
					indice = 8
				} else if (valorDente=="9") {
					indice = 9
				} else if (valorDente=="T") {
					indice = 10
				}							
				dente43.selectedIndex = indice;
			}			

			if (item['dente44'] != "") {	
				var indice = "";
				var valorDente = item['dente44'];	
				if (valorDente=="0") {
					indice = 0	
				} else if (valorDente=="1") {
					indice = 1
				} else if (valorDente=="2") {
					indice = 2
				} else if (valorDente=="3") {
					indice = 3
				} else if (valorDente=="4") {
					indice = 4
				} else if (valorDente=="5") {
					indice = 5
				} else if (valorDente=="6") {
					indice = 6
				} else if (valorDente=="7") {
					indice = 7
				} else if (valorDente=="8") {
					indice = 8
				} else if (valorDente=="9") {
					indice = 9
				} else if (valorDente=="T") {
					indice = 10
				}							
				dente44.selectedIndex = indice;
			}			
	
			if (item['dente45'] != "") {	
				var indice = "";
				var valorDente = item['dente45'];	
				if (valorDente=="0") {
					indice = 0	
				} else if (valorDente=="1") {
					indice = 1
				} else if (valorDente=="2") {
					indice = 2
				} else if (valorDente=="3") {
					indice = 3
				} else if (valorDente=="4") {
					indice = 4
				} else if (valorDente=="5") {
					indice = 5
				} else if (valorDente=="6") {
					indice = 6
				} else if (valorDente=="7") {
					indice = 7
				} else if (valorDente=="8") {
					indice = 8
				} else if (valorDente=="9") {
					indice = 9
				} else if (valorDente=="T") {
					indice = 10
				}							
				dente45.selectedIndex = indice;
			}

			if (item['dente46'] != "") {	
				var indice = "";
				var valorDente = item['dente46'];	
				if (valorDente=="0") {
					indice = 0	
				} else if (valorDente=="1") {
					indice = 1
				} else if (valorDente=="2") {
					indice = 2
				} else if (valorDente=="3") {
					indice = 3
				} else if (valorDente=="4") {
					indice = 4
				} else if (valorDente=="5") {
					indice = 5
				} else if (valorDente=="6") {
					indice = 6
				} else if (valorDente=="7") {
					indice = 7
				} else if (valorDente=="8") {
					indice = 8
				} else if (valorDente=="9") {
					indice = 9
				} else if (valorDente=="T") {
					indice = 10
				}							
				dente46.selectedIndex = indice;
			}

			if (item['dente47'] != "") {	
				var indice = "";
				var valorDente = item['dente47'];	
				if (valorDente=="0") {
					indice = 0	
				} else if (valorDente=="1") {
					indice = 1
				} else if (valorDente=="2") {
					indice = 2
				} else if (valorDente=="3") {
					indice = 3
				} else if (valorDente=="4") {
					indice = 4
				} else if (valorDente=="5") {
					indice = 5
				} else if (valorDente=="6") {
					indice = 6
				} else if (valorDente=="7") {
					indice = 7
				} else if (valorDente=="8") {
					indice = 8
				} else if (valorDente=="9") {
					indice = 9
				} else if (valorDente=="T") {
					indice = 10
				}							
				dente47.selectedIndex = indice;
			}
	
			$(document).ready(function(){
				$('select').formSelect();
			});
			
		},	
		seDerErro);
	});
	
}

function somaTotais() {
	banco.transaction(function (tx) {
		
		
		texto = 'select count(IdAluno) as Qtde from TAluno '
	
		tx.executeSql(texto,
		[],
		
		function (tx, results) {
			var item = results.rows.item(0);
			
			var listaTotaisAlunos = document.getElementById('listaTotaisAlunos');
			var texto = item['Qtde'];
			
			listaTotaisAlunos.innerHTML = 'Quantidade Total de Alunos..: ' + texto;
				
		},
		seDerErro);
		
		
		
	    texto = 'select count(IdAluno) as QtdeMeninos from TAluno where SEXO = "MASCULINO"'
	
		tx.executeSql(texto,
		[],
		
		function (tx, results) {
			var item = results.rows.item(0);
			
			var listaTotaisMeninos = document.getElementById('listaTotaisMeninos');
			var texto = item['QtdeMeninos'];
			
			listaTotaisMeninos.innerHTML = 'Qtde Masculino..: ' + texto;
				
		},
		seDerErro);
		
		texto = 'select count(IdAluno) as QtdeMeninas from TAluno where SEXO = "FEMININO"'
	
		tx.executeSql(texto,
		[],
		
		function (tx, results) {
			var item = results.rows.item(0);
			
			var listaTotaisMeninas = document.getElementById('listaTotaisMeninas');
			var texto = item['QtdeMeninas'];
			
			listaTotaisMeninas.innerHTML = 'Qtde Feminino..: ' + texto;
				
		},
		seDerErro);
		
		
		/*texto = 'select sum(ED) as TotalED from Alunos '
	
		tx.executeSql(texto,
		[],
		
		function (tx, results) {
			var item = results.rows.item(0);
			
			var listaTotalED = document.getElementById('listaTotalED');
			var texto = item['TotalED'];
			
			listaTotalED.innerHTML = 'Total ED ..: ' + texto;
				
		},
		seDerErro);
		
		/*texto = 'select sum(CP) as TotalCP from Alunos '
	
		tx.executeSql(texto,
		[],
		
		function (tx, results) {
			var item = results.rows.item(0);
			
			var listaTotalCP = document.getElementById('listaTotalCP');
			var texto = item['TotalCP'];
			
			listaTotalCP.innerHTML = 'Total CP ..: ' + texto;
				
		},
		seDerErro);*/
		
		/*texto = 'select sum(ATF) as TotalATF from Alunos '
	
		tx.executeSql(texto,
		[],
		
		function (tx, results) {
			var item = results.rows.item(0);
			
			var listaTotalATF = document.getElementById('listaTotalATF');
			var texto = item['TotalATF'];
			
			listaTotalATF.innerHTML = 'Total ATF ..: ' + texto;
				
		},
		seDerErro);*/			
					
		texto = 'select sum(CPO) as TotalCPO from TAluno '
	
		tx.executeSql(texto,
		[],
		
		function (tx, results) {
			var item = results.rows.item(0);
			
			var listaTotalCPO = document.getElementById('listaTotalCPO');
			var texto = item['TotalCPO'];
			
			listaTotalCPO.innerHTML = 'Total CPO ..: ' + texto;
				
		},
		seDerErro);	

		
					
		texto = 'select sum(ART0) as TotalART0 from TAluno '
	
		tx.executeSql(texto,
		[],
		
		function (tx, results) {
			var item = results.rows.item(0);
			
			var listaTotalART0 = document.getElementById('listaTotalART0');
			var texto = item['TotalART0'];
			
			listaTotalART0.innerHTML = 'Total ATR(CPO) ..: ' + texto;
				
		},
		seDerErro);	
					
		
		texto = 'select sum(CEO) as TotalCEO from TAluno '
	
		tx.executeSql(texto,
		[],
		
		function (tx, results) {
			var item = results.rows.item(0);
			
			var listaTotalCEO = document.getElementById('listaTotalCEO');
			var texto = item['TotalCEO'];
			
			listaTotalCEO.innerHTML = 'Total CEO ..: ' + texto;
				
		},
		seDerErro);	

		
		
		texto = 'select sum(ART1) as TotalART1 from TAluno '
	
		tx.executeSql(texto,
		[],
		
		
		
		function (tx, results) {
			var item = results.rows.item(0);
			
			var listaTotalCPO = document.getElementById('listaTotalART1');
			var texto = item['TotalART1'];
			
			listaTotalART1.innerHTML = 'Total ART(CEO)..: ' + texto;
				
		},
		seDerErro);		
		

		
		
	});
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

function limpadados() {
	
			var ALUNOS	 = document.getElementById('ALUNO').value;
			var CNS	     = document.getElementById('CNS').value;
			var SEXO	 = document.getElementById('SEXO').value;
			var IDADE	 = document.getElementById('IDADE').value;
			var ED   = document.getElementById('Endereco').value;
			var CP	 = document.getElementById('CP').value;
			var ATF	 = document.getElementById('ATF').value;
			var CPO	 = document.getElementById('CPO').value;
			var ART0 = document.getElementById('ART0').value;
			var CEO	 = document.getElementById('CEO').value;
			var ART1 = document.getElementById('ART1').value;
			var RISCO = document.getElementById('RISCO').value;
	
			var Observacao = document.getElementById('Observacao').value;
			//var Endereco = document.getElementById('Endereco').value;
			var Telefone = document.getElementById('Telefone').value;
			var Selante = document.getElementById('Selante').value;
			var DataNascimento = document.getElementById('DataNascimento').value;
			var Encaminhado = document.getElementById('Encaminhado').value;
			var Autorizado = document.getElementById('Autorizado').value;
			var Colaborativo = document.getElementById('Colaborativo').value;
			
			ALUNOS 			= "";
			CNS	   			= "";
			SEXO   			= "";
			IDADE  			= "";
			ED     			= "";
			CP	   			= "";
			ATF	   			= "";
			CPO	   			= "";
			ART0   			= "";
			CEO	   			= "";
			ART1   			= "";
            RISCO  			= "";
			Encaminhado     = "";
			Autorizado	    = "";
			Colaborativo    = "";
			Observacao 		= "";	
			Telefone 		= "";
			Selante  		= "";
			DataNascimento  = "";
	
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





