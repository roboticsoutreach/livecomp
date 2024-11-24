import { DateInput, Grid, Input, SpaceBetween, TimeInput } from "@cloudscape-design/components";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import ControlledFormField from "../../form/ControlledFormField";
import { insertMatchPeriodSchema } from "@livecomp/server/src/db/schema/matches";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";

export const matchPeriodFormSchema = insertMatchPeriodSchema.omit({ competitionId: true });
type FormData = z.infer<typeof matchPeriodFormSchema>;

const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const timePattern = /^\d{2}:\d{2}:\d{2}$/;

export default function MatchPeriodFormFields({ form }: { form: UseFormReturn<FormData> }) {
    const [dateInput, setDateInput] = useState("");
    const [timeInput, setTimeInput] = useState("");

    const startsAt = form.getValues().startsAt;

    useEffect(() => {
        if (datePattern.test(dateInput) && timePattern.test(timeInput)) {
            form.setValue(
                "startsAt",
                DateTime.fromFormat(`${dateInput} ${timeInput}`, "yyyy-MM-dd HH:mm:ss").toJSDate()
            );
        }
    }, [form, dateInput, timeInput]);

    useEffect(() => {
        if (startsAt) {
            const date = DateTime.fromJSDate(startsAt);
            setDateInput(date.toFormat("yyyy-MM-dd"));
            setTimeInput(date.toFormat("HH:mm:ss"));
        } else {
            setDateInput("");
            setTimeInput("");
        }
    }, [startsAt]);

    return (
        <SpaceBetween direction="vertical" size="s">
            <ControlledFormField
                label="Name"
                form={form}
                name="name"
                render={({ field }) => <Input placeholder="Name" {...field} />}
            />

            <ControlledFormField
                label="Starts at"
                form={form}
                name="startsAt"
                render={() => (
                    <Grid gridDefinition={[{ colspan: 8 }, { colspan: 4 }]}>
                        <DateInput
                            placeholder="YYYY/MM/DD"
                            value={dateInput}
                            onChange={(e) => setDateInput(e.detail.value)}
                        />
                        <TimeInput
                            placeholder="HH:mm"
                            value={timeInput}
                            onChange={(e) => setTimeInput(e.detail.value)}
                        />
                    </Grid>
                )}
            />
        </SpaceBetween>
    );
}

