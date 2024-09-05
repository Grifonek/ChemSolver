const idealGasCalculate = ([P, V, n, T]) => {
  if (P === null) return (n * 8.31446261815324 * T) / V;
  if (V === null) return (n * 8.31446261815324 * T) / P;
  if (n === null) return (P * V) / (8.31446261815324 * T);
  if (T === null) return (P * V) / (n * 8.31446261815324);
};

export default idealGasCalculate;
