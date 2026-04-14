/**
 * WordPress Dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { Fragment, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { plus, closeSmall } from '@wordpress/icons';
import { Button } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import Inspector from './inspector';
import './style.scss';

/**
 * Add / Remove Helpers
 */
const AddControl = ( { onClick } ) => (
	<div className="yen-pc-add-item">
		<Button onClick={ onClick } icon={ plus } variant="secondary">
			{ __( 'Add New Row', 'yen-blocks' ) }
		</Button>
	</div>
);

const RemoveControl = ( { onClick } ) => (
	<div className="yen-pc-remove-item">
		<Button 
			onClick={ onClick } 
			icon={ closeSmall } 
			variant="primary" 
			className="remove-btn"
		/>
	</div>
);

const Edit = ( props ) => {
	const { attributes, setAttributes, isSelected } = props;
	const {
		prosTitle,
		consTitle,
		pros,
		cons,
		headerBg,
		headerColor,
		itemBg,
		itemColor,
		borderColor,
		dividerColor,
	} = attributes;

	// Style Generation (Conditional Mapping)
	const cssCustomProperties = {
		...( headerBg && { '--yen-pc-header-bg': headerBg } ),
		...( headerColor && { '--yen-pc-header-color': headerColor } ),
		...( itemBg && { '--yen-pc-item-bg': itemBg } ),
		...( itemColor && { '--yen-pc-item-color': itemColor } ),
		...( borderColor && { '--yen-pc-border-color': borderColor } ),
		...( dividerColor && { '--yen-pc-divider-color': dividerColor } ),
	};

    /**
     * Handle Block Style Effect
     */
    useEffect(() => {
        setAttributes({
            blockStyle: cssCustomProperties
        });
    }, [headerBg, headerColor, itemBg, itemColor, borderColor, dividerColor]);


	const blockProps = useBlockProps( {
		className: 'yen-blocks-pros-cons',
		style: cssCustomProperties
	} );

	// Determine max rows to sync both columns
	const maxRows = Math.max( pros.length, cons.length, 1 );

	// Update list item
	const updateItem = ( listName, index, val ) => {
		const newList = [ ...attributes[ listName ] ];
		newList[ index ] = val;
		setAttributes( { [ listName ]: newList } );
	};

	// Add Row
	const addRow = () => {
		setAttributes( {
			pros: [ ...pros, '' ],
			cons: [ ...cons, '' ],
		} );
	};

	// Remove Row
	const removeRow = ( index ) => {
		const newPros = [ ...pros ];
		const newCons = [ ...cons ];
		newPros.splice( index, 1 );
		newCons.splice( index, 1 );
		setAttributes( { pros: newPros, cons: newCons } );
	};

	return (
		<Fragment>
			{ isSelected && <Inspector { ...props } /> }
			<div { ...blockProps }>
				{ /* HEADER BOX */ }
				<div className="yen-pc-header yen-pc-box">
					<div className="yen-pc-column-header pros">
						<RichText
							className="title"
							tagName="p"
							value={ prosTitle }
							onChange={ ( val ) => setAttributes( { prosTitle: val } ) }
							placeholder={ __( 'Pros', 'yen-blocks' ) }
						/>
					</div>
					<div className="yen-pc-divider-vertical" />
					<div className="yen-pc-column-header cons">
						<RichText
							className="title"
							tagName="p"
							value={ consTitle }
							onChange={ ( val ) => setAttributes( { consTitle: val } ) }
							placeholder={ __( 'Cons', 'yen-blocks' ) }
						/>
					</div>
				</div>

				{ /* CONTENT ROWS WITH GAPS */ }
				<div className="yen-pc-rows">
					{ Array.from( { length: maxRows } ).map( ( _, index ) => (
						<div key={ index } className="yen-pc-content-row yen-pc-box">
							<div className="yen-pc-column pros">
								<RichText
									tagName="div"
									value={ pros[ index ] || '' }
									onChange={ ( val ) => updateItem( 'pros', index, val ) }
									placeholder={ __( 'Add a pro...', 'yen-blocks' ) }
								/>
							</div>
							<div className="yen-pc-divider-vertical" />
							<div className="yen-pc-column cons">
								<RichText
									tagName="div"
									value={ cons[ index ] || '' }
									onChange={ ( val ) => updateItem( 'cons', index, val ) }
									placeholder={ __( 'Add a con...', 'yen-blocks' ) }
								/>
							</div>

							{ isSelected && maxRows > 1 && (
								<RemoveControl onClick={ () => removeRow( index ) } />
							) }
						</div>
					) ) }
				</div>

				{ isSelected && <AddControl onClick={ addRow } /> }
			</div>
		</Fragment>
	);
};

export default Edit;
