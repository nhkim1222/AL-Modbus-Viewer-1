import React from "react";
import styled from "styled-components";
import "../css/modal.css";

const OpenModal = styled.div`
    display: flex;
    align-items: center;
    /* �˾��� ������ ������ ������ ȿ�� */
    animation: modal-bg-show .3s;
`;

const NormalModal = styled.div`
  display: ${prop=> prop.open==true? 'flex': 'none'};
  align-items: ${prop=> prop.open==true? 'center': 'none'};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Modal = (props) => {
  // ����, �ݱ�, ��� ��� �ؽ�Ʈ�� �θ�κ��� �޾ƿ�
  const { open, close, header } = props;

  return (
    // ����� ������ openModal Ŭ������ �����ȴ�.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              {" "}
              &times;{" "}
            </button>
          </header>
          <main>{props.children}</main>
          <footer>
            <button className="close" onClick={close}>
              {" "}
              close{" "}
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
