import { useRouter } from "next/router"
import Link from "next/link"
import coffeeStoresData from "../../data/coffee-stores.json"

export async function getStaticPaths() {
    return {
      paths: 
        [
            { params: { id: '0' } }, 
            { params: { id: '1' } },
            { params: { id: '300' } },
        ],
      fallback: false, // can also be true or 'blocking'
    }
}

export async function getStaticProps(staticProps) {
    const params = staticProps.params
    return {
      props: {
        coffeeStore: coffeeStoresData.find(coffeStore => {
            return coffeStore.id.toString() === params.id
        })
      }
    }
}



const CoffeeStore = (props) => {
    const router = useRouter()
    //console.log("props", props.coffeeStore);
    return <>
        <h1>Coffee store page {router.query.id}</h1>
        <Link href="/">Back to home</Link>
        <p>{props.coffeeStore.address}</p>
        <p>{props.coffeeStore.name}</p>
    </>
}

export default CoffeeStore