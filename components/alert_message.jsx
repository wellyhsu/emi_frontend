import React, { useState } from 'react';
import Modal from 'react-modal';

// 設定 Modal 的樣式
const customStyles = {
  content: {
    width: '50%',
    height: '50%',
    margin: 'auto',
  },
};

function alert_message() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* Modal 內容 */}
        <h2>Modal Title</h2>
        <p>Modal Content...</p>
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </div>
  );
}