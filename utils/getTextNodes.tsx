const getTextNodes = (container: HTMLElement): Array<Text> => {
  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  const nodes: Array<Text> = [];
  let node: Text | null;
  while ((node = walker.nextNode() as Text)) {
    nodes.push(node);
  }
  return nodes;
};

export default getTextNodes;
