'use client';

import { setChattingMessage, setScrollDirection, setSendMessage } from '@/redux/slices/chatting/chattingSlice';
import { RootState } from '@/redux/store';
import { useSocket } from '@/socket/socketContext';
import { DirectionSVG } from '@/svg';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

enum SendMessage {
  MAX_LENGTH = 500
}

const SendMessageField = () => {
  const sendMessage = useSelector((state: RootState) => state.chattingSlice.sendMessage);
  const currentUser = useSelector((state: RootState) => state.chattingSlice.currentUser);
  const myId = typeof window !== 'undefined' ? Number(localStorage.getItem('id')) : null;
  const dispatch = useDispatch();
  const socket = useSocket();
  const textRef = useRef(null);

  const isSpace = (value: string) => (value.trim() === '' ? true : false);

  const handleClick = () => {
    if (isSpace(sendMessage)) {
      return;
    }

    // 상대방에게 메시지 전송
    socket?.emit('send_message', {
      recver_id: currentUser.id,
      sender_id: myId ?? 0,
      message: sendMessage
    });
    // 내 채팅방 화면 업데이트
    dispatch(
      setChattingMessage({
        sender_id: myId ?? 0,
        message: sendMessage
      })
    );
    // 메세지 전송 후 스크롤을 아래로 내림
    dispatch(setScrollDirection('down'));
    // 메세지 전송 후 클리어
    dispatch(setSendMessage(''));
  };

  const pressEnter = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // Shift 키가 눌려있는 경우를 제외
      e.preventDefault(); // 기본 엔터 동작을 막음
      handleClick(); // 메시지 전송 함수 호출
    }
  };

  return (
    <div>
      <label htmlFor="chat" className="sr-only">
        Your message
      </label>
      <div className="flex items-center px-3 py-3 rounded-b-xl border bg-gray-50 ">
        <textarea
          id="chat"
          value={sendMessage}
          onKeyUp={pressEnter}
          rows={2}
          onChange={e => dispatch(setSendMessage(e.target.value))}
          maxLength={SendMessage.MAX_LENGTH}
          placeholder={`Your message... (.../${SendMessage.MAX_LENGTH})`}
          className="whitespace-pre block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-green-400 focus:border-green-400 "
          style={{ resize: 'none' }}
          ref={textRef}
        ></textarea>
        <button
          type="button"
          className="flex justify-center p-2 text-green-600 rounded-full cursor-pointer hover:bg-green-100 "
          onClick={handleClick}
        >
          <DirectionSVG direction="right" size="4" />
          <span className="sr-only">Send message</span>
        </button>
      </div>
    </div>
  );
};

export default SendMessageField;
