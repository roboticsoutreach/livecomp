import { Box, Button, Checkbox, Form, Input, Modal, SpaceBetween } from "@cloudscape-design/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../../utils/trpc";
import ControlledFormField from "../../form/ControlledFormField";
import { insertShepherdSchema, Region } from "@livecomp/server/src/db/schema/venues";

const formSchema = insertShepherdSchema.omit({ venueId: true });

type FormData = z.infer<typeof formSchema>;

export default function CreateShepherdModalButton({ venueId, regions }: { venueId: string; regions: Region[] }) {
    const [visible, setVisible] = useState(false);

    const { mutate: createShepherd, isPending } = api.shepherds.create.useMutation({
        onSuccess: async () => {
            setVisible(false);
        },
        onSettled: () =>
            form.reset({
                regionIds: [],
            }),
    });

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            regionIds: [],
        },
    });

    const onSubmit = (data: FormData) => {
        createShepherd({ data: { ...data, venueId } });
    };

    return (
        <>
            <Button variant="primary" onClick={() => setVisible(true)}>
                Create shepherd
            </Button>

            <Modal visible={visible} onDismiss={() => setVisible(false)} header="Create shepherd">
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
                                label="Regions"
                                form={form}
                                name="regionIds"
                                render={({ field }) => (
                                    <>
                                        {regions.map((region) => (
                                            <Checkbox
                                                key={region.id}
                                                checked={field.value?.includes(region.id) ?? false}
                                                onChange={(e) => {
                                                    if (e.detail.checked) {
                                                        form.setValue("regionIds", [...(field.value ?? []), region.id]);
                                                    } else {
                                                        form.setValue(
                                                            "regionIds",
                                                            field.value?.filter((id) => id !== region.id)
                                                        );
                                                    }
                                                }}
                                            >
                                                {region.name}
                                            </Checkbox>
                                        ))}
                                    </>
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

