export abstract class Defaultcreep {

  constructor(protected creep: Creep) {}

  public init() {
    this.creep.say("Default");
  }

}
