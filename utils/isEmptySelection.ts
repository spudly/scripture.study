const isEmptySelection = (selection: Selection): boolean => {
  const range = selection.rangeCount != 0 ? selection?.getRangeAt(0) : null;
  if (!range) {
    return true;
  }
  if (
    range.startContainer === range.endContainer &&
    range.startOffset === range.endOffset
  ) {
    return true; // nothing is selected
  }
  return false;
};

export default isEmptySelection;
