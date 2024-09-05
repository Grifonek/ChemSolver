const volumeconcentration = ([φ, VA, V]) => {
  if (!φ) return VA / V;
  if (!VA) return V * φ;
  if (!V) return VA / φ;
};

export default volumeconcentration;
