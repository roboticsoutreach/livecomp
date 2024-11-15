import { Box, Button, Checkbox, Form, Input, Modal, SpaceBetween } from "@cloudscape-design/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../../../utils/trpc";
import ControlledFormField from "../../form/ControlledFormField";
import { insertShepherdSchema, Region, Shepherd } from "@livecomp/server/src/db/schema/venues";

const formSchema = insertShepherdSchema.omit({ venueId: true });

type FormData = z.infer<typeof formSchema>;

export default function EditShepherdModalButton({ shepherd, regions }: { shepherd: Shepherd; regions: Region[] }) {
    const [visible, setVisible] = useState(false);

    const { mutate: updateShepherd, isPending } = api.shepherds.update.useMutation({
        onSuccess: async () => {
            setVisible(false);
        },
        onSettled: () => form.reset(shepherd),
    });

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: shepherd,
    });

    useEffect(() => {
        form.reset(shepherd);
    }, [form, shepherd]);

    const onSubmit = (data: FormData) => {
        updateShepherd({ id: shepherd.id, data: { ...data } });
    };

    return (
        <>
            <Button onClick={() => setVisible(true)}>Edit</Button>

            <Modal visible={visible} onDismiss={() => setVisible(false)} header="Update shepherd">
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

