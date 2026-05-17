import create from 'zustand';

const useAuth = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  setUser: (u) => set({ user: u }),
  setToken: (t) => { localStorage.setItem('token', t); set({ token: t }); },
  logout: () => { localStorage.removeItem('token'); set({ user: null, token: null }); }
}));

export default useAuth;
