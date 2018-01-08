import {DefaultCreep} from "./DefaultCreep";

export class FillerCreep extends DefaultCreep {

  public static readonly ROLE = 4;

  constructor(creep: Creep) {
    super(creep);
  }

}
