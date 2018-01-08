import {DefaultCreep} from "./DefaultCreep";

export class MinerCreep extends DefaultCreep {

  public static readonly ROLE = 1;

  constructor(creep: Creep) {
    super(creep);
  }

}
