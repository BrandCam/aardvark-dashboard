import React from "react";
import ControlWrap from "./controlWrap.style";
import ContentCard from "../contentCard";
import { Collapse, Checkbox, Radio } from "antd";
const { Panel } = Collapse;

const sevOptions = [
  { label: "New", value: "New" },
  { label: "Minor", value: "Minor" },
  { label: "Major", value: "Major" },
  { label: "Breaking", value: "Breaking" },
];

const FilterControls = ({
  setLimitArgs,
  setOrderArgs,
  setPageArgs,
  setResolvedArgs,
  setSeverityArgs,
  resolvedArgs,
  severityArgs,
  orderArgs,
  limitArgs,
  pageArg,
}) => {
  let onResChange = (e) => {
    setResolvedArgs(e.target.value);
  };
  let onOrderChange = (e) => {
    setOrderArgs(e.target.value);
  };
  function onSevChange(checkedValues) {
    setSeverityArgs(checkedValues);
  }

  return (
    <ContentCard style={{ marginRight: "0px", marginLeft: "0px" }} active>
      <ControlWrap>
        <h1>Controls</h1>
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="filters" key="1">
            <Collapse>
              <Panel header="Severity" key="1">
                <Checkbox.Group
                  options={sevOptions}
                  defaultValue={[]}
                  onChange={onSevChange}
                />
              </Panel>
              <Panel header="Is Resolved" key="2">
                <Radio.Group onChange={onResChange} value={resolvedArgs}>
                  <Radio value={false}>Open</Radio>
                  <Radio value={true}>Resolved</Radio>
                </Radio.Group>
              </Panel>
            </Collapse>
          </Panel>
          <Panel header="Sort by" key="2">
            <Radio.Group onChange={onOrderChange} value={orderArgs}>
              <Radio value={-1}>Newest</Radio>
              <Radio value={1}>Oldest</Radio>
            </Radio.Group>
          </Panel>
          {/* <Panel header="Per Page" key="3">
            <p>Per Page</p>
          </Panel> */}
        </Collapse>
      </ControlWrap>
    </ContentCard>
  );
};

export default FilterControls;
