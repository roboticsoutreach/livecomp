import { Alert, Box, Button, Header, Modal, SpaceBetween } from "@cloudscape-design/components";
import { queryClient } from "../../main";
import { $api } from "../../modules/api";
import { useState } from "react";
import { SchemaGame } from "@livecomp/sdk/src/schema";

export default function DeleteGameButton({ game }: { game: SchemaGame }) {
    const [modalVisible, setModalVisible] = useState(false);

    const { mutate: deleteGame } = $api.useMutation("delete", `/games/${game.id}`, {
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["get", "/games"] });
            await queryClient.invalidateQueries({ queryKey: ["get", `/games/${game.id}`] });
        },
    });

    return (
        <>
            <Button onClick={() => setModalVisible(true)}>Delete</Button>

            <Modal
                visible={modalVisible}
                onDismiss={() => setModalVisible(false)}
                header={<Header>Delete game</Header>}
                footer={
                    <Box float="right">
                        <SpaceBetween direction="horizontal" size="xs">
                            <Button onClick={() => setModalVisible(false)}>Cancel</Button>
                            <Button variant="primary" onClick={() => deleteGame({ params: { path: { id: game.id } } })}>
                                Confirm
                            </Button>
                        </SpaceBetween>
                    </Box>
                }
            >
                <SpaceBetween size="s">
                    <span>
                        Permanently delete <b>{game.name}</b>? You can't undo this action.
                    </span>
                    <Alert>
                        This will fail if competitions exist using this game. To delete the game, first ensure no
                        competitions are using it.
                    </Alert>
                </SpaceBetween>
            </Modal>
        </>
    );
}

