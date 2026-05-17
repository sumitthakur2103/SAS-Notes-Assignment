import create from 'zustand';

const useNotes = create((set) => ({
  notes: [],
  loading: false,
  setNotes: (n) => set({ notes: n }),
  setLoading: (v) => set({ loading: v }),
}));

export default useNotes;
