import Link from 'next/link'
import Header from '../components/header'
import Layout from '../components/layout'

const PostLink = props => (
    <li>
        <Link href={`/post?title=${props.title}`}>
            <a>{props.title}</a>
        </Link>
    </li>
)

export default function Index() {
    return (
        <div>
            <Layout>
                <h1>Test</h1>
                <ul>
                    <PostLink title="Hello Next.js"/> 
                    <PostLink title="This is a test"/>
                    <PostLink title="Testing test"/>
                </ul>
            </Layout>
            
        </div>
    )
}