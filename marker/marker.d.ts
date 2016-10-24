import { MapService } from '../services/map.service';
export declare class MarkerElement {
    private mapService;
    lat: number;
    lon: number;
    mouseover: string;
    constructor(mapService: MapService);
    ngOnInit(): void;
}