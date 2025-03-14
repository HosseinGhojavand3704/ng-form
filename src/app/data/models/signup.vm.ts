import { IFormFields } from "./form-fields.vm";

export interface ISignupVM {
    id: string;
    step: number;
    current: number;
    errors: Array<Record<string, unknown>>;
    fieldErrors: Record<string, unknown>;
    form: IFormFields;
}