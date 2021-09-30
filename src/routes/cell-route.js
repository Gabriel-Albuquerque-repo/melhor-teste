const express = require('express');
const router = express.Router();
const cellController = require('../controllers/cell-controller');
const validation = require('../middleware/validateDate-middleware')

router.post('/cadastrar', validation.validation, cellController.register);

router.get('/listar', cellController.list);

router.post('/ver', cellController.see);

router.delete('/deletar', cellController.delete);

router.put('/atualizar', validation.validation, cellController.update);


module.exports = router;