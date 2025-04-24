app.get('/pagar', async (req, res) => {
  const valor = Number(req.query.valor);

  let urlRedirecionamento;

  if (valor === 2) {
    urlRedirecionamento = 'https://pixplay.netlify.app/cr-credito01';
  } else if (valor === 4) {
    urlRedirecionamento = 'https://pixplay.netlify.app/creditopagamento2';
  } else if (valor === 6) {
    urlRedirecionamento = 'https://pixplay.netlify.app/redirecionamento3';
  } else if (valor === 8) {
    urlRedirecionamento = 'https://pixplay.netlify.app/pagouganhoulevou4';
  }else if (valor === 10) {
    urlRedirecionamento = 'https://pixplay.netlify.app/ganhouextra5';
  }else if (valor === 12) {
    urlRedirecionamento = 'https://pixplay.netlify.app/extraganhou6';
  } else {
    return res.send('Valor inválido');
  }

  const preference = {
    items: [
      {
        title: `Acesso por R$${valor}`,
        quantity: 1,
        unit_price: valor
      }
    ],
    back_urls: {
      success: urlRedirecionamento,
      failure: 'http://localhost:3000/falha',
      pending: 'http://localhost:3000/pendente'
    },
    auto_return: 'approved'
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    res.redirect(response.body.init_point);
  } catch (error) {
    res.send('Erro ao gerar link de pagamento');
    console.error(error);
  }
});
