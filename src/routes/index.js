const express = require('express');
const router = express.Router();

// Rota simples para testar
router.get('/status', (req, res) => {
  res.json({ message: 'Rota de status ativa!' });
});

module.exports = router;
