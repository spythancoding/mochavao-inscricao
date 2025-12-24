const app = document.getElementById("app");
const params = new URLSearchParams(window.location.search);
const userId = params.get("uid");

if (!userId) {
  document.body.innerHTML = `
    <div style="
      min-height:100vh;
      display:flex;
      align-items:center;
      justify-content:center;
      background:#0f0f0f;
      color:#fff;
      font-family:Arial;
      text-align:center;
      padding:20px;
    ">
      <div>
        <h1>❌ Link inválido</h1>
        <p>Para realizar a inscrição, utilize o comando <b>/inscrever</b> no Discord.</p>
      </div>
    </div>
  `;
  throw new Error("Acesso inválido: uid ausente");
}


/* ================= COMPONENTES ================= */

function logo() {
  return `
    <div class="logo">
      <img src="assets/logo.png" alt="Família MoChavãO">
    </div>
  `;
}

function divider() {
  return `<div class="divider"></div>`;
}

/* ================= ETAPA 1 — IMPACTO ================= */

function step1() {
  app.innerHTML = `
    <div class="fade-in">

      ${logo()}
      <h1>Família MoChavãO</h1>
      <div class="subtitle">Inscrição Oficial</div>

      ${divider()}

      <div class="description">
        A MoChavãO não é apenas um grupo.<br>
        É hierarquia, disciplina e respeito.<br><br>
        Aqui, cada membro representa a família.
      </div>

      <button onclick="stepRules()">
        Prosseguir para as Regras
      </button>

    </div>
  `;
}

/* ================= ETAPA 2 — REGRAS ================= */

function stepRules() {
  app.innerHTML = `
    <div class="fade-in">

      ${logo()}
      <h1>Regras da Família</h1>
      <div class="subtitle">Leitura obrigatória</div>

      ${divider()}

      <div class="rules">

        <h3>🔴 Identidade & Postura</h3>
        <p>
          A Família MoChavãO é baseada em hierarquia,
          disciplina e respeito. Todo membro deve manter
          postura adequada dentro e fora do RP.
        </p>

        <h3>🔴 Conduta & Respeito</h3>
        <p>
          É terminantemente proibido qualquer forma de
          racismo, xenofobia, homofobia ou assédio.
          Atitudes discriminatórias resultam em punição severa.
        </p>

        <h3>🔴 Lealdade & Organização</h3>
        <p>
          É proibido entrar em organizações rivais,
          vazar informações internas ou denunciar membros
          da família sem acionar a administração.
        </p>

        <h3>🔴 Regras de Roleplay</h3>
        <p>
          É proibido DM/DB, sequestrar ou assaltar membros
          da família. Conflitos desnecessários em RP não
          serão tolerados.
        </p>

        <h3>🔴 Hierarquia</h3>
        <p>
          A hierarquia deve ser respeitada sem exceções.
          Ordens da liderança devem ser cumpridas dentro
          das regras do servidor.
        </p>

        <h3>🔴 Sistema Disciplinar</h3>
        <p>
          O descumprimento das regras pode resultar em
          advertência, afastamento ou remoção da família.
          O desconhecimento das regras não isenta punições.
        </p>

        <div class="rules-final">
          Ao prosseguir, você declara que leu, compreendeu
          e aceita todas as regras da Família MoChavãO.
        </div>

      </div>

      <button onclick="stepForm()">
        Li e aceito as regras
      </button>

    </div>
  `;
}

/* ================= ETAPA 3 — FORMULÁRIO ================= */

