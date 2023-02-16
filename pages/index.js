import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Banner from '@/components/banner'
import Card from '@/components/card'
import { fetchCoffeeStores } from '@/lib/coffee-stores'

const inter = Inter({ subsets: ['latin'] })

export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeeStores()
  return {
    props: {
      coffeeStores
    },
  }
}

export default function Home(props) {

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
        {props.coffeeStores.length > 0 && 
        <div>
          <h2 className={styles.heading2}>Toronto stores</h2>
          <div className={styles.cardLayout}>
            {props.coffeeStores.map(store =>{
              return (
                <Card
                  key={store.id}
                  name={store.name}
                  imgUrl={store.imgUrl || "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"}
                  href={`/coffee-store/${store.id}`}
                  className={styles.card}
                ></Card>
              )
            })}
          </div>
        </div>}
      </main>
    </>
  )
}
