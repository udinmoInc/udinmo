import { type FC } from 'react'
import Hero from './sections/hero'
import Customers from './sections/customers'
import ModernProductTeams from './sections/modern-product-teams'
import LongTermPlanning from './sections/long-term-planning'
import IssueTracking from './sections/issue-tracking'
import Collaborate from './sections/collaborate'
import Foundation from './sections/foundation'


import AmbientLighting from '@/components/ambient-lighting'
import Header from '@/components/header'
import Footer from '@/components/footer/footer'
import Pricing from './sections/pricing/pricing'
import FAQ from './sections/faqs/faqs'
import NodeMapHero from './sections/nodemap/nodemap'
import { Metadata } from 'next'



export const metadata: Metadata = {
	title: 'Udinmo Interactive',
	description: 'Where imagination takes flight.',
}


const Home: FC = () => {
	return (
		<div>
			<Header/>
		<main className=' min-h-screen pt-[calc(var(--header-top)+var(--header-height))]'>
			<AmbientLighting />
			<Hero />
			<Customers />
			<ModernProductTeams />
			<LongTermPlanning />
			<IssueTracking />
			<Collaborate />
			<Foundation />
			<Pricing/>
			<NodeMapHero/>
			<FAQ/>
	
		</main>
		<Footer/>
		</div>
	)
}

export default Home
