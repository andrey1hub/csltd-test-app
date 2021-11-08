import { CarEntity } from "./car-entity";

export interface OwnerEntity {
  id: number
  surname: string
  name: string
  patronymic: string
  cars: CarEntity[]
}
