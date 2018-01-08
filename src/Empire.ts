import {DefaultCreep} from "./roles/DefaultCreep";
import {MinerCreep} from "./roles/MinerCreep";
import {Area} from "./Area";

export class Empire {

  private areas: { [name: string]: Area };

  constructor() {
  }

  public init(): void {
    this.__checkMemory();
    this.__initCreeps();
    this.__initAreas();
  }

  public run(): void {
    for (const name in this.areas) {
      this.areas[name].run();
    }
  }

  private __checkMemory(): void {
    if (Memory.empire === undefined) {
      Memory.empire = {};
    }
    if (Memory.areas === undefined) {
      Memory.areas = {};
    }
  }

  private __initCreeps(): void {
    Game.aecreeps = {};
    for (const name in Game.creeps) {
      Game.aecreeps[name] = Empire.__initDefaultCreep(Game.creeps[name]);
    }
  }

  private static __initDefaultCreep(creep: Creep): DefaultCreep {
    const role: number = creep.memory.role;
    let aecreep: DefaultCreep;

    switch (role) {
      case MinerCreep.ROLE:
        aecreep = new MinerCreep(creep);
        break;
      default:
        throw new Error("This role is not yet defined...");
    }

    return aecreep;
  }

  private __initAreas(): void {
    this.areas = {};
    for (const name in Game.rooms) {
      const room: Room = Game.rooms[name];
      if (room.my) {
        this.areas[name] = new Area(name);
        if (Memory.areas[name] === undefined) {
          Memory.areas[name] = {};
        }
        if (Memory.areas[name].sources === undefined) {
          Memory.areas[name] = {
            sources: this.areas[name].buildSources()
          };
        }
      }
    }
  }

}
