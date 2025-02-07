import { Button, FormField, Modal, SegmentedControl, Select, SpaceBetween } from "@cloudscape-design/components";
import { AppRouterOutput } from "@livecomp/server";
import { useMemo, useState } from "react";
import { ExcludeNull } from "../../../../utils/types";
import { MatchPeriodClock } from "@livecomp/utils";
import { api } from "../../../../utils/trpc";
import { showFlashbar } from "../../../../state/flashbars";

const OFFSET_OPTIONS = [15, 30, 45, 60].map((t) => ({ id: `${t}`, text: `${t} seconds` }));
const DIRECTION_OPTIONS = ["Before", "After"].map((d) => ({ id: d.toLowerCase(), text: d }));

export default function MoveCursorModalButton({
    matchPeriod,
    clock,
}: {
    matchPeriod: ExcludeNull<AppRouterOutput["matchPeriods"]["fetchActiveByCompetitionId"]>;
    clock: MatchPeriodClock<
        ExcludeNull<AppRouterOutput["matchPeriods"]["fetchActiveByCompetitionId"]>["matches"][number]
    >;
}) {
    const [visible, setVisible] = useState(false);

    const matchOptions = useMemo(
        () => matchPeriod.matches.map((match) => ({ value: match.id, label: match.name })),
        [matchPeriod.matches]
    );

    const [selectedMatch, setSelectedMatch] = useState<string | null>(null);
    const [selectedOffset, setSelectedOffset] = useState(OFFSET_OPTIONS[0].id);
    const [selectedDirection, setSelectedDirection] = useState(DIRECTION_OPTIONS[0].id);

    const { mutate: updateMatchPeriod, isPending } = api.matchPeriods.update.useMutation({
        onSuccess: () => {
            showFlashbar({ type: "success", content: "Cursor moved successfully" });
        },
        onSettled: () => {
            setSelectedMatch(null);
            setSelectedOffset(OFFSET_OPTIONS[0].id);
            setSelectedDirection(DIRECTION_OPTIONS[0].id);

            setVisible(false);
        },
    });

    const onSubmit = () => {
        if (!selectedMatch) {
            showFlashbar({ type: "error", content: "Please select a match" });
            setVisible(false);
            return;
        }

        const targetCursorPosition =
            clock.getMatchTimings(selectedMatch).cusorPositions.start +
            parseInt(selectedOffset) * (selectedDirection === "before" ? -1 : 1);

        updateMatchPeriod({
            id: matchPeriod.id,
            data: {
                cursorPosition: targetCursorPosition,
            },
        });
    };

    return (
        <>
            <Button iconName="upload-download" fullWidth onClick={() => setVisible(true)}>
                Move cursor
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

                    <Button onClick={onSubmit} loading={isPending}>
                        Move cursor
                    </Button>
                </SpaceBetween>
            </Modal>
        </>
    );
}

