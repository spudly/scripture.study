import {PersonRecord} from '../types';

const getCircas = ({circaBirth, circa, circaDeath}: PersonRecord) => {
  const circas: {birth: number | null; death: number | null} = {
    birth: null,
    death: null,
  };
  circas.birth =
    circaBirth ??
    (circa != null ? circa - 36 : circaDeath ? circaDeath - 72 : null);
  circas.death =
    circaDeath ??
    (circa != null ? circa + 36 : circaBirth ? circaBirth + 72 : null);
  return circas;
};

export default getCircas;
