import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OwnerEntity } from 'src/app/interfaces/owner-entity';
import { CarOwnersService } from 'src/app/services/car-owners.service';

@Component({
  selector: 'app-owners-list',
  templateUrl: './owners-list.component.html',
  styleUrls: ['./owners-list.component.scss']
})
export class OwnersListComponent implements OnInit {
  public selectedOwner: OwnerEntity | null = null
  public ownersList: OwnerEntity[] = []

  constructor(private carOwnersService: CarOwnersService, private router: Router) { }

  ngOnInit(): void {
    this.carOwnersService.getOwners().subscribe(ownersListData => {
      this.ownersList = ownersListData
    })
  }

  selectOwner(owner: OwnerEntity): void {
    this.selectedOwner = owner
  }
  unselectOwner(): void {
    this.selectedOwner = null
  }

  action(name: string): void {
    switch (name) {
      case 'create':
        this.router.navigate(['new'])
        break;
      case 'read':
        this.selectedOwner && this.router.navigate([this.selectedOwner.id])
        break;
      case 'update':
        this.selectedOwner && this.router.navigate([this.selectedOwner.id, 'edit'])
        break;
      case 'delete':
        if (this.selectedOwner) {
          let selectedOwnerId = this.selectedOwner.id
          this.carOwnersService.deleteOwner(selectedOwnerId).subscribe(() => {
            this.ownersList = this.ownersList.filter(item => item.id !== selectedOwnerId)
            this.selectedOwner = null
          })
        }
        break;
    }
  }
}
