import { FormGroup, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms'

export const samePasswordValidator : ValidatorFn = (control : FormGroup): ValidationErrors | null  => {
    const password: string = control.get('password').value;
    const rePassword: string = control.get('rePassword').value;
    return password !== rePassword ? { "checkPassword":  "passwords do not match" } : null; 
}


export const validPasswordValidator: ValidatorFn = (control: AbstractControl) : ValidationErrors | null => {
    const reg = /^(?=.{8,32}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*/
    reg.test(control.value)
    return !reg.test(control.value) ? { "invalidPassword" : 
    "password must be at least 8 characters long and atleast one capital leter and number"} : null;

} 