import { useParams } from 'react-router-dom'

const TitlePage = () => {
  const { id } = useParams()

  return (
    <section>
      <h1 className="text-3xl font-bold">Title Details</h1>
      <p className="mt-2 text-neutral-400">
        Placeholder page — title ID: <span className="text-netflix-red">{id}</span>
      </p>
    </section>
  )
}

export default TitlePage
