import {ScreepsAPI} from "screeps-api";

class Autospawner {

  protected _api: any = null;
  protected _user: object = {};

  protected _worldStatus: string = "";

  constructor() {
    const config = require("../screeps.json");

    this._api = new ScreepsAPI(config.wepapi);

    // this._api.me()
    //   .then((user: object) =>
    //     this._user = user
    //     // TODO : Make promise here ...
    //   );

    this._getWorldStatus();

  }

  protected _getShard(): void {
    const test = this._user;
  }

  protected _getWorldStatus(): string {
    if (this._worldStatus !== "") {
      return this._worldStatus;
    }
    this._api.raw.user.worldStatus()
      .then((data: any) => {
        this._worldStatus = data.status;
      });
    return this._worldStatus;
  }

}

const autospanwer: Autospawner = new Autospawner();
