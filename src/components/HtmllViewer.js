import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@mui/styles";

const styles = {
    flatContainer: {
        border: 'none !important',
        fontSize: '18px !important',
        padding: '2 !important',
        wordBreak: 'keep-all',
    },
    flatEditor: {
        padding: '0 !important',
        fontSize: 18,
        fontWeight: 'bold !important',
    },
};

function HtmlViewer({ html, className, flat, classes }) {
    return (
        <div className={(flat ? ' ' + classes.flatContainer : '')}>
            <div
                className={(className ? ' ' + className : '') + (flat ? ' ' + classes.flatEditor : '')}
                dangerouslySetInnerHTML={{
                    __html: html,
                }}
            />
        </div>
    );
}

HtmlViewer.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    flat: PropTypes.bool,
    html: PropTypes.string.isRequired,
    sanitize: PropTypes.bool,
};

HtmlViewer.defaultProps = {
    html: '',
    className: '',
    flat: true,
};

export default withStyles(styles)(HtmlViewer);
