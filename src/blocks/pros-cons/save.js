/**
 * WordPress Dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

const Save = ( { attributes } ) => {
	const {
		prosTitle,
		consTitle,
		pros,
		cons,
		blockStyle
	} = attributes;
	const blockProps = useBlockProps.save( {
		className: 'yen-blocks-pros-cons',
		style: blockStyle
	} );

    // Ensure we render all synced rows
	const maxRows = Math.max( pros.length, cons.length, 1 );

	return (
		<div { ...blockProps }>
			{ /* DESKTOP LAYOUT */ }
			<div className="yen-pc-desktop">
				{ /* HEADER BOX */ }
				<div className="yen-pc-header yen-pc-box">
					<div className="yen-pc-column-header pros">
						<RichText.Content
							tagName="p"
							className="title"
							value={ prosTitle }
						/>
					</div>
					<div className="yen-pc-divider-vertical" />
					<div className="yen-pc-column-header cons">
						<RichText.Content
							tagName="p"
							className="title"
							value={ consTitle }
						/>
					</div>
				</div>

				{ /* CONTENT ROWS */ }
				<div className="yen-pc-rows">
					{ Array.from( { length: maxRows } ).map( ( _, index ) => (
						<div key={ index } className="yen-pc-content-row yen-pc-box">
							<div className="yen-pc-column pros">
								<RichText.Content
									tagName="div"
									value={ pros[ index ] || '' }
								/>
							</div>
							<div className="yen-pc-divider-vertical" />
							<div className="yen-pc-column cons">
								<RichText.Content
									tagName="div"
									value={ cons[ index ] || '' }
								/>
							</div>
						</div>
					) ) }
				</div>
			</div>

			{ /* MOBILE LAYOUT: pros section then cons section */ }
			<div className="yen-pc-mobile">
				{ /* PROS SECTION */ }
				<div className="yen-pc-mobile-section">
					<div className="yen-pc-header yen-pc-box">
						<div className="yen-pc-column-header pros">
							<RichText.Content
								tagName="p"
								className="title"
								value={ prosTitle }
							/>
						</div>
					</div>
					<div className="yen-pc-rows">
						{ pros.map( ( pro, index ) => (
							<div key={ index } className="yen-pc-content-row yen-pc-box">
								<div className="yen-pc-column pros">
									<RichText.Content
										tagName="div"
										value={ pro || '' }
									/>
								</div>
							</div>
						) ) }
					</div>
				</div>

				{ /* CONS SECTION */ }
				<div className="yen-pc-mobile-section">
					<div className="yen-pc-header yen-pc-box">
						<div className="yen-pc-column-header cons">
							<RichText.Content
								tagName="p"
								className="title"
								value={ consTitle }
							/>
						</div>
					</div>
					<div className="yen-pc-rows">
						{ cons.map( ( con, index ) => (
							<div key={ index } className="yen-pc-content-row yen-pc-box">
								<div className="yen-pc-column cons">
									<RichText.Content
										tagName="div"
										value={ con || '' }
									/>
								</div>
							</div>
						) ) }
					</div>
				</div>
			</div>
		</div>
	);
};

export default Save;
