import { __ } from '@wordpress/i18n';

export const ALIGNS = [
    { value: '', label: __('Auto', 'native-table') },
    { value: 'left', label: __('Left', 'native-table') },
    { value: 'center', label: __('Center', 'native-table') },
    { value: 'right', label: __('Right', 'native-table') }
];

export const RESPONSIVE_MODES = [
    { value: '', label: __('None', 'native-table') },
    { value: 'scroll', label: __('Horizontal Scroll', 'native-table') },
    { value: 'stacked', label: __('Stacked Card (Upcoming)', 'native-table'), disabled: true },
    { value: 'priority', label: __('Priority Columns (Upcoming)', 'native-table'), disabled: true },
    { value: 'flip', label: __('Flip Table (Upcoming)', 'native-table'), disabled: true },
    { value: 'grid', label: __('Card Grid (Upcoming)', 'native-table'), disabled: true }
];
