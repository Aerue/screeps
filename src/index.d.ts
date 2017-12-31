interface CreepMemory {
  role: number;
}

interface RoomMemory {
  name: string;
  sources: SourcesMemory[];
}

interface SourcesMemory {
  id: string;
  pos: {x: number, y: number};
  locations: LocationsMemory[];
}

interface LocationsMemory {
  x: number;
  y: number;
  isFree: boolean;
}
