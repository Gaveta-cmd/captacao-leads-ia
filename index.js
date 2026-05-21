require('dotenv').config();
const express = require('express');
const axios = require('axios');
const validator = require('validator');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ═══════════════════════════════════════════════════════════════════════════
// ROTA RAIZ - PÁGINA INICIAL BONITA
// ═══════════════════════════════════════════════════════════════════════════

const htmlHome = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Captação de Leads com IA</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      background: white;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      padding: 40px;
      max-width: 700px;
      width: 100%;
    }
    h1 {
      color: #667eea;
      margin-bottom: 10px;
      font-size: 32px;
    }
    .subtitle {
      color: #666;
      margin-bottom: 30px;
      font-size: 16px;
    }
    .status-box {
      background: #f0f4ff;
      border-left: 4px solid #667eea;
      padding: 20px;
      margin: 25px 0;
      border-radius: 6px;
    }
    .status-item {
      display: flex;
      align-items: center;
      margin: 10px 0;
      font-size: 15px;
    }
    .status-icon {
      margin-right: 12px;
      font-size: 20px;
      min-width: 24px;
    }
    .endpoint {
      background: #f9f9f9;
      border: 1px solid #e0e0e0;
      padding: 14px;
      margin: 12px 0;
      border-radius: 6px;
      font-family: 'Courier New', monospace;
      font-size: 12px;
      overflow-x: auto;
      line-height: 1.6;
    }
    .endpoint-label {
      color: #667eea;
      font-weight: bold;
      margin-bottom: 8px;
      display: block;
      font-size: 13px;
    }
    h2 {
      color: #333;
      margin-top: 35px;
      margin-bottom: 15px;
      font-size: 20px;
    }
    .test-btn {
      display: inline-block;
      background: #667eea;
      color: white;
      padding: 12px 28px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      margin-top: 20px;
      border: none;
      cursor: pointer;
      transition: all 0.3s;
      font-size: 14px;
    }
    .test-btn:hover {
      background: #764ba2;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }
    .docs-links {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 20px;
    }
    .docs-links a {
      text-align: center;
      padding: 12px;
      border: 2px solid #667eea;
      color: #667eea;
      text-decoration: none;
      border-radius: 6px;
      transition: all 0.3s;
      font-size: 13px;
      font-weight: 500;
    }
    .docs-links a:hover {
      background: #667eea;
      color: white;
    }
    .footer {
      margin-top: 35px;
      padding-top: 20px;
      border-top: 1px solid #eee;
      color: #999;
      font-size: 12px;
      text-align: center;
    }
    code {
      background: #f5f5f5;
      padding: 2px 6px;
      border-radius: 3px;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎯 Captação de Leads com IA</h1>
    <p class="subtitle">Sistema automático de triagem jurídica previdenciária</p>

    <div class="status-box">
      <div class="status-item">
        <span class="status-icon">✅</span>
        <span><strong>Status:</strong> Online e funcionando</span>
      </div>
      <div class="status-item">
        <span class="status-icon">⚡</span>
        <span><strong>IA:</strong> OpenRouter (Llama)</span>
      </div>
      <div class="status-item">
        <span class="status-icon">📊</span>
        <span><strong>CRM:</strong> ClickUp integrado</span>
      </div>
      <div class="status-item">
        <span class="status-icon">🔗</span>
        <span><strong>API:</strong> Pronta para integração</span>
      </div>
    </div>

    <h2>📡 Endpoints</h2>

    <div class="endpoint">
      <span class="endpoint-label">Health Check</span>
      GET /health
    </div>

    <div class="endpoint">
      <span class="endpoint-label">Enviar Lead para Triagem (Webhook)</span>
      POST /api/webhook/lead
    </div>

    <h2>📝 Exemplo de Requisição</h2>
    <div class="endpoint">
curl -X POST https://captacao-leads-ia.vercel.app/api/webhook/lead \\
  -H "Content-Type: application/json" \\
  -d '{
    "nome": "João Silva",
    "email": "joao@example.com",
    "tipo_caso": "Aposentadoria",
    "descricao": "Trabalhei 35 anos",
    "documentos": "CTPS"
  }'
    </div>

    <button class="test-btn" onclick="testarAPI()">🧪 Testar API Agora</button>

    <h2>📚 Documentação</h2>
    <div class="docs-links">
      <a href="https://github.com/Gaveta-cmd/captacao-leads-ia" target="_blank">📖 GitHub</a>
      <a href="https://github.com/Gaveta-cmd/captacao-leads-ia#readme" target="_blank">📘 README</a>
    </div>

    <div class="footer">
      <p>Desenvolvido por Davi Augusto</p>
      <p>Candidatura: Analista de Automação / IA</p>
      <p style="margin-top: 8px;">© 2026</p>
    </div>
  </div>

  <script>
    function testarAPI() {
      const dados = {
        nome: "Teste " + new Date().getTime(),
        email: "teste@example.com",
        tipo_caso: "Aposentadoria por Tempo de Contribuição",
        descricao: "Teste automático do sistema",
        documentos: "Teste"
      };

      fetch('/api/webhook/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      })
      .then(r => r.json())
      .then(data => {
        if (data.sucesso) {
          alert('✅ Sucesso!\\n\\nViabilidade: ' + data.triagem.viabilidade + '\\nProbabilidade: ' + data.triagem.probabilidade_sucesso + '%');
        } else {
          alert('❌ Erro: ' + (data.erro || JSON.stringify(data)));
        }
      })
      .catch(e => alert('❌ Erro: ' + e.message));
    }
  </script>
</body>
</html>
`;

app.get('/', (req, res) => {
  res.send(htmlHome);
});

// ═══════════════════════════════════════════════════════════════════════════
// SERVIÇOS
// ═══════════════════════════════════════════════════════════════════════════

const enrichLeadData = (lead) => {
  return {
    ...lead,
    email_valido: validator.isEmail(lead.email || ''),
    telefone_limpo: (lead.telefone || '').replace(/\D/g, ''),
    timestamp: new Date().toISOString(),
  };
};

const triageWithAI = async (leadData) => {
  try {
    const prompt = `Você é um assistente jurídico especializado em direito previdenciário.

ANÁLISE OBRIGATÓRIA:
Cliente: ${leadData.nome}
Caso: ${leadData.tipo_caso}
Descrição: ${leadData.descricao}
Documentos: ${leadData.documentos || 'Nenhum'}

RETORNE APENAS ESTE JSON, SEM MARKDOWN, SEM BACKTICKS, SEM EXPLICAÇÃO:
{"viabilidade":"Alta","tipo_acao":"Ação Ordinária de Concessão","probabilidade_sucesso":75,"documentos_necessarios":["Doc1","Doc2"],"prazo_estimado":"18-24 meses","alertas":["Alerta1"],"proximos_passos":["Passo1"]}

Responda APENAS com JSON válido em uma única linha. Nada de marcação.`;

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: process.env.OPENROUTER_MODEL || 'meta-llama/llama-3.1-70b-instruct:free',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    let content = response.data.choices[0].message.content.trim();

    // Limpar markdown se vier com backticks
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    // Extrair JSON se estiver dentro de outras coisas
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      content = jsonMatch[0];
    }

    const triageResult = JSON.parse(content);

    return { sucesso: true, dados: triageResult };
  } catch (error) {
    console.error('Erro IA:', error.message);
    return { sucesso: false, erro: error.message };
  }
};

const createClickUpTask = async (leadData, triageResult) => {
  if (!process.env.CLICKUP_API_KEY) {
    return { sucesso: false, mensagem: 'ClickUp não configurado' };
  }
  return { sucesso: false, mensagem: 'ClickUp desabilitado para demo' };
};

// ═══════════════════════════════════════════════════════════════════════════
// WEBHOOK PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════

app.post('/api/webhook/lead', async (req, res) => {
  try {
    const lead = req.body;

    if (!lead.nome || !lead.email || !lead.tipo_caso) {
      return res.status(400).json({
        erro: 'Campos obrigatórios: nome, email, tipo_caso',
      });
    }

    console.log(`✅ Lead recebido: ${lead.nome}`);

    const enrichedLead = enrichLeadData(lead);
    const triageResult = await triageWithAI(enrichedLead);

    if (!triageResult.sucesso) {
      return res.status(500).json({
        erro: 'Falha na triagem',
        detalhes: triageResult.erro,
      });
    }

    console.log(`✅ Triagem concluída: ${triageResult.dados.viabilidade}`);

    const clickupResult = await createClickUpTask(enrichedLead, triageResult);

    res.json({
      sucesso: true,
      lead_id: enrichedLead.timestamp,
      lead_nome: enrichedLead.nome,
      triagem: triageResult.dados,
      clickup: clickupResult,
      mensagem: `Lead ${enrichedLead.nome} processado. Viabilidade: ${triageResult.dados.viabilidade}`,
    });
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ erro: 'Erro ao processar', detalhes: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    projeto: 'Captação de Leads com IA',
    endpoints: {
      health: 'GET /health',
      webhook: 'POST /api/webhook/lead'
    }
  });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
  console.log(`🌐 Acesse: http://localhost:${PORT}`);
  console.log(`📋 Webhook: POST http://localhost:${PORT}/api/webhook/lead`);
});
