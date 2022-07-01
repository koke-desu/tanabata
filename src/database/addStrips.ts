import { StoredStripType, StripType } from "./types";
import { API, graphqlOperation } from "aws-amplify";
import { createTodo } from "../graphql/mutations";

export const addStrip = async (strip: StripType) => {
  try {
    if (!strip.name || !strip.text) return;

    // サーバー保存用にデータを変形。
    const stored: Omit<StoredStripType, "id" | "createdAt" | "updatedAt"> = {
      name: strip.name,
      description: strip.text,
    };

    await API.graphql(graphqlOperation(createTodo, { input: stored }));
  } catch (err) {
    console.log("error creating strip: ", err);
  }
};
