import { Button, Modal, TabPanel, TextareaControl } from '@wordpress/components';
import { RawHTML, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import defaultIcons from './icons.json';

const IconPicker = ({ iconsPanel = false, setIconsPanel, value, onChange }) => {
    const [customSVG, setCustomSVG] = useState('');

    if (!iconsPanel) return null;

    const onSelectIcon = (svg) => {
        onChange(svg);
        setIconsPanel(false);
    };

    const handleCustomSVGInsert = () => {
        if (customSVG.trim()) {
            onSelectIcon(customSVG);
        }
    };

    return (
        <Modal 
            className="yen-icon-picker-modal" 
            title={__('Icon Picker', 'yen-blocks')} 
            onRequestClose={() => setIconsPanel(false)}
            width={500}
        >
            <TabPanel
                className="yen-icon-tabs"
                activeClass="is-active"
                tabs={[
                    {
                        name: 'library',
                        title: __('Icon Library', 'yen-blocks'),
                        className: 'tab-library',
                    },
                    {
                        name: 'custom',
                        title: __('Custom SVG', 'yen-blocks'),
                        className: 'tab-custom',
                    },
                ]}
            >
                {(tab) => (
                    <div className="yen-icon-tab-content">
                        {tab.name === 'library' && (
                            <div className="library-section">
                                <div className="icons-grid" style={{ 
                                    display: 'grid', 
                                    gridTemplateColumns: 'repeat(5, 1fr)', 
                                    gap: '10px',
                                    maxHeight: '400px',
                                    overflowY: 'auto',
                                    padding: '5px'
                                }}>
                                    {defaultIcons.map((icon, index) => (
                                        <Button
                                            key={index}
                                            className={classNames('icon-item', { 'is-active': value === icon.svg })}
                                            onClick={() => onSelectIcon(icon.svg)}
                                            style={{
                                                height: '60px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: '1px solid #ddd',
                                                borderRadius: '4px',
                                                padding: '5px',
                                                background: value === icon.svg ? '#f0f0f0' : 'transparent'
                                            }}
                                            title={icon.label}
                                        >
                                            <span style={{ width: '24px', height: '24px', display: 'flex' }}>
                                                <RawHTML>{icon.svg}</RawHTML>
                                            </span>
                                            <span style={{ fontSize: '10px', marginTop: '5px', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', whiteSpace: 'nowrap' }}>
                                                {icon.label}
                                            </span>
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {tab.name === 'custom' && (
                            <div className="custom-section">
                                <TextareaControl
                                    label={__('Paste SVG Code', 'yen-blocks')}
                                    help={__('Enter your own raw SVG code here (including <svg> tags).', 'yen-blocks')}
                                    value={customSVG}
                                    onChange={setCustomSVG}
                                    rows={10}
                                />
                                {customSVG && (
                                    <div className="svg-preview-wrapper" style={{ marginTop: '15px' }}>
                                        <span className="components-base-control__label">{__('Preview', 'yen-blocks')}</span>
                                        <div style={{ 
                                            padding: '15px', 
                                            border: '1px solid #eee', 
                                            borderRadius: '4px', 
                                            display: 'flex', 
                                            justifyContent: 'center', 
                                            alignItems: 'center',
                                            height: '120px'
                                        }}>
                                            <div style={{ width: '60px', height: '60px' }}>
                                                <RawHTML>{customSVG}</RawHTML>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div style={{ marginTop: '20px', textAlign: 'right' }}>
                                    <Button variant="primary" onClick={handleCustomSVGInsert} disabled={!customSVG.trim()}>
                                        {__('Insert Custom SVG', 'yen-blocks')}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </TabPanel>
        </Modal>
    );
};

/**
 * External Dependencies
 */
import classNames from 'classnames';

export default IconPicker;
