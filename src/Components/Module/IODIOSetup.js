import React, { useState, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import styled from "styled-components";
import AISetup from './IOAI2Setup';

const Container = styled.div`
  width: 600px;
`;
const FormSelect = styled.select`
  display: block;
  font-size: 12px;
  font-weight: 600;
  height: 26px;
  width: 120px;
  font-family: inherit;
  align-items: center;
  border: 1px solid #999;
  outline-style: none;
  --webkit-appearance: none;
  --moz-appearance: none;
  text-align-last: center;
  border-radius: 0;
  text-align: center;
  padding: 0px;
  transition: 0.1s ease-in;
  :focus {
    border: 1px solid darksalmon;
  }
`;

const FormLabel = styled.label`
  display: flex;
  justify-content: left;
  align-items: center;
  color: grey;
  width: 120px;
  height: 24px;
  padding-left: 1px;
  font-size: 10px;
  margin-left: 10px;
`;

const DataField = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 3px;
  border-bottom: 0.5px solid rgba(100, 100, 100, 0.2);
`;

const TitleLabel = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  color: rgba(10, 10, 10, 0.8);
  font-weight: 600;
  font-size: 14px;
`;
const SubmitContainer = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  margin: 0px;
  align-items: center;
  justify-content: center;
`;
const FormApply = styled.input.attrs("submit")`
  display: inline-flex;
  outline: none;
  border: none;
  border-radius: 1px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  margin: 5px;
  justify-content: center;
  width: auto;
  height: 26px;
  background: #228be6;
  &:hover {
    background: #339af0;
  }
  &:active {
    background: #1c7ed6;
  }
  font-size: 12px;
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-y: scroll;
  width: 100vw;
  height: 100%;
  flex-wrap: wrap;
  padding: 10px;
`;
const DataContainer2 = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  width: auto;
  height: 100%;
  flex-wrap: no-wrap;
  padding: 10px;
`;
const FormText = styled.input.attrs((props) => ({ type: "text" }))`
  display: block;
  line-height: 24px;
  font-weight: 600;
  padding: 5px;
  width: 120px;
  font-size: 12px;
  font-family: inherit;
  border: 1px solid #999;
  outline-style: none;
  --webkit-appearance: none;
  --moz-appearance: none;
  border-radius: 0;
  text-align: center;
  padding: 0px;
  transition: 0.1s ease-in;
  :focus {
    border-bottom-color: darksalmon;
  }
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

function DIOSetup(props) {
  const { id } = props;
  const type = 5;
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    ipcRenderer.on("set-ioh-logic-setup", (evt, args) => {
      if (args === undefined) {
        console.log("return is undefined");
        return;
      }
      for (var i = 0; i < 17; i++) {
        if (i < 11) {
          setValue(`ioh_dio[${i}].polarity`, args.dio_setup[i] >> 8);
          setValue(`ioh_dio[${i}].mapping`, args.dio_setup[i] & 0xff);
        } else {
          console.log(`id = ${i}, ${args.dio_setup[i]}`);
          setValue(`ioh_dio[${i}].mapping`, args.dio_setup[i] >> 8);
        }
      }
      console.log(args);
    });

    ipcRenderer.send("get-ioh-logic-setup", id);

    const di_setup = [];
    const do_setup = [];
    for (var i = 0; i < 11; i++) {
      di_setup.push({ polarity: 0, mapping: 0, id: i , ch: i + 1 });
      if (i < 6) do_setup.push({ mapping: 0, id: i + 11, ch: i + 1 });
    }
    let dio_setup = di_setup.concat(do_setup);
    console.log(dio_setup);
    append(dio_setup);

    return () => {
      ipcRenderer.removeAllListeners("set-ioh-logic-setup");
    };
  }, []);
  const { fields, append, insert } = useFieldArray({
    control: control,
    name: "ioh_dio",
  });

  const onSubmit = (data) => {
    const request_data = {
      id: id,
      type: type,
      data: data.ioh_dio,
    };

    console.log(request_data.data);
    ipcRenderer.send("set-ioh-logic-setup", request_data);
    ipcRenderer.send("get-ioh-logic-setup", id);
  };

  return (
    <DataContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SubmitContainer>
          <TitleLabel style={{ color: "black" }}>IOH Logic setup</TitleLabel>

          <FormApply type="submit" value="apply"></FormApply>
        </SubmitContainer>
          {fields.map((field) => {
            console.log(fields.length);
            if (field.id > 10) {
              return (
                <DataField key={field.id}>
                  <FormLabel>DO-{field.ch} mapping</FormLabel>
                  <FormText
                    name={`ioh_dio[${field.id}].mapping`}
                    {...register(`ioh_dio[${field.id}].mapping`)}
                    defaultValue={0}
                  ></FormText>
                </DataField>
              );
            } else {
              return (
                <FieldContainer key={field.id}>
                  <DataField >
                    <FormLabel>DI-{field.ch} mapping</FormLabel>
                    <FormText
                      name={`ioh_dio[${field.id}].mapping`}
                      {...register(`ioh_dio[${field.id}].mapping`)}
                      defaultValue={0}
                    ></FormText>
                  </DataField>
                  <DataField>
                    <FormLabel>DI-{field.ch} Polarity</FormLabel>
                    <FormSelect
                      name={`ioh_dio[${field.id}].polarity`}
                      {...register(`ioh_dio[${field.id}].polarity`)}
                    >
                      <option value={0}>Normal</option>
                      <option value={1}>Reverse</option>
                    </FormSelect>
                  </DataField>
                </FieldContainer>
              );
            }
          })}
      </form>
    </DataContainer>
  );
}

function IODIOSetup(props) {
  const [id, SetId] = useState(1);
  const [type, setType] = useState(1);

  const SetupContents = ({ type }) => {
    if (type == 1) {
      // di {
      return <DIOSetup id={id}></DIOSetup>;
    } else if (type == 2) {
      return <AISetup id={id}></AISetup>;
    }
  };
  const typeChange = (e) => {
    console.log(e.target.value);
    setType(e.target.value);
  };
  const idChange = (e) => {
    SetId(e.target.value);
  };

  return (
    <Container>
      <DataField>
        <FormLabel>A2750IOH ID</FormLabel>
        <FormSelect onChange={idChange}>
          <option value={1}>ID 01</option>
          <option value={2}>ID 02</option>
          <option value={3}>ID 03</option>
          <option value={4}>ID 04</option>
          <option value={5}>ID 05</option>
          <option value={6}>ID 06</option>
          <option value={7}>ID 07</option>
          <option value={8}>ID 08</option>
          <option value={9}>ID 09</option>
          <option value={10}>ID 10</option>
          <option value={11}>ID 11</option>
          <option value={12}>ID 12</option>
          <option value={13}>ID 13</option>
          <option value={14}>ID 14</option>
          <option value={15}>ID 15</option>
        </FormSelect>
      </DataField>
      <DataField>
        <FormLabel>TYPE</FormLabel>
        <FormSelect onChange={typeChange}>
          <option value={1}>DIO</option>
          <option value={2}>AI2</option>
        </FormSelect>
      </DataField>
      <SetupContents type={type}></SetupContents>
    </Container>
  );
}

export default IODIOSetup;
