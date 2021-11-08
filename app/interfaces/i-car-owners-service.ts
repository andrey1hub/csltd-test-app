import { Observable } from 'rxjs';

import { OwnerEntity } from './owner-entity';
import { CarEntity } from './car-entity';

export interface ICarOwnersService {
  getOwners(): Observable<OwnerEntity[]>
  getOwnerById(aId: number): Observable<OwnerEntity>
  createOwner(
    aLastName: string,
    aFirstName: string,
    aMiddleName: string,
    aCars: CarEntity[]
  ): Observable<OwnerEntity>
  editOwner(aOwner: OwnerEntity): Observable<OwnerEntity>
  deleteOwner(aOwnerId: number): Observable<OwnerEntity[]>
}
