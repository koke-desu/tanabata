// 短冊は英語でstripらしい。
export type StripType = {
  id: string;
  name: string;
  text: string;
};

// サーバーに保存してあるデータ形式。
export type StoredStripType = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

// サーバーからフロント用に、データのフィールド名などを整える関数
export const formatStrip = (stored: StoredStripType): StripType => {
  return { id: stored.id, name: stored.name, text: stored.description };
};
