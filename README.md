# 🎯 Captação de Leads com IA

Sistema automático de triagem jurídica previdenciária com inteligência artificial.

## 🚀 Quick Start

```bash
git clone https://github.com/Gaveta-cmd/captacao-leads-ia
cd captacao-leads-ia
npm install
npm start
```

Acesse: `http://localhost:3000`

## 📡 Endpoints

- **GET** `/` - Página inicial
- **GET** `/health` - Health check
- **POST** `/api/webhook/lead` - Enviar lead para triagem

## 🔧 Configuração

```bash
cp .env.example .env
# Edite .env com suas chaves:
# - OPENROUTER_API_KEY
# - CLICKUP_API_KEY (opcional)
```

## 📦 Deploy

```bash
vercel
```

## 📝 Exemplo

```bash
curl -X POST http://localhost:3000/api/webhook/lead \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@example.com",
    "tipo_caso": "Aposentadoria",
    "descricao": "Trabalhei 35 anos",
    "documentos": "CTPS"
  }'
```

---

**Desenvolvido por Davi Augusto** | Candidatura: Analista de Automação / IA
