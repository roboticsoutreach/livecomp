import { Box, Button, Form, Modal, SpaceBetween, Textarea } from "@cloudscape-design/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../../utils/trpc";
import { MatchPeriod } from "@livecomp/server/src/db/schema/matches";
import ControlledFormField from "../form/ControlledFormField";

const formSchema = z.object({
    schedule: z.string(),
});
type FormData = z.infer<typeof formSchema>;

export default function ImportScheduleModalButton({ matchPeriod }: { matchPeriod: MatchPeriod }) {
    const [visible, setVisible] = useState(false);

    const { mutate: importSchedule, isPending } = api.matchPeriods.importSchedule.useMutation({
        onSuccess: async () => {
            setVisible(false);
        },
        onError: (error) => {
            form.setError("root", { message: error.message });
        },
        onSettled: () => form.reset(),
    });

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        form.reset();
    }, [form]);

    const onSubmit = (data: FormData) => {
        importSchedule({
            id: matchPeriod.id,
            data,
        });
    };

    return (
        <>
            <Button onClick={() => setVisible(true)}>Import schedule</Button>

            <Modal visible={visible} onDismiss={() => setVisible(false)} header="Update match period">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Form>
                        <SpaceBetween direction="vertical" size="s">
                            <ControlledFormField
                                label="Schedule"
                                form={form}
                                name="schedule"
                                render={({ field }) => <Textarea placeholder="Schedule content" {...field} />}
                            />

                            <Box float="right">
                                <SpaceBetween direction="horizontal" size="xs">
                                    <Button variant="link" onClick={() => setVisible(false)}>
                                        Cancel
                                    </Button>
                                    <Button variant="primary" formAction="submit" loading={isPending}>
                                        Import
                                    </Button>
                                </SpaceBetween>
                            </Box>
                        </SpaceBetween>
                    </Form>
                </form>
            </Modal>
        </>
    );
}

