import { useTranslation } from 'react-i18next'
import { Check, Sprout } from 'lucide-react'
import StaticPage from '../components/block/StaticPage.jsx'

export default function About() {
  const { t, i18n } = useTranslation()
  const bn = i18n.resolvedLanguage === 'bn'

  return (
    <StaticPage
      eyebrow={t('common.about')}
      title={
        bn
          ? 'কৃষিজ উপ-বর্জ্যের আরও উপযোগী ভবিষ্যৎ।'
          : 'A more useful future for agricultural by-products.'
      }
      intro={
        bn
          ? 'নতুনায়ন একটি বাজার ধারণা যা বাংলাদেশের কৃষি ব্যবস্থাকে কম ব্যবহার হওয়া সম্পদে সুযোগ দেখতে সহায়তা করে।'
          : 'Notunayon is a marketplace concept helping Bangladesh’s agricultural ecosystem see opportunity in resources that are often left underused.'
      }
      image="photo-1500382017468-9049fed747ef"
    >
      <div className="story-grid">
        <div>
          <span className="eyebrow">{bn ? 'সমস্যা' : 'The challenge'}</span>
          <h2>
            {bn
              ? 'মূল্যবান উপকরণ খুঁজে পাওয়া ও পরিবহন দুটোই কঠিন হতে পারে।'
              : 'Valuable materials can be hard to find—and hard to move.'}
          </h2>
          <p>
            {bn
              ? 'ধানের তুষ, খড়, গোবর ও প্রক্রিয়াকরণ বর্জ্য অনেক ব্যবসার দরকারি উপাদান হতে পারে। তবু উৎপাদক ও ব্যবহারকারী পরস্পরকে খুঁজে নাও পেতে পারেন।'
              : 'Farm and agro-industry by-products such as rice husk, straw, manure, and processing residues can be useful inputs for many businesses. Yet producers and potential users may not know how to reach each other.'}
          </p>
          <p>
            {bn
              ? 'সরবরাহ স্থান, মৌসুম, গুণমান ও পরিমাণ অনুযায়ী বদলায়। পরিষ্কার তথ্য ও ব্যবহারিক আলোচনা সুযোগ দেখাতে সহায়তা করে।'
              : 'Supply can vary by location, season, quality, and quantity. Clear discovery and practical conversations can help participants explore opportunities without assuming that every material suits every use.'}
          </p>
        </div>
        <div className="mission-card">
          <Sprout size={28} />
          <span className="eyebrow">{bn ? 'আমাদের লক্ষ্য' : 'Our mission'}</span>
          <h3>
            {bn
              ? 'কৃষিজ সম্পদ বিনিময়কে স্থানীয়, পরিষ্কার ও বৃত্তাকার করুন।'
              : 'Make agricultural resource exchange more discoverable, local, and circular.'}
          </h3>
          <p>
            {bn
              ? 'প্রোটোটাইপের মূলনীতি: ব্যবহারিক সংযোগ, স্বচ্ছ তালিকা ও দায়িত্বশীল ব্যবহার।'
              : 'Prototype values: practical connections, transparent listings, and responsible material use.'}
          </p>
        </div>
      </div>
      <div className="values-grid">
        {(bn
          ? [
              ['পরিকল্পনায় বৃত্তাকার', 'দরকারি উপ-বর্জ্যের নতুন ব্যবহারের সুযোগ খুঁজে দিন।'],
              ['স্থানকে কেন্দ্র করে', 'আঞ্চলিক সরবরাহ ও পরিবহনকে খোঁজের অংশ করুন।'],
              ['পরিষ্কার তথ্য', 'ক্রেতা ও উৎপাদক ব্যবহারযোগ্য তালিকা দেখেন।'],
            ]
          : [
              ['Circular by design', 'Help useful by-products find a potential next use.'],
              ['Grounded in place', 'Make regional supply and logistics part of discovery.'],
              [
                'Built for clarity',
                'Give buyers and producers practical listing details to compare.',
              ],
            ]
        ).map(([title, text]) => (
          <div key={title}>
            <span className="value-mark">
              <Check size={17} />
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </StaticPage>
  )
}
