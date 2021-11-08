import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CarEntity } from 'src/app/interfaces/car-entity';
import { CarStatus } from 'src/app/interfaces/car-status';
import { CarIdCheck } from 'src/app/interfaces/car-id-check';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit, OnChanges {
  @Input() index!: number
  @Input() viewMode!: boolean
  @Input() data!: CarEntity
  @Input() carIdCheckData!: CarIdCheck

  @Output() statusChange = new EventEmitter<CarStatus>()
  @Output() deleteRequest = new EventEmitter<number>()

  public carIdIsUnique: boolean = true
  public form!: FormGroup
  public years = (() => {
    let currYear: number = (new Date()).getFullYear()
    let years: number[] = []

    for (let i = 1990; i <= currYear; i++) years.push(i)

    return years
  })()

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(this.data.id, [Validators.required, Validators.pattern(/^[A-Z]{2}[0-9]{4}[A-Z]{2}$/)]),
      manufacturer: new FormControl(this.data.manufacturer, Validators.required),
      model: new FormControl(this.data.model, Validators.required),
      year: new FormControl(this.data.year)
    })
    this.form.valueChanges.subscribe({
      next: (newValue: CarEntity) => {
        this.statusChange.emit({
          index: this.index,
          data: this.form.valid ? newValue : null
        })
      }
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.carIdCheckData?.currentValue?.carIndex === this.index) {
      this.carIdIsUnique = changes.carIdCheckData.currentValue.unique
    }
  }

  deleteCar(): void {
    this.deleteRequest.emit(this.index)
  }

}
