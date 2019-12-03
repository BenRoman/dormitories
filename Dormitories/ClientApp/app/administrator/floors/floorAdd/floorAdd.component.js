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
import { Floor } from '../../../floor/Floor';
import { Dormitory } from '../../../dormitory/Dormitory';
var FloorAddForAdministratorComponent = /** @class */ (function () {
    function FloorAddForAdministratorComponent(router, activateRoute, rs) {
        this.router = router;
        this.activateRoute = activateRoute;
        this.rs = rs;
        this.floor = new Floor();
        this.floor.dormitory = new Dormitory();
        this.floor.dormitory.id = activateRoute.snapshot.params['dormitoryId'];
    }
    FloorAddForAdministratorComponent.prototype.Add = function () {
        var _this = this;
        this.rs.post('floors', this.floor)
            .subscribe(function (data) {
            _this.router.navigate(['../../dormitoryDetails', _this.floor.dormitory.id], { relativeTo: _this.activateRoute });
        }, function (error) {
            console.log(error);
        });
    };
    FloorAddForAdministratorComponent = __decorate([
        Component({
            templateUrl: './floorAdd.component.html'
        }),
        __metadata("design:paramtypes", [Router, ActivatedRoute, RequestService])
    ], FloorAddForAdministratorComponent);
    return FloorAddForAdministratorComponent;
}());
export { FloorAddForAdministratorComponent };
//# sourceMappingURL=floorAdd.component.js.map