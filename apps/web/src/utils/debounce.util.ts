export default function debounce(func: (...args: any) => void, ms: number, timeout?: ReturnType<typeof setTimeout>) {
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), ms);
  };
}
