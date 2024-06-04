'use client';

import ChattingRoomList from './components/ChattingRoomList';
import Draggable from 'react-draggable';
import { useDispatch } from 'react-redux';
import ChatContent from './components/ChattingContent';
import ChattingMenuBar from './components/ChattingMenuBar';
import ViewMessageForm from './components/ViewMessageForm';
import ChattingMenuButton from './components/ChattingMenuButton';
import ChattingRoomListVisibleControl from './components/ChattingRoomListVisibleControl';
import SendMessageField from './components/SendMessageField';
import { useCloseOnOutsideClick } from '../hooks';

const Chatting: React.FC = () => {
  const [modalRef, isModalOpen, setIsModalOpen] = useCloseOnOutsideClick({ initialState: false });
  const dispatch = useDispatch();

  return (
    // draggable 안쪽 사용자정의 컴포넌트 인식못함 <div>로 감싸줄 것
    <Draggable>
      <div className="items-center max-w-96 bg-white rounded-xl shadow-lg">
        <ChatContent
          MenuBar={
            <ChattingMenuBar
              menuOpen={
                <ChattingMenuButton
                  onClick={() => {
                    setIsModalOpen(!isModalOpen);
                  }}
                />
              }
            />
          }
          viewMessage={<ViewMessageForm />}
          sendMessage={<SendMessageField />}
        />
        <ChattingRoomListVisibleControl
          props={<ChattingRoomList isModalOpen={isModalOpen} />}
          isModalOpen={isModalOpen}
          modalRef={modalRef}
        />
      </div>
    </Draggable>
  );
};

export default Chatting;
