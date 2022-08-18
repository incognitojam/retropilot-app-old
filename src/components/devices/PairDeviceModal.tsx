import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { NextComponentType, NextPageContext } from 'next';
import { useEffect, useRef, useState } from 'react';
import { OnResultFunction, QrReader } from 'react-qr-reader';

type Props = {
  show: boolean;
  onClose: () => void;
};

const PairDeviceModal: NextComponentType<NextPageContext, {}, Props> = ({ show, onClose }) => {
  const pairingCodeInput = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const onResult: OnResultFunction = (result, error, reader) => {
    if (result) {
      const data = result.getText();
      setData(data);

      if (data.length > 0) {
        let token = data;
        if (data.startsWith('https://connect.comma.ai/?pair=')) {
          token = data.substring('https://connect.comma.ai/?pair='.length);
        }

        setToken(token);
        console.log(token);
      }
    }
    if (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!pairingCodeInput.current) {
      return;
    }

    if (token) {
      pairingCodeInput.current.value = token;
    }
  });

  return (
    <Modal
      show={show}
      onClose={onClose}
    >
      <Modal.Header>
        Pair new device
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          Simply scan the QR code on your device using the camera below, or enter the pairing code manually.
        </div>

        <QrReader
          constraints={{
            facingMode: 'environment',
          }}
          onResult={onResult}
          videoStyle={{ width: '100%' }}
        />

        <div className="mb-2">
          <Label
            htmlFor="pairing-code"
            value="Pairing code"
          />
        </div>
        <TextInput
          ref={pairingCodeInput}
          id="pairing-code"
          required={true}
          onChange={(e) => setData(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PairDeviceModal;
