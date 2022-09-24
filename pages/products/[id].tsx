import {useState} from "react";
import fetch from "node-fetch";
import {useRouter} from "next/router";

const Product = () => {
  const [isShipped, setIsSipped] = useState(false)
  const router = useRouter()

  return (<div>
    {
      isShipped ? (
        <>
          <p>発送ありがとうございます。</p>
          <p>準備ができ次第、画像がアップロードされます。</p>

          <p>--------以下アップロード後--------</p>
          <p>画像がアップロードされました。</p>
          <p>本来はここに購入処理などが入ります。</p>
          <img height={300} src="https://blogger.googleusercontent.com/img/a/AVvXsEjyeJgJIrzCF5Ck3iDJAS25qLd7P02PixI-UWNgtSyq5YHPa9v5ngQgeJIjoRypNDVpQrAyKh3I4EZnFXMAgQIrsDfF5dCTNY_VPrOmkNWO18doT6xehVo70halIYqycSTnfxjffLXgcrGmRu-F4KweGragY9pRkKtvB40s7FrvuI4sUD0XRRkqh0pltw=s805" />
          <button onClick={async () => {
            await fetch(`/api/products/${router.query.id}`, { method: "PATCH"})
            alert("アップロードしました。Shopifyで確認してください。")
          }}>画像をアップロード</button>
        </>
        ) : (
        <>
          <p>こちらの住所に商品を発送し、発送が完了しましたら完了ボタンを押してください</p>
          <p>東京都目黒区大岡山32-2</p>
          <button onClick={() => setIsSipped(true)}>発送完了</button>
        </>
      )
    }
  </div>)

}

export default Product;