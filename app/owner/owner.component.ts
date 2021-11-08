import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { OwnerEntity } from 'src/app/interfaces/owner-entity';
import { CarOwnersService } from 'src/app/services/car-owners.service';
import { CarStatus } from 'src/app/interfaces/car-status';
import { CarEntity } from 'src/app/interfaces/car-entity';
import { CarIdCheck } from 'src/app/interfaces/car-id-check';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  public carIdCheck!: CarIdCheck
  public viewMode: boolean = false
  public form!: FormGroup
  public carsInvalidDataRegistry: number[] = []
  private carsDataRegistry: CarEntity[] = []

  public ownerId: number | string | null = null
  public owner: OwnerEntity = {
    id: 0,
    surname: '',
    name: '',
    patronymic: '',
    cars: []
  }

  constructor(
    private carOwnersService: CarOwnersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    let validators: ValidatorFn[] = [Validators.required, Validators.pattern(/^[A-Z\u0410-\u042f][a-z\u0430-\u044f]+$/)]

    this.carOwnersService.buildCarIdsCache()

    this.route.paramMap.subscribe(params => {
      this.ownerId = params.get('ownerId')

      if (this.ownerId) {
        this.ownerId = parseInt(this.ownerId as string)
        this.carOwnersService.buildCarIdsCache(this.ownerId)
        this.readOwner()
        this.route.url.subscribe(urls => {
          this.viewMode = urls.map(segment => segment.toString()).indexOf('edit') < 0
        })
      }
    })

    this.form = new FormGroup({
      surname: new FormControl('', validators),
      name: new FormControl('', validators),
      patronymic: new FormControl('', validators)
    })
  }

  readOwner(): void {
    this.carOwnersService.getOwnerById(this.ownerId as number).subscribe(ownerData => {
      this.owner = ownerData
      this.carsDataRegistry = JSON.parse(JSON.stringify(this.owner.cars))

      this.form.setValue({
        surname: ownerData.surname,
        name: ownerData.name,
        patronymic: ownerData.patronymic
      })
    })
  }

  disableSave(): boolean {
    return [
      this.form.invalid,
      [
        this.form.pristine,
        JSON.stringify(this.owner.cars) === JSON.stringify(this.carsDataRegistry)
      ].every(item => item),
      this.carsDataRegistry.length !== this.owner.cars.length,
      !this.carsDataRegistry.length,
      this.carsInvalidDataRegistry.length
    ].some(item => item)
  }
  saveData(): void {
    if (!this.viewMode) {
      if (this.ownerId) {
        this.carOwnersService.editOwner({
          id: this.owner.id,
          surname: this.form.controls.surname.value,
          name: this.form.controls.name.value,
          patronymic: this.form.controls.patronymic.value,
          cars: JSON.parse(JSON.stringify(this.carsDataRegistry))
        }).subscribe(() => {
          this.router.navigate([''])
        })
      } else {
        this.carOwnersService.createOwner(
          this.form.controls.surname.value,
          this.form.controls.name.value,
          this.form.controls.patronymic.value,
          JSON.parse(JSON.stringify(this.carsDataRegistry))
        ).subscribe(() => {
          this.router.navigate([''])
        })
      }
    }
  }

  addCar(): void {
    this.owner.cars.push({
      id: '',
      manufacturer: '',
      model: '',
      year: 2021
    })
  }
  deleteCar(index: number): void {
    let carInvalidDataIndex = this.carsInvalidDataRegistry.indexOf(index)

    carInvalidDataIndex >= 0 && this.carsInvalidDataRegistry.splice(carInvalidDataIndex, 1)
    this.owner.cars.splice(index, 1)
    this.carsDataRegistry.splice(index, 1)
    this.form.markAsDirty()
  }
  processCarStatus(carStatus: CarStatus): void {
    let carInvalidDataIndex = this.carsInvalidDataRegistry.indexOf(carStatus.index)
    let uniqueCarId = this.checkCarIdUniqueness(carStatus)

    if (carStatus.data && uniqueCarId) {
      if (carInvalidDataIndex >= 0) this.carsInvalidDataRegistry.splice(carInvalidDataIndex, 1)

      this.carsDataRegistry[carStatus.index] = carStatus.data
      this.carIdCheck = {
        carIndex: carStatus.index,
        unique: true
      }
    } else {
      if (carInvalidDataIndex < 0) this.carsInvalidDataRegistry.push(carStatus.index)
      if (!uniqueCarId) {
        this.carIdCheck = {
          carIndex: carStatus.index,
          unique: false
        }
      }
    }
  }
  checkCarIdUniqueness(carStatus: CarStatus): boolean {
    return !!carStatus.data &&
      this.carOwnersService.carIdUniquenessCheck(carStatus.data.id) &&
      this.carsDataRegistry.every((car, index) => car.id !== carStatus.data?.id || index === carStatus.index)
  }

}
