const energy1 = ([E, v]) => {
  if (!E) return 0.000000000000000000000000000000000662607015 * v;
  if (!v) return E / 0.000000000000000000000000000000000662607015;
};

export default energy1;
