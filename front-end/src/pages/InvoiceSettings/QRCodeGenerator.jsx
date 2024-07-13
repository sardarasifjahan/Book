import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = ({ value, size = 128 }) => {
    return (
        <QRCode
            value={value}
            size={size}
            level={'H'}
            includeMargin={true}
        />
    );
};

export default QRCodeGenerator;
