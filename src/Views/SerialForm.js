import React from "react";
import styled from "styled-components";

const SerialForm = () => {
  return (
    <div>
      <form>
        <label>port</label>
        <input type="text"></input>
        <label>baudrate</label>
        <select>
          <option>10000</option>
        </select>
      </form>
    </div>
  );
};

export default SerialForm;
