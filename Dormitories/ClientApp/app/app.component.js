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
import { RequestService } from '../shared/request.service';
import { Router } from '@angular/router';
var AppComponent = /** @class */ (function () {
    function AppComponent(router) {
        this.router = router;
        this.role = 'None';
        this.isLogged = false;
        if (sessionStorage.getItem("token") !== null) {
            this.isLogged = true;
        }
        if (sessionStorage.getItem("role") !== null) {
            this.role = sessionStorage.getItem("role");
        }
    }
    AppComponent.prototype.Logout = function () {
        sessionStorage.clear();
        this.isLogged = false;
        this.role = 'None';
        this.router.navigate(['/login']);
    };
    var _a;
    AppComponent = __decorate([
        Component({
            selector: 'app',
            templateUrl: './app.component.html',
            providers: [RequestService]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof Router !== "undefined" && Router) === "function" ? _a : Object])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map