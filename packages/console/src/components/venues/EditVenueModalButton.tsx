import { Box, Button, Form, Input, Modal, SpaceBetween } from "@cloudscape-design/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ControlledFormField from "../form/ControlledFormField";
import { api } from "../../utils/trpc";
import { insertVenueSchema, Venue } from "@livecomp/server/src/db/schema/venues";

const formSchema = insertVenueSchema;

type FormData = z.infer<typeof formSchema>;

export default function EditVenueModalButton({ venue }: { venue: Venue }) {
    const utils = api.useUtils();

    const [visible, setVisible] = useState(false);

    const { mutate: updateVenue, isPending } = api.venues.update.useMutation({
        onSuccess: async () => {
            await utils.venues.fetchAll.invalidate();
            await utils.venues.fetchById.invalidate({ id: venue.id });
            setVisible(false);
        },
        onSettled: () => form.reset(),
    });

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...venue,
        },
    });

    useEffect(() => {
        form.reset({
            ...venue,
        });
    }, [form, venue]);

    const onSubmit = (data: FormData) => {
        updateVenue({ id: venue.id, data });
    };

    return (
        <>
            <Button iconName="edit" variant="icon" onClick={() => setVisible(true)} />

            <Modal visible={visible} onDismiss={() => setVisible(false)} header="Update game">
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
                                        Save
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

