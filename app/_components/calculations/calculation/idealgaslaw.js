const idealGasCalculate = ([P, V, n, R, T]) => {
  if (P === null) return (n * R * T) / V;
  if (V === null) return (n * R * T) / P;
  if (n === null) return (P * V) / (R * T);
  if (R === null) return (P * V) / (n * T);
  if (T === null) return (P * V) / (n * R);
  return null;
};

export default idealGasCalculate;
