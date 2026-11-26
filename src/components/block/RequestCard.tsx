import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Boxes, ChevronDown, MapPin } from 'lucide-react'
import type { BuyerRequest } from '../../types/index.ts'
import { marketplaceLabel } from '../../utils/marketplace.ts'
import { buttonClasses } from '../ui/buttonStyles.ts'

export default function RequestCard({ request }: { request: BuyerRequest }) {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)

  return (
    <article
      className={`rounded-[4px] border border-[#e5eae3] px-[17px] py-[15px] max-md:p-3 dark:border-[#34463a] ${
        expanded ? 'bg-[#fcfdfa] dark:bg-[#1a261f]' : 'bg-white dark:bg-[#1a261f]'
      }`}
    >
      <div className="grid grid-cols-[39px_minmax(150px,1.5fr)_repeat(3,minmax(100px,1fr))_auto] items-center gap-[15px] max-[1000px]:grid-cols-[36px_1.4fr_1fr_1fr] max-md:grid-cols-[34px_1fr_auto] max-md:gap-2 max-[420px]:grid-cols-[30px_1fr_auto]">
        <div className="grid h-[38px] w-[38px] place-items-center rounded-[4px] bg-[#eff4ed] text-[#58775f] dark:bg-[#223128] dark:text-[#a6c5ab]">
          <Boxes size={21} />
        </div>
        <div className="request-primary max-md:col-start-2">
          <span className="text-[9px] text-[#758377] dark:text-[#b2beb5]">
            {marketplaceLabel(t, request.category, { type: 'category' })}
          </span>
          <h3 className="my-[3px] text-[13px] font-semibold tracking-[-0.03em] text-[#252e28] dark:text-[#edf4ef]">
            {marketplaceLabel(t, request.material, { id: request.id })}
          </h3>
          <p className="m-0 text-[9px] leading-[1.7] text-[#737c75] dark:text-[#b2beb5]">
            {request.buyer} <span className="px-[3px]">·</span> {request.date}
          </p>
        </div>
        <div className="max-md:col-start-2">
          <span className="mb-[5px] block text-[9px] text-[#8a938c] dark:text-[#b2beb5]">
            Quantity
          </span>
          <strong className="inline-flex items-center gap-1 text-[10px] font-[650] text-[#435248] dark:text-[#edf4ef]">
            {request.quantity}
          </strong>
        </div>
        <div className="max-md:col-start-2">
          <span className="mb-[5px] block text-[9px] text-[#8a938c] dark:text-[#b2beb5]">
            Delivery location
          </span>
          <strong className="inline-flex items-center gap-1 text-[10px] font-[650] text-[#435248] dark:text-[#edf4ef]">
            <MapPin size={14} /> {request.location}
          </strong>
        </div>
        <div className="max-[1000px]:hidden max-md:col-start-2 max-md:block">
          <span className="mb-[5px] block text-[9px] text-[#8a938c] dark:text-[#b2beb5]">
            Expected price
          </span>
          <strong className="inline-flex items-center gap-1 text-[10px] font-[650] text-[#435248] dark:text-[#edf4ef]">
            {request.budget}
          </strong>
        </div>
        <button
          className={buttonClasses({
            variant: 'outline-dark',
            className:
              'min-h-[34px] px-2.5 text-[9px] max-[1000px]:col-start-4 max-md:col-start-3 max-md:row-start-1 max-md:self-center',
          })}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Hide details' : 'View request'} <ChevronDown size={16} />
        </button>
      </div>
      {expanded && (
        <div className="mt-3.5 ml-[54px] flex items-center justify-between border-t border-[#ebeee9] pt-[11px] text-[10px] text-[#748076] max-md:ml-0 max-md:flex-col max-md:items-start max-md:gap-2.5 dark:border-[#34463a] dark:text-[#b2beb5]">
          <span>
            <b className="text-[#536157] dark:text-[#edf4ef]">Preferred condition:</b>{' '}
            {request.condition}
            {request.deliveryDate && (
              <>
                {' '}
                · <b className="text-[#536157] dark:text-[#edf4ef]">Delivery date:</b>{' '}
                {request.deliveryDate}
              </>
            )}
            {request.requirements && (
              <>
                {' '}
                · <b className="text-[#536157] dark:text-[#edf4ef]">Additional needs:</b>{' '}
                {request.requirements}
              </>
            )}
          </span>
          <Link
            className="inline-flex items-center gap-[7px] text-[12px] font-[680] text-[#285d41] hover:text-[#173b2d] dark:text-[#dbe8df]"
            to="/login"
          >
            Contact buyer <ArrowRight size={15} />
          </Link>
        </div>
      )}
    </article>
  )
}
