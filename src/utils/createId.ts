import {v4 as uuid} from 'uuid';

// TODO: is there a better way to generate unique ids that work with mongo?
const createId = () =>
  uuid()
    .replace(/[^0-9a-f]/g, '')
    .slice(0, 24);

export default createId;
