import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ICarOwnersService } from 'src/app/interfaces/i-car-owners-service';
import { OwnerEntity } from 'src/app/interfaces/owner-entity';
import { CarEntity } from 'src/app/interfaces/car-entity';

@Injectable({
  providedIn: 'root'
})
export class CarOwnersService implements ICarOwnersService {
  private static OWNERS_URL = 'api/owners'

  private carIdsCache: string[] = []

  constructor(private http: HttpClient) { }

  getOwners() {
    return this.http.get<OwnerEntity[]>(CarOwnersService.OWNERS_URL)
  }
  getOwnerById(aId: number) {
    let url = CarOwnersService.OWNERS_URL + '/' + aId
    return this.http.get<OwnerEntity>(url)
  }

  createOwner(
    aLastName: string,
    aFirstName: string,
    aMiddleName: string,
    aCars: CarEntity[]
  ) {
    return this.http.post<OwnerEntity>(CarOwnersService.OWNERS_URL, {
      surname: aLastName,
      name: aFirstName,
      patronymic: aMiddleName,
      cars: aCars
    })
  }

  editOwner(aOwner: OwnerEntity) {
    let url = CarOwnersService.OWNERS_URL + '/' + aOwner.id
    return this.http.put<OwnerEntity>(url, aOwner)
  }

  deleteOwner(aOwnerId: number) {
    let url = CarOwnersService.OWNERS_URL + '/' + aOwnerId
    return this.http.delete<OwnerEntity[]>(url)
  }

  carIdUniquenessCheck(carId: string): boolean {
    return this.carIdsCache.indexOf(carId) < 0
  }
  buildCarIdsCache(skipOwnerId?: number): void {
    this.getOwners().subscribe(ownersList => {
      this.carIdsCache = []
      ownersList.forEach(owner => owner.id !== skipOwnerId && owner.cars.forEach(car => this.carIdsCache.push(car.id)))
    })
  }

}
