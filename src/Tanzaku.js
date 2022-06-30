import React,{useState,useEffect} from "react";

import tanzaku from './assets/6704_b_a.png';

function Tanzaku (props) {
  // contextを状態として持つ
  const [context,setContext] = useState(null)
  // 画像読み込み完了トリガー
  const [loaded,setLoaded] = useState(false)
  // コンポーネントの初期化完了後コンポーネント状態にコンテキストを登録
  useEffect(()=>{
    const canvas = document.getElementById("canvas")
    const canvasContext = canvas.getContext("2d")
    setContext(canvasContext)
  },[])
  // 状態にコンテキストが登録されたらそれに対して操作できる
  useEffect(()=>{
      if(context!==null)
      {
        console.log("tanzaku");
          const img = new Image();
          img.onload = () => {
            console.log("img onload");
            // バカゲー作成
              context.drawImage(img, Math.random()*(648-200) +200, Math.random()*(1000-200) +200);
              // 更にこれに続いて何か処理をしたい場合
              setLoaded(true);
          };
          img.src = tanzaku; // 描画する画像など
      }
  },[context])
}

export default Tanzaku;