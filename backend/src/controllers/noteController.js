const Note = require('../models/Note');
const { success, error } = require('../utils/response');
const crypto = require('crypto');
const gemini = require('../services/geminiService');

exports.createNote = async (req, res) => {
  try {
    const note = await Note.create({ ...req.body, user: req.user._id });
    return success(res, note, 201);
  } catch (err) {
    console.error(err);
    return error(res);
  }
};

exports.getNotes = async (req, res) => {
  try {
    const { q } = req.query;
    const filter = { user: req.user._id };
    if (q) filter.$or = [{ title: new RegExp(q, 'i') }, { content: new RegExp(q, 'i') }, { tags: new RegExp(q, 'i') }];
    const notes = await Note.find(filter).sort({ isPinned: -1, updatedAt: -1 });
    return success(res, notes);
  } catch (err) {
    console.error(err);
    return error(res);
  }
};

exports.getNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) return error(res, 'Not found', 404);
    return success(res, note);
  } catch (err) { console.error(err); return error(res); }
};

exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true });
    if (!note) return error(res, 'Not found', 404);
    return success(res, note);
  } catch (err) { console.error(err); return error(res); }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!note) return error(res, 'Not found', 404);
    return success(res, {}, 204);
  } catch (err) { console.error(err); return error(res); }
};

exports.togglePin = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) return error(res, 'Not found', 404);
    note.isPinned = !note.isPinned;
    await note.save();
    return success(res, note);
  } catch (err) { console.error(err); return error(res); }
};

exports.toggleArchive = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) return error(res, 'Not found', 404);
    note.isArchived = !note.isArchived;
    await note.save();
    return success(res, note);
  } catch (err) { console.error(err); return error(res); }
};

exports.generateShare = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) return error(res, 'Not found', 404);
    note.publicId = crypto.randomBytes(8).toString('hex');
    await note.save();
    return success(res, { url: `/public/${note.publicId}` });
  } catch (err) { console.error(err); return error(res); }
};

exports.getPublic = async (req, res) => {
  try {
    const note = await Note.findOne({ publicId: req.params.publicId }).select('-user');
    if (!note) return error(res, 'Not found', 404);
    return success(res, note);
  } catch (err) { console.error(err); return error(res); }
};

exports.aiSummary = async (req, res) => {
  try {
    console.log('AI Summary request:', req.body);
    const { title, content } = req.body;
    const summary = await gemini.summarize({ title, content });
    console.log('AI Summary result:', summary);
    return success(res, { summary });
  } catch (err) { console.error(err); return error(res); }
};

exports.aiTitle = async (req, res) => {
  try {
    const { content } = req.body;
    const title = await gemini.generateTitle(content);
    return success(res, { title });
  } catch (err) { console.error(err); return error(res); }
};

exports.aiActions = async (req, res) => {
  try {
    const { content } = req.body;
    const actions = await gemini.extractActions(content);
    return success(res, { actions });
  } catch (err) { console.error(err); return error(res); }
};
