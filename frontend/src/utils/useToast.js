export default function useToast(){
  const toast = (msg) => { alert(msg); };
  return { toast };
}
