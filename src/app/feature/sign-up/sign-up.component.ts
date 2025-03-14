import {Component, effect, inject, Injector, linkedSignal, runInInjectionContext} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, ValidatorFn, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {CommonModule} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FieldType} from '../../data/models/field-type.enum.enum';
import {AuthService} from '../../data/services/auth.service';
import {IFields} from '../../data/models/field.vm';

@Component({
  standalone: true,
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [AuthService],
  imports: [MatInputModule, MatTooltipModule, ReactiveFormsModule, CommonModule, TranslatePipe],
})
export class SignUpComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly injector = inject(Injector);

  protected readonly FieldType = FieldType;

  formConfig = linkedSignal({
    source: this.authService.getSignUp.value,
    computation: (value) => value?.form,
  }).asReadonly();

  signUpForm = this.formBuilder.group({});

  constructor() {
    effect(() => this.buildFormControls());
  }

  onSubmit(): void {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const formValue = this.removeConfirmationField(this.signUpForm.value);

    runInInjectionContext(this.injector, () =>
      this.authService.postSignUp(formValue)
    );
  }

  getTranslationKey(fieldName: string): string {
    const translationPrefix = 'signUp.';
    return translationPrefix + this.convertToCamelCase(fieldName);
  }

  private buildFormControls(): void {
    const config = this.formConfig();
    if (!config)
      return;

    config.fields = this.addConfirmationField(config.fields);

    config.fields.forEach(field => {
      const validators = this.generateValidators(field);
      const control = new FormControl('', validators);
      this.signUpForm.addControl(field.name, control);
    });
  }

  private addConfirmationField(fields: IFields[]): IFields[] {
    const passwordField = fields.find(f =>
      f['@type'].includes(FieldType.NewPasswordField)
    );

    if (!passwordField?.showConfirmPassword)
      return fields;

    return [
      ...fields,
      {
        ...passwordField,
        name: 'confirm_password',
        title: 'confirm_password',
      }
    ];
  }

  private generateValidators(field: IFields): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    if (field.required) validators.push(Validators.required);
    if (field.maxLength) validators.push(Validators.maxLength(field.maxLength));
    if (field.minLength) validators.push(Validators.minLength(field.minLength));

    return validators;
  }

  private removeConfirmationField(formData: Record<string, unknown>): Record<string, unknown> {
    const {confirm_password, ...cleanData} = formData;
    return cleanData;
  }

  private convertToCamelCase(input: string): string {
    return input
      .toLowerCase()
      .split('_')
      .map((word, index) =>
        index === 0 ? word : word[0].toUpperCase() + word.slice(1)
      )
      .join('');
  }
}
