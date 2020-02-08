const getTextNodes = (container: HTMLElement): Array<Node> => {
  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  const nodes: Array<Node> = [];
  let node: Node | null;
  while ((node = walker.nextNode())) {
    nodes.push(node);
  }
  return nodes;
};

export default getTextNodes;
