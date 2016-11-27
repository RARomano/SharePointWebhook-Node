# SharePointWebhook-Node
Esse repositório mostra como consumir os dados provenientes de um Webhook no SharePoint Online.

## Rodando esse repositório
Após clonar o repositório, abra o arquivo `app.js` e edite as linhas abaixo:

```javascript
/// dados para conectar no site SharePoint. Pode ser usuário e senha ou clientid e clientsecret
var credentialOptions = {
  username: '',
  password: ''
}

/// Tenant Url
var url = 'https://[TENANT].sharepoint.com';

/// Add the list title
var resourceUrl = url + "/_api/web/lists/getbytitle('[LIST_TITLE]')";

/// Url do serviço para receber as notificações do webhook
var notificationUrl = '[URL_OF_YOUR_SERVICE]';
```

### Rodando localmente
Para testar os retornos em sua máquina de desenvolvimento, você pode utilizar o NGROK para ter uma url válida para o SharePoint.

Baixe o **NGROK** https://ngrok.com/download e rode o seguinte comando

```bash
./ngrok http 8080
```

ele vai gerar uma URL assim:
`Forwarding                    http://ba459562.ngrok.io -> localhost:8080 `

copie a url *.ngrok.io e cole na variável `notificationUrl` do arquivo `app.js`.
