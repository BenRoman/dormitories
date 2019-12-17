﻿import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../../../shared/request.service';
import { Dormitory } from '../../dormitory/Dormitory';

@Component({
    templateUrl: './dormitories.component.html',
    styleUrls: ['./dormitories.component.css']
})
export class DormitoriesForFacultyAdministratorComponent {
    private dormitories: Dormitory[];

    constructor(private router: Router, private activateRoute: ActivatedRoute, private rs: RequestService) {
        this.rs.get('dormitories')
            .subscribe(
                (data: any) => {
                    this.dormitories = data;
                },
                error => {
                    console.log(error);
                }
            );
    }
}