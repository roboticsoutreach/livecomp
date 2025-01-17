import { Input, SpaceBetween } from "@cloudscape-design/components";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import ControlledFormField from "../form/ControlledFormField";
import { insertDisplaySchema } from "@livecomp/server/src/db/schema/displays";

export const displayFormSchema = insertDisplaySchema.omit({ competitionId: true, route: true });
type FormData = z.infer<typeof displayFormSchema>;

export default function DisplayFormFields({ form }: { form: UseFormReturn<FormData> }) {
    return (
        <SpaceBetween direction="vertical" size="s">
            <ControlledFormField
                label="Name"
                form={form}
                name="name"
                render={({ field }) => <Input placeholder="Name" {...field} />}
            />

            <ControlledFormField
                label="Identifier"
                form={form}
                name="identifier"
                render={({ field }) => <Input placeholder="Identifier" {...field} />}
            />
        </SpaceBetween>
    );
}

