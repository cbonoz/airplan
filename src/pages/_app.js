import '@/styles/globals.css'
import { Menu } from 'antd';
import 'antd/dist/reset.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import 'leaflet/dist/leaflet.css';


export default function App({ Component, pageProps }) {
  const router = useRouter();
  const menuItems = [
    {
      key: '/',
      label: <Link href={"/"}>
        <img src="/logo.png" alt="logo" style={{ height: '32px', width: '100px' }} />
        </Link>,
    },
    // about
    {
      key: '/about',
      label: <Link href={"/about"}>
        About
      </Link>,
      href: '/about',
      onclick: () => router.push('/about'),
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
