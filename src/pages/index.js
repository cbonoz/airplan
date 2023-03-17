import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import dynamic from "next/dynamic"

const MapWithOverlay = dynamic(() => import('@/components/MapWithOverlay'), { ssr: false })


export default function Home() {
  return (
    <>
      <Head>
        <title>Airplan | Web3-backed air quality</title>
        <meta name="description" content="Airplan: Filecoin hosted air quality" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
          <MapWithOverlay/>
  </div>
    </>
  )
}
