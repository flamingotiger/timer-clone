import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const TimerStyle = styled.div`
    position: relative;
`
const SvgWrapper = styled.svg`
    transform: scale(0.85);
`
const Timer: React.FC = () => {
    const size = 100;
    const center = size / 2;
    const strokeWidth = 10;
    const radius = center - strokeWidth / 2;
    const [angle, setAngle] = useState(180);
    const [draw, setDraw] = useState(``);

    const radians = (degrees: number) => {
        return degrees / 180 * Math.PI;
    };

    const drawPath = (angle: number) => {
        const getArc = (angle: number) => {
            const x = center + radius * Math.cos(radians(angle));
            const y = center + radius * Math.sin(radians(angle));
            return `A${radius},${radius} 1 0 1 ${x},${y}`;
        };
        const firstAngle = angle > 180 ? 90 : angle - 90;
        const secondAngle = -270 + angle - 180;
        const firstArc = getArc(firstAngle);
        const secondArc = angle > 180 ? getArc(secondAngle) : '';
        const start = `M${center},${center} m0,-${center - strokeWidth / 2}`;
        const d = `${start} ${firstArc} ${secondArc}`;
        setDraw(d);
        setAngle(angle);
    }

    useEffect(() => {
        drawPath(angle);
    }, [angle]);

    return <TimerStyle>
        <SvgWrapper viewBox={`0 0 ${size} ${size}`} >
            <defs>
                <linearGradient id="gradient">
                    <stop offset="0%" stopColor="rgb(245,221,100)" />
                    <stop offset="100%" stopColor="rgb(234,111,37)" />
                </linearGradient>
            </defs>
            <circle cx={center} cy={center} r={center} fill='rgb(20,13,4)' stroke='none' />
            <circle cx={center} cy={center} r={center - strokeWidth} fill='#000' stroke='none' />
            <path
                strokeLinecap="round"
                strokeWidth={strokeWidth}
                stroke="url(#gradient)"
                fill='none'
                d={draw}
            />
            <text x={center - 25} y={center + 2} fill="#fff" fontSize="20" fontWeight="900">02:35</text>
            <text x={center - 20} y={center + 15} fill="rgb(108,108,108)" fontSize="8">Watch Timer</text>
        </SvgWrapper>
    </TimerStyle>
}
export default Timer;
