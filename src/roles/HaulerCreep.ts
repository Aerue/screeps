import {DefaultCreep} from "./DefaultCreep";

export class HaulerCreep extends DefaultCreep {

  public static readonly ROLE = 2;

  constructor(creep: Creep) {
    super(creep);
  }

}
