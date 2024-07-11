import type { AbstractControl, FormGroup } from "@angular/forms";

export type CustomForm <T> = FormGroup & {
    controls: { [key in keyof T]: AbstractControl };
  }