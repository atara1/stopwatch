export type Time = {
    minutes: string;
    seconds: string;
    milliseconds: string;
};

export type TimerState = {
    currentTime: Time;
    savedTime: Time[];
    isPaused: boolean;
    counter: number;
    lastPlayTimestamp: number;
};
