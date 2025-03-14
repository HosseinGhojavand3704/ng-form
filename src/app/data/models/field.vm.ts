import { FieldType } from "./field-type.enum.enum";

export interface IFields {
    "@type": FieldType;
    name: string;
    title: string;
    description?: string;
    errorMessage?: string;
    regex?: string;
    maxLength?: number;
    minLength?: number;
    required?: boolean;
    showConfirmPassword?: boolean;
}
