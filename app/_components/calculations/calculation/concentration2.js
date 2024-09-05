const concentration2 = ([c, n, V]) => {
  if (!c) return n / V;
  if (!n) return c * V;
  if (!V) return n / c;
};

export default concentration2;
