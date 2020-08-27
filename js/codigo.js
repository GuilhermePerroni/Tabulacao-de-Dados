var banco; //global


function seDerErro(tx, error) {	
	M.toast({html: 'Ocorreu o seguinte erro: ('+ error.message + ')! Verificar erro antes de continuar!'  , classes: "rounded red darken-4"})	
}


function seDerCerto(tx, error) {
	if (tx==1) {
		msg = "Inserido"
	} else if (tx==2) {
		msg = "Atualizado"
	} else if (tx==3) {
		msg = "Excluido"
	}
	
	M.toast({html: 'Registro ' + msg + ' Com Sucesso!', classes: "rounded teal lighten-2"})
					
}

function MsgRegistro(tx){
	
	if (tx==1) {
		msg = "Inserir"
	} else if (tx==2) {
		msg = "Atualizar"
	} else if (tx==3) {
		msg = "Excluir"
	}
	
	var r=confirm('Tem certeza que deseja '  +  msg + ' o registro ?');
	if (r==true)
	{
		return true;
	}
	else
	{
		return false;
	}
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


function MontaHome(){
	var Frame = document.getElementById('FramePrincipal');
	  
    Frame.setAttribute('src','Capa.html'); 
	Frame.setAttribute('width', '100%');
	Frame.setAttribute('height','750');

}


function MontaFrameTurma(){
	var Frame = document.getElementById('FramePrincipal');
	  
    Frame.setAttribute('src','sistema/turma/turma.html'); 
	Frame.setAttribute('width', '100%');
	Frame.setAttribute('height','750');

}


function MontaFrameProcedimentos(){
	var Frame = document.getElementById('FramePrincipal');
	  
    Frame.setAttribute('src','sistema/procedimentos/procedimentos.html'); 
	Frame.setAttribute('width', '100%');
	Frame.setAttribute('height','750');

}

function MontaFrameAluno(){
	var Frame = document.getElementById('FramePrincipal');
	  
    Frame.setAttribute('src','sistema/Aluno/Aluno.html'); 
	Frame.setAttribute('width', '100%');
	Frame.setAttribute('height','750');

}

function MontaFrameLancamentos(){
	var Frame = document.getElementById('FramePrincipal');
	  
    Frame.setAttribute('src','sistema/lancamentos/lancamentos.html'); 
	Frame.setAttribute('width', '100%');
	Frame.setAttribute('height','750');

}

function MontaFrameEscola(){
	var Frame = document.getElementById('FramePrincipal');
	  
    Frame.setAttribute('src','sistema/escola/escola.html'); 
	Frame.setAttribute('width', '100%');
	Frame.setAttribute('height','750');

}


function MontaFrameRelatorio(){
	var Frame = document.getElementById('FramePrincipal');
	  
    Frame.setAttribute('src','sistema/relatorio/relatorio.html'); 
	Frame.setAttribute('width', '100%');
	Frame.setAttribute('height','750');

}

function MontaFrameRelatorioPorTurma(){
	var Frame = document.getElementById('FramePrincipal');
	  
    Frame.setAttribute('src','sistema/relatorio/relatorioCPOCEO.html'); 
	Frame.setAttribute('width', '100%');
	Frame.setAttribute('height','750');

}

function MontaFrameRelatorioPorEscola(){
	var Frame = document.getElementById('FramePrincipal');
	  
    Frame.setAttribute('src','sistema/relatorio/relatorioPorEscola.html'); 
	Frame.setAttribute('width', '100%');
	Frame.setAttribute('height','750');

}





