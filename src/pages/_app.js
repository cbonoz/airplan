import '@/styles/globals.css'
import { Menu } from 'antd';
import 'antd/dist/reset.css';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
// import 'leaflet/dist/leaflet.css';


export default function App({ Component, pageProps }) {
  const router = useRouter();
  const menuItems = [
    {
      key: '/',
      label: <Link href={"/"}>
        <Image src="/logo.png" width={100} height={32} alt="logo"/>
        </Link>,
    },
    // about
    {
      key: '/about',
      label: <Link href={"/about"}>
        About
      </Link>,
      href: '/about',
    },
  ]

  const pathname = router.pathname;


  return <div>
    <Menu
      mode="horizontal"
      defaultSelectedKeys={[pathname]}
      style={{ lineHeight: '64px' }}
      items={menuItems}>

    </Menu>
    <Component {...pageProps} />
  </div>
}
