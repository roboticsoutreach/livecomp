import { Box, Button, Form, Input, Modal, SpaceBetween } from "@cloudscape-design/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { insertStartingZoneSchema } from "@livecomp/server/src/db/schema/games";
import ControlledFormField from "../../form/ControlledFormField";
import { api } from "../../../../utils/trpc";

const formSchema = insertStartingZoneSchema.omit({ gameId: true });

type FormData = z.infer<typeof formSchema>;

export default function CreateStartingZoneModalButton({ gameId }: { gameId: string }) {
    const [visible, setVisible] = useState(false);

    const { mutate: createStartingZone, isPending } = api.startingZones.create.useMutation({
        onSuccess: async () => {
            setVisible(false);
        },
        onSettled: () => form.reset(),
    });

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data: FormData) => {
        createStartingZone({ data: { ...data, gameId } });
    };

    return (
        <>
            <Button variant="primary" onClick={() => setVisible(true)}>
                Create starting zone
            </Button>

            <Modal visible={visible} onDismiss={() => setVisible(false)} header="Create starting zone">
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

