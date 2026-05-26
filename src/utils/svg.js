/**
 * Rewrites hardcoded fill/stroke colors in an SVG string to "currentColor"
 * so the CSS color variable on the wrapper cascades into the icon correctly.
 *
 * Rules:
 *  - fill="none" / fill="transparent"  → preserved (structural, not a painted color)
 *  - fill="currentColor"               → already correct, kept as-is
 *  - fill="<anything else>"            → replaced with fill="currentColor"
 *  - Root <svg> with no fill attr      → gets fill="currentColor" so children inherit it
 *    (SVG spec default is black, which ignores CSS color variables)
 *  - Same logic applied to stroke attributes
 *  - Inline style values handled the same way
 */
export const normalizeSvg = svgString => {
    if ( ! svgString || typeof svgString !== 'string' ) return svgString;

    return svgString
        // If the root <svg> tag has no fill attribute at all, inject fill="currentColor"
        // so child elements without explicit fill inherit the CSS color context.
        .replace( /<svg(\b[^>]*)>/i, ( match, attrs ) => {
            if ( /\bfill\s*=/i.test( attrs ) ) return match;
            return `<svg${ attrs } fill="currentColor">`;
        } )
        // Presentation attribute: fill — replace anything that isn't none/transparent/currentColor
        .replace( /\bfill="(?!none|transparent|currentColor)[^"]*"/gi, 'fill="currentColor"' )
        // Presentation attribute: stroke
        .replace( /\bstroke="(?!none|transparent|currentColor)[^"]*"/gi, 'stroke="currentColor"' )
        // Inline style: fill (handles "fill: #000", "fill:#f00", "fill : black", etc.)
        .replace( /\bfill\s*:\s*(?!none|transparent|currentColor)([^;}"'\s][^;}"']*)/gi, 'fill: currentColor' )
        // Inline style: stroke
        .replace( /\bstroke\s*:\s*(?!none|transparent|currentColor)([^;}"'\s][^;}"']*)/gi, 'stroke: currentColor' );
};
