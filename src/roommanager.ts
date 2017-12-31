import {Minercreep} from "./creeproles/minercreep";
import {Constant} from "./consts/constant";

export class Roommanager {

  constructor() {}

  public static sourcesInRoom(room: Room) {
    if (Memory.rooms[room.name] === undefined) {

      const startCpu: number = Game.cpu.getUsed();

      room.memory =  {
        name: room.name,
        sources: []
      };
      const sources = room.find(FIND_SOURCES);
      if (sources.length > 0) {
        if (room.memory.sources.length < sources.length) {
          for (const source in sources) {
            room.memory.sources.push({
              id: sources[source].id,
              pos: {
                x: sources[source].pos.x,
                y: sources[source].pos.y
              },
              locations: this.getFreeEmplacements(sources[source].pos)
            });
          }
        }
      }

      console.log("Cache room take ..." + (Game.cpu.getUsed() - startCpu));
    }

    const sumOfCreepsByRoles = _.countBy(Game.creeps, (creep: Creep) => {
      return creep.memory.role;
    });

    if (sumOfCreepsByRoles[Constant.MINER_CREEP] === undefined || sumOfCreepsByRoles[Constant.MINER_CREEP] < 5) {
      Minercreep.spawn(room.energyAvailable, Game.spawns["Spawn_1"]);
    }

  }

  // Sourcemanager
  public static getFreeEmplacements(roomPosition: RoomPosition) {
    const emplacements: LocationsMemory[] = [];
    for (let x: number = -1; x <= 1; x++) {
      for (let y: number = -1; y <= 1; y++) {
        const checkX: number = roomPosition.x + x;
        const checkY: number = roomPosition.y + y;
        if (checkX !== roomPosition.x || checkY !== roomPosition.y) {
          const results = Game.rooms[roomPosition.roomName].lookForAt(LOOK_TERRAIN, checkX, checkY);
          if (results.length > 0) {
            for (const res in results) {
              if (results[res] === "plain") {
                emplacements.push({
                  x: checkX,
                  y: checkY,
                  isFree: false
                });
              }
            }
          }
        }
      }
    }
    return emplacements;
  }

}
