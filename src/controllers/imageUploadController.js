const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs'); // Para ler o arquivo de mídia
const authConfig = require('../config/auth')
const path = require('path');

const imageController = {
   sendMediaMessage: async(req,res) => {
    // Criando o FormData para incluir os campos da requisição

    const mediaPath = path.join(__dirname, '../assets/BURUKU.png'); // Substitua 'seu_arquivo.jpg' pelo nome do seu arquivo
    console.log('Caminho do arquivo de mídia:', mediaPath);
    fs.createReadStream(mediaPath)
      .on('error', err => console.log('Erro ao ler o arquivo:', err))
      .on('open', () => console.log('Arquivo aberto com sucesso:', mediaPath));
    // Verificando se o arquivo existe
    if (!fs.existsSync(mediaPath)) {
      return res.status(400).json({ message: 'Arquivo de mídia não encontrado.' });
    }

    const formData = new FormData();
    
    formData.append('number', '5581994668975'); // Número de destino
    formData.append('medias', fs.createReadStream(mediaPath)); // Arquivo de mídia
    formData.append('openTicket', 0); // Utilize 1 para abrir um ticket
    formData.append('queueId', 0); // ID da fila desejada
    formData.append('body', ''); // Corpo da mensagem (texto)
  
    try {
      const response = await axios.post('https://api.hubot.app.br/api/messages/send', formData, {
        headers: {
          'Authorization': `${authConfig.auth.auth_token}`, // Substitua pelo seu token
          ...formData.getHeaders() // Isso é necessário para incluir o cabeçalho multipart/form-data corretamente
        },
      });
  
      console.log('Mensagem enviada:', response.data);
    } catch (error) {
      console.error('Erro ao enviar a mensagem:', error.response?.data || error.message);
    }
  }


}



module.exports = imageController;
