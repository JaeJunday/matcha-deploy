import { useDispatch } from 'react-redux';
import ChatButton from './ChatButton';
import { setChattingListModal, setChattingNoti } from '@/redux/slices/chattingSlice';
import { useCloseOnOutsideClick } from '@/(pages)/hooks';

type ChatVisibleControlProps = {
  props: JSX.Element;
};

function ChattingVisibleControl({ props }: ChatVisibleControlProps) {
  const dispatch = useDispatch();
  const [dragRef, isFloatingChattingVisible, setIsFloatingChattingVisible] = useCloseOnOutsideClick({
    initialState: false
  });

  const toggleModal = () => {
    // 알림 확인
    dispatch(setChattingNoti(false));
    // 항상 채팅 리스트 보여주기
    // dispatch(setChattingListModal(true));
    // 모달 보이기 / 숨기기
    setIsFloatingChattingVisible(!isFloatingChattingVisible);
  };

  return (
    <div ref={dragRef} className="fixed right-10 bottom-36 z-50">
      {/* 채팅 보이게 하기 컨트롤*/}
      <div className={isFloatingChattingVisible ? '' : 'hidden'}>{props}</div>
      <ChatButton isOpen={isFloatingChattingVisible} onClick={toggleModal} />
    </div>
  );
}

export default ChattingVisibleControl;
