﻿import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../../../../shared/request.service';
import { Block } from '../../../block/Block';

@Component({
    templateUrl: './blockDetails.component.html'
})
export class BlockDetailsForFacultyAdministratorComponent {
    private block: Block;
    private id: number;

    constructor(private router: Router, private activateRoute: ActivatedRoute, private rs: RequestService) {
        this.id = activateRoute.snapshot.params['id'];

        this.rs.get('blocks/' + this.id)
            .subscribe(
                (data: any) => {
                    this.block = data;
                },
                error => {
                    console.log(error);
                }
            );
    }
}