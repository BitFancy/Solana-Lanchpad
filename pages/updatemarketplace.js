import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Layout from "../Components/Layout";
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
      <Layout title="Update Tradhub" description="Used to show updated luanchpad information">

      <div>
        <div className=" p-5 font-bold " style={{ borderBottom: "2px solid" }}>
          Step 1 : Update Parameters{" "}
        </div>
        {this.state.rows.map((item, idx) => (
          <div id="addr0" key={idx} className="card mt-5" style={{width:'60%',margin:'0 auto'}}>
            <div className="flex p-2 justify-content-between">
              <div style={{ width: "40%" }}>
                <div className="text-left">Enter new TradeHub fee</div>

                <InputText
                  value={this.state.rows[idx].name}
                  name="name"
                  className="p-2 mt-3 input-back w-full text-white"
                  type="number"
                />
              </div>
              <div style={{ width: "40%" }}>
                <div>Enter payout address</div>

                <InputText
                  value={this.state.rows[idx].mobile}
                  name="mobile"
                  className="p-2 mt-3 input-back w-full text-white"
                  type="text"
                />
              </div>
              <div className="mt-5">
                <Button
                  severity="danger"
                  icon="pi pi-minus"
                  onClick={this.handleRemoveSpecificRow(idx)}
                ></Button>
              </div>
            </div>
          </div>
        ))}
        <div className="text-center mt-5">
          <Button
            icon="pi pi-plus"
            label="Add Another Admin"
            severity="info"
            onClick={this.handleAddRow}
          />
        </div>
      </div>
      </Layout>
    );
  }
}

export default UpdateMarketPlace;
