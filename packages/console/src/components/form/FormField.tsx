import { FormField, InputProps, NonCancelableCustomEvent } from "@cloudscape-design/components";
import { ReactElement } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";

// Some funky typescript stuff to simplify controlled Cloudscape form fields

type Controller<T extends FieldValues> = typeof Controller<T>;
type ControllerProps<T extends FieldValues> = Parameters<Controller<T>>[0];

export default function ControlledFormField<T extends FieldValues>({
    form,
    name,
    render,
}: {
    form: UseFormReturn<T>;
    name: ControllerProps<T>["name"];
    render: (args: {
        field: Omit<Parameters<ControllerProps<T>["render"]>[0]["field"], "onChange"> & {
            onChange: (e: NonCancelableCustomEvent<InputProps.ChangeDetail>) => void;
        };
    }) => ReactElement;
}) {
    return (
        <Controller
            control={form.control}
            name={name}
            render={(args) => (
                <FormField errorText={form.formState.errors[name]?.message as string | undefined}>
                    {render({
                        field: {
                            ...args.field,
                            onChange: (e) => {
                                args.field.onChange(e.detail.value);
                            },
                        },
                    })}
                </FormField>
            )}
        />
    );
}

