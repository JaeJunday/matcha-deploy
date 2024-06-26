/**
 * @type {id: string; name: string; time: string;}
 */
export type Message = {
  id: string; // 메시지의 고유 식별자
  name: string; // 보낸 사용자의 이름
  time: string; // 메시지를 보낸 시간
};

/**
 * @type {messages: Message[]; connect: boolean; noti: boolean;}
 */
export type Chatting = {
  messages: Message[]; // 채팅 메시지 배열
  connect: boolean; // 연결 여부
  noti: boolean; // 알림 여부
};

/**
 * @type {SPORTS: number; TRAVEL: number; FOOD: number; GAME: number; BOOK: number; IT_SCIENCE: number; VIDEO: number; LANGUAGE: number; FASHION: number; PETS: number; ART: number; SMOKE: number; DRINK: number;}
 * @description DB에서 비트연산을 이용한 '한번에 가져오기 기능'을 사용하기 위해 비트쉬프팅으로 정의 - juhoh님께 문의
 */
export interface Interests {
  SPORTS: number;
  TRAVEL: number;
  FOOD: number;
  GAME: number;
  BOOK: number;
  IT_SCIENCE: number;
  VIDEO: number;
  LANGUAGE: number;
  FASHION: number;
  PETS: number;
  ART: number;
  SMOKE: number;
  DRINK: number;
}

/**
 * @type {ageRange: number[]; distance: number; rating: number; interests: Interests[];}
 */
export type SearchParams = {
  ageRange: number[]; // 나이 범위 배열
  distance: number; // 거리
  rating: number; // 명성
  interests: Interests[]; // 관심사 배열
};
