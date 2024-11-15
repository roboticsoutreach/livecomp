import { Box, Button, Form, Input, Modal, SpaceBetween } from "@cloudscape-design/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ControlledFormField from "../form/ControlledFormField";
import { api } from "../../../utils/trpc";
import { insertVenueSchema } from "@livecomp/server/src/db/schema/venues";

const formSchema = insertVenueSchema;

type FormData = z.infer<typeof formSchema>;

export default function CreateVenueModalButton() {
    const [visible, setVisible] = useState(false);

    const { mutate: createVenue, isPending } = api.venues.create.useMutation({
        onSuccess: async () => {
            setVisible(false);
        },
        onSettled: () => form.reset(),
    });

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data: FormData) => {
        createVenue({ data });
    };

    return (
        <>
            <Button variant="primary" onClick={() => setVisible(true)}>
                Create
            </Button>

            <Modal visible={visible} onDismiss={() => setVisible(false)} header="Create venue">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Form>
                        <SpaceBetween direction="vertical" size="s">
                            <ControlledFormField
                                label="Name"
                                form={form}
                                name="name"
                                render={({ field }) => <Input placeholder="Name" {...field} />}
                            />

                            <Box float="right">
                                <SpaceBetween direction="horizontal" size="xs">
                                    <Button variant="link" onClick={() => setVisible(false)}>
                                        Cancel
                                    </Button>
                                    <Button variant="primary" formAction="submit" loading={isPending}>
                                        Create
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

