import { FieldDescriptionType } from "./field-description-type.enum.enum";
import { IFields } from "./field.vm";

export interface IFormFields {
    fieldDescriptionShowType: keyof typeof FieldDescriptionType;
    fields: Array<IFields>;
    forms: IFormFields[];
    name: string;
    nestedFormShowType: string;
    submitLabel: string;
    title: string;
}