import type { AbstractControl, FormGroup } from "@angular/forms";

export type CustomForm <T = any> = FormGroup & {
    controls: { [key in keyof T]: AbstractControl };
  }