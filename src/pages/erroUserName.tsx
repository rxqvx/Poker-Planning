import Link from 'next/link'

function App(){
  return(
    <>
    <Link href='/'>
      <a>Volte a homepage</a>
    </Link>
    <p>É necessário ter inserido o nickname e o nome da sala para acessar as salas do Planning.</p>
    </>
  )
}
export default App;