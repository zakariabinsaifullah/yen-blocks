/**
 * WordPress Dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal Components
 */
import { 
    PanelColorControl
} from '../../components';

const Inspector = ( props ) => {
	const { attributes, setAttributes } = props;
	const {
		headerBg,
		headerColor,
		itemBg,
		itemColor,
		borderColor,
		dividerColor,
	} = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Colors', 'yen-blocks' ) }>
					<PanelColorControl
						title={ __( 'Header Colors', 'yen-blocks' ) }
						colorSettings={ [
							{
								value: headerBg,
								onChange: ( val ) => setAttributes( { headerBg: val } ),
								label: __( 'Background', 'yen-blocks' ),
							},
							{
								value: headerColor,
								onChange: ( val ) => setAttributes( { headerColor: val } ),
								label: __( 'Text Color', 'yen-blocks' ),
							},
						] }
					/>
					<PanelColorControl
						title={ __( 'Item Colors', 'yen-blocks' ) }
						colorSettings={ [
							{
								value: itemBg,
								onChange: ( val ) => setAttributes( { itemBg: val } ),
								label: __( 'Background', 'yen-blocks' ),
							},
							{
								value: itemColor,
								onChange: ( val ) => setAttributes( { itemColor: val } ),
								label: __( 'Text Color', 'yen-blocks' ),
							},
						] }
					/>
					<PanelColorControl
						title={ __( 'Border & Divider', 'yen-blocks' ) }
						colorSettings={ [
							{
								value: borderColor,
								onChange: ( val ) => setAttributes( { borderColor: val } ),
								label: __( 'Border Color', 'yen-blocks' ),
							},
							{
								value: dividerColor,
								onChange: ( val ) => setAttributes( { dividerColor: val } ),
								label: __( 'Divider Color', 'yen-blocks' ),
							},
						] }
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
};

export default Inspector;
