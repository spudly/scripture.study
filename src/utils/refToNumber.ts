const refToNumber = (ref: string): number => {
  if (!ref.match(/^\d+$/u)) {
    throw new Error('Invalid Number Ref');
  }
  return Number(ref);
};

export default refToNumber;
