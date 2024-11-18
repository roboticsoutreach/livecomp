import { Input, SpaceBetween } from "@cloudscape-design/components";
import { insertGameSchema } from "@livecomp/server/src/db/schema/games";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import ControlledFormField from "../form/ControlledFormField";

export const gameFormSchema = insertGameSchema;
type FormData = z.infer<typeof insertGameSchema>;

export default function GameFormFields({ form }: { form: UseFormReturn<FormData> }) {
    return (
        <SpaceBetween direction="vertical" size="s">
            <ControlledFormField
                label="Name"
                form={form}
                name="name"
                render={({ field }) => <Input placeholder="Name" {...field} />}
            />

            <ControlledFormField
                label="Match duration"
                form={form}
                name="matchDuration"
                render={({ field }) => (
                    <Input
                        type="number"
                        inputMode="numeric"
                        placeholder="Match duration"
                        {...field}
                        value={field.value.toString()}
                        onChange={(e) => {
                            form.setValue(field.name, parseInt(e.detail.value));
                        }}
                    />
                )}
            />

            <ControlledFormField
                label="Default match spacing"
                form={form}
                name="defaultMatchSpacing"
                render={({ field }) => (
                    <Input
                        type="number"
                        inputMode="numeric"
                        placeholder="Default match spacing"
                        {...field}
                        value={field.value.toString()}
                        onChange={(e) => {
                            form.setValue(field.name, parseInt(e.detail.value));
                        }}
                    />
                )}
            />
        </SpaceBetween>
    );
}

