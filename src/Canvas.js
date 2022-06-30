import './App.css';
import React,{useState,useEffect} from "react"

import take from "./assets/take.png";

function Canvas() {
    // contextを状態として持つ
    const [context,setContext] = useState(null);
    // 画像読み込み完了トリガー
    const [loaded,setLoaded] = useState(false);
    // コンポーネントの初期化完了後コンポーネント状態にコンテキストを登録
    useEffect(()=>{
      const canvas = document.getElementById("canvas");
      const canvasContext = canvas.getContext("2d");
      setContext(canvasContext);
    },[]);
    // 状態にコンテキストが登録されたらそれに対して操作できる
    useEffect(()=>{
        if(context!==null)
        {
          console.log("useeffect");
            const img = new Image();
            img.onload = () => {
              console.log("img onload");
                context.drawImage(img,0,0);
                // 更にこれに続いて何か処理をしたい場合
                //state loadedが更新されることでrenderが走る
                setLoaded(true);
            }
            img.src = take; // 描画する画像など
        }
    },[context]);
    // useEffect(()=>{
    //     if(loaded)
    //     {
    //         // それに続く処理
    //     }
    // },[loaded])
  return (
    //canvasのサイズはここで変えれるけど変数で定義してezにする予定
    <canvas width="848" height="1200" id="canvas"></canvas>
  );
}

export default Canvas;
