import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Banner from '@/components/banner'
import Card from '@/components/card'
import { fetchCoffeeStores } from '@/lib/coffee-stores'
import useTrackLocation from '@/hooks/use-track-location'
import { useEffect, useState } from 'react'

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

  const { handleTrackLocation, latLong, locationErrorMsg, isFindingLocation } = useTrackLocation()

  const [coffeeStores, setCoffeeStores] = useState("")
  const [coffeeStoresError, setCoffeeStoresError] = useState(null)

  console.log({latLong, locationErrorMsg});
  console.log({coffeeStores});

  useEffect(() => {
    async function setCoffeeStoresByLocation() {
      if(latLong) {
        try {
          const fetchedCoffeeStores = await fetchCoffeeStores(latLong, 30)
          console.log({fetchedCoffeeStores});
          setCoffeeStores(fetchedCoffeeStores)
          //set coffee stores
        } catch (error) {
          console.log({error});
          setCoffeeStoresError(error.message)
        }
      }
    }
    setCoffeeStoresByLocation()
    
  }, [latLong])

  const handleOnBannerBtnClick = () => {
    console.log("Hi banner button");
    handleTrackLocation()
  }

  return (
    <>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner 
          buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
          handleOnClick={handleOnBannerBtnClick}
        />
        {locationErrorMsg !== "" && <p className='errorMsg'>Something went wrong: {locationErrorMsg}</p>}
        {coffeeStoresError && <p className='errorMsg'>Something went wrong: {coffeeStoresError}</p>}
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" width={700} height={400} alt="hero-img"/>
        </div>
        {(coffeeStores.length > 0) && (
        <div className={styles.sectionWrapper}>
          <h2 className={styles.heading2}>Stores near me</h2>
          <div className={styles.cardLayout}>
            {coffeeStores.map(store =>{
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
        </div>)
        }
        {(props.coffeeStores.length) > 0 && 
        <div className={styles.sectionWrapper}>
          <h2 className={styles.heading2}>Mexico City stores</h2>
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
