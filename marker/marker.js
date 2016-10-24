"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var map_service_1 = require('../services/map.service');
var Lealflet = require('leaflet');
var MarkerElement = (function () {
    function MarkerElement(mapService) {
        this.mapService = mapService;
        this.lat = 52.6;
        this.lon = -1.1;
        this.mouseover = "";
    }
    MarkerElement.prototype.ngOnInit = function () {
        var map = this.mapService.getMap();
        var marker = L.marker([this.lat, this.lon]);
        if (this.mouseover !== "") {
            marker.bindPopup(this.mouseover);
            marker.on('mouseover', function () {
                this.openPopup();
            }).on('mouseout', function () {
                this.closePopup();
            });
        }
        marker.addTo(map);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], MarkerElement.prototype, "lat", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], MarkerElement.prototype, "lon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MarkerElement.prototype, "mouseover", void 0);
    MarkerElement = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'marker-element',
            templateUrl: 'marker.html',
            styleUrls: ['marker.css']
        }), 
        __metadata('design:paramtypes', [map_service_1.MapService])
    ], MarkerElement);
    return MarkerElement;
}());
exports.MarkerElement = MarkerElement;
//# sourceMappingURL=marker.js.map