import React, { useState } from "react";
import styled from 'styled-components';

import { ContentBox, TitleLabel } from "../Style";
import { usePolling } from "../../Hooks/useIpcOn";
import { AIContent, AITestInput } from "../DIOContent";
import { InputContent } from "../DataContent";

function IOAnalogTest(params) {
    const { id } = params;
    const changedValue = (ch, value) => {
        console.log(`${id} : ${value}`);
        const type = 8;
        console.log(`${ch}:${id}:${value}`)
        const arr = [0,0,0,0,0,0,0,0,0,0,0,0];
        arr.splice(ch-1, 1);
        arr.splice(ch-1, 0, value);
        console.log(arr);
        const data = {
            id,
            ch,
            type,
            value: arr ,
        };
        ipcRenderer.send("set-iom-ai-test-cmd", data);
    }
    return (
        <ContentBox>
            <TitleLabel>Analog Test</TitleLabel>
            <InputContent ch={1} changedValue={changedValue}></InputContent>
            <InputContent ch={2} changedValue={changedValue}></InputContent>
            <InputContent ch={3} changedValue={changedValue}></InputContent>
            <InputContent ch={4} changedValue={changedValue}></InputContent>
            <InputContent ch={5} changedValue={changedValue}></InputContent>
            <InputContent ch={6} changedValue={changedValue}></InputContent>
            <InputContent ch={7} changedValue={changedValue}></InputContent>
            <InputContent ch={8} changedValue={changedValue}></InputContent>
            <InputContent ch={9} changedValue={changedValue}></InputContent>
            <InputContent ch={10} changedValue={changedValue}></InputContent>
            <InputContent ch={11} changedValue={changedValue}></InputContent>
            <InputContent ch={12} changedValue={changedValue}></InputContent>
        </ContentBox>
    )
}

export default IOAnalogTest;