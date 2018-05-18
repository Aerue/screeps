export class Area {

    private name: string;
    private masterRoom: MasterRoom;
    private rooms: Room[];
    private sources: Source[];

    constructor(name: string) {
        this.name = name;
        this.masterRoom = Game.rooms[name] as MasterRoom;
        this.rooms = [this.masterRoom];
        this.sources = _.flatten(_.map(this.rooms, (room: Room) => room.sources));
    }

    public run(): void {
        for (const source in Memory.areas[this.name].sources) {
            console.log(Memory.areas[this.name].sources[source]);
        }
        // this.sources[source].room.visual.rect(Memory.areas[this.name].sources..x - .5, usedMinerPos.y - .5, 1, 1, {fill: "#FF0000"});
    }

    public buildSources(): any {
        const results = [];
        for (const source in this.sources) {
            let availableMinerPos = this.sources[source].room.lookForAtArea(LOOK_TERRAIN, this.sources[source].pos.y - 1, this.sources[source].pos.x - 1, this.sources[source].pos.y + 1, this.sources[source].pos.x + 1, true);
            availableMinerPos = _.filter(availableMinerPos, (data) => {
                return data.terrain === "plain" || data.terrain === "swamp";
            });
            let usedMinerPos = {x: 0, y: 0};
            if (availableMinerPos.length > 1) {
                let path;
                for (const minerPos in availableMinerPos) {
                    const currentPath = this.sources[source].room.findPath(
                        new RoomPosition(availableMinerPos[minerPos].x, availableMinerPos[minerPos].y, this.sources[source].room.name),
                        new RoomPosition(18, 27, this.sources[source].room.name)
                    );
                    if (path === undefined || currentPath.length < path.length) {
                        path = currentPath;
                        usedMinerPos = {x: availableMinerPos[minerPos].x, y: availableMinerPos[minerPos].y};
                    }
                }
            } else {
                usedMinerPos = {x: availableMinerPos[0].x, y: availableMinerPos[0].y};
            }

            this.sources[source].room.visual.rect(usedMinerPos.x - .5, usedMinerPos.y - .5, 1, 1, {fill: "#FF0000"});

            results.push({
                id: this.sources[source].id,
                minerPos: usedMinerPos,
                pos: this.sources[source].pos,
                hasContainer: false,
                hasMiner: false
            });

        }
        return results;
    }

}
