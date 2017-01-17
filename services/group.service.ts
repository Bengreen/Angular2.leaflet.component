import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { GuidService } from '../services/globalId.service';
import * as L from 'leaflet';


@Injectable()
export class GroupService {
    private layerGroup: Array<any> = [];
    private layerId: Array<any> = [];
    private layerGroupNumber: number = 0;
    private group: any = {};

    constructor(private guidService: GuidService) { }

    public addOLayersToGroup(overlay, map, mapService, group, replace = false, gId?: String) {
        // Create a gId so that each overlay can be individually identified and modified by reference to gId ... BUT currently does not return gId to outside class.
        // It should be possible to combine gId and replace as you cannot do replace unless gId is provided. And if gId is provided then can assume you want to do a modify.
        // TODO: remove 'replace' option in call method in favour of only having gId

        if (!gId) {
            gId = this.guidService.newGuid();
        }

        // TODO: Consider to use https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes from ES7
        if (this.layerId.indexOf(gId) === -1) {
            this.layerId.push(gId);
        }
        // Current implementation of adding a marker is to remove the layer for the group and re-create it from the array.
        // TODO: rewrite this to modify the layerGroup using .addLayers on the LayersGroup
        // Not clear what this if statement is aiming to achieve ? As this will trigger every time after initialisation of this.group so why not check for defined and/or remove the default initialisation to empty dict.
        if (Object.keys(this.group).length !== 0) {
            map.removeLayer(this.group);
            if (replace) {
                // TODO: Check if there is another method that allows to search for a layerId to be modified or removed (rather than trying to do a gId match and then reference the inde of the entry
                if (this.layerId.indexOf(gId) !== -1) {
                    this.layerGroup[this.layerId.indexOf(gId)] = overlay;
                } else {
                    this.layerGroup.push(overlay);
                }
            }
        }
        if (!replace) {
            // This will fail if replace has been selected AND the item does not exist in the layerId table.
            this.layerGroup.push(overlay);
        }
        // This is re-creating the whole layerGroup every time a new marker is added. Consider to re-write with addLayer methods
        this.group = L.layerGroup(this.getLayerGroup());
        console.log("Layer Group:", this.group);
        // This adds the layer to the map EVERY time this method is called. It should just be added once and referenced after that
        this.group.addTo(map);
        mapService.addOverlay(this.getGroup(), group.name, group.globalId);
    }

    public getObservableGroup() {
        return Observable.create(observer => {
            var group = this.getGroup();
            observer.next(group);
            observer.complete();
        });
    }

    public getGroup() {
        return this.group;
    }

    public getLayerGroup() {
        return this.layerGroup;
    }

    public increaseNumber() {
        this.layerGroupNumber += 1;
    }

    public getLayerNumber() {
        return this.layerGroupNumber;
    }
}
