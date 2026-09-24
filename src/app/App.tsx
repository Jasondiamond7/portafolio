import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { ThemeProvider } from './providers/ThemeProvider'

export function App() {
  const { pathname, hash } = useLocation()

  // El Header vive fuera del <Outlet>, o sea que aparece en todas las rutas,
  // pero secciones como #skills o #contact solo existen en el home. Un
  // <a href="#skills"> normal solo funciona si ya estás parado en esa
  // página, así que los links del nav navegan a "/#skills" con <Link> y acá
  // hacemos el scroll a mano una vez que la ruta ya cambió.
  useEffect(() => {
    if (!hash) return
    const target = document.getElementById(hash.slice(1))
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [pathname, hash])

  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <div className="flex min-h-dvh flex-col">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
        <WhatsAppButton />
      </MotionConfig>
    </ThemeProvider>
  )
}
