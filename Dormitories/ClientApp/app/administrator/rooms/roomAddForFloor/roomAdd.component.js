var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../../../../shared/request.service';
import { Room } from '../../../room/Room';
import { Faculty } from '../../../faculty/Faculty';
import { Floor } from '../../../floor/Floor';
var RoomAddForFloorAdministratorComponent = /** @class */ (function () {
    function RoomAddForFloorAdministratorComponent(router, activateRoute, rs) {
        var _this = this;
        this.router = router;
        this.activateRoute = activateRoute;
        this.rs = rs;
        this.room = new Room();
        this.room.faculty = new Faculty();
        this.room.floor = new Floor();
        this.room.floor.id = activateRoute.snapshot.params['floorId'];
        this.rs.get('faculties')
            .subscribe(function (data) {
            _this.faculties = data;
        }, function (error) {
            console.log(error);
        });
    }
    RoomAddForFloorAdministratorComponent.prototype.Add = function () {
        var _this = this;
        this.rs.post('rooms', this.room)
            .subscribe(function (data) {
            _this.router.navigate(['../../../floorDetails', _this.room.floor.id], { relativeTo: _this.activateRoute });
        }, function (error) {
            console.log(error);
        });
    };
    var _a, _b;
    RoomAddForFloorAdministratorComponent = __decorate([
        Component({
            templateUrl: './roomAdd.component.html'
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof Router !== "undefined" && Router) === "function" ? _a : Object, typeof (_b = typeof ActivatedRoute !== "undefined" && ActivatedRoute) === "function" ? _b : Object, RequestService])
    ], RoomAddForFloorAdministratorComponent);
    return RoomAddForFloorAdministratorComponent;
}());
export { RoomAddForFloorAdministratorComponent };
//# sourceMappingURL=roomAdd.component.js.map