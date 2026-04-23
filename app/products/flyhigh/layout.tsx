import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo/page-metadata'
import { BreadcrumbJsonLd } from '@/components/seo/breadcrumb-json-ld'
import { ProductJsonLd } from '@/components/seo/product-json-ld'
import { FaqJsonLd } from '@/components/seo/faq-json-ld'

const description =
  'FlyHigh is built to bridge the gap between the question you have and the expert who has lived it. Human-led guidance. AI-enhanced matching. Real outcomes.'

// FAQ copy mirrors exactly the visible FAQ accordion rendered by
// components/flyhigh-product-content.tsx (FAQSection). If that list
// changes, update both locations or Google will flag this FAQPage as
// hidden content.
const FAQS = [
  {
    question: 'When will FlyHigh launch?',
    answer:
      'We are iterating with early users and experts. Join the waitlist to receive launch updates and be among the first to experience FlyHigh.',
  },
  {
    question: 'How are experts selected and verified?',
    answer:
      'Profiles include verification signals and category-specific checks, plus ongoing ratings and feedback from users. We prioritize quality and accountability.',
  },
  {
    question: 'Is FlyHigh powered entirely by AI?',
    answer:
      'FlyHigh uses AI to improve matching speed and accuracy, but expert guidance remains human-led and accountable. Real people, real expertise.',
  },
  {
    question: 'What does a session look like?',
    answer:
      'You choose the format — chat, voice, or video. Sessions are focused, time-bounded, and end with clear next steps you can act on.',
  },
  {
    question: 'How much does it cost?',
    answer:
      'Pricing varies by field and session type. We are designing a model that keeps guidance accessible while fairly compensating experts.',
  },
  {
    question: 'How are experts being paid?',
    answer:
      'Experts set their own rates or adhere to category standards, and receive secure, timely payouts directly through our platform after completing successful sessions.',
  },
]

export const metadata: Metadata = pageMetadata({
  title: 'FlyHigh',
  description,
  path: '/products/flyhigh',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Two-item breadcrumb: Home > FlyHigh. A middle "Products" level
          was considered but dropped because there is no /products
          landing page — pointing it at /products/flyhigh would create a
          duplicate URL in the breadcrumb, which Google's Rich Results
          validator rejects. If a /products hub page is added later,
          reintroduce the middle level pointing at /products. */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'FlyHigh', path: '/products/flyhigh' },
        ]}
      />
      <ProductJsonLd
        slug="flyhigh"
        name="FlyHigh"
        description={description}
        category="Expert Matching Platform"
      />
      <FaqJsonLd path="/products/flyhigh" items={FAQS} />
      {children}
    </>
  )
}
