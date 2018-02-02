export interface IPlayerState {
    playing?: boolean;
    shuffle?: boolean;
    repeat?: RepeatModes;
}

export enum RepeatModes {
    REPEAT_ONCE,
    REPEAT_ALL,
    REPEAT_NONE
}

export const DefaultPlayerState: IPlayerState = {
    playing: false,
    shuffle: true,
    repeat: RepeatModes.REPEAT_ALL
};

export const toggleRepeatModes = mode => {
    switch (mode) {
        case RepeatModes.REPEAT_ONCE:
            {
                return RepeatModes.REPEAT_ALL;
            }
        case RepeatModes.REPEAT_ALL:
            {
                return RepeatModes.REPEAT_NONE;
            }
        case RepeatModes.REPEAT_NONE:
            {
                return RepeatModes.REPEAT_ONCE;
            }
    }
};
