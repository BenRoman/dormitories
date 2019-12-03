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
import { Dormitory } from '../../../dormitory/Dormitory';
import { Administrator } from '../../../administrator/Administrator';
var DormitoryAddForAdministratorComponent = /** @class */ (function () {
    function DormitoryAddForAdministratorComponent(router, activateRoute, rs) {
        var _this = this;
        this.router = router;
        this.activateRoute = activateRoute;
        this.rs = rs;
        this.dormitory = new Dormitory();
        this.dormitory.comendant = new Administrator();
        this.rs.get('administrators')
            .subscribe(function (data) {
            _this.administrators = data;
        }, function (error) {
            console.log(error);
        });
    }
    DormitoryAddForAdministratorComponent.prototype.Add = function () {
        var _this = this;
        this.rs.post('dormitories', this.dormitory)
            .subscribe(function (data) {
            _this.router.navigate(['../dormitories'], { relativeTo: _this.activateRoute });
        }, function (error) {
            console.log(error);
        });
    };
    DormitoryAddForAdministratorComponent = __decorate([
        Component({
            templateUrl: './dormitoryAdd.component.html'
        }),
        __metadata("design:paramtypes", [Router, ActivatedRoute, RequestService])
    ], DormitoryAddForAdministratorComponent);
    return DormitoryAddForAdministratorComponent;
}());
export { DormitoryAddForAdministratorComponent };
//# sourceMappingURL=dormitoryAdd.component.js.map