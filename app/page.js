import Image from "next/image"

async function getData () {
  const res = await fetch('http://localhost:3000/api/pokemons')
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function Home() {
  const data = await getData()
  return (
    <div>
      {data.map(e=>
      <>
        <h2 key={e.id}>{e.name}</h2>
       
      </>
        )}
    </div>
  )
}
