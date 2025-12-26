export default async function handler(req, res) {
  // Só permitimos POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const response = await fetch(
      'http://18.224.37.130:3333/api/inscricao',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
      }
    );

    const data = await response.json();

    return res.status(response.status).json(data);

  } catch (error) {
    console.error('❌ Erro no proxy da Vercel:', error);

    return res.status(500).json({
      error: 'Erro ao conectar com o servidor de inscrições.'
    });
  }
}
