import { Box, Button, Form, Input, Modal, SpaceBetween } from "@cloudscape-design/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { insertStartingZoneSchema, StartingZone } from "@livecomp/server/src/db/schema/games";
import { api } from "../../../utils/trpc";
import ControlledFormField from "../../form/ControlledFormField";

const formSchema = insertStartingZoneSchema.omit({ gameId: true });

type FormData = z.infer<typeof formSchema>;

export default function EditStartingZoneModalButton({ startingZone }: { startingZone: StartingZone }) {
    const utils = api.useUtils();

    const [visible, setVisible] = useState(false);

    const { mutate: updateStartingZone, isPending } = api.startingZones.update.useMutation({
        onSuccess: async () => {
            await utils.startingZones.fetchAll.invalidate();
            await utils.startingZones.fetchById.invalidate({ id: startingZone.id });
            await utils.startingZones.fetchAllByGameId.invalidate({ gameId: startingZone.gameId });
            setVisible(false);
        },
        onSettled: () => form.reset(),
    });

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: startingZone,
    });

    useEffect(() => {
        form.reset(startingZone);
    }, [form, startingZone]);

    const onSubmit = (data: FormData) => {
        updateStartingZone({ id: startingZone.id, data });
    };

    return (
        <>
            <Button onClick={() => setVisible(true)}>Edit</Button>

            <Modal visible={visible} onDismiss={() => setVisible(false)} header="Update starting zone">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Form>
                        <SpaceBetween direction="vertical" size="s">
                            <ControlledFormField
                                label="Name"
                                form={form}
                                name="name"
                                render={({ field }) => <Input placeholder="Name" {...field} />}
                            />

                            <ControlledFormField
                                label="Color"
                                description="This should be a valid CSS color string. For example, 'red' or '#ff0000'."
                                form={form}
                                name="color"
                                render={({ field }) => <Input placeholder="Color" {...field} />}
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

