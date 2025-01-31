import { Input, SpaceBetween } from "@cloudscape-design/components";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import ControlledFormField from "../form/ControlledFormField";
import { insertMatchSchema } from "@livecomp/server/src/db/schema/matches";

export const matchFormSchema = insertMatchSchema.omit({ matchPeriodId: true });
type FormData = z.infer<typeof matchFormSchema>;

export default function MatchFormFields({ form }: { form: UseFormReturn<FormData> }) {
    return (
        <SpaceBetween direction="vertical" size="s">
            <ControlledFormField
                label="Name"
                form={form}
                name="name"
                render={({ field }) => <Input placeholder="Name" {...field} />}
            />

            <ControlledFormField
                label="Sequence number"
                form={form}
                name="sequenceNumber"
                render={({ field }) => (
                    <Input
                        type="number"
                        inputMode="numeric"
                        placeholder="Sequence number"
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

