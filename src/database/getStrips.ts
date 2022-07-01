import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { formatStrip, StoredStripType, StripType } from "./types";
import { listTodos } from "../graphql/queries";
import { onCreateTodo } from "../graphql/subscriptions";

export const useGetStrips = () => {
  const [strips, setStrips] = useState<StripType[] | undefined>(undefined);

  useEffect(() => {
    // まず全件獲得する。
    fetchStrips().then((res) => {
      setStrips(res);
    });

    // 短冊が新規作成されるたびに、stateを更新する。
    const onCreate = (stored: StoredStripType) => {
      const newStrip = formatStrip(stored);
      setStrips((strips) => {
        if (strips === undefined) return [newStrip];

        // 重複は削除。
        return strips.filter((strip) => strip.id !== newStrip.id).concat([newStrip]);
      });
    };
    subscribeOnCreate(onCreate);
  }, []);

  useEffect(() => {}, []);

  return strips;
};

// 短冊を全件取得。
const fetchStrips = async (): Promise<StripType[] | undefined> => {
  try {
    const stripData = await API.graphql<any>(graphqlOperation(listTodos));
    const strips = stripData.data.listTodos.items as StoredStripType[];

    console.log(strips);

    return strips.map(formatStrip);
  } catch (err) {
    console.log("error fetching strips");
    return undefined;
  }
};

// 新しく作られた短冊を獲得する。
// 引数に渡された関数が、短冊が新規作成されるたびに発火される。
const subscribeOnCreate = (onCreate: (stored: StoredStripType) => void) => {
  // 型が全くわからん！
  (API.graphql(graphqlOperation(onCreateTodo)) as any).subscribe({
    next: (eventData: any) => {
      console.log(eventData);
      const stored = eventData.value.data.onCreateTodo as StoredStripType;
      onCreate(stored);
    },
  });
};
