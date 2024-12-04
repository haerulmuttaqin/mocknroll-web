let timer: any;
const debounce = (fn: any, delay: any) => {
  return (() => {
      timer = setTimeout(() => fn(), delay);
      clearTimeout(timer);
  })();
};

export default debounce;
