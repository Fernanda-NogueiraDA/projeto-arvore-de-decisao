let acionamentoCount = 0;

document.getElementById('addAcionamento').addEventListener('click', addAcionamento);
document.getElementById('gerarArvore').addEventListener('click', gerarArvore);
document.getElementById('copiarTexto').addEventListener('click', copiarTexto);

function addAcionamento() {
  acionamentoCount++;
  console.log('Total acionamentos:', acionamentoCount);
  const div = document.createElement('div');
  div.classList.add('acionamento');
  div.id = `acionamento-${acionamentoCount}`;

  div.innerHTML = `
    <strong>Nível do Acionamento:</strong>
    <select id="nivel-${acionamentoCount}">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select><br>

    Data: <input type="date" id="data-${acionamentoCount}"><br>
    Hora: <input type="time" id="hora-${acionamentoCount}"><br>
    Responsável: <input type="text" id="responsavel-${acionamentoCount}"><br>

    Retorno do Nível:
    <select id="retorno-opcao-${acionamentoCount}" onchange="mostrarRetornoCampos(${acionamentoCount})">
      <option value="">Selecione</option>
      <option value="Previsao">Precisão</option>
      <option value="SemPrevisao">Sem previsão</option>
      <option value="AguardandoRetorno">Aguardando retorno</option>
    </select>

    <div id="retorno-campos-${acionamentoCount}"></div>

    <hr>
  `;

  document.getElementById('acionamentos').appendChild(div);
}

function mostrarRetornoCampos(index) {
  const motivoSelecionado = document.getElementById('motivo').value;
  const retornoOpcao = document.getElementById(`retorno-opcao-${index}`).value;
  const retornoDiv = document.getElementById(`retorno-campos-${index}`);

  retornoDiv.innerHTML = '';

  if (retornoOpcao === 'Previsao') {
    retornoDiv.innerHTML = `
      Data Retorno: <input type="date" id="retorno-data-${index}"><br>
      Hora Retorno: <input type="time" id="retorno-hora-${index}"><br>
    `;
  } else if (retornoOpcao === 'AguardandoRetorno') {
    if (!motivoSelecionado) {
      alert('Selecione um motivo antes de usar "Aguardando retorno".');
      document.getElementById(`retorno-opcao-${index}`).value = '';
    }
  }
}

function carregarDiagnosticos() {
  const motivo = document.getElementById('motivo').value;
  const diagnosticoSelect = document.getElementById('diagnostico');
  
  diagnosticoSelect.innerHTML = ''; 

  let opcoes = [];

  switch (motivo) {
    case 'Parada Não Programada':
      opcoes = [
        'AGUARDANDO DESLOCAMENTO PARA MANUTENÇÃO',
        'AGUARDANDO MANIFESTO - CTE',
        'AGAURDANDO MOTORISTA',
        'AGAURDANDO SOCORRO',
        'BORRACHARIA',
        'CARGA TOMBADA',
        'ENTREGA AGENDADA - AGUARDANDO HORARIO DE JANELA',
        'FADIGA/CANSAÇO',
        'FATORES FISIOLÓGICOS',
        'FERIADO',
        'PERNOITE',
        'POSTO FISCAL',
        'RESTRIÇÃO LOCAL',
        'RETRABALHO DE PALETES',
        'SEM JUSTIFICATIVA DA TRANSPORTADORA',
        'TRAJETO INTERDITADO',
        'TROCA DE NOTA FISCAL - OPERAÇÃO TRIÂNGULAR',
        'UNIDADE FECHADA',
        'TROCA DE TURNO'
      ];
      break;

    case 'Tempo Excedido no Destino':
      opcoes = [
        'AGUARDANDO CONTROLE DE RECEBIMENTO',
        'AGUARDANDO NOTA FISCAL',
        'AGUARDANDO PESAGEM',
        'ATRASO NO DESLOCAMENTO DO VEICULO ATÉ A DOCA - DESCARGA',
        'AVARIA NO PRODUTO',
        'CAPACIDADE DA OPERAÇÃO REDUZIDA NA DESCARGA',
        'CARGA INCOMPLETA - FALTA DE MERCADORIA',
        'CHEGADA ANTECIPADA',
        'CHEGADA EM COMBOIO',
        'CONDIÇÕES CLIMÁTICAS',
        'DEVOLUÇÃO DE CARGA - REPROVADA PELA QUALIDADE',
        'DOCA OCUPADA - AGUARDANDO DISPONIBILIDADE',
        'FALTA DE ESPAÇO FISÍCO',
        'MOTORISTA NÃO SE APRESENTOU PARA O DESCARREGAMENTO',
        'PERDA DE AGENDAMENTO - ATRASO NO CARREGAMENTO INICIAL',
        'PERDA DE AGENDAMENTO - ATRASO NO TRAJETO',
        'PRIORIZAÇÃO DE VEÍCULOS TERCEIROS',
        'RETRABALHO DE PALLETS',
        'SEM JUSTIFICATIVA NO DESTINO',
        'VEICULO BLOQUEADO'
      ];
      break;

    case 'Tempo Excedido na Origem':
      opcoes = [
        'ACIDENTE COM VEÍCULO DENTRO DA UNIDADE',
        'AGUARDANDO MANIFESTO - CTE',
        'AGUARDANDO NOTA FISCAL',
        'AGUARDANDO PESAGEM',
        'AGUARDANDO SEPARAÇÃO DO PRODUTO',
        'ATRASO NO DESLOCAMENTO DO VEÍCULO ATÉ A DOCA - CARREGAMENTO',
        'CAPACIDADE DA OPERAÇÃO REDUZIDA NO CARREGAMENTO',
        'CHEGADA ANTECIPADA',
        'CHEGADA EM COMBOIO',
        'CLIENTE SEM AGENCAMENTO PARA DESCARGA',
        'CONDIÇÕES CLIMÁTICAS',
        'DESCARREGAMENTO DE PALETE',
        'DIVERGÊNCIA DE PESO NA BALANÇA',
        'DOCA OCUPADA - AGUARDANDO DISPONIBILIDADE',
        'FALTA DE CATRAÇA',
        'FALTA DE ESPAÇO FISICO',
        'FALTA DE PRODUTO',
        'MOTORISTA NÃO SE APRESENTOU PARA O CARREGAMENTO',
        'PRIORIZAÇÃO DE VEÍCULOS TERCEIROS',
        'PRODUTO ESPECIAL',
        'PRODUTO SENDO AVALIADO PELO TIME DE QUALIDADE',
        'RETRABALHO DE PALETES',
        'SEFAZ - LENTIDÃO NO SISTEMA',
        'SEM JUSTIFICATIVA NA ORIGEM',
        'SISTEMA INOPERANTE',
        'UNIDADE EM INVENTÁRIO',
        'VEÍCULO AGUARDANDO AMARRAÇÃO',
        'VEÍCULO SEM PROGRAMAÇÃO NA UNIDADE'
      ];
      break;

    case 'Manutenção Corretiva':
      opcoes = ['MANUTENÇÃO CORRETIVA'];
      break;

    case 'Manutenção Preventiva':
      opcoes = ['MANUTENÇÃO PREVENTIVA'];
      break;

    case 'Refeição':
      diagnosticoSelect.outerHTML = '<input id="diagnostico" placeholder="Digite a descrição da Refeição">';
      return;

    case 'DSR':
      opcoes = ['MOTORISTA EM DESCANSO REMUNERADO'];
      break;

    case 'Parada Programada':
      opcoes = [
        'OCIOSO- FROTA BACKUP',
        'PERNOITE',
        'VEICULO DESATIVADO - FORA DE OPERAÇÃO',
        'VEICULO PARADO PARA ABASTECIMENTO'
      ];
      break;

    default:
      opcoes = [];
  }

  opcoes.forEach(opcao => {
    const option = document.createElement('option');
    option.textContent = opcao;
    diagnosticoSelect.appendChild(option);
  });
}

