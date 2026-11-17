# Finanças — controle financeiro pessoal

Painel pessoal de finanças que roda inteiro no navegador. Sem cadastro, sem servidor e sem banco de dados: tudo fica no `localStorage` do próprio dispositivo.

O projeto tem duas páginas:

| Arquivo | O que é |
| --- | --- |
| `index.html` | Página de apresentação que explica como o sistema funciona, com capturas reais do app. |
| `app.html` | O aplicativo em si (painel, transações, cartões, rendas, parcelados, assinaturas, mercado, backup). |

---

## Como abrir

Não há build, dependências ou instalação. Basta servir a pasta como site estático:

```bash
# Python
python -m http.server 8000

# ou Node
npx serve .
```

Depois acesse `http://localhost:8000`. O app fica em `http://localhost:8000/app.html`.

Abrir o `index.html` direto pelo sistema de arquivos (`file://`) também funciona, mas alguns recursos — como o service worker e o download de cotações — podem ficar limitados. Um servidor local é o caminho mais próximo do comportamento em produção.

---

## Estrutura

```
.
├── index.html            # página de apresentação (entrada do site)
├── apresentacao.css      # estilos da apresentação
├── apresentacao.js       # tema, menu, abas, FAQ e animações da apresentação
├── app.html              # aplicativo
├── style.css             # estilos do aplicativo
├── script.js             # lógica do aplicativo (estado, cálculos, gráficos, backup)
└── assets/               # capturas de tela usadas na apresentação (dados fictícios)
```

---

## O que o app faz

- **Painel** — saldo do mês, entradas, saídas, faturas em aberto, gastos por categoria e indicadores de saúde financeira.
- **Transações** — lançamentos com data, categoria, conta e filtros.
- **Cartões** — limite, fechamento e vencimento de cada ciclo, com fatura consolidada.
- **Rendas** — salário, vales e entradas fixas com data prevista.
- **Parcelados** — progresso de cada compra e quanto falta quitar.
- **Assinaturas** — cobranças recorrentes e seu peso no orçamento.
- **Mercado** — indicadores (Selic, IPCA, dólar/PTAX) e cotações via brapi, com token opcional.
- **Backup** — exportação e importação dos dados em JSON.
- **Tema claro/escuro** — preferência salva em `cofre_theme_v1`.

Todos os cálculos acontecem no cliente. Nenhum dado financeiro sai do navegador.

---

## Página de apresentação

`index.html` foi feita para ser lida antes de usar o app:

- hero com captura real do painel;
- passo a passo de quatro etapas;
- tour interativo com seis abas (painel, transações, cartões, rendas, parcelados, a pagar);
- grade de recursos, explicação dos cálculos, seção de privacidade e FAQ;
- tema claro/escuro compartilhando a mesma chave do app;
- navegação por teclado nas abas e no acordeão, com suporte a `prefers-reduced-motion`.

O link **Como funciona** no rodapé da barra lateral do app leva de volta à apresentação.

As imagens em `assets/` foram geradas a partir do próprio app com dados fictícios e estão identificadas como exemplo na página.

---

## Publicar no GitHub Pages

O site já está publicado em:

- Apresentação: `https://rafinhamsz.github.io/financas/`
- App: `https://rafinhamsz.github.io/financas/app.html`

Para publicar em outro repositório:

1. Crie o repositório e envie os arquivos:

   ```bash
   git init
   git add .
   git commit -m "Finanças: app e página de apresentação"
   git branch -M main
   git remote add origin https://github.com/<usuario>/<repo>.git
   git push -u origin main
   ```

2. No GitHub, abra **Settings → Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**, branch `main` e pasta `/ (root)`.
4. Salve e aguarde o deploy.

Todos os caminhos são relativos, então o site funciona em subdiretório sem ajustes.

---

## Créditos

- Fonte: [Outfit](https://fonts.google.com/specimen/Outfit) (Google Fonts).
- Cotações: [brapi](https://brapi.dev) e fontes públicas para Selic, IPCA e PTAX.

Uso pessoal. Os dados exibidos nas capturas são fictícios.
