import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
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

const TransactionHistory = ({ dispatch, transactionHistory }) => {
  const classes = useStyles();

  const [input, setInput] = useState({
    from: "",
    to: "",
  });

  const handelHistoryTransaction = async () => {
    dispatch(transactionAction.getTransactionHistories(input.from, input.to));
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
                      <CustomInput
                        labelText="Từ ngày"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        type="date"
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
                      <CustomInput
                        labelText="Đến ngày"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        type="date"
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
  };
};

export default connect(mapStateToProps)(TransactionHistory);
