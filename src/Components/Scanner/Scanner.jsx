import React, { useEffect, useState } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import "./Scanner.css"

const Scanner = () => {
  const [scanResult, setScanResult] = useState(null)
  const [manualSerialNumber, setManualSerialNumber] = useState('')

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    })

    let isScanning = true

    scanner.render(success, error)

    function success(result) {
      if (isScanning) {
        scanner.clear()
        setScanResult(result)
        isScanning = false
      }
    }

    function error(err) {
      console.warn(err);
    }
  }, [])

  function handleManualSerialNumberChange(event) {
    setManualSerialNumber(event.target.value)
  }

  return (
    <div className="scanner">
      <h1>QR Scanning Code</h1>
      {scanResult ? (
        <div>
          <p>Success: <a href={scanResult}>{scanResult}</a></p>
          <p>Serial Number: {scanResult.slice(-16)}</p>
        </div>
      ) : (
        <div>
          <div id="reader"></div>
          <p className="center-text">Or enter the serial number manually:</p>
          <div className="center-input">
            <input
              type="text"
              value={manualSerialNumber}
              onChange={handleManualSerialNumberChange}
            />
            {manualSerialNumber && (
              <p>Serial Number: {manualSerialNumber.slice(-16)}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Scanner