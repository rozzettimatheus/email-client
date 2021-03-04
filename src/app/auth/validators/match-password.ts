import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors, Validator } from '@angular/forms';

/**
 * include this validator in angular dependency injection system
 */
@Injectable({
  providedIn: 'root',
})
export class MatchPassword implements Validator {
  /**
   * Applied on whole form
   * @param formGroup
   * fallback -> abstractControl (both group and control)
   */
  validate(formGroup: FormGroup): ValidationErrors {
    const { password, passwordConfirmation } = formGroup.value;

    return password === passwordConfirmation
      ? null
      : { passwordsDontMatch: true };
  }

  /**
   * Used for conditional validation
   */
  // registerOnValidatorChange?(fn: () => void): void {
  //   throw new Error("Method not implemented.");
  // }
}

/**
 * Checkbox toggling inputs - required or not
 */

// export class RequiredIfDirective implements Validator {

//   constructor() { }

//   @Input("requiredIf")
//     requiredIf: boolean;

//     validate(c:AbstractControl) {

//        let value = c.value;
//         if ((value == null || value == undefined || value == "") && this.requiredIf) {
//                 return {
//                     requiredIf: {condition:this.requiredIf}
//                 };
//         }
//         return null;
//     }

//   registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }
//   private _onChange: () => void;

//   ngOnChanges(changes: SimpleChanges): void {

//     if ('requiredIf' in changes) {

//       if (this._onChange) this._onChange();
//     }
//   }
// }

// <h3>My children </h3>
// <div class="form-check">
//   <label class="form-check-label">
//       <input class="form-check-input" type="checkbox" [(ngModel)]="hasChildren" name="hasChildren"> I do not have any children
//     </label>
// </div>

// <div class="form-group">
//  <label>Name</label>
//   <input type="text" name="child1Name" [(ngModel)]="child1Name"

//   #child1NameControl=ngModel [requiredIf]="!hasChildren" class="form-control" >
// </div>
// <div class="form-group">
//  <label>birth Date</label>
//  <input type="date" name="child1Birthdate" [(ngModel)]="child1Birthdate"
//   [requiredIf]="!!child1Name" class="form-control">
// </div>
// <button class="btn btn-primary" type="submit" [disabled]="!form.valid">Submit form
// </button>
