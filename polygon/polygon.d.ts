import { LeafletElement } from '../map/map';
import { LeafletGroup } from '../group/group';
import { MapService } from '../services/map.service';
import { GroupService } from '../services/group.service';
import { Ipath } from '../interfaces/path';
export declare class PolygonElement {
    private mapService;
    private groupService;
    private LeafletElement;
    private LeafletGroup;
    latlngs: Array<Array<number>>;
    Options: Ipath;
    constructor(mapService: MapService, groupService: GroupService, LeafletElement?: LeafletElement, LeafletGroup?: LeafletGroup);
    ngOnInit(): void;
}
