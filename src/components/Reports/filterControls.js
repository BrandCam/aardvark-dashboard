import React from "react";
import ControlWrap from "./controlWrap.style";
import { Collapse } from "antd";
const { Panel } = Collapse;

const FilterControls = (props) => {
  function callback(key) {
    console.log(key);
  }

  const text = `
        A dog is a type of domesticated animal.
    
      `;
  return (
    <ControlWrap>
      <h1>Filter By</h1>
      <Collapse onChange={callback}>
        <Panel header="filters" key="1">
          <Collapse defaultActiveKey="1">
            <Panel header="This is panel nest panel" key="1">
              <p>{text}</p>
            </Panel>
          </Collapse>
        </Panel>
        <Panel header="sort by" key="2">
          <p>{text}</p>
        </Panel>
        <Panel header="This is panel header 3" key="3">
          <p>{text}</p>
        </Panel>
      </Collapse>
    </ControlWrap>
  );
};

export default FilterControls;
