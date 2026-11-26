import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import StaticPage from '../components/block/StaticPage.tsx'

export default function HowItWorks() {
  const { t, i18n } = useTranslation()
  const bn = i18n.resolvedLanguage === 'bn'

  const steps: Array<[string, string, string]> = bn
    ? [
        [
          '01',
          'উপ-বর্জ্য তালিকাভুক্ত করুন',
          'বিক্রেতা আছে কী, কোথায়, কত এবং কোন অবস্থায় তা জানান।',
        ],
        [
          '02',
          'উপযুক্ত সরবরাহ খুঁজুন',
          'ক্রেতা তালিকা ও ফিল্টার দেখে সম্ভাব্য উপকরণ খুঁজবে।',
        ],
        [
          '03',
          'অফার আলোচনা করুন',
          'ক্রেতা স্থানীয় ডেমো অফার পাঠাবে ও শর্ত আলোচনা হবে।',
        ],
        [
          '04',
          'পরিবহন সমন্বয় করুন',
          'ক্রেতা-বিক্রেতা সংগ্রহ বা পরিবহন সম্পর্কে সিদ্ধান্ত নেবে।',
        ],
      ]
    : [
        [
          '01',
          'List a by-product',
          'Sellers share what they have, where it is, and the condition and quantity they can supply.',
        ],
        [
          '02',
          'Discover relevant supply',
          'Buyers browse listings and use filters to find potential material matches.',
        ],
        [
          '03',
          'Discuss an offer',
          'A buyer submits a local demo offer; both sides can discuss the terms directly.',
        ],
        [
          '04',
          'Coordinate delivery',
          'The buyer and seller agree how pickup, transport, and any payment would work.',
        ],
      ]

  return (
    <StaticPage
      eyebrow={t('common.howItWorks')}
      title={t('home.processTitle')}
      intro={t('home.processText')}
      image="photo-1464226184884-fa280b87c399"
    >
      <div className="grid grid-cols-4 gap-4 max-md:grid-cols-2 max-md:gap-[9px]">
        {steps.map(([num, title, text]) => (
          <article
            className="border-t-2 border-line-strong bg-surface-tint-soft p-[22px] max-md:p-4"
            key={num}
          >
            <span className="font-serif text-[22px] text-eyebrow">{num}</span>
            <div>
              <h3 className="mt-[18px] mb-1.5 text-[14px] font-semibold tracking-[-0.035em] text-ink">
                {title}
              </h3>
              <p className="m-0 text-[11px] leading-[1.7] text-muted">{text}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-[22px] grid grid-cols-2 gap-[15px] max-md:grid-cols-1">
        <div className="border border-line bg-surface p-[21px]">
          <h3 className="mb-1 text-[15px] font-semibold tracking-[-0.035em] text-ink">
            {bn ? 'উৎপাদকদের জন্য' : 'For producers'}
          </h3>
          <p className="mb-[11px] text-[11px] leading-[1.7] text-muted">
            {bn
              ? 'অতিরিক্ত উপ-বর্জ্য নতুন ক্রেতাদের কাছে সহজে পৌঁছে দিন।'
              : 'Make surplus and by-products easier for new buyers to find.'}
          </p>
          <Link
            className="inline-flex items-center gap-[7px] text-[12px] font-[680] text-link hover:text-link-hover"
            to="/register"
          >
            {bn ? 'ডেমো তালিকা শুরু করুন' : 'Start a demo listing'} <ArrowRight size={15} />
          </Link>
        </div>
        <div className="border border-line bg-surface p-[21px]">
          <h3 className="mb-1 text-[15px] font-semibold tracking-[-0.035em] text-ink">
            {bn ? 'ক্রেতাদের জন্য' : 'For buyers'}
          </h3>
          <p className="mb-[11px] text-[11px] leading-[1.7] text-muted">
            {bn
              ? 'স্থানীয় সরবরাহের বিকল্প তুলনা করুন ও প্রয়োজন পাঠান।'
              : 'Compare local supply options and send a sourcing request.'}
          </p>
          <Link
            className="inline-flex items-center gap-[7px] text-[12px] font-[680] text-link hover:text-link-hover"
            to="/marketplace"
          >
            {t('footer.browse')} <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </StaticPage>
  )
}
