import { useTranslation } from 'react-i18next'
import { Check, Sprout } from 'lucide-react'
import StaticPage from '../components/block/StaticPage.tsx'

export default function About() {
  const { t, i18n } = useTranslation()
  const bn = i18n.resolvedLanguage === 'bn'

  const values: Array<[string, string]> = bn
    ? [
        ['পরিকল্পনায় বৃত্তাকার', 'দরকারি উপ-বর্জ্যের নতুন ব্যবহারের সুযোগ খুঁজে দিন।'],
        ['স্থানকে কেন্দ্র করে', 'আঞ্চলিক সরবরাহ ও পরিবহনকে খোঁজের অংশ করুন।'],
        ['পরিষ্কার তথ্য', 'ক্রেতা ও উৎপাদক ব্যবহারযোগ্য তালিকা দেখেন।'],
      ]
    : [
        ['Circular by design', 'Help useful by-products find a potential next use.'],
        ['Grounded in place', 'Make regional supply and logistics part of discovery.'],
        ['Built for clarity', 'Give buyers and producers practical listing details to compare.'],
      ]

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
      <div className="grid grid-cols-[1.2fr_0.8fr] items-center gap-12 max-md:grid-cols-1 max-md:gap-[15px]">
        <div>
          <span className="text-[10px] font-[760] tracking-[0.13em] text-[#63806b] uppercase dark:text-[#a6c5ab]">
            {bn ? 'সমস্যা' : 'The challenge'}
          </span>
          <h2 className="my-2.5 max-w-[550px] font-serif text-[32px] font-medium tracking-[-0.035em] text-[#252e28] max-md:text-[27px] dark:text-[#edf4ef]">
            {bn
              ? 'মূল্যবান উপকরণ খুঁজে পাওয়া ও পরিবহন দুটোই কঠিন হতে পারে।'
              : 'Valuable materials can be hard to find—and hard to move.'}
          </h2>
          <p className="mb-3 text-[12px] leading-[1.7] text-[#737c75] dark:text-[#b2beb5]">
            {bn
              ? 'ধানের তুষ, খড়, গোবর ও প্রক্রিয়াকরণ বর্জ্য অনেক ব্যবসার দরকারি উপাদান হতে পারে। তবু উৎপাদক ও ব্যবহারকারী পরস্পরকে খুঁজে নাও পেতে পারেন।'
              : 'Farm and agro-industry by-products such as rice husk, straw, manure, and processing residues can be useful inputs for many businesses. Yet producers and potential users may not know how to reach each other.'}
          </p>
          <p className="mb-0 text-[12px] leading-[1.7] text-[#737c75] dark:text-[#b2beb5]">
            {bn
              ? 'সরবরাহ স্থান, মৌসুম, গুণমান ও পরিমাণ অনুযায়ী বদলায়। পরিষ্কার তথ্য ও ব্যবহারিক আলোচনা সুযোগ দেখাতে সহায়তা করে।'
              : 'Supply can vary by location, season, quality, and quantity. Clear discovery and practical conversations can help participants explore opportunities without assuming that every material suits every use.'}
          </p>
        </div>
        <div className="bg-[#173b2d] p-7 text-[#e4ede3] dark:bg-[#1a261f]">
          <Sprout size={28} className="mb-5 text-[#b4caa8]" />
          <span className="text-[10px] font-[760] tracking-[0.13em] text-[#b8cdb5] uppercase">
            {bn ? 'আমাদের লক্ষ্য' : 'Our mission'}
          </span>
          <h3 className="my-[9px] font-serif text-[23px] leading-[1.25] font-medium text-white">
            {bn
              ? 'কৃষিজ সম্পদ বিনিময়কে স্থানীয়, পরিষ্কার ও বৃত্তাকার করুন।'
              : 'Make agricultural resource exchange more discoverable, local, and circular.'}
          </h3>
          <p className="m-0 text-[10px] leading-[1.7] text-[#c4d2c4]">
            {bn
              ? 'প্রোটোটাইপের মূলনীতি: ব্যবহারিক সংযোগ, স্বচ্ছ তালিকা ও দায়িত্বশীল ব্যবহার।'
              : 'Prototype values: practical connections, transparent listings, and responsible material use.'}
          </p>
        </div>
      </div>
      <div className="mt-[46px] grid grid-cols-3 gap-[19px] max-md:mt-[25px] max-md:grid-cols-1 max-md:gap-2">
        {values.map(([title, text]) => (
          <div key={title} className="bg-[#f8f9f6] p-5 dark:bg-[#1a261f]">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#e8f0e6] text-[#40674a] dark:bg-[#223128] dark:text-[#a6c5ab]">
              <Check size={17} />
            </span>
            <h3 className="mt-3.5 mb-[5px] text-[14px] font-semibold tracking-[-0.035em] text-[#252e28] dark:text-[#edf4ef]">
              {title}
            </h3>
            <p className="m-0 text-[10px] leading-[1.7] text-[#737c75] dark:text-[#b2beb5]">
              {text}
            </p>
          </div>
        ))}
      </div>
    </StaticPage>
  )
}
