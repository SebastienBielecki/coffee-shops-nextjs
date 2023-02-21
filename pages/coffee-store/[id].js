import { useRouter } from "next/router"
import Link from "next/link"
import Head from "next/head"
import styles from '../../styles/coffee-store.module.css';
import Image from "next/image";
import cls from "classnames"
import { fetchCoffeeStores } from '@/lib/coffee-stores'


export async function getStaticPaths() {
    const coffeeStores = await fetchCoffeeStores()
    const paths = coffeeStores.map(store => {
      return { params: {id: store.id.toString()}}
    })
    return {
      paths,
      fallback: true, // can also be true or 'blocking'
    }
}

export async function getStaticProps(staticProps) {
    const coffeeStores = await fetchCoffeeStores()
    const params = staticProps.params
    const findCoffeeStoreById = coffeeStores.find(coffeStore => {
      return coffeStore.id.toString() === params.id
  })
    return {
      props: {
        coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {}
      }
    }
}



const CoffeeStore = (props) => {
    
  const handleUpvoteButton = () => {
    console.log("Upvote button clicked!");
  }
  
    const router = useRouter()
    

    if (router.isFallback) {
      return <div>Loading...</div>
    }

    const {name, postcode, locality, address, imgUrl} = props.coffeeStore
    //console.log("props", props.coffeeStore);
    return <>
        <div className={styles.layout}>
          <Head>
            <title>{name}</title>
          </Head>
          <div className={styles.container}>
            <div className={styles.col1}>
              <div className={styles.backToHomeLink}>
                <Link href="/">← Back to home</Link>
              </div>
              <div className={styles.nameWrapper}>
                <h1 className={styles.name}>{name}</h1>
              </div>
              <Image
                src={imgUrl || "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"}
                width={600}
                height={360}
                className={styles.storeImg}
                alt={name}
              ></Image>
            </div>
            <div className={cls("glass", styles.col2)}>
              {(address) && (
              <div className={styles.iconWrapper}>
                <Image
                  src="/static/icons/places.svg"
                  width={24}
                  height={24}
                ></Image>
                <p className={styles.text}>{address}</p>
              </div>
              )}
              {(postcode) && (locality) && (
              <div className={styles.iconWrapper}>
                <Image
                  src="/static/icons/nearMe.svg"
                  width={24}
                  height={24}
                ></Image>
                <p className={styles.text}>{postcode} {locality}</p>
              </div>
              )}
              <div className={styles.iconWrapper}>
                <Image
                  src="/static/icons/star.svg"
                  width={24}
                  height={24}
                ></Image>
                <p className={styles.text}>{1}</p>
              </div>
              <button 
                className={styles.upvoteButton}
                onClick={handleUpvoteButton}
              >
                Upvote!
              </button>
              
            </div>
          </div>
        </div>
    </>
}

export default CoffeeStore