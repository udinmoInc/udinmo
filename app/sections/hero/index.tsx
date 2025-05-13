import { FC } from 'react'
import styles from './styles.module.css'
import LayoutWrapper from '@/components/layout-wrapper'
import BlurPopUpByWord from '@/components/blur-pop-up-by-words'
import { cn } from '@/lib/utils'
import BlurPopUp from '@/components/blur-pop-up'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Inbox from '@/assets/inbox.svg'
import Sidebar from './components/sidebar'
import IllustrateAnimate from '@/components/illustrate-animate'

const Hero: FC = () => {
  return (
    <section className={styles.hero}>
      <LayoutWrapper>
     
        <div className={styles.textContainer}>
          <h1 className={cn(styles.heading, styles.hide__mobile)}>
            <BlurPopUpByWord text="Udinmo Interactive: Innovating Your Digital Future" />
          </h1>
          <h1 className={cn(styles.heading, styles.show__mobile, 'text-center')}>
            <BlurPopUpByWord text="Building the Future of Digital Innovation" />
          </h1>

		  <BlurPopUp delay={1}>
  <h2 className={cn(styles.sub__heading, 'mb-6')}>
    Empowering businesses with versatile solutions for the digital age.{' '}
    <span className={styles.animatedFlight}>Imagination takes flight</span>
  </h2>
</BlurPopUp>


          <div className={cn(styles.button__container)}>
            <BlurPopUp delay={1.1}>
              <Link className={styles.start__link} href="/udinmo">Get started for free</Link>
            </BlurPopUp>

            <BlurPopUp delay={1.15}>
              <Link className={styles.intoducing__link} href="/v2/auth">
                <span>Pricing</span>
                <ChevronRight />
              </Link>
            </BlurPopUp>
          </div>
        </div>

        <div className={styles.hero__img__container}>
          <div className={styles.hero__illustration__container}>
            <div className={styles.hero__illustration__perspective}>
              <div className={styles.hero__illustration__base}>
                <div className={styles.hero__illustration__sidebar}>
                  <Sidebar />
                </div>
                <IllustrateAnimate delay={2} duration={1.4} className={styles.hero__illustration__inbox}>
                  <Inbox />
                </IllustrateAnimate>
              </div>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  )
}

export default Hero