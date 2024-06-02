/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TabGroupCreateFormInputValues = {
    data?: string;
    encrypted_with_password?: boolean;
};
export declare type TabGroupCreateFormValidationValues = {
    data?: ValidationFunction<string>;
    encrypted_with_password?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TabGroupCreateFormOverridesProps = {
    TabGroupCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    data?: PrimitiveOverrideProps<TextFieldProps>;
    encrypted_with_password?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type TabGroupCreateFormProps = React.PropsWithChildren<{
    overrides?: TabGroupCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TabGroupCreateFormInputValues) => TabGroupCreateFormInputValues;
    onSuccess?: (fields: TabGroupCreateFormInputValues) => void;
    onError?: (fields: TabGroupCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TabGroupCreateFormInputValues) => TabGroupCreateFormInputValues;
    onValidate?: TabGroupCreateFormValidationValues;
} & React.CSSProperties>;
export default function TabGroupCreateForm(props: TabGroupCreateFormProps): React.ReactElement;
