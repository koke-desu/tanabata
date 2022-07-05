import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { formatStrip, StoredStripType, StripType } from "./types";
import { listTodos } from "../graphql/queries";
import { onCreateTodo, onDeleteTodo } from "../graphql/subscriptions";

export const useGetStrips = () => {
  const [strips, setStrips] = useState<StripType[] | undefined>(undefined);

  useEffect(() => {
    // subscriptionのリスナー。
    let createListener: { unsubscribe: () => void } | null = null;
    let deleteListener: { unsubscribe: () => void } | null = null;

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
    createListener = subscribeOnCreate(onCreate);

    // 短冊の削除を検知
    const onDelete = (stored: StoredStripType) => {
      console.log("削除を検知！！！");
      console.log(stored);
      setStrips((strips) => {
        if (strips === undefined) return [];

        return strips.filter((strip) => strip.id !== stored.id);
      });
    };
    deleteListener = subscribeOnDelete(onDelete);

    return () => {
      createListener && createListener.unsubscribe();
      deleteListener && deleteListener.unsubscribe();
    };
  }, []);

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
  return (API.graphql(graphqlOperation(onCreateTodo)) as any).subscribe({
    next: (eventData: any) => {
      console.log(eventData);
      const stored = eventData.value.data.onCreateTodo as StoredStripType;
      onCreate(stored);
    },
  });
};

// 削除時に関数を発火
const subscribeOnDelete = (onDelete: (stored: StoredStripType) => void) => {
  // 型が全くわからん！
  return (API.graphql(graphqlOperation(onDeleteTodo)) as any).subscribe({
    next: (eventData: any) => {
      console.log(eventData);
      const stored = eventData.value.data.onDeleteTodo as StoredStripType;
      onDelete(stored);
    },
  });
};
