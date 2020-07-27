import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import TextField from '@material-ui/core/TextField'
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import Table from "./Table.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import { transactionAction } from "../../redux";

const useStyles = makeStyles(styles);

const TransactionHistory = ({ dispatch, transactionHistory, sendingMoney, receivingMoney }) => {
  const classes = useStyles();

  const [input, setInput] = useState({
    from: "",
    to: "",
  });

  const [content, setContent] = useState("");

  const handelHistoryTransaction = async () => {
    dispatch(transactionAction.getTransactionHistories(input.from, input.to));
    setContent(`Danh sách giao dịch từ ${input.from} đến ${input.to}`);
    setInput({
      from:"",
      to:""
    })
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Lịch sử giao dịch</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                        label="Từ ngày"
                        type="date"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={input.from}
                        onChange={(event) => {
                          const from = event.target.value;
                          setInput((prev) => ({
                            ...prev,
                            from,
                          }));
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                        label="Đến ngày"
                        type="date"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={input.to}
                        onChange={(event) => {
                          const to = event.target.value;
                          setInput((prev) => ({
                            ...prev,
                            to,
                          }));
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <Button
                    color="warning"
                    style={{ width: "200px" }}
                    onClick={handelHistoryTransaction}
                  >
                    Xem lịch sử giao dịch
                  </Button>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <h6>{content}</h6>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Tổng số tiền đã chuyển (VNĐ)"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: true,
                        }}
                        value={sendingMoney}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Tổng số tiền đã nhận (VNĐ)"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: true,
                        }}
                        value={receivingMoney}
                      />
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <Table rows={transactionHistory || []} />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    transactionHistory: state.transactionHistory,
    sendingMoney:state.sendingMoney,
    receivingMoney:state.receivingMoney,
  };
};

export default connect(mapStateToProps)(TransactionHistory);
