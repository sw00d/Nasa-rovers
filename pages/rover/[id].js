import { useRouter } from "next/router"

export default function Home(arg) {
  const { query: {id} } = useRouter()

  return (
    <div>
      Rover: {id}
    </div>
  )
}
