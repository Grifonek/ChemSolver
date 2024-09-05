const amountofsubstance1 = ([n, m, M]) => {
  if (!n) return m / M;
  if (!m) return M * n;
  if (!M) return m / n;
};

export default amountofsubstance1;
