import { Component, Input, Injector, Optional } from '@angular/core';
import { LeafletElement } from '../map/map';
import { LeafletGroup } from '../group/group';
import { MarkerElement } from '../marker/marker';
import { MapService } from '../services/map.service';
import { GroupService } from '../services/group.service';
import * as L from 'leaflet';


@Component({
  moduleId: module.id.toString(),
  selector: 'popup-element',
  templateUrl: 'popup.html',
  styleUrls: ['popup.css']
})

export class PopupElement {

  @Input() content: string;
  @Input() options: L.PopupOptions;

  constructor(
    private mapService: MapService,
    private groupService: GroupService,
    @Optional() private markerElement?: MarkerElement,
    @Optional() private leafletElement?: LeafletElement,
    @Optional() private leafletGroup?: LeafletGroup) {
  }

  ngOnInit() {
    //check if any of the two optional injections exist
    if (this.markerElement) {
        this.markerElement.marker.bindPopup(this.content, this.options);
    }
    // if (this.LeafletElement || this.LeafletGroup) {
    //
    //   let map = this.mapService.getMap();
    //   let popup = L.popup({ autoClose: false, keepInView: true}).setLatLng([this.lat, this.lon]).setContent(this.content);
    //
    //   if (this.LeafletGroup) {
    //     this.groupService.addOLayersToGroup(popup, map, this.mapService, this.LeafletGroup);
    //     this.groupService.increaseNumber();
    //   } else {
    //     popup.addTo(map);
    //   }
    // } else {
    //   console.warn("This popup-element will not be rendered \n the expected parent node of popup-element should be either leaf-element or leaflet-group");
    // }
  }
}
