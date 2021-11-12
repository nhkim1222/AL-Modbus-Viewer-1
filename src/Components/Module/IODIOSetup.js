import React, {useState, useEffect} from 'react';
import { useFieldArray, useForm } from "react-hook-form";
import styled from 'styled-components';
const Container = styled.div`
  width: 600px;
`
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
  width: 100%;
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
function DIOSetup(props) {
    const {id} = props;
    const {
        control,
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm();  
    useEffect(() => {
        // ipcRenderer.on("set-lm-logic-setup", (evt, args) => {
        //   for(var i = 0; i < 27; i ++)
        //   {
        //     if(i < 18)
        //     {
        //       setValue(`lm_dio[${i}].polarity`,(args.di_setup[i] >> 8));
        //       setValue(`lm_dio[${i}].mapping`, (args.di_setup[i] & 0xff) );
        //     }
        //     else
        //     {          
        //       setValue(`lm_dio[${i}].mapping`, (args.di_setup[i] >> 8) );
        //     }
        //   }
        //   console.log(args);
        // });
    
        // ipcRenderer.send("get-lm-logic-setup");
        
        const di_setup = [];
        const do_setup = [];
        for (var i=0; i < 11; i++) {
          di_setup.push({polarity: 0, mapping : "0", id: i+1, ch: i+1})
          if (i < 6)
            do_setup.push({mapping : "0", id: i+12, ch: i+1})
        }
        let dio_setup = di_setup.concat(do_setup);
        //console.log(dio_setup);
        append(dio_setup);
    
        
        return () => {
          ipcRenderer.removeAllListeners("set-lm-logic-setup");
        };
      }, []);
    const { fields, append, insert } = useFieldArray({
        control: control,
        name: "ioh_dio"
    });

    const onSubmit = (data) => {

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
                if (index > 10) {
                  return (<div key={field.id}></div>);
                }
                return(
                  <DataField key={field.id}>
                  <FormLabel>DI-{field.ch} Polarity</FormLabel>
                  <FormSelect name={`ioh_dio[${index}].polarity`} {...register(`ioh_dio[${index}].polarity`)}>
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
                if (index > 10) {
                  return (<div key={field.id}></div>);
                }
                  return (
                    <DataField key={field.id}>
                      <FormLabel>DI-{field.ch} mapping</FormLabel>
                      <FormText name={`ioh_dio[${index}].mapping`}  {...register(`ioh_dio[${index}].mapping`)} defaultValue={field.mapping}></FormText>
                    </DataField>
                  )
              })
            }  
            {
              fields.map( (field, index) =>  {
                if (index < 11) {
                  return (<div key={field.id}></div>);
                }
                return (
                  <DataField key={field.id}>
                    <FormLabel>DO-{field.ch} mapping</FormLabel>
                    <FormText name={`ioh_dio[${index}].mapping`}  {...register(`ioh_dio[${index}].mapping`)} defaultValue={field.mapping}></FormText>
                  </DataField>
                )
              })
            }      
          </form>
        </DataContainer>
      );
}

function AISetup(props) {

    return (
       <DataContainer2>
         <form>
           <SubmitContainer>
              <TitleLabel style={{ color: "black" }}>AI Logic Setup</TitleLabel>
              <FormSelect style={{ marginLeft: "10px"}}>
                <option value={1}>channel1</option>
                <option value={2}>channel2</option>
                <option value={3}>channel3</option>
                <option value={4}>channel4</option>
                <option value={5}>channel5</option>
                <option value={6}>channel6</option>
                <option value={7}>channel7</option>
                <option value={8}>channel8</option>
                <option value={9}>channel9</option>
                <option value={10}>channel10</option>
                <option value={11}>channel11</option>
                <option value={12}>channel12</option>
              </FormSelect>
              <FormApply type="submit" value="apply"></FormApply>
           </SubmitContainer>
           <DataField>
             <FormLabel>AI1 InputType</FormLabel>
             <FormSelect>
               <option value={0}>4-20</option>
               <option value={1}>0-20</option>
             </FormSelect>
           </DataField>
           <DataField>
             <FormLabel>AI1 Unit type</FormLabel>
             <FormSelect>
               <option value={0}>No trans</option>
               <option value={1}>%</option>
               <option value={2}>V</option>
               <option value={3}>A</option>
               <option value={4}>C</option>
               <option value={5}>F</option>
               <option value={6}>l</option>
               <option value={7}>m3</option>
               <option value={8}>bar</option>
             </FormSelect>
           </DataField>
           <DataField>
             <FormLabel>AI1 Mapping</FormLabel>
             <FormText></FormText>
           </DataField>
           <DataField>
             <FormLabel>AI1 Min Value</FormLabel>
             <FormText></FormText>
           </DataField>
           <DataField>
             <FormLabel>AI1 Max Value</FormLabel>
             <FormText></FormText>
           </DataField>
         </form>
       </DataContainer2> 
    )
}

function IODIOSetup(props) {
    
    
    const [id, SetId] =  useState(1);
    const [type, setType] = useState(1);

    const SetupContents = ({type}) => {
        if (type  == 1) {// di {
            return (
                <DIOSetup id={id}></DIOSetup>
            )
        } else if (type == 2){
            return (
                <AISetup></AISetup>
            )
        }
    }
    const typeChange = (e) => {
        console.log(e.target.value);
        setType(e.target.value);
    }
    const idChange = (e) => {
        SetId(e.target.value);
    }

    return (
        <Container>
            <DataField>
                <FormLabel>A2750IOH ID</FormLabel>
                <FormSelect>
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
                <FormSelect onChange= {typeChange}>
                    <option value={1}>DIO</option>
                    <option value={2}>AI2</option>
                </FormSelect>
            </DataField>
            <SetupContents type={type}></SetupContents>
        </Container>
    )
}

export default IODIOSetup;