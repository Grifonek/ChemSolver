const mixing = ([m1, w1, m2, w2, w3]) => {
  if (!w3) return (m1 * w1 + m2 * w2) / (m1 + m2);
  if (!m1) return (m2 * (w3 - w2)) / (w1 - w3);
  if (!m2) return (m1 * (w3 - w1)) / (w2 - w3);
  if (!w1) return ((m1 + m2) * w3 - m2 * w2) / m1;
  if (!w2) return ((m1 + m2) * w3 - m1 * w1) / m2;
};

export default mixing;
