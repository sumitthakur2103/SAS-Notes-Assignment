import API from './api';

export const register = (data) => API.post('/api/auth/register', data);
export const login = (data) => API.post('/api/auth/login', data);
export const me = () => API.get('/api/auth/me');

export const createNote = (data) => API.post('/api/notes', data);
export const getNotes = (q) => API.get('/api/notes', { params: { q } });
export const getNote = (id) => API.get(`/api/notes/${id}`);
export const updateNote = (id, data) => API.put(`/api/notes/${id}`, data);
export const deleteNote = (id) => API.delete(`/api/notes/${id}`);
export const togglePin = (id) => API.post(`/api/notes/${id}/pin`);
export const toggleArchive = (id) => API.post(`/api/notes/${id}/archive`);
export const generateShare = (id) => API.post(`/api/notes/${id}/share`);
export const getPublic = (publicId) => API.get(`/public/${publicId}`);

// AI
export const aiSummary = (payload) => API.post('/api/notes/ai/summary', payload);
export const aiTitle = (payload) => API.post('/api/notes/ai/title', payload);
export const aiActions = (payload) => API.post('/api/notes/ai/actions', payload);
