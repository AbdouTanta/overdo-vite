import React, { Suspense } from 'react';
import { useModal } from '../../contexts/modal-context';
import ModalTypes from '../../types/ModalTypes';

const CreateBoardModal = React.lazy(() => import('./board/CreateBoardModal'));
const EditBoardModal = React.lazy(() => import('./board/EditBoardModal'));
const DeleteBoardModal = React.lazy(() => import('./board/DeleteBoardModal'));

const CreateListModal = React.lazy(() => import('./list/CreateListModal'));
const EditListModal = React.lazy(() => import('./list/EditListModal'));
const DeleteListModal = React.lazy(() => import('./list/DeleteListModal'));

const CreateTaskModal = React.lazy(() => import('./task/CreateTaskModal'));
const EditTaskModal = React.lazy(() => import('./task/EditTaskModal'));
const DeleteTaskModal = React.lazy(() => import('./task/DeleteTaskModal'));

function ModalWrapper() {
  const { modal } = useModal();

  const modals = {
    [ModalTypes.CREATE_BOARD]: CreateBoardModal,
    [ModalTypes.EDIT_BOARD]: EditBoardModal,
    [ModalTypes.DELETE_BOARD]: DeleteBoardModal,

    [ModalTypes.CREATE_LIST]: CreateListModal,
    [ModalTypes.EDIT_LIST]: EditListModal,
    [ModalTypes.DELETE_LIST]: DeleteListModal,

    [ModalTypes.CREATE_TASK]: CreateTaskModal,
    [ModalTypes.EDIT_TASK]: EditTaskModal,
    [ModalTypes.DELETE_TASK]: DeleteTaskModal,
    [ModalTypes.NULL]: null,
  };

  const ModalComponent = modals[modal.type];

  if (modal.open && ModalComponent) {
    return (
      <div>
        <div className="fixed left-0 top-0 h-screen w-screen bg-black opacity-40" />
          <Suspense fallback={<div>Loading...</div>}>
            <ModalComponent />
          </Suspense>
      </div>
    );
  }

  return null;
}

export default ModalWrapper;
