import React from 'react';
import ReactModal from 'react-modal';


const AlertMessage = (props) => {

//  ReactModal.setAppElement('#test');

  return (
    <div style={{zIndex: "9"}}>
      <ReactModal
        isOpen={props.isOpen} // 控制彈出視窗是否顯示
        onRequestClose={props.onRequestClose} // 關閉彈出視窗的回調函式
        style={props.customStyles} // 自定義的樣式
        contentLabel={props.contentLabel} // 標籤，用於幫助屏幕助讀技術
        ariaHideApp={false}
      >
        {/* 彈出視窗的內容 */}
        <h2>{props.title}</h2>
        <p>{props.content}</p>
        <button onClick={props.onRequestClose}>Close Modal</button>
      </ReactModal>
    </div>
  );
};

export default AlertMessage;