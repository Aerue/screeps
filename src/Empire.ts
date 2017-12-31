import {Roommanager} from "./roommanager";

export class Empire {

  constructor() {
  }

  public init() {
    if (Memory.rooms === undefined) {
      Memory.rooms = {};
    }
    for (const roomName in Game.rooms) {
      Roommanager.sourcesInRoom(Game.rooms[roomName]);
    }
  }

}
