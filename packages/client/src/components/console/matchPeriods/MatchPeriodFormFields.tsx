import { DateInput, Grid, Input, Select, SpaceBetween, TimeInput } from "@cloudscape-design/components";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import ControlledFormField from "../form/ControlledFormField";
import { insertMatchPeriodSchema } from "@livecomp/server/src/db/schema/matches";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";

export const matchPeriodFormSchema = insertMatchPeriodSchema.omit({ competitionId: true });
type FormData = z.infer<typeof matchPeriodFormSchema>;

const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const timePattern = /^\d{2}:\d{2}:\d{2}$/;

const typeOptions = [
    {
        label: "League",
        value: "league",
    },
    {
        label: "Knockouts",
        value: "knockouts",
    },
];

export default function MatchPeriodFormFields({ form }: { form: UseFormReturn<FormData> }) {
    const [dateInput, setDateInput] = useState("");
    const [timeInput, setTimeInput] = useState("");

    const startsAt = form.getValues().startsAt;
    const [skipNextUpdate, setSkipNextUpdate] = useState(false);

    useEffect(() => {
        if (datePattern.test(dateInput) && timePattern.test(timeInput)) {
            setSkipNextUpdate(true);
            form.setValue(
                "startsAt",
                DateTime.fromFormat(`${dateInput} ${timeInput}`, "yyyy-MM-dd HH:mm:ss").toJSDate()
            );
        }
    }, [dateInput, form, timeInput]);

    useEffect(() => {
        if (skipNextUpdate) {
            setSkipNextUpdate(false);
            return;
        }

        if (startsAt) {
            const date = DateTime.fromJSDate(startsAt);
            setDateInput(date.toFormat("yyyy-MM-dd"));
            setTimeInput(date.toFormat("HH:mm:ss"));
        } else {
            setDateInput("");
            setTimeInput("");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                form={form}
                name="type"
                label="Type"
                render={({ field }) => (
                    <Select
                        {...field}
                        options={typeOptions}
                        selectedOption={typeOptions.find((option) => option.value === field.value) ?? null}
                        onChange={(e) => {
                            form.setValue("type", e.detail.selectedOption.value as "league" | "knockouts");
                        }}
                    />
                )}
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

