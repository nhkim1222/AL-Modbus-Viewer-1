import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.input.attrs({
    type: 'submit',
    value: 'Apply'
})`
    margin-top: 1rem;
    padding-top: 0.6rem;
    padding-bottom: 0.5rem;

    background: ${oc.teal[6]};
    color: white;

    text-align: center;
    font-size: 12px;
    font-weight: 500;

    cursor: pointer;
    user-select: none;
    transition: .2s all;

    &:hover {
        background: ${oc.teal[5]};
    }

    &:active {
        background: ${oc.teal[7]};
    }

`;

const ApplyButton = ({children, onClick}) => (
    <Wrapper onClick={onClick}>
    </Wrapper>
);

export default ApplyButton;