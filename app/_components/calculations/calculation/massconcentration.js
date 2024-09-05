const massconcentration = ([w, ma, m]) => {
  if (!w) return ma / m;
  if (!ma) return m * w;
  if (!m) return ma / w;
};

export default massconcentration;
