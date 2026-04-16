'use client'

import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const PremiumCursor = dynamic(() => import('@/components/premium-cursor'), { ssr: false })
const SolutionsNavbar = dynamic(() => import('@/components/solutions-navbar'), { ssr: false })
const SmoothScroll = dynamic(() => import('@/components/smooth-scroll'), { ssr: false })
const SolutionsCookiePopup = dynamic(() => import('@/components/solutions-cookie-popup'), { ssr: false })
const SolutionsFooter = dynamic(() => import('@/components/solutions-footer'), { ssr: false })

function PolicySection({
  children,
  alt = false,
}: {
  children: React.ReactNode
  alt?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      style={{
        paddingTop: 'var(--spacing-fluid-2xl)',
        paddingBottom: 'var(--spacing-fluid-2xl)',
        paddingLeft: 'var(--spacing-gutter)',
        paddingRight: 'var(--spacing-gutter)',
        background: alt ? '#ebe5db' : '#f2ede6',
        color: '#2a2218',
      }}
    >
      <div style={{ maxWidth: '52rem', margin: '0 auto' }}>
        {children}
      </div>
    </motion.section>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  // Apr 16: bumped from --text-h3 to --text-h2 for stronger section hierarchy
  // across all viewports (previous h3 felt thin against the long body copy).
  return (
    <h2
      style={{
        fontSize: 'var(--text-h2)',
        fontWeight: 300,
        color: '#1a1510',
        marginBottom: '1.5rem',
        letterSpacing: '-0.025em',
        lineHeight: 1.15,
      }}
    >
      {children}
    </h2>
  )
}

function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 'var(--text-body)',
        lineHeight: 1.8,
        color: 'rgba(42, 34, 24, 0.55)',
        marginBottom: '1.25rem',
      }}
    >
      {children}
    </p>
  )
}

function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <li
      style={{
        fontSize: 'var(--text-body)',
        lineHeight: 1.8,
        color: 'rgba(42, 34, 24, 0.55)',
        marginBottom: '0.75rem',
        paddingLeft: '0.5rem',
        listStyleType: 'none',
        display: 'flex',
        gap: '0.75rem',
      }}
    >
      <span style={{ color: '#c9a86e', fontWeight: 600, flexShrink: 0 }}>&mdash;</span>
      <span>{children}</span>
    </li>
  )
}

