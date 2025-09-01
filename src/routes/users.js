const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Cadastro de usuário
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, phone, role });
    res.status(201).json({ message: 'Usuário criado', userId: user._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login de usuário
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Senha incorreta' });

    res.json({ message: 'Login bem-sucedido', userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Listar todos os usuários
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // não retorna senha
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
