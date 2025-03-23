import React from 'react'

const Rounded = () => {
    return (
        <div className="time-breakdown">
            <div className="time-breakdown-chart">
                {/* Focus chart */}
                <div className="percentage-chart percentage-chart-focus">
                    <svg viewBox="0 0 36 36">
                        <path className="percentage-chart-bg" d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="percentage-chart-stroke" strokeDasharray="60, 100" d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <div className="counter" data-percent="60" />
                </div>
            </div>
        </div>
    )
}

export default Rounded