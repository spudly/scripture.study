import findOrThrow from "./findOrThrow";
import getVolumes from "./getAllVolumes";
import memoize from "./memoize";

const getVolume = memoize((volumeToken: string) =>
  findOrThrow(v => v.token === volumeToken, getVolumes())
);

export default getVolume;
