import { Box, Button, Form, Input, Modal, SpaceBetween } from "@cloudscape-design/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ControlledFormField from "../form/ControlledFormField";
import { insertGameSchema } from "@livecomp/server/src/db/schema/games";
import { api } from "../../../utils/trpc";

const formSchema = insertGameSchema;

type FormData = z.infer<typeof formSchema>;

export default function CreateGameModalButton() {
    const [visible, setVisible] = useState(false);

    const { mutate: createGame, isPending } = api.games.create.useMutation({
        onSuccess: async () => {
            setVisible(false);
        },
        onSettled: () =>
            form.reset({
                matchDuration: 0,
                defaultMatchSpacing: 0,
            }),
    });

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            matchDuration: 0,
            defaultMatchSpacing: 0,
        },
    });

    const onSubmit = (data: FormData) => {
        createGame({ data });
    };

    return (
        <>
            <Button variant="primary" onClick={() => setVisible(true)}>
                Create
            </Button>

            <Modal visible={visible} onDismiss={() => setVisible(false)} header="Create game">
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
                                label="Match duration"
                                form={form}
                                name="matchDuration"
                                render={({ field }) => (
                                    <Input
                                        type="number"
                                        inputMode="numeric"
                                        placeholder="Match duration"
                                        {...field}
                                        value={field.value.toString()}
                                        onChange={(e) => {
                                            form.setValue(field.name, parseInt(e.detail.value));
                                        }}
                                    />
                                )}
                            />

                            <ControlledFormField
                                label="Default match spacing"
                                form={form}
                                name="defaultMatchSpacing"
                                render={({ field }) => (
                                    <Input
                                        type="number"
                                        inputMode="numeric"
                                        placeholder="Default match spacing"
                                        {...field}
                                        value={field.value.toString()}
                                        onChange={(e) => {
                                            form.setValue(field.name, parseInt(e.detail.value));
                                        }}
                                    />
                                )}
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

