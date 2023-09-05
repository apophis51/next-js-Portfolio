import axios from 'axios';


export const getStaticProps = async () => {
  // const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const res = await fetch('http://localhost:1337/api/programming-blogs/')
  // const fetcher = (url) => axios.get(url).then((res) => res.data);

  const repo = await res.json()
  return { props: { repo } }
}
 
export default function Page({ repo }) {
  return (
    <div>
    {repo.data[3].attributes.Content}
    </div>
    )

}