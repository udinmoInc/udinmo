import { FC } from 'react'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'  
import Image from 'next/image'
import styles from './styles.module.css'

const Footer: FC = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.inner__container}>
        <div className={styles.left__container}>
          <Link href='/' className={styles.logo__link}>
            <Image
              src="/logo-white.png"
              alt="Udinmo Logo"
              width={120}
              height={40}
            />
          </Link>
        </div>

        <div className={styles.footer__section}>
          <h3>Quick Links</h3>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="#">News</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="#">Downloads</Link></li>
          </ul>
        </div>
        <div className={styles.footer__section}>
          <h3>Company</h3>
          <ul>
            <li>
              <Link href="#" passHref className={styles.gernal__link}>
                About <ExternalLink size={16} />
              </Link>
            </li>
            <li>
              <Link href="#" passHref className={styles.gernal__link}>
                Blog <ExternalLink size={16} />
              </Link>
            </li>
            <li>
              <Link href="#" passHref className={styles.gernal__link}>
                Contact Us <ExternalLink size={16} />
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.footer__section}>
          <h3>Support</h3>
          <ul>
            <li>
              <Link href="https://docs.udinmo.com" passHref className={styles.gernal__link}>
                Docs <ExternalLink size={16} />
              </Link>
            </li>
            <li>
              <Link href="https://helpdesk.udinmo.net.in" passHref target="_blank" rel="noopener noreferrer" className={styles.gernal__link}>
                Helpdesk <ExternalLink size={16} />
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.footer__section}>
          <h3>Legal</h3>
          <ul>
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
            <li><Link href="/cookie-policy">Cookie Policy</Link></li>
            <li><Link href="/refund-policy">Refund Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom__section}>
        <p>Powered by Uniq | &copy; {new Date().getFullYear()} Udinmo Interactive | Email: udinmo@udinmo.com</p>
      </div>
    </footer>
  )
}

export default Footer
