import { Gender } from '../enum';

const mappingTable = new Map<string, string>([
  // ['serverKey', 'clientKey']
  ['id', 'id'],
  ['login_id', 'loginId'],
  ['name', 'firstname'],
  ['last_name', 'lastname'],
  ['email', 'email'],
  ['pw', 'password'],
  ['age', 'age'],
  ['fame', 'rating'],
  ['gender', 'gender'],
  ['taste', 'sexualPreference'],
  ['bio', 'introduction'],
  ['pictures', 'pictures'],
  ['tags', 'interests'],
  ['hate_tags', 'hateInterests'],
  ['emoji', 'emoji'],
  ['hate_emoji', 'hateEmoji'],
  ['similar', 'similar'],
  ['fancy', 'fancy'],
  ['email_check', 'emailCheck'],
  ['profile_check', 'profileCheck'],
  ['emoji_check', 'emojiCheck'],
  ['picture', 'picture'],
  ['time', 'time'],
  ['distance', 'distance'],
  ['oauth', 'oauth'],
  ['occupied', 'occupied'],
  ['error', 'error'],
  ['new', 'new'],
  ['status', 'status'],
  ['sender_id', 'senderId'],
  ['message', 'message'],
  ['msg_time', 'time'],
  ['last_online', 'lastOnline'],
  ['target_id', 'targetId'],
  ['status', 'status'],
  ['oauth', 'oauth']
]);

export function serverToClientMapper(serverData: any): any {
  const frontEndData: Partial<any> = {};

  for (const key in serverData) {
    const newKey = mappingTable.get(key);
    if (newKey) {
      // 거리 변환 저장
      if (newKey === 'distance') {
        serverData[key] = Math.round(serverData[key]);
      }

      frontEndData[newKey] = serverData[key];
      // console.log(`serverToClientMapper: ${key} -> ${newKey}`);
    } else {
      frontEndData[key] = serverData[key];
    }
  }

  return frontEndData as any;
}
