import {Constant} from "../consts/constant";
import {Defaultcreep} from "./defaultcreep";

export class Minercreep extends Defaultcreep {

  constructor(protected creep: Creep) {
    super(creep);
  }

  public init() {
    // this.creep.say("Miner");
    this.__routine();
  }

  public static spawn(energyAvailable: number, spawn: StructureSpawn) {

    console.log(energyAvailable);

    const bodyParts: BodyPartConstant[] = [];

    while ((energyAvailable - 250) >= 0) {
      bodyParts.push(WORK, CARRY, MOVE, MOVE);
      energyAvailable -= 250;
    }

    const response: number = Game.spawns[spawn.name].spawnCreep(bodyParts, "MinerCreep_" + +"_" + Game.time, {memory: {role: Constant.MINER_CREEP}});
    // console.log("Spawn response ::: " + response);
  }

  private __routine() {
    if (!this.__creepIsHarvesting(this.creep)) {

      let target;
      for (const i in Game.spawns) {
        if (Game.spawns[i].room === this.creep.room) {
          target = Game.spawns[i];
        }
      }

      if (
        target !== undefined &&
        target.energy < target.energyCapacity
      ) {
        if (this.creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          this.creep.moveTo(target, {visualizePathStyle: {stroke: "#ffffff"}});
        }
      } else {
        target = this.creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        if (target) {
          this.creep.say("Build");
          if (this.creep.build(target) === ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target);
          }
        } else {

          // Transfer energy into extension ...
          const extensions = this.creep.room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
              return structure.structureType === STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity;
            }
          });

          if (extensions.length > 0) {

            if (this.creep.transfer(extensions[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
              this.creep.moveTo(extensions[0], {visualizePathStyle: {stroke: "#ffffff"}});
            }

          } else {

            const targets = this.creep.room.find(FIND_STRUCTURES, {
              filter: (object) => object.hits < object.hitsMax
            });
            targets.sort((a, b) => a.hits - b.hits);

            if (targets.length > 0) {
              if (this.creep.repair(targets[0]) === ERR_NOT_IN_RANGE) {
                this.creep.moveTo(targets[0]);
              }
            }

            if (this.creep.room.controller) {
              if (this.creep.upgradeController(this.creep.room.controller) === ERR_NOT_IN_RANGE) {
                this.creep.moveTo(this.creep.room.controller, {visualizePathStyle: {stroke: "#006CA9"}});
              }
            }
          }

        }

      }

    }
  }

  private __creepIsHarvesting(creep: Creep): boolean {
    const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
    if (creep.carry.energy < creep.carryCapacity) {
      if (creep.pos.isNearTo(source)) {
        if (creep.harvest(source) === OK) {
          return true; // Creep is harvesting
        }
      } else {
        if (creep.carry.energy === 0) {
          creep.moveTo(source, {visualizePathStyle: {stroke: "#ffaa00"}});
          return true; // Creep is moving to harvesting
        }
        return false; // Creep carryCapacity NOT FULL but not harvesting
      }
    }
    return false; // Creep carryCapacity FULL
  }

}
