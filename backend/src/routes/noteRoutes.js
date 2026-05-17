const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.post('/', noteController.createNote);
router.get('/', noteController.getNotes);
router.get('/:id', noteController.getNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);
router.post('/:id/pin', noteController.togglePin);
router.post('/:id/archive', noteController.toggleArchive);
router.post('/:id/share', noteController.generateShare);

// AI endpoints
router.post('/ai/summary', noteController.aiSummary);
router.post('/ai/title', noteController.aiTitle);
router.post('/ai/actions', noteController.aiActions);

module.exports = router;
