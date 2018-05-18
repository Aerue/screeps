import {ErrorMapper} from "./utils/ErrorMapper";
import {Empire} from "./Empire";
import "./prototypes/Rooms";

export const loop = ErrorMapper.wrapLoop((): void => {

    console.log("New tick");

    (new Empire()).run();

});
