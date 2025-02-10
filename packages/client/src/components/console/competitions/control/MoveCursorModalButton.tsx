import { Button, FormField, Modal, SegmentedControl, Select, SpaceBetween } from "@cloudscape-design/components";
import { AppRouterOutput } from "@livecomp/server";
import { useMemo, useState } from "react";
import { showFlashbar } from "../../../../state/flashbars";
import { ExcludeNull } from "../../../../utils/types";

const OFFSET_OPTIONS = [15, 30, 45, 60].map((t) => ({ id: `${t}`, text: `${t} seconds` }));
const DIRECTION_OPTIONS = ["Before", "After"].map((d) => ({ id: d.toLowerCase(), text: d }));

export default function OffsetCursorModalButton({
    competition,
}: {
    competition: ExcludeNull<AppRouterOutput["competitions"]["fetchById"]>;
}) {
    const [visible, setVisible] = useState(false);

    const matchOptions = useMemo(
        () => competition.matches.map((match) => ({ value: match.id, label: match.name })),
        [competition]
    );

    const [selectedMatch, setSelectedMatch] = useState<string | null>(null);
    const [selectedOffset, setSelectedOffset] = useState(OFFSET_OPTIONS[0].id);
    const [selectedDirection, setSelectedDirection] = useState(DIRECTION_OPTIONS[0].id);

    const onSubmit = () => {
        if (!selectedMatch) {
            showFlashbar({ type: "error", content: "Please select a match" });
            setVisible(false);
            return;
        }

        // TODO add cursor offset
    };

    return (
        <>
            <Button iconName="upload-download" fullWidth onClick={() => setVisible(true)}>
                Offset cursor
            </Button>

            <Modal header="Move cursor" visible={visible} onDismiss={() => setVisible(false)}>
                <SpaceBetween size="s">
                    <FormField label="Offset">
                        <SpaceBetween size="xs">
                            <SegmentedControl
                                options={OFFSET_OPTIONS}
                                selectedId={selectedOffset}
                                onChange={(e) => setSelectedOffset(e.detail.selectedId)}
                            />
                            <SegmentedControl
                                options={DIRECTION_OPTIONS}
                                selectedId={selectedDirection}
                                onChange={(e) => setSelectedDirection(e.detail.selectedId)}
                            />
                        </SpaceBetween>
                    </FormField>

                    <FormField label="Relative to start of">
                        <Select
                            selectedOption={matchOptions.find((option) => option.value === selectedMatch) ?? null}
                            options={matchOptions}
                            onChange={(e) => setSelectedMatch(e.detail.selectedOption.value ?? null)}
                        />
                    </FormField>

                    <Button onClick={onSubmit}>Move cursor</Button>
                </SpaceBetween>
            </Modal>
        </>
    );
}