function stepForm() {
  app.innerHTML = `
    <div class="fade-in">

      ${logo()}
      <h1>Formulário de Inscrição</h1>
      <div class="subtitle">Preencha com atenção</div>

      ${divider()}

      <div class="form-section">
        <h3>👤 Dados Pessoais</h3>

        <div class="form-group">
          <label>Nick in game</label>
          <input id="nick">
        </div>

        <div class="form-group">
          <label>Nome real</label>
          <input id="nome">
        </div>

        <div class="form-group">
          <label>Idade</label>
          <input type="number" id="idade">
        </div>

        <div class="form-group">
          <label>WhatsApp (opcional)</label>
          <input id="whatsapp">
        </div>
      </div>

      <div class="form-section">
        <h3>🎮 Informações no Servidor</h3>

        <div class="form-group">
          <label>Quantas horas no /RG (BPG)?</label>
          <input type="number" id="horasRG">
        </div>
       
        <div class="form-group">
          <label>Nível atual da conta no servidor</label>
          <input type="number" id="nivelConta" placeholder="Ex: 15">
        </div>


        <div class="form-group">
          <label>Você é líder de alguma organização?</label>
          <select id="liderOrg">
            <option>Não</option>
            <option>Sim</option>
          </select>
        </div>
      </div>

      <div class="form-section">
        <h3>🎧 Comunicação</h3>

        <div class="form-group">
          <label>Possui microfone?</label>
          <select id="microfone">
            <option>Sim</option>
            <option>Não</option>
          </select>
        </div>

        <div class="form-group">
          <label>Consegue jogar em call?</label>
          <select id="call">
            <option>Sim</option>
            <option>Não</option>
          </select>
        </div>
      </div>

      <div class="form-section">
        <h3>⏰ Disponibilidade</h3>

        <div class="form-group">
          <label>Horário que consegue jogar por mais tempo</label>
          <input id="horario">
        </div>
      </div>

      <div class="form-section">
        <h3>📝 Observações</h3>

        <div class="form-group">
          <label>Deseja acrescentar algo?</label>
          <textarea id="observacoes" placeholder="Opcional"></textarea>
        </div>
      </div>

      <button onclick="submitForm()">
        Enviar Inscrição
      </button>

    </div>
  `;
}

function validarFormulario() {
  limparErros();

  let valido = true;

  function obrigatorio(id, mensagem) {
    const el = document.getElementById(id);
    if (!el || !el.value.trim()) {
      marcarErro(id, mensagem);
      valido = false;
    }
  }

  obrigatorio("nick", "Informe seu nick in game");
  obrigatorio("nome", "Informe seu nome real");
  obrigatorio("idade", "Informe sua idade");
  obrigatorio("nivelConta", "Informe o nível da sua conta");
  obrigatorio("horasRG", "Informe suas horas no /RG");
  obrigatorio("horario", "Informe seu horário disponível");

  return valido;
}


function marcarErro(inputId, mensagem) {
  const input = document.getElementById(inputId);
  if (!input) return;

  const group = input.closest(".form-group");
  if (!group) return;

  group.classList.add("error");

  const error = document.createElement("div");
  error.className = "error-message";
  error.innerText = mensagem;

  group.appendChild(error);
}

function limparErros() {
  const erros = document.querySelectorAll(".form-group.error");
  erros.forEach(group => {
    group.classList.remove("error");
    const msg = group.querySelector(".error-message");
    if (msg) msg.remove();
  });
}

  async function enviarParaAPI(dados) {
  const response = await fetch(
    "http://18.224.37.130:3333/api/inscricao",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: dados.userId,
        dados: {
          nick: dados.nick,
          nome: dados.nome,
          idade: dados.idade,
          whatsapp: dados.whatsapp,
          horasRG: dados.horasRG,
          nivelConta: dados.nivelConta,
          liderOrg: dados.liderOrg,
          microfone: dados.microfone,
          call: dados.call,
          horario: dados.horario,
          observacoes: dados.observacoes
        }
      })
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Erro ao enviar inscrição.");
  }

  return result;
}


/* ================= ENVIO ================= */

async function submitForm() {
  const dados = {
    userId,
    nick: nick.value,
    nome: nome.value,
    idade: idade.value,
    whatsapp: whatsapp.value,
    horasRG: horasRG.value,
    nivelConta: nivelConta.value,
    liderOrg: liderOrg.value,
    microfone: microfone.value,
    call: call.value,
    horario: horario.value,
    observacoes: observacoes.value
};


  if (!validarFormulario()) return;

  console.log("INSCRIÇÃO:", dados);

  stepLoading();

  try {
  await enviarParaAPI(dados);
} catch (err) {
  console.error("Erro ao enviar inscrição:", err);
  alert(err.message);
  stepForm();
  return;
}

}


/* ================= LOADING ================= */

function stepLoading() {
  app.innerHTML = `
    <div class="fade-in center">

      ${logo()}
      <h1>Processando inscrição</h1>
      <p>Aguarde um momento...</p>

    </div>
  `;

  setTimeout(stepFinal, 900);
}

/* ================= FINAL ================= */

function stepFinal() {
  app.innerHTML = `
    <div class="fade-in center">

      ${logo()}
      <h1>Inscrição Recebida</h1>

      <p>
        ✅ Sua inscrição foi registrada com sucesso.
      </p>

      <p>
        📩 O resultado será enviado via DM no Discord.
      </p>

      <p>
        A Família MoChavãO agradece seu interesse.
      </p>

    </div>
  `;
}

/* ================= START ================= */

step1();
