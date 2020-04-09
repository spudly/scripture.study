import getAllTextNodes from "./getTextNodes";

const shouldIgnoreTextNode = (node: Text) =>
  node.parentElement!.closest("[data-selection-ignore]");

const getTextOffsetRelativeToContainer = (
  container: HTMLElement,
  markedNode: Node,
  offset: number
) => {
  const textNodes = getAllTextNodes(container);
  let curOffset = 0;
  for (const node of textNodes) {
    if (!shouldIgnoreTextNode(node)) {
      if (node === markedNode) {
        return curOffset + offset;
      }
      curOffset += node.textContent?.length || 0;
    }
  }
  throw new Error("markedNode is not a descendant of container");
};

export default getTextOffsetRelativeToContainer;
