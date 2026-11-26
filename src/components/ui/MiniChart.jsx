const heights = [30, 45, 37, 61, 50, 76, 62, 88, 59, 71, 48, 82]

export default function MiniChart({ tall = false }) {
  return (
    <div className={`mini-chart ${tall ? 'chart-tall' : ''}`}>
      <div className="chart-lines">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="chart-bars">
        {heights.map((height, index) => (
          <span
            key={index}
            style={{ height: `${height}%` }}
            className={index === 7 ? 'highlight' : ''}
          />
        ))}
      </div>
      <div className="chart-labels">
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
