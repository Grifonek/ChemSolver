const density = ([ρ, m, V]) => {
  if (!ρ) return m / V;
  if (!m) return V * ρ;
  if (!V) return m / ρ;
};

export default density;
