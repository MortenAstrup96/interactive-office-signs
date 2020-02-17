import {useRouter} from 'next/router'
import Layout from '../../components/layout'

export default function Post() {
    const router = useRouter();

    <Layout>
        <h1>{router.query.id}</h1>
        <p>Content</p>
    </Layout>
}