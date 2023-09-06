import React, { useState } from "react";
import QRCode from "qrcode.react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";

const QRCodeButton: React.FC<{ text?: string }> = ({
  text = "Sample QR Data",
}) => {
  const [showQR, setShowQR] = useState(false);

  return (
    <div>
      <button onClick={() => setShowQR(!showQR)}>
        <FontAwesomeIcon icon={faQrcode} /> Show QR Code
      </button>

      {showQR && <QRCode value={text} />}
    </div>
  );
};

export default QRCodeButton;
