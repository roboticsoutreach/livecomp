interface ShowTextMessage {
    type: "showText";
    text: string;
    durationMs: number;
}

export type DisplayMessage = ShowTextMessage;

