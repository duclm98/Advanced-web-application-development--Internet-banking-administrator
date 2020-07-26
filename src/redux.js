import instance from "./services/AxiosServices";

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
        console.log(data)
        dispatch({
            type: "TRANSACTION_HISTORY",
            payload: data
        });
    },
};

const initialState = {
    accounts: [],
    transactionHistory: []
};

export default (state = initialState, action) => {
    // Reducer cho account action
    if (action.type === 'GET_ACCOUNTS') {
        return {
            ...state,
            accounts: action.payload
        }
    }

    // Reducer cho transaction action
    else if (action.type === 'TRANSACTION_HISTORY') {
        return {
            ...state,
            transactionHistory: action.payload
        }
    }
    return state;
};