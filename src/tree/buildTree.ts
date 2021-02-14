import { unique } from '@spudly/pushpop';
import type {PersonLinkRecord, PersonRecord} from '../types';

type RelPosition = 'above' | 'above+' | 'below' | 'below+' | 'beside' | 'beside+' | 'beside++';

const getPlacement = (type: PersonLinkRecord['type'], reverse?: boolean): RelPosition => {
  switch (type) {
    case 'childOf':
      return !reverse ? 'below' : 'above';
    case 'spouseOf':
      return 'beside';
    case 'descendantOf':
      return !reverse ? 'below+' : 'above+';
    case 'contemporaryOf':
      return 'beside++';
    default: {
      const neverType: never = type;
      throw new Error(`Unknown type: ${String(neverType)}`);
    }
  }  
};

const buildTree = (links: Array<PersonLinkRecord>, persons: Array<PersonRecord>): Array<Array<string>> => {
  const getName = (id: string) => persons.find(p => p.id === id)!.name;
  const rows: Array<Array<string>> = [];
  const placedPersons = new Set<string>();

  const getLocation = (personId: string): [number, number] | null => {
    console.log('getLocation', getName(personId), JSON.stringify(rows, null, 2));
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      for (let colIndex = 0; colIndex < rows[rowIndex].length; colIndex++) {
        if (rows[rowIndex][colIndex] === getName(personId)) {
          return [rowIndex, colIndex];
        }
      }
    }
    return null;
  };

  const placePerson = (placeId: string, pos: RelPosition, anchorId: string) => {
    const anchorLocation = getLocation(anchorId);
    if (!anchorLocation) {
      throw new Error('anchorId is not yet placed');
    }
    let [rowIndex] = anchorLocation;
    switch (pos) {
      case 'above':
        rowIndex--;
        break;
      case 'above+':
        rowIndex -= 2;
        break;
      case 'below':
        rowIndex++;
        break;
      case 'below+':
        rowIndex += 2;
        break;
      case 'beside':
        break;
      case 'beside+':
        break;
      case 'beside++':
        break;
      default:{
        const neverPos: never = pos;
        throw new Error(`Unknown Pos: ${String(neverPos)}`);
      }
    }
    while(rowIndex < 0) {
      rows.unshift([]);
      rowIndex++;
    }
    while (rowIndex >= rows.length) {
      rows.push([]);
    }
    rows[rowIndex].push(getName(placeId)!);
  };

  const placeLinks = (currentLinks: Array<PersonLinkRecord>): [number, Array<PersonLinkRecord>] => {
    const nextPass: Array<PersonLinkRecord> = [];
    let numPlaced = 0;
    const placeLink = (link: PersonLinkRecord) => {
      console.log('placeLink', getName(link.fromPersonId), getName(link.toPersonId), 'rows:', JSON.stringify(rows, null, 2));
      const {fromPersonId, toPersonId} = link;

      if (!rows.length) {
        rows.push( [getName(toPersonId)!] )
        const pos = getPlacement(link.type);
        placePerson(fromPersonId, pos, toPersonId);
        console.log('initial placement', getName( fromPersonId), pos, getName(toPersonId), 'rows (after):', JSON.stringify(rows, null, 2));
        numPlaced += 2;
        placedPersons.add(fromPersonId);
        placedPersons.add(toPersonId);
        return;
      }
      const isFromPersonPlaced = placedPersons.has(fromPersonId);
      const isToPersonPlaced = placedPersons.has(toPersonId);

      if (!isFromPersonPlaced && !isToPersonPlaced) {
        console.log('neither placed', getName(link.fromPersonId), getName(link.toPersonId), 'rows:', JSON.stringify(rows, null, 2));
        nextPass.push(link);
        return;
      }

      if (isFromPersonPlaced && isToPersonPlaced) {
        console.log('both placed', getName(link.fromPersonId), getName(link.toPersonId), 'rows:', JSON.stringify(rows, null, 2));
        return;
      }

      if (isFromPersonPlaced) {
        const pos = getPlacement(link.type, true);
        placePerson(toPersonId, pos, fromPersonId);
        console.log(`from placed; ${getName(fromPersonId)} already placed. Placing ${getName(toPersonId)} ${pos} ${getName(fromPersonId)}`, 'rows:', JSON.stringify(rows, null, 2));
        numPlaced++;
        placedPersons.add(toPersonId);
        return;
      }

      if (isToPersonPlaced) {
        const pos = getPlacement(link.type);
        placePerson(fromPersonId, pos, toPersonId);
        console.log(`to placed; ${getName(toPersonId)} already placed. Placing ${getName(fromPersonId)} ${pos} ${getName(toPersonId)}`, 'rows:', JSON.stringify(rows, null, 2));
        numPlaced++;
        placedPersons.add(fromPersonId);
        return;
      }
    };
    currentLinks.forEach(placeLink);
    return [numPlaced, nextPass];
  };

  let nextPass = links;
  let numPlaced = 0;
  do {
    [numPlaced, nextPass] = placeLinks(nextPass);
  } while (numPlaced > 0)

  const missed = unique( nextPass.flatMap((link) => [getName(link.fromPersonId)!, getName(link.toPersonId)!]) );
  if (missed.length) {
    rows.push(missed);
  }

  return rows;
};

export default buildTree;