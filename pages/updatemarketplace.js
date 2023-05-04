import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { PrimeIcons } from 'primereact/api';

class UpdateMarketPlace extends React.Component {
  state = {
    rows: [{}],
  };
  handleAddRow = () => {
    const item = {
      name: "",
      mobile: "",
    };
    this.setState({
      rows: [...this.state.rows, item],
    });
  };
  handleRemoveRow = () => {
    this.setState({
      rows: this.state.rows.slice(0, -1),
    });
  };
  handleRemoveSpecificRow = (idx) => () => {
    const rows = [...this.state.rows];
    rows.splice(idx, 1);
    this.setState({ rows });
  };
  render() {
    return (
      <div>
        <div className="card p-5 font-bold">Step 1 : Update Parameters </div>
        {this.state.rows.map((item, idx) => (
          <div id="addr0" key={idx} className="card">
            <div className="flex p-2 justify-content-around">
              <div>
              <div className="text-left">Enter new marketplace fee</div>

                <InputText
                  value={this.state.rows[idx].name}
                  name="name"
                  className="p-2 mt-3"
                  type="number"
                />
              </div>
              <div>
              <div>Enter payout address</div>

                <InputText
                  value={this.state.rows[idx].mobile}
                  name="mobile"
                  className="p-2 mt-3"
                  type="text"
                />
              </div>
              <div className="mt-5">
              <Button
                severity="danger"
                icon="pi pi-minus"
                onClick={this.handleRemoveSpecificRow(idx)}
              >
                
              </Button>
              </div>
            </div>
          </div>
        ))}
        <div className="text-center">
        <Button
        icon="pi pi-plus"
          label="Add Another Admin"
          severity="info"
          onClick={this.handleAddRow}
        />
        </div>
       
      </div>
    );
  }
}

export default UpdateMarketPlace;
