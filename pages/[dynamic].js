import Head from "next/head";
import { useRouter } from "next/router";

const Dynamic = () => {
    const router = useRouter()
    return <>
        <Head>
            <title>{router.query.dynamic}</title>
        </Head>
        <h1>Page {router.query.dynamic}</h1>
    </>
}

export default Dynamic