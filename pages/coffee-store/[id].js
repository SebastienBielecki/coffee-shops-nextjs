import { useRouter } from "next/router"
import Link from "next/link"


const CoffeeStore = () => {
    const router = useRouter()
    return <>
        <h1>Coffee store page {router.query.id}</h1>
        <Link href="/">Back to home</Link>
    </>
}

export default CoffeeStore