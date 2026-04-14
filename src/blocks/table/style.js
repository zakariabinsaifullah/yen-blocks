import { useEffect } from '@wordpress/element';

import { generateBorderWidth, generateBorderStyle, generateBorderColor, generateBoxStyles } from '../../styles';

const BlockStyle = props => {
    const { attributes, setAttributes } = props;

    const {
        tableBorder,
        cellPadding,
        headPadding,
        tableBg,
        tableColor,
        theadBg,
        theadColor,
        tfootBg,
        tfootColor,
        stripedColor,
        stripedBg,
        tableCellBorder,
        tableCellRadius,
        tableRowBorder,
        headBorder,
        cheadBorder,
        footerBorder,
        cfooterBorder,
        shSpacing,
        svSpacing,
        thFontSize,
        tfFontSize,
        tableMinWidth,
        indicatorColor,
        indicatorFontSize,
        indicatorMargin,
        tableRowGap
    } = attributes;

    // Table border (existing - thakbe)
    const borderWidth = tableBorder ? generateBorderWidth(tableBorder) : null;
    const borderStyle = tableBorder ? generateBorderStyle(tableBorder) : null;
    const borderColor = tableBorder ? generateBorderColor(tableBorder) : null;

    // Cell border (new - cell prefix add koro)
    const cellBorderWidth = tableCellBorder ? generateBorderWidth(tableCellBorder) : null;
    const cellBorderStyle = tableCellBorder ? generateBorderStyle(tableCellBorder) : null;
    const cellBorderColor = tableCellBorder ? generateBorderColor(tableCellBorder) : null;

    const cellRadiusValue =
        tableCellRadius?.top || tableCellRadius?.bottom || tableCellRadius?.right || tableCellRadius?.left
            ? generateBoxStyles(tableCellRadius)
            : null;

    // row
    const rowborderWidth = tableRowBorder ? generateBorderWidth(tableRowBorder) : null;
    const rowborderStyle = tableRowBorder ? generateBorderStyle(tableRowBorder) : null;
    const rowborderColor = tableRowBorder ? generateBorderColor(tableRowBorder) : null;
    // head cell
    const cheadborderWidth = cheadBorder ? generateBorderWidth(cheadBorder) : null;
    const cheadborderStyle = cheadBorder ? generateBorderStyle(cheadBorder) : null;
    const cheadborderColor = cheadBorder ? generateBorderColor(cheadBorder) : null;
    //  head

    const headborderWidth = headBorder ? generateBorderWidth(headBorder) : null;
    const headborderStyle = headBorder ? generateBorderStyle(headBorder) : null;
    const headborderColor = headBorder ? generateBorderColor(headBorder) : null;
    // footer

    const footerborderWidth = footerBorder ? generateBorderWidth(footerBorder) : null;
    const footerborderStyle = footerBorder ? generateBorderStyle(footerBorder) : null;
    const footerborderColor = footerBorder ? generateBorderColor(footerBorder) : null;
    // cell footer
    const cfooterborderWidth = cfooterBorder ? generateBorderWidth(cfooterBorder) : null;
    const cfooterborderStyle = cfooterBorder ? generateBorderStyle(cfooterBorder) : null;
    const cfooterborderColor = cfooterBorder ? generateBorderColor(cfooterBorder) : null;

    // header cell padding
    const headPaddingValue =
        headPadding?.top || headPadding?.bottom || headPadding?.right || headPadding?.left ? generateBoxStyles(headPadding) : null;

    // cell padding
    const cellPaddingValue =
        cellPadding?.top || cellPadding?.bottom || cellPadding?.right || cellPadding?.left ? generateBoxStyles(cellPadding) : null;

    // scroll indicator margin
    const indicatorMarginValue =
        indicatorMargin?.top || indicatorMargin?.bottom || indicatorMargin?.right || indicatorMargin?.left
            ? generateBoxStyles(indicatorMargin)
            : null;

    const cssCustomProperties = {
        ...(tableBg && { '--tbg': tableBg }),
        ...(tableColor && { '--tcolor': tableColor }),
        ...(borderWidth && { '--tborder-width': borderWidth }),
        ...(borderStyle && { '--tborder-style': borderStyle }),
        ...(borderColor && { '--tborder-color': borderColor }),
        ...(cellRadiusValue && { '--tc-radius': cellRadiusValue }),
        ...(cellPaddingValue && { '--td-padding': cellPaddingValue }),
        ...(headPaddingValue && { '--th-padding': headPaddingValue }),
        ...(theadBg && { '--theadbg': theadBg }),
        ...(theadColor && { '--theadcolor': theadColor }),
        ...(tfootBg && { '--tfootbg': tfootBg }),
        ...(tfootColor && { '--tfootcolor': tfootColor }),
        ...(stripedBg && { '--striped-bg': stripedBg }),
        ...(stripedColor && { '--striped-color': stripedColor }),
        ...(cellBorderWidth && { '--crow-width': cellBorderWidth }),
        ...(cellBorderStyle && { '--crow-style': cellBorderStyle }),
        ...(cellBorderColor && { '--crow-color': cellBorderColor }),
        ...(rowborderWidth && { '--trow-width': rowborderWidth }),
        ...(rowborderStyle && { '--trow-style': rowborderStyle }),
        ...(rowborderColor && { '--trow-color': rowborderColor }),
        ...(headborderWidth && { '--hb-width': headborderWidth }),
        ...(headborderStyle && { '--hb-style': headborderStyle }),
        ...(headborderColor && { '--hb-color': headborderColor }),
        ...(footerborderWidth && { '--fb-width': footerborderWidth }),
        ...(footerborderStyle && { '--fb-style': footerborderStyle }),
        ...(footerborderColor && { '--fb-color': footerborderColor }),
        ...(cheadborderWidth && { '--chb-width': cheadborderWidth }),
        ...(cheadborderStyle && { '--chb-style': cheadborderStyle }),
        ...(cheadborderColor && { '--chb-color': cheadborderColor }),
        ...(cfooterborderWidth && { '--cfb-width': cfooterborderWidth }),
        ...(cfooterborderStyle && { '--cfb-style': cfooterborderStyle }),
        ...(cfooterborderColor && { '--cfb-color': cfooterborderColor }),
        ...(shSpacing && { '--table-hseparation': shSpacing }),
        ...(svSpacing && { '--table-vseparation': svSpacing }),
        ...(thFontSize && { '--th-font-size': thFontSize }),
        ...(tfFontSize && { '--tf-font-size': tfFontSize }),
        ...(tableMinWidth && { '--tm-width': tableMinWidth }),
        ...(indicatorFontSize && { '--tsi-font-size': indicatorFontSize }),
        ...(indicatorMarginValue && { '--tsi-margin': indicatorMarginValue }),
        ...(indicatorColor && { '--tsi-color': indicatorColor }),
        ...(tableRowGap && { '--table-row-gap': tableRowGap })
    };

    useEffect(() => {
        setAttributes({
            blockStyle: cssCustomProperties
        });
    }, [
        tableBg,
        tableColor,
        tableBorder,
        theadBg,
        theadColor,
        tfootBg,
        tfootColor,
        stripedBg,
        stripedColor,
        cellPadding,
        cellBorderWidth,
        tableRowBorder,
        rowborderStyle,
        headPadding,
        cheadBorder,
        footerBorder,
        cfooterBorder,
        tableCellBorder,
        tableCellRadius,
        tableRowBorder,
        headBorder,
        cheadBorder,
        footerBorder,
        cfooterBorder,
        shSpacing,
        svSpacing,
        thFontSize,
        tfFontSize,
        tableMinWidth,
        indicatorColor,
        indicatorFontSize,
        indicatorMargin,
        tableRowGap
    ]);

    return null;
};

export default BlockStyle;
