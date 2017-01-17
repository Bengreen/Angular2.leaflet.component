import { Component, Input, Injector, Optional } from '@angular/core';
import { MapService } from '../services/map.service';
import { GroupService } from '../services/group.service';
import { PopupService } from '../services/popup.service';
import { LeafletElement } from '../map/map';
import { LeafletGroup } from '../group/group';
import { Http, Response, Headers, RequestOptions, Request, RequestMethod, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as L from 'leaflet';

@Component({
    moduleId: module.id.toString(),
    selector: 'marker-element',
    templateUrl: 'marker.html',
    styleUrls: ['marker.css'],
    providers: [PopupService]
})

export class MarkerElement {
    @Input() latlng: L.LatLng;
    @Input() options: L.MarkerOptions;

    marker:L.Marker;


    // @Input() lat: number = 52.6;
    // @Input() lon: number = -1.1;
    // @Input() mouseover: string = "";
    // @Input() popup: any;
    // @Input() popupOptions: L.PopupOptions;
    // @Input() onclick: string = "";
    // @Input() iconUrl: string = "";

    constructor(
        private mapService: MapService,
        private groupService: GroupService,
        private popupService: PopupService,
        @Optional() private LeafletElement?: LeafletElement,
        @Optional() private LeafletGroup?: LeafletGroup) {
    }

    ngOnInit() {
        if (this.LeafletElement || this.LeafletGroup) {

            let map = this.mapService.getMap();

            //trick to match the number of layers
            if (this.LeafletGroup) {
                this.groupService.increaseNumber();
            }

            this.marker = L.marker(this.latlng, this.options);
            // if (this.popup) {
            //     marker.bindPopup(this.popup, {
            //         offset: L.point(12, 6)
            //     }).openPopup();
            // }

            this.createMarkerlayer(this.marker, map);

        }
    }

    createMarkerlayer(marker, map) {
        //add popup methods on element
        // this.popupService.enablePopup(this.mouseover, this.onclick, marker);

        //only if the parent is map should the marker-element should be directly added to the map
        if (this.LeafletGroup) {
            this.groupService.addOLayersToGroup(marker, map, this.mapService, this.LeafletGroup);
        } else {
            marker.addTo(map);
        }
    }
}
