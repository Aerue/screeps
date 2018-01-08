import {DefaultCreep} from "./DefaultCreep";

export class BuilderCreep extends DefaultCreep {

  public static readonly ROLE = 3;

  constructor(creep: Creep) {
    super(creep);
  }

}
