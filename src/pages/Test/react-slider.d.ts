declare module 'react-slider' {
    import * as React from 'react';

    interface SliderProps {
        className?: string;
        min?: number;
        max?: number;
        step?: number;
        value?: number | number[];
        defaultValue?: number | number[];
        onChange?: (value: number | number[]) => void;
        renderTrack?: (props: any, state: any) => React.ReactNode;
        renderThumb?: (props: any, state: any) => React.ReactNode;
    }

    const Slider: React.FC<SliderProps>;
    export default Slider;
}
