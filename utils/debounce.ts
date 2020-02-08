const debounce = <T extends (...args: Array<any>) => void>(
  fn: T,
  delay: number
): T => {
  let timerId: number;
  return (((...args: Array<any>) => {
    clearTimeout(timerId);
    timerId = window.setTimeout(() => fn(...args), delay);
  }) as any) as T;
};

export default debounce;
