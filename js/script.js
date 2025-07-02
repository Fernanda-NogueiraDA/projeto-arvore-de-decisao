let acionamentoCount = 0;

document.getElementById('addAcionamento').addEventListener('click', addAcionamento);
document.getElementById('gerarArvore').addEventListener('click', gerarArvore);
document.getElementById('copiarTexto').addEventListener('click', copiarTexto);

function addAcionamento() {
  acionamentoCount++;
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
      <option value="Previsao">Previsão</option>
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

function gerarArvore() {
  const placa = document.getElementById('placa').value;
  const motivo = document.getElementById('motivo').value;
  const origem = document.getElementById('origem').value;
  const destino = document.getElementById('destino').value;
  const diagnostico = document.getElementById('diagnostico').value;

  let output = `PLACA: ${placa}\nMOTIVO: ${motivo}\nORIGEM: ${origem}\nDESTINO: ${destino}\nDIAGNÓSTICO: ${diagnostico}\n\n`;

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

    output += `${nivel}°ACIONAMENTO: ${data} ${hora}\nRESPONSÁVEL: ${responsavel}\nRETORNO NÍVEL ${nivel}: ${retornoTexto}\n\n`;
  }

  document.getElementById('output').innerText = output.toUpperCase();
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
