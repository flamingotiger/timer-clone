import React from 'react';
import Timer from './Timer';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faCheck, faPause } from '@fortawesome/free-solid-svg-icons'

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
`

const App: React.FC = () => {
  return (
    <TimerWrapper>
      <TimerDisplay>
        <TimerHeader>
          <BackButton>
            <FontAwesomeIcon icon={faChevronLeft} color="rgb(106,106,106)" size="sm"/> 
            <BackText>Back</BackText>
          </BackButton>
          <CurrentTime>10:00</CurrentTime>
        </TimerHeader>
        <Timer />
        <ButtonsWrapper>
          <Button type="button">
            <FontAwesomeIcon icon={faPause} color="#fff" size="lg"/> 
          </Button>
          <Button type="button">
            <FontAwesomeIcon icon={faCheck} color="#fff" size="lg"/> 
          </Button>
        </ButtonsWrapper>
      </TimerDisplay>
    </TimerWrapper>
  );
}

export default App;
