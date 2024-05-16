import React from 'react';
import { Card, Modal, Text } from 'components';
import { ReactModalVFC } from '@types';

const ModalExample: ReactModalVFC = () => {
  return (
    <Modal>
      <Card>
        <Text>Hello World</Text>
      </Card>
    </Modal>
  );
};

ModalExample.route = 'The-Route';

export const MODALS: ReactModalVFC[] = [ModalExample];
