import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment, { Duration } from 'moment';

const TimerStyle = styled.div`
    position: relative;
`
const SvgWrapper = styled.svg`
    transform: scale(0.85);
`
const Timer: React.FC<{ timer: Duration, defaultTime: number }> = ({timer, defaultTime}) => {
    const size = 100;
    const center = size / 2;
    const strokeWidth = 10;
    const radius = center - strokeWidth / 2;
    const [angle, setAngle] = useState(360); // 기본각도
    const [draw, setDraw] = useState(``); // path d 값

    const radians = (degrees: number) => {
        return degrees / 180 * Math.PI;
    };

    React.useEffect(() => {
        if (timer.asMilliseconds() >= 0) {
            const percent = timer.asMilliseconds() / defaultTime;
            const angle = 360 * percent;
            setAngle(angle);
        }
    }, [timer, defaultTime])

    useEffect(() => {
        const drawPath = (angle: number) => {
            const getArc = (angle: number) => {
                const x = center + radius * Math.cos(radians(angle));
                const y = center + radius * Math.sin(radians(angle));
                return `A${radius},${radius} 1 0 1 ${x},${y}`; // 곡선
            };
            const firstAngle = angle > 180 ? 90 : angle - 90; // 왼쪽 각도
            const secondAngle = -270 + angle - 180; // 오른쪽 각도
            const firstArc = getArc(firstAngle); // 왼쪽 반원
            const secondArc = angle > 180 ? getArc(secondAngle) : ''; // 오른쪽 반원
            const start = `M${center},${center} m0,-${center - strokeWidth / 2}`; // 시작점
            const d = `${start} ${firstArc} ${secondArc}`; // 시작점 왼쪽 반원 오른쪽 반원 그리는 값
            setDraw(d);
            setAngle(angle);
        }
        drawPath(angle);
    }, [angle, center, radius]);

    return <TimerStyle>
        <SvgWrapper viewBox={`0 0 ${size} ${size}`}>
            <defs>
                <linearGradient id="gradient">
                    <stop offset="0%" stopColor="rgb(245,221,100)"/>
                    <stop offset="100%" stopColor="rgb(234,111,37)"/>
                </linearGradient>
            </defs>
            <circle cx={center} cy={center} r={center} fill='rgb(20,13,4)' stroke='none'/>
            <circle cx={center} cy={center} r={center - strokeWidth} fill='#000' stroke='none'/>
            <path
                strokeLinecap="round"
                strokeWidth={strokeWidth}
                stroke="url(#gradient)"
                fill='none'
                d={draw}
            />
            <text x={center - 25} y={center + 2} fill="#fff" fontSize="20" fontWeight="900"
                  style={{userSelect: 'none'}}>
                {moment.utc(timer.asMilliseconds()).format('mm:ss')}
            </text>
            <text x={center - 20} y={center + 15} fill="rgb(108,108,108)" fontSize="8"
                  style={{userSelect: 'none'}}>Watch Timer
            </text>
        </SvgWrapper>
    </TimerStyle>
}
export default Timer;
