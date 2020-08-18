import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import Table from "./Table.js";

import { employeeAction } from "../../redux";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

const Employees = ({ dispatch, employees }) => {
  const classes = useStyles();

  const [input, setInput] = useState({
    username: "",
    name: "",
    phone: "",
  });
  const [msg, setMsg] = useState("");
  const [employeesGetting, setEmployeesGetting] = useState(false);

  useEffect(() => {
    if (!employeesGetting) {
      dispatch(employeeAction.getEmployees());
      setEmployeesGetting(true);
    }
  }, [employeesGetting]);

  const handleCreateEmployee = async () => {
    const createEmployee = await dispatch(employeeAction.createEmployee(input));
    if (createEmployee.status === false) {
      return setMsg(createEmployee.msg);
    }
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>
                Quản lý tài khoản khách hàng
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Tên đăng nhập"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    value={input.username}
                    onChange={(event) => {
                      const username = event.target.value;
                      setInput((prev) => ({
                        ...prev,
                        username,
                      }));
                    }}
                  />
                  <CustomInput
                    labelText="Tên nhân viên"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    value={input.name}
                    onChange={(event) => {
                      const name = event.target.value;
                      setInput((prev) => ({
                        ...prev,
                        name,
                      }));
                    }}
                  />
                  <CustomInput
                    labelText="Số điện thoại"
                    id="phone"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    value={input.phone}
                    onChange={(event) => {
                      const phone = event.target.value;
                      setInput((prev) => ({
                        ...prev,
                        phone,
                      }));
                    }}
                  />
                  <h6 style={{ color: "red" }}>{msg}</h6>
                  <Button color="primary" onClick={handleCreateEmployee}>
                    Tạo tài khoản nhân viên
                  </Button>
                </GridItem>
                <GridItem xs={12} sm={12} md={9}>
                  <Table rows={employees || []} />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    employees: state.employees,
  };
};

export default connect(mapStateToProps)(Employees);
