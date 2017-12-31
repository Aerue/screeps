import {ErrorMapper} from "utils/ErrorMapper";
import {Constant} from "./consts/constant";
import {Minercreep} from "./creeproles/minercreep";
import {Empire} from "./Empire";

export const loop = ErrorMapper.wrapLoop(() => {

  const empire = new Empire();
  empire.init();

  let startCpu: number = Game.cpu.getUsed();
  const startstart: number = Game.cpu.getUsed();

  for (const name in Game.creeps) {
    const creep: Creep = Game.creeps[name];

    if (creep.memory.role === Constant.MINER_CREEP) {
      (new Minercreep(creep)).init();
      const elapsed: number = Game.cpu.getUsed() - startCpu;
      // console.log("CPU used by " + creep.name + " ::: " + elapsed);
      startCpu = Game.cpu.getUsed();
    }
  }

  for (const name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log("Clearing non-existing creep memory : ", name);
    }
  }

  const elapsedFinal: number = Game.cpu.getUsed() - startstart;
  // console.log("CPU final ::: " + elapsedFinal);

});
