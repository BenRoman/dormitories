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
import { Block } from '../../../block/Block';
import { Floor } from '../../../floor/Floor';
var BlockAddForAdministratorComponent = /** @class */ (function () {
    function BlockAddForAdministratorComponent(router, activateRoute, rs) {
        this.router = router;
        this.activateRoute = activateRoute;
        this.rs = rs;
        this.block = new Block();
        this.block.floor = new Floor();
        this.block.floor.id = activateRoute.snapshot.params['floorId'];
    }
    BlockAddForAdministratorComponent.prototype.Add = function () {
        var _this = this;
        this.rs.post('blocks', this.block)
            .subscribe(function (data) {
            _this.router.navigate(['../../floorDetails', _this.block.floor.id], { relativeTo: _this.activateRoute });
        }, function (error) {
            console.log(error);
        });
    };
    var _a, _b;
    BlockAddForAdministratorComponent = __decorate([
        Component({
            templateUrl: './blockAdd.component.html'
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof Router !== "undefined" && Router) === "function" ? _a : Object, typeof (_b = typeof ActivatedRoute !== "undefined" && ActivatedRoute) === "function" ? _b : Object, RequestService])
    ], BlockAddForAdministratorComponent);
    return BlockAddForAdministratorComponent;
}());
export { BlockAddForAdministratorComponent };
//# sourceMappingURL=blockAdd.component.js.map