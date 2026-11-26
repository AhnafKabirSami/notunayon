const heights = [30, 45, 37, 61, 50, 76, 62, 88, 59, 71, 48, 82]

export default function MiniChart({ tall = false }: { tall?: boolean }) {
  return (
    <div className={`relative px-2 pt-2.5 pb-[23px] ${tall ? 'h-[245px]' : 'h-[136px]'}`}>
      <div className="absolute inset-[10px_8px_24px] flex flex-col justify-between">
        <i className="h-px border-t border-dashed border-[#edf0eb] dark:border-[#34463a]" />
        <i className="h-px border-t border-dashed border-[#edf0eb] dark:border-[#34463a]" />
        <i className="h-px border-t border-dashed border-[#edf0eb] dark:border-[#34463a]" />
        <i className="h-px border-t border-dashed border-[#edf0eb] dark:border-[#34463a]" />
      </div>
      <div className="absolute inset-[11px_12px_25px] flex items-end justify-around gap-2">
        {heights.map((height, index) => (
          <span
            key={index}
            style={{ height: `${height}%` }}
            className={`w-[5%] rounded-t-[2px] ${
              index === 7 ? 'bg-[#58835e]' : 'bg-[#c8d8c6] dark:bg-[#34463a]'
            }`}
          />
        ))}
      </div>
      <div className="absolute inset-x-2 bottom-0 flex justify-between text-[8px] text-[#9aa39a]">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>
    </div>
  )
}
