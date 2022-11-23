import { useModal } from '../../contexts/modal-context';
import Modal from './Modal';

function ModalWrapper() {
  const { showModal } = useModal();

  if (showModal) {
    return (
      <div>
        <div className="fixed left-0 top-0 h-screen w-screen bg-black opacity-40" />
        <Modal />
      </div>
    );
  }

  return null;
}

export default ModalWrapper;
