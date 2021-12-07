import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

// Layouts
import SiderMenuLayout from '../layouts/SiderMenuLayout'

export default function Home() {
  return (
    <SiderMenuLayout>
      <p>Test</p>
    </SiderMenuLayout>
  )
}
