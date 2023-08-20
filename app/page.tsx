import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="todo" className='text-3xl hover:bg-blue-500 rounded-lg p-2'>Click To Go To Todo</Link>
      
    </main>
  )
}
