import { Box, Button, Form, Input, Modal, SpaceBetween } from "@cloudscape-design/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../../utils/trpc";
import ControlledFormField from "../../form/ControlledFormField";
import { insertRegionSchema, Region } from "@livecomp/server/src/db/schema/venues";

const formSchema = insertRegionSchema.omit({ venueId: true });

type FormData = z.infer<typeof formSchema>;

export default function EditRegionModalButton({ region }: { region: Region }) {
    const utils = api.useUtils();

    const [visible, setVisible] = useState(false);

    const { mutate: updateRegion, isPending } = api.regions.update.useMutation({
        onSuccess: async () => {
            await utils.regions.fetchAll.invalidate();
            await utils.regions.fetchById.invalidate({ id: region.id });
            await utils.regions.fetchAllByVenueId.invalidate({ venueId: region.venueId });
            setVisible(false);
        },
        onSettled: () => form.reset(),
    });

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: region,
    });

    useEffect(() => {
        form.reset(region);
    }, [form, region]);

    const onSubmit = (data: FormData) => {
        updateRegion({ id: region.id, data });
    };

    return (
        <>
            <Button onClick={() => setVisible(true)}>Edit</Button>

            <Modal visible={visible} onDismiss={() => setVisible(false)} header="Update region">
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

