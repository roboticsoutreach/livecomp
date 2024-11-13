import { Box, Button, Header, Modal, SpaceBetween } from "@cloudscape-design/components";
import { useState } from "react";
import { api } from "../../../utils/trpc";
import { Region } from "@livecomp/server/src/db/schema/venues";

export default function DeleteRegionButton({ region }: { region: Region }) {
    const utils = api.useUtils();

    const [modalVisible, setModalVisible] = useState(false);

    const { mutate: deleteRegion } = api.regions.delete.useMutation({
        onSuccess: async () => {
            await utils.regions.fetchAll.invalidate();
            await utils.regions.fetchAllByVenueId.invalidate({ venueId: region.venueId });
            await utils.regions.fetchById.invalidate({ id: region.id });
            setModalVisible(false);
        },
    });

    return (
        <>
            <Button onClick={() => setModalVisible(true)}>Delete</Button>

            <Modal
                visible={modalVisible}
                onDismiss={() => setModalVisible(false)}
                header={<Header>Delete region</Header>}
                footer={
                    <Box float="right">
                        <SpaceBetween direction="horizontal" size="xs">
                            <Button onClick={() => setModalVisible(false)}>Cancel</Button>
                            <Button variant="primary" onClick={() => deleteRegion({ id: region.id })}>
                                Confirm
                            </Button>
                        </SpaceBetween>
                    </Box>
                }
            >
                <SpaceBetween size="s">
                    <span>
                        Permanently delete <b>{region.name}</b>? You can't undo this action.
                    </span>
                </SpaceBetween>
            </Modal>
        </>
    );
}

