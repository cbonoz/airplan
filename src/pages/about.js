import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import dynamic from "next/dynamic"
import { APP_NAME, INSTRUCTIONS } from '@/util/constants'

// const MapWithOverlay = dynamic(() => import('@/components/MapWithOverlay'), { ssr: false })


export default function About() {
  return (
    <>
      <div className='container'>
        <img src='/logo.png' alt='logo' className='logo' />
        <br/>
        <br/>
        <br/>
        <h2>What is {APP_NAME}?</h2>
        Airplan is a new air quality monitor and lookup app that leverages the power of Filecoin and the OpenAQ API to provide real-time air quality data for cities around the world. With Airplan, users can quickly and easily access air quality data for their local area, view historical trends, and monitor changes over time.
        <br/>
        <br/>

        <h2>How to use</h2>
        <p>
          {INSTRUCTIONS}
        </p>

        <p>
          Built for the 2023 Green blockchain challenge on devpost.
        </p>

        <a href="https://github.com/cbonoz/green23" target="_blank">Github</a>

      </div>
    </>
  )
}
