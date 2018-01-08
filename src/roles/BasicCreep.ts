import {DefaultCreep} from "./DefaultCreep";

export class BasicCreep extends DefaultCreep {

  public static readonly ROLE = 0;

  constructor(creep: Creep) {
    super(creep);
  }

}
