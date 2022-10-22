import {useEffect, useState} from "react";
import fetch from "node-fetch";
import {useRouter} from "next/router";
import {string} from "prop-types";

type Product = {
  id: string
  title: string
  images: {
    edges: {
      node: {
        url: string
      }
    }[]
  }
  variants: {
    edges: {
      node: {
        id: string
      }
    }[]
  }
}

const Product = () => {
  const [isShipped, setIsSipped] = useState(false)
  const [isOrdered, setIsOrdered] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [items, setItems] = useState<Product[]>([])
  const router = useRouter()
  const id = router.query.id

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/torun/products`);
      const { data: { products }} = await res.json()
      setProducts(products.edges.map((item: any) => item.node))
    })()
  }, [])

  useEffect(() => {
    (async () => {
      const orderId = localStorage.getItem(String(id));
      if(!orderId) return;

      const res = await fetch(`/api/orders/${orderId}`);
      const data = await res.json();
      if(!data) return;

      setIsOrdered(true);

      const fulfilledStatus = data.line_items?.[0]?.fulfillment_status;
      if(fulfilledStatus === 'fulfilled') {
        setIsSipped(true);
      }
    })()
  })

  if(isOrdered && !isShipped) {
    return <div>Shopifyから商品を発送してください</div>
  }

  return (<div>
    {
      isShipped ? (
        <>
          <p>発送ありがとうございます。</p>
          <p>準備ができ次第、画像がアップロードされます。</p>
          <p>--------以下アップロード後--------</p>
          <p>画像がアップロードされました。画像を直接Shopifyへアップロードすることができます。</p>
          <p>本来はここに購入処理などが入ります。</p>
          <img height={300} src="https://blogger.googleusercontent.com/img/a/AVvXsEjyeJgJIrzCF5Ck3iDJAS25qLd7P02PixI-UWNgtSyq5YHPa9v5ngQgeJIjoRypNDVpQrAyKh3I4EZnFXMAgQIrsDfF5dCTNY_VPrOmkNWO18doT6xehVo70halIYqycSTnfxjffLXgcrGmRu-F4KweGragY9pRkKtvB40s7FrvuI4sUD0XRRkqh0pltw=s805" />
          <button onClick={async () => {
            await fetch(`/api/products/${id}`, { method: "PATCH"})
            alert("アップロードしました。Shopifyで確認してください。")
          }}>画像をアップロード</button>
        </>
        ) : (
        <>
          <p>Torunへ商品を支給品として届ける必要があります。</p>
          <button onClick={async () => {
            const res = await fetch(`/api/orders/${id}`, { method: "POST"})
            const data = await res.json();
            localStorage.setItem(String(id), data.id);
            alert("注文が完了しました。Shopifyで確認してください。")
            setIsOrdered(true);
          }}>Torunへの注文処理を行う</button>
        </>
      )
    }
    <p>---------納品された商品----------</p>
    {products.map(item => (
      <div key={item.title}>
        <p>商品名: {item.title}</p>
        <img src={item.images.edges[0].node.url} style={{height: 300, width: 300}}/>
        <p>価格: {item.title}</p>
        <button onClick={() => setItems([...items, item])}>カートに入れる</button>
      </div>
    ))}
    <p>カートの中身</p>
    {items.map(item => (
      <div key={item.title}>
        <p>商品名: {item.title}</p>
        <img src={item.images.edges[0].node.url} style={{height: 300, width: 300}}/>
      </div>
    ))}
    <button onClick={async () => {
      const response = await fetch("/api/checkouts", {
        method: "POST",
        body: JSON.stringify({ ids: items.map(item => item.variants.edges[0].node.id)})
      })
      const result = await response.json()

      location.href = result.body.data.checkoutCreate.checkout.webUrl
    }}>購入する</button>
  </div>)

}

export default Product;