function AccentDivider() {
  return (
    <div
      style={{
        width: '3rem',
        height: '2px',
        background: '#c9a86e',
        marginBottom: '2rem',
        borderRadius: '1px',
      }}
    />
  )
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <PremiumCursor />
      <SmoothScroll>
        <SolutionsNavbar />

        {/* Hero */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: '#f2ede6',
            color: '#1a1510',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            paddingTop: 'var(--spacing-rhythm-hero)',
            paddingBottom: 'var(--spacing-rhythm)',
            paddingLeft: 'var(--spacing-gutter)',
            paddingRight: 'var(--spacing-gutter)',
          }}
        >
          <div style={{ maxWidth: '52rem', margin: '0 auto', width: '100%' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase' as const,
                color: '#c9a86e',
                marginBottom: '1.5rem',
              }}
            >
              Legal
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 'var(--text-display)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                color: '#1a1510',
                marginBottom: '2rem',
              }}
            >
              Privacy Policy
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap' as const,
                gap: '0.75rem 1.5rem',
              }}
            >
              <span
                style={{
                  fontSize: '15px',
                  color: 'rgba(42, 34, 24, 0.55)',
                  fontWeight: 400,
                }}
              >
                Last updated: March 31, 2026
              </span>
              <span
                style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: '#c9a86e',
                }}
              />
              <span
                style={{
                  fontSize: '15px',
                  color: 'rgba(42, 34, 24, 0.55)',
                  fontWeight: 400,
                }}
              >
                Trinade AI Technologies Pvt Ltd
              </span>
            </motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: '1px',
                background: 'linear-gradient(90deg, #c9a86e, rgba(201, 168, 110, 0.1))',
                marginTop: '3rem',
                transformOrigin: 'left',
              }}
            />
          </div>
        </motion.section>

        {/* Introduction — tighter top since it follows the hero gold rule directly */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{
            paddingTop: 'var(--spacing-fluid-2xl)',
            paddingBottom: 'var(--spacing-fluid-2xl)',
            paddingLeft: 'var(--spacing-gutter)',
            paddingRight: 'var(--spacing-gutter)',
            background: '#f2ede6',
            color: '#2a2218',
          }}
        >
          <div style={{ maxWidth: '52rem', margin: '0 auto' }}>
          <BodyText>
            This Privacy Policy applies to trinade.com and describes how Trinade AI Technologies Pvt Ltd collects, uses, discloses, and safeguards your information when you visit our website or engage with our services.
          </BodyText>
          <BodyText>
            Our products &mdash; including Fly High and Sleep Alert Device &mdash; have their own privacy policies that cover product-specific data collection. This policy covers the corporate website only.
          </BodyText>
          </div>
        </motion.section>

        {/* Information We Collect */}
        <PolicySection alt>
          <SectionHeading>Information We Collect</SectionHeading>
          <AccentDivider />
          <BodyText>
            We collect information that you provide directly to us, information we obtain automatically when you use our services, and information from third-party sources. Personal Information shall not be collected unless it is necessary or collected for a lawful purpose connected with a function or activity of the Company.
          </BodyText>
          <div style={{ marginTop: '0.5rem' }}>
            <BodyText>
              <strong style={{ color: '#1a1510', fontWeight: 600 }}>Personal Information:</strong> Name, email address, and phone number when you fill out forms or contact us through our website.
            </BodyText>
            <BodyText>
              <strong style={{ color: '#1a1510', fontWeight: 600 }}>Usage Data:</strong> Information about how you interact with our website and services, including pages visited, time spent on pages, click patterns, and referring URLs.
            </BodyText>
            <BodyText>
              <strong style={{ color: '#1a1510', fontWeight: 600 }}>Device Information:</strong> Browser type, operating system, device identifiers, IP address, and general location data derived from your IP address. This is statistical data and may not identify any individual.
            </BodyText>
            <BodyText>
              <strong style={{ color: '#1a1510', fontWeight: 600 }}>Communication Data:</strong> Records of correspondence when you contact us via email, phone, or through our website forms, including any feedback or support requests.
            </BodyText>
          </div>
          <BodyText>
            While collecting Personal Information, you will be given an option to decline providing it. However, in such cases, you may not be entitled to certain services or features for which such Personal Information is required.
          </BodyText>
        </PolicySection>

        {/* How We Use Your Information */}
        <PolicySection>
          <SectionHeading>How We Use Your Information</SectionHeading>
          <AccentDivider />
          <BodyText>
            We use the information we collect to provide, maintain, and improve our services, and to develop new features that are relevant to our users. Specifically, we use your information for the following purposes:
          </BodyText>
          <BodyText>
            To process and fulfill your requests, including responding to inquiries, providing customer support, and delivering products or services you have requested. We also use your data to send you technical notices, updates, security alerts, and administrative messages.
          </BodyText>
          <BodyText>
            To personalize your experience and deliver content and product offerings relevant to your interests. We may analyze usage patterns to improve our website functionality, user interface, and overall service quality.
          </BodyText>
          <BodyText>
            To communicate with you about products, services, promotions, and events offered by Trinade AI Technologies and our partners, where you have consented to receive such communications. You may opt out of marketing communications at any time.
          </BodyText>
        </PolicySection>

        {/* Data Sharing & Transfer */}
        <PolicySection alt>
          <SectionHeading>Data Sharing &amp; Transfer</SectionHeading>
          <AccentDivider />
          <BodyText>
            We do not sell your personal information to third parties. It is our responsibility not to disclose Personal Information of Customers to any third party except in the following circumstances:
          </BodyText>
          <BodyText>
            <strong style={{ color: '#1a1510', fontWeight: 600 }}>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
          </BodyText>
          <BodyText>
            <strong style={{ color: '#1a1510', fontWeight: 600 }}>Legal Requirements:</strong> We may disclose your information to banks, government agencies, law enforcement agencies, and identity and address verification agencies when required for a lawful purpose or to comply with applicable law.
          </BodyText>
          <BodyText>
            <strong style={{ color: '#1a1510', fontWeight: 600 }}>Business Transfers:</strong> In the event of a merger, acquisition, or sale of all or a portion of our assets, your personal information may be transferred as part of that transaction, provided that the acquiring entity agrees to protect your information consistent with this policy.
          </BodyText>
        </PolicySection>

        {/* Cookies and Tracking */}
        <PolicySection>
          <SectionHeading>Cookies and Tracking</SectionHeading>
          <AccentDivider />
          <BodyText>
            We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are small data files stored on your device that help us improve our services and your experience.
          </BodyText>
          <BodyText>
            <strong style={{ color: '#1a1510', fontWeight: 600 }}>Essential Cookies:</strong> Required for the operation of our website. They enable basic functions like page navigation and access to secure areas. The website cannot function properly without these cookies.
          </BodyText>
          <BodyText>
            <strong style={{ color: '#1a1510', fontWeight: 600 }}>Analytics Cookies:</strong> Help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve the structure and content of our site.
          </BodyText>
          <BodyText>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
          </BodyText>
        </PolicySection>

        {/* Data Security */}
        <PolicySection alt>
          <SectionHeading>Data Security</SectionHeading>
          <AccentDivider />
          <BodyText>
            The security of your personal information is important to us. We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
          </BodyText>
          <BodyText>
            These measures include encryption of data in transit and at rest, regular security assessments, access controls, and employee training on data protection practices. Only Company employees who are authorized shall be allowed to access Personal Information. However, no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.
          </BodyText>
          <BodyText>
            In the event of a data breach that affects your personal information, we will notify you and the relevant authorities in accordance with applicable law.
          </BodyText>
        </PolicySection>

        {/* Your Rights */}
        <PolicySection>
          <SectionHeading>Your Rights</SectionHeading>
          <AccentDivider />
          <BodyText>
            Depending on your jurisdiction, you may have certain rights regarding your personal information. These include:
          </BodyText>
          <ul style={{ margin: '0.5rem 0 0 0', padding: 0 }}>
            <BulletItem>The right to access and receive a copy of your personal data</BulletItem>
            <BulletItem>The right to request correction of inaccurate personal data</BulletItem>
            <BulletItem>The right to request deletion of your personal data, subject to certain exceptions</BulletItem>
            <BulletItem>The right to object to or restrict the processing of your personal data</BulletItem>
            <BulletItem>The right to data portability &mdash; receiving your personal data in a structured, commonly used, and machine-readable format</BulletItem>
            <BulletItem>The right to withdraw consent at any time, where processing is based on your consent. Please note that withdrawing consent may result in certain services or products being discontinued for you</BulletItem>
          </ul>
          <BodyText>
            The Company shall provide you the facility to review and modify your Personal Information. Before collecting Personal Information, the Company shall ensure that you are duly informed that it is in your interest to provide current, accurate, complete, and valid Personal Information.
          </BodyText>
          <BodyText>
            To exercise any of these rights, please contact us using the information provided at the end of this policy. We will respond to your request within the timeframe required by applicable law.
          </BodyText>
        </PolicySection>

        {/* Children's Privacy */}
        <PolicySection alt>
          <SectionHeading>Children&apos;s Privacy</SectionHeading>
          <AccentDivider />
          <BodyText>
            Our corporate website is designed for a general audience. We do not knowingly collect personal information from children under the age of 18 through this website. If we become aware that a child under 18 has provided us with personal information via this website, we will take steps to delete such information from our systems.
          </BodyText>
          <BodyText>
            Some of our products, such as Fly High, may be accessible to individuals under 18 years of age with parental or guardian supervision. In such cases, a parent or guardian must provide consent and oversee any queries, access, or account-related activities. Product-specific age policies are detailed in their respective privacy policies.
          </BodyText>
          <BodyText>
            If you are a parent or guardian and believe that your child has provided us with personal data without your consent, please contact us so that we can take the necessary steps.
          </BodyText>
        </PolicySection>

        {/* Data Retention & Storage */}
        <PolicySection>
          <SectionHeading>Data Retention &amp; Storage</SectionHeading>
          <AccentDivider />
          <BodyText>
            We retain your personal information only for as long as is necessary to fulfill the purposes for which it was collected, including to satisfy any legal, regulatory, accounting, or reporting requirements.
          </BodyText>
          <BodyText>
            Your data is stored in secure electronic environments protected by access controls, encryption, and other reasonable security measures. Personal information shall not be copied or extracted for any purpose other than operational or legal requirements.
          </BodyText>
          <BodyText>
            Once the purpose has been fulfilled, data is either returned to its secure environment or securely destroyed.
          </BodyText>
        </PolicySection>

        {/* Changes to This Policy */}
        <PolicySection alt>
          <SectionHeading>Changes to This Policy</SectionHeading>
          <AccentDivider />
          <BodyText>
            We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make changes, we will update the &ldquo;Last Updated&rdquo; date at the top of this page.
          </BodyText>
          <BodyText>
            For significant changes that materially affect how we handle your data, we will place a prominent notice on our website. This policy is governed by the laws of India, subject to the jurisdiction of courts in Guntur, Andhra Pradesh.
          </BodyText>
        </PolicySection>

        {/* Grievance Officer */}
        <PolicySection>
          <SectionHeading>Grievance Officer</SectionHeading>
          <AccentDivider />
          <BodyText>
            If you have any questions, concerns, or complaints about this Privacy Policy or how your data is handled, you may reach our Grievance Officer at <a href="mailto:info@trinade.com" style={{ color: '#c9a86e', textDecoration: 'none', fontWeight: 500 }}>info@trinade.com</a>. We will acknowledge your request within 48 hours and aim to resolve it within 30 days.
          </BodyText>
          <BodyText>
            For general contact details, please see the footer of this website.
          </BodyText>
        </PolicySection>

        <SolutionsFooter />
        <SolutionsCookiePopup />
      </SmoothScroll>
    </>
  )
}
