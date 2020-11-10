const compareVersions = (a: string, b: string): -1 | 0 | 1 => {
  const aParts = a.split('.').map(Number);
  const bParts = b.split('.').map(Number);
  for (let i = 0; i <= Math.max(aParts.length, bParts.length); i++) {
    const aPart = aParts[i] ?? -Infinity;
    const bPart = bParts[i] ?? -Infinity;
    if (aPart > bPart) {
      return 1;
    }
    if (aPart < bPart) {
      return -1;
    }
  }
  return 0;
};

export default compareVersions;
