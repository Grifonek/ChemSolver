const concentration = ([c, m, M, V]) => {
  if (c === null) return m / (M * V);
  if (m === null) return c * M * V;
  if (M === null) return m / (c * V);
  if (V === null) return m / (c * M);
  return null;
};

export default concentration;
