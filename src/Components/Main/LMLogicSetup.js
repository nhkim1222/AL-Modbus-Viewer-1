import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import styled from "styled-components";
import {
  DataContainer,
  DataField,
  FormLabel,
  FormText,
  FormSelect,
  FormApply,
  TitleLabel,
} from "../Style";

const { ipcRenderer } = window.require("electron");

const SubmitContainer = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  margin: 0px;
  align-items: center;
  justify-content: center;
`;

function LMLogicSetup() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  
  const { fields, append, insert } = useFieldArray({
    control: control,
    name: "lm_dio"
  });

  useEffect(() => {
    ipcRenderer.on("set-lm-logic-setup", (evt, args) => {
      for(var i = 0; i < 27; i ++)
      {
        if(i < 18)
        {
          setValue(`lm_dio[${i}].polarity`,(args.di_setup[i] >> 8));
          setValue(`lm_dio[${i}].mapping`, (args.di_setup[i] & 0xff) );
        }
        else
        {          
          setValue(`lm_dio[${i}].mapping`, (args.di_setup[i] >> 8) );
        }
      }
      console.log(args);
    });

    ipcRenderer.send("get-lm-logic-setup");
    
    const di_setup = [];
    const do_setup = [];
    for (var i=0; i < 18; i++) {
      di_setup.push({polarity: 0, mapping : "0", id: i+1, ch: i+1})
      if ( i < 9)
        do_setup.push({mapping : "0", id: i+19, ch: i+1})
    }
    let dio_setup = di_setup.concat(do_setup);
    //console.log(dio_setup);
    append(dio_setup);

    
    return () => {
      ipcRenderer.removeAllListeners("set-lm-logic-setup");
    };
  }, []);

  const onSubmit = (data) => {
    //console.log(data);
    ipcRenderer.send("set-lm-logic-setup", data);
    ipcRenderer.send("get-lm-logic-setup");
  };  

  return (
    <DataContainer>
      <form onSubmit={handleSubmit(onSubmit)}>        
        <SubmitContainer>
          <TitleLabel style={{ color: "black" }}>LM Logic setup</TitleLabel>
          <FormApply type="submit" value="apply"></FormApply>
        </SubmitContainer>
        {
          fields.map( (field, index) => {
            if (index > 17) {
              return (<div key={field.id}></div>);
            }
            return(
              <DataField key={field.id}>
              <FormLabel>DI-{field.ch} Polarity</FormLabel>
              <FormSelect name={`lm_dio[${index}].polarity`} {...register(`lm_dio[${index}].polarity`)}>
                <option value={0}>Normal</option>
                <option value={1}>Reverse</option>
              </FormSelect>
            </DataField>
            )
          })
        }
        {
          fields.map( (field, index) => 
          {
            if (index > 17) {
              return (<div key={field.id}></div>);
            }
              return (
                <DataField key={field.id}>
                  <FormLabel>DI-{field.ch} mapping</FormLabel>
                  <FormText name={`lm_dio[${index}].mapping`}  {...register(`lm_dio[${index}].mapping`)} defaultValue={field.mapping}></FormText>
                </DataField>
              )
          })
        }  
        {
          fields.map( (field, index) =>  {
            if (index < 18) {
              return (<div key={field.id}></div>);
            }
            return (
              <DataField key={field.id}>
                <FormLabel>DO-{field.ch} mapping</FormLabel>
                <FormText name={`lm_dio[${index}].mapping`}  {...register(`lm_dio[${index}].mapping`)} defaultValue={field.mapping}></FormText>
              </DataField>
            )
          })
        }      
      </form>
    </DataContainer>
  );
}

export default LMLogicSetup;
