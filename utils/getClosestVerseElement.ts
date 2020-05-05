const getClosestVerseElement = (node: Node) =>
  node.parentElement?.closest('[data-verse]') as HTMLElement | undefined;

export default getClosestVerseElement;
