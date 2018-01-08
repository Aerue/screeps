import {ErrorMapper} from "./utils/ErrorMapper";
import {Empire} from "./Empire";
import "./prototypes/Rooms";

export const loop = ErrorMapper.wrapLoop((): void => {

  const empire = new Empire();
  empire.init();
  empire.run();

});
