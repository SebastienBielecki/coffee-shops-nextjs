import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Banner from '@/components/banner'
import Card from '@/components/card'
import coffeeStore from "../data/coffee-stores.json"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
  const handleOnBannerBtnClick = () => {
    console.log("Hi banner button");
  }

  return (
    <>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner 
          buttonText="View stores nearby"
          handleOnClick={handleOnBannerBtnClick}
        />
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" width={700} height={400} alt="hero-img"/>
        </div>
        <div className={styles.cardLayout}>
          {coffeeStore.map(store =>{
            return <>
              <Card
                key={store.id}
                name={store.name}
                imgUrl={store.imgUrl}
                href={`/coffee-store/${store.id}`}
                className={styles.card}
              ></Card>
            </>
          })}
          
        </div>
      </main>
    </>
  )
}