function gerarArvore() {
  const placa = document.getElementById('placa').value;
  const motivo = document.getElementById('motivo').value;
  const origem = document.getElementById('origem').value;
  const destino = document.getElementById('destino').value;
  const diagnosticoInput = document.getElementById('diagnostico');
  const diagnostico = diagnosticoInput.tagName === 'INPUT' ? diagnosticoInput.value : diagnosticoInput.value;
  const obs = document.getElementById('obs').value;

  let output = `PLACA: ${placa}\nORIGEM: ${origem}\nDESTINO: ${destino}\nMOTIVO: ${motivo}\nDIAGNÓSTICO: ${diagnostico}\nOBS: ${obs}\n\n`;

  for (let i = 1; i <= acionamentoCount; i++) {
    const nivel = document.getElementById(`nivel-${i}`).value;
    const dataIso = document.getElementById(`data-${i}`).value;
    const data = formatarData(dataIso);
    const hora = document.getElementById(`hora-${i}`).value;
    const responsavel = document.getElementById(`responsavel-${i}`).value;
    const retornoOpcao = document.getElementById(`retorno-opcao-${i}`).value;

    let retornoTexto = '';
    if (retornoOpcao === 'Previsao') {
      const retornoDataIso = document.getElementById(`retorno-data-${i}`).value;
      const retornoData = formatarData(retornoDataIso);
      const retornoHora = document.getElementById(`retorno-hora-${i}`).value;
      retornoTexto = `${retornoData} ${retornoHora}`;
    } else if (retornoOpcao === 'SemPrevisao') {
      retornoTexto = 'Sem previsão';
    } else if (retornoOpcao === 'AguardandoRetorno') {
      retornoTexto = 'Aguardando retorno';
    }

    output += `${nivel}° ACIONAMENTO:\nDATA E HORA: ${data} ${hora}\nRESPONSÁVEL: ${responsavel}\nRETORNO DO NÍVEL ${nivel}: ${retornoTexto}\n\n`;
  }
  document.getElementById('output').innerText = output.toUpperCase();
  
  if (acionamentoCount >= 3) {
  document.getElementById('enviarEmail').style.display = 'inline-block';
  } else {
  document.getElementById('enviarEmail').style.display = 'none';
  }
}


function copiarTexto() {
  const texto = document.getElementById('output').innerText;
  navigator.clipboard.writeText(texto).then(() => {
    alert('Texto copiado para a área de transferência!');
  });
}

function formatarData(dataIso) {
  if (!dataIso) return '';
  const [ano, mes, dia] = dataIso.split('-');
  return `${dia}/${mes}/${ano}`;
}

document.getElementById('enviarWhatsApp').addEventListener('click', enviarWhatsApp);

function enviarWhatsApp() {
  const texto = document.getElementById('output').innerText.trim();
  const textoEncoded = encodeURIComponent(texto);

  const link = `https://wa.me/?text=${textoEncoded}`;

  window.open(link, '_blank');
}

document.getElementById('enviarEmail').addEventListener('click', enviarEmail);

function enviarEmail() {
  const texto = document.getElementById('output').innerText.trim();
  const assunto = encodeURIComponent('Árvore de Escalonamento');
  const corpo = encodeURIComponent(texto);

  const mailtoLink = `mailto:DESTINATARIO@EXEMPLO.COM?subject=${assunto}&body=${corpo}`;

  window.open(mailtoLink, '_blank');
}