import {ScreepsAPI} from "screeps-api";

class Autospawner {

  protected _api: any = null;
  protected _user: object = {};

  constructor() {
    const config = require("../screeps.json");
    this._api = new ScreepsAPI(config.wepapi);
    this._api.me().then((user: object) =>
      this._user = user
    );

    this._api.

  }

  protected _getShard(): void {
    const test = this._user;
  }

}

const autospanwer: Autospawner = new Autospawner();
