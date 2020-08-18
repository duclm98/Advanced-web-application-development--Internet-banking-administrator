import instance from "./services/AxiosServices";

export const employeeAction = {
    getEmployees: () => async dispatch => {
        const {
            data
        } = await instance.get('administrator/employees');
        dispatch({
            type: 'GET_EMPLOYEES',
            payload: data
        })
    },
    createEmployee: (employee) => async dispatch => {
        try {
            const {
                data
            } = await instance.post('administrator/employees', employee);

            dispatch({
                type: 'CREATE_EMPLOYEE_SUCCESS',
                payload: {
                    employee: data
                }
            })

            return {
                status: true
            }
        } catch (error) {
            let msg = 'Có lỗi trong quá trình tạo tài khoản nhân viên, vui lòng thử lại.';
            if (error.response) {
                msg = error.response.data;
            }
            return {
                status: false,
                msg
            }
        }
    },
    deleteEmployee: (_id) => async dispatch => {
        try {
            const {
                data
            } = await instance.delete(`administrator/employees/${_id}`);

            dispatch({
                type: 'DELETE_EMPLOYEE_SUCCESS',
                payload: {
                    _id: data._id
                }
            })

            return {
                status: true
            }
        } catch (error) {
            let msg = 'Có lỗi trong quá trình xóa tài khoản nhân viên, vui lòng thử lại.';
            if (error.response) {
                msg = error.response.data;
            }
            return {
                status: false,
                msg
            }
        }
    }
}

export const accountAction = {
    getAccount: (accountNumberFromBody) => async _ => {
        const accountNumber = accountNumberFromBody ? accountNumberFromBody : "0000000000000";
        try {
            const {
                data
            } = await instance.get(
                `employees/accounts/${accountNumber}`
            );
            return {
                status: true,
                data
            }
        } catch (error) {
            return {
                status: false
            }
        }
    },
    getAccounts: () => async dispatch => {
        try {
            const {
                data
            } = await instance.get(`administrator/accounts`);
            dispatch({
                type: 'GET_ACCOUNTS',
                payload: data
            })
            return {
                status: true,
                data
            }
        } catch (error) {}
    }
};

export const transactionAction = {
    getTransactionHistories: (from, to) => async dispatch => {
        const {
            data
        } = await instance.get(`administrator/transactions/interbank?from=${from}&to=${to}`);
        dispatch({
            type: "TRANSACTION_HISTORY",
            payload: data
        });
    },
};

const initialState = {
    employees: [],
    accounts: [],
    transactionHistory: [],
    sendingMoney: 0,
    receivingMoney: 0
};

export default (state = initialState, action) => {
    // Reducer cho employee action
    if (action.type === 'GET_EMPLOYEES') {
        return {
            ...state,
            employees: action.payload
        }
    } else if (action.type === 'CREATE_EMPLOYEE_SUCCESS') {
        return {
            ...state,
            employees: [...state.employees, action.payload.employee]
        }
    } else if (action.type === 'DELETE_EMPLOYEE_SUCCESS') {
        let data = [];
        state.employees.map(i => {
            if (i._id !== action.payload._id) {
                data.push(i);
            }
        })
        console.log(data)
        return {
            ...state,
            employees: data
        }
    }

    // Reducer cho account action
    else if (action.type === 'GET_ACCOUNTS') {
        return {
            ...state,
            accounts: action.payload
        }
    }

    // Reducer cho transaction action
    else if (action.type === 'TRANSACTION_HISTORY') {
        console.log(action.payload)
        return {
            ...state,
            transactionHistory: action.payload.transactions,
            sendingMoney: action.payload.sendingMoney,
            receivingMoney: action.payload.receivingMoney
        }
    }
    return state;
};