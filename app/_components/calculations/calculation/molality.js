const molality = ([b, n, m]) => {
  if (!b) return n / m;
  if (!n) return m * b;
  if (!m) return n / b;
};

export default molality;
