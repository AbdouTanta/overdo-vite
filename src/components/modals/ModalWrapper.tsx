import React, { Suspense } from 'react';
import { useModal } from '../../contexts/modal-context';
import ModalTypes from '../../types/ModalTypes';

const CreateBoardModal = React.lazy(() => import('./CreateBoardModal'));
const CreateListModal = React.lazy(() => import('./CreateListModal'));
const CreateTaskModal = React.lazy(() => import('./CreateTaskModal'));

function ModalWrapper() {
  const { modal } = useModal();

  const modals = {
    [ModalTypes.CREATE_BOARD]: CreateBoardModal,
    [ModalTypes.CREATE_LIST]: CreateListModal,
    [ModalTypes.CREATE_TASK]: CreateTaskModal,
    [ModalTypes.NULL]: null,
  };

  const ModalComponent = modals[modal.type];

  if (modal.open) {
    return (
      <div>
        <div className="fixed left-0 top-0 h-screen w-screen bg-black opacity-40" />
        {ModalComponent ? (
          <Suspense>
            <ModalComponent />
          </Suspense>
        ) : null}
      </div>
    );
  }

  return null;
}

export default ModalWrapper;
