import { useParams } from 'react-router-dom'

const BrowsePage = () => {
  const { genreId } = useParams()

  return (
    <section>
      <h1 className="text-3xl font-bold">Browse</h1>
      <p className="mt-2 text-neutral-400">
        Placeholder page — genre ID: <span className="text-netflix-red">{genreId}</span>
      </p>
    </section>
  )
}

export default BrowsePage
