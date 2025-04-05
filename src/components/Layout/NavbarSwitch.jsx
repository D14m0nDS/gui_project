import React from 'react';
import styled from 'styled-components';

const Switch = ({ isOpen, setIsOpen }) => {
    return (
        <StyledWrapper onClick={() => setIsOpen(!isOpen)} className={isOpen ? 'active' : ''}>
            <span className="bar bar1"></span>
            <span className="bar bar2"></span>
            <span className="bar bar3"></span>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative;

    .bar {
        position: absolute;
        width: 24px;
        height: 3px;
        background-color: rgb(255 30 0);
        border-radius: 2px;
        transition: all 0.3s ease;
    }

    .bar1 {
        top: 10px;
    }

    .bar2 {
        top: 18px;
    }

    .bar3 {
        top: 26px;
    }

    &.active .bar1 {
        top: 18px;
        transform: rotate(45deg);
    }

    &.active .bar2 {
        opacity: 0;
        transform: scaleX(0);
    }

    &.active .bar3 {
        top: 18px;
        transform: rotate(-45deg);
    }
`;

export default Switch;
