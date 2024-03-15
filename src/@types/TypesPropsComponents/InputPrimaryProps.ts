export interface InputPrimaryProps{
    type: string;
    placeholder: string;
    onChange: (e : string) => void;
    value: string | number;
}