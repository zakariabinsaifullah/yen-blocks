import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { NativeTextareaControl } from '../../components';

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const { icon } = attributes;

    return (
        <InspectorControls>
            <PanelBody title={__('Settings', 'yen-blocks')}>
                <NativeTextareaControl
                    label={__('Icon (SVG)', 'yen-blocks')}
                    value={icon}
                    onChange={value => setAttributes({ icon: value })}
                    placeholder={__('Paste SVG markup here...', 'yen-blocks')}
                />
            </PanelBody>
        </InspectorControls>
    );
};

export default Inspector;
