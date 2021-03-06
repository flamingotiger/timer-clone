import React, { useEffect, useState } from 'react';
import Timer from './Timer';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faRedoAlt, faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';
import { clearInterval, setInterval } from 'timers';

const TimerWrapper = styled.div`
    width: 440px;
    height: 520px;
    background-color: black;
    border-radius: 60px;
    padding: 30px;
    box-sizing: border-box;
`

const TimerDisplay = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`
const TimerHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
`
const BackButton = styled.button`
    background: none;
    border: none;
    color: rgb(223,117,57);
    font-size: 30px;
    line-height: 60px;
    font-weight: 300;
    cursor: pointer;
`

const BackText = styled.span`
    font-size: 36px;
    margin-left: 10px;
`

const CurrentTime = styled.span`
    font-size: 36px;
    line-height: 60px;
    color: rgb(108,108,108);
    margin-right: 10px;
`

const ButtonsWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 60px;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Button = styled.button`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 0;
    background-color: rgb(38,38,38);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:last-of-type {
      background-color: rgb(222,116,51);
    }
`

const App: React.FC = () => {
    const defaultTime = 180000; // 1000 * 60 * 3 = 3분
    const [timer, setTimer] = useState(moment.duration(defaultTime));
    const [timerStatus, setTimerStatus] = useState<'play' | 'pause' | 'stop'>('stop');
    const [currentTime, setCurrentTime] = useState(moment());

    useEffect(() => {
        const currentTimer: NodeJS.Timeout = setInterval(() => {
            setCurrentTime(prevCurrentTime => prevCurrentTime.clone().add(1, 'minute'));
        }, 60000);
        return () => {
            clearInterval(currentTimer);
        }
    }, []);

    useEffect(() => {
        let timerInterval: NodeJS.Timeout | null = null;
        if (timerStatus === 'play') {
            timerInterval = setInterval(() => {
                setTimer(prevTimer => {
                        const duration = prevTimer.clone().subtract(1, 'second');
                        if (prevTimer.asMilliseconds() === 0) {
                            setTimerStatus('stop');
                            return moment.duration(0);
                        }
                        return duration;
                    }
                )
            }, 1000);
        } else if (timerStatus === 'pause' || timerStatus === 'stop') {
            if (timerInterval) {
                clearInterval(timerInterval);
            }
        }
        return () => {
            if (timerInterval) {
                clearInterval(timerInterval);
            }
        }
    }, [timerStatus]);

    const timerControl = () => {
        if (timerStatus === 'play') {
            setTimerStatus('pause');
        } else {
            setTimerStatus('play');
        }
    }

    const timerReset = () => {
        setTimerStatus('stop');
        setTimer(moment.duration(defaultTime));
    }
    return (
        <TimerWrapper>
            <TimerDisplay>
                <TimerHeader>
                    <BackButton>
                        <FontAwesomeIcon icon={faChevronLeft} color="rgb(106,106,106)" size="sm"/>
                        <BackText>Back</BackText>
                    </BackButton>
                    <CurrentTime>{currentTime.format('HH:mm')}</CurrentTime>
                </TimerHeader>
                <Timer timer={timer} defaultTime={defaultTime}/>
                <ButtonsWrapper>
                    <Button type="button" onClick={() => timerControl()}>
                        <FontAwesomeIcon icon={timerStatus === 'play' ? faPause : faPlay} color="#fff" size="lg"/>
                    </Button>
                    <Button type="button" onClick={() => timerReset()}>
                        <FontAwesomeIcon icon={faRedoAlt} color="#fff" size="lg"/>
                    </Button>
                </ButtonsWrapper>
            </TimerDisplay>
        </TimerWrapper>
    );
}

export default App;
