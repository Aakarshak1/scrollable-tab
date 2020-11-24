import React from 'react';
import styled from 'styled-components';

const Modal = ({ setConfirm, closeModal, tabName }) => {
  return (
    <OverLay>
      <Content>
        <StyledForm>
          <ModalBody>
            <Title> Confirm Delete </Title>
            <Section>
              <span>
                Are you sure you want to delete <Bold>{tabName}</Bold> ?
              </span>
            </Section>
          </ModalBody>
          <Footer>
            <Button type="button" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="button" danger onClick={setConfirm}>
              Delete
            </Button>
          </Footer>
        </StyledForm>
      </Content>
    </OverLay>
  );
};

export default Modal;

const OverLay = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(220, 220, 220, 0.5);
  display: flex;
  justify-content: center;
`;
const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 25%;
  transform: translate(-50%, -50%);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  padding-bottom: 10px;
  line-height: 24px;
`;
const Section = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: #000;
  font-weight: 400;

  b {
    word-break: break-word;
  }
`;

const Button = styled.button`
  text-align: center;
  margin-left: 14px;
  padding: 8px;
  border-radius: 4px;
  font-size: 14px;
  min-width: 100px;
  font-weight: 600;

  ${(props) =>
    props.danger
      ? `
            color: #fff;
            border: 1px solid #C82124;
            background: linear-gradient(180deg, #D72D30 0%, #C82124 100%);
            box-shadow: 0 1px 0 0 rgba(24,50,71,0.05);
        `
      : `
            color: #000;
            border: 1px solid #ffffff;
            background: #ffffff;
            box-shadow: 0 1px 0 0 rgba(24,50,71,0.05);
        `};
`;

const Bold = styled.b`
  color: #c82124;
`;

const ModalBody = styled.div`
  padding: 24px 16px;
  background: white;
  width: 100%;
`;

const Footer = styled.div`
  text-align: right;
  padding: 12px 16px;
  border-radius: 0 0 6px 6px;
  background: #f5f7f9;
  width: 100% !important;
`;

const StyledForm = styled.form`
margin: 0 auto
  width: 400px;
  background-color: #f9f9f9;
  border-radius: 0 0 6px 6px;
`;
