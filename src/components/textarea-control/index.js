import { TextareaControl } from '@wordpress/components';

const NativeTextareaControl = ({ label, value, onChange, placeholder = '' }) => {
    return (
        <div className="native-control-wrapper">
            <TextareaControl
                label={label}
                value={value}
                placeholder={placeholder}
                onChange={v => onChange(v)}
                __next40pxDefaultSize
                __nextHasNoMarginBottom
            />
        </div>
    );
};

export default NativeTextareaControl;
