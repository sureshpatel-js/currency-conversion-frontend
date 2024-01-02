import * as React from 'react';
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import "./CurrencyConversion.css";
import axios from "axios";
import { debounce, split } from 'lodash';
//mui
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Stack from '@mui/joy/Stack';



import { BASE_URL } from "../constants/appConstants";
const CurrencyConversion = () => {
    const [crypto, setCrypto] = useState('Crypto');
    const [currency, setCurrency] = useState('USD-$');
    const [amount, setAmount] = useState("");
    const [total, setTotal] = useState("");
    const [loding, setLoding] = useState(false);
    const [state, setState] = useState({
        fiat: [],
        cryptocurrency: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                let fiat = await axios.get(`${BASE_URL}/v1/fiat`);
                let cryptocurrency = await axios.get(`${BASE_URL}/v1/cryptocurrency`);
                fiat = fiat?.data?.data?.data;
                cryptocurrency = cryptocurrency?.data?.data?.data;
                fiat = fiat.sort((a, b) => {
                    const symbolA = a.symbol.toUpperCase();
                    const symbolB = b.symbol.toUpperCase();
                    if (symbolA < symbolB) {
                        return -1;
                    }
                    if (symbolA > symbolB) {
                        return 1;
                    }
                    return 0;
                });
                cryptocurrency = cryptocurrency.sort((a, b) => {
                    const symbolA = a.symbol.toUpperCase();
                    const symbolB = b.symbol.toUpperCase();
                    if (symbolA < symbolB) {
                        return -1;
                    }
                    if (symbolA > symbolB) {
                        return 1;
                    }
                    return 0;
                });
                setState({
                    fiat,
                    cryptocurrency
                });
            } catch (error) {
                if (error?.response?.data?.status === "error") {
                    toast.error(error?.response?.data?.data?.message);
                } else {
                    toast.error(error.message);
                }
            }
        }
        fetchData();
        var inputElement = document.getElementById("amoutInbutBox");
        inputElement.disabled = true;
    }, []);


    const debouncedSearch = debounce(async (crypto, amount, currency) => {
        try {
            setLoding(true);
            setTotal("");
            const resObj = await axios.get(`${BASE_URL}/v1/conversion?source=${crypto}&amount=${amount}&target=${currency}`);
            setTotal(resObj?.data?.data?.data?.total);
        } catch (error) {
            if (error?.response?.data?.status === "error") {
                toast.error(error?.response?.data?.data?.message);
            } else {
                toast.error(error.message);
            }
        } finally {
            setLoding(false);
        }

    }, 500);
    useEffect(() => {
        if (!amount) {
            setTotal("");
        }
        if (crypto != "Crypto" && currency && amount && Number(amount) > 0) {
            debouncedSearch(crypto, amount, currency?.split("-")[0]);
            return () => {
                debouncedSearch.cancel();
            };
        }
    }, [crypto, amount, currency]);

    const inputHandler = (e) => {
        setAmount(e.target.value);
    }

    return (
        <div className='currencyConverter' >
            <div style={{ height: "100%", padding: 20, display: "flex", flexDirection: "column" }}  >
                <div style={{ width: 300, height: 32, display: "flex", flexDirection: "row", alignItems: "center" }} >
                    <div style={{ fontFamily: "sans-serif", fontSize: 24 }} >  Currency Converter</div>
                    <i style={{ marginLeft: 20, color: "#44B496", opacity: "60%", fontSize: 20 }} className="bi bi-currency-exchange"></i>
                </div>
                <div style={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "space-evenly" }}>
                    <Stack spacing={1.5}>
                        <Input
                            placeholder="Amount"
                            value={amount}
                            type='number'
                            startDecorator={crypto == "Crypto" ? "" : crypto}
                            onChange={inputHandler}
                            endDecorator={
                                <React.Fragment>
                                    <Select
                                        variant="plain"
                                        value={crypto}
                                        onChange={(_, value) => setCrypto(value)}
                                        slotProps={{
                                            listbox: {
                                                variant: 'outlined',
                                            },
                                        }}
                                        sx={{ mr: -1.5, '&:hover': { bgcolor: 'transparent', color: "white" }, color: "#337666", backgroundColor: "#1A1A1F" }}
                                    >
                                        <Option sx={{ '&:hover': { bgcolor: 'transparent', color: "white" }, color: "#337666", backgroundColor: "#1A1A1F" }} key={"Crypto"} value={"Crypto"}>Select Crypto</Option>
                                        {
                                            state?.cryptocurrency?.map((el, idx) => {
                                                return <Option sx={{ '&:hover': { bgcolor: 'transparent', color: "white" }, color: "#337666", backgroundColor: "#1A1A1F" }} key={idx} value={el.symbol}>{el.symbol}</Option>
                                            })
                                        }

                                    </Select>
                                </React.Fragment>
                            }
                            sx={{ width: 300, color: "#F8F8FF", backgroundColor: "#1A1A1F" }}
                        />

                    </Stack>
                    <div style={{ height: 32, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }} >
                        {
                            loding ? <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} className="icon" > <i style={{ color: "#44B496", fontSize: 28, display: "flex", alignItems: "center", justifyContent: "center" }} className="bi bi-arrow-repeat"></i> </div> : <i style={{ color: "#44B496", fontSize: 24 }} className="bi bi-arrow-down-circle"></i>
                        }
                    </div>
                    <Stack spacing={1.5}>
                        <Input
                            placeholder="Amount"
                            id='amoutInbutBox'
                            value={total?.toLocaleString("en-US")}
                            startDecorator={currency?.split("-")[1]}
                            endDecorator={
                                <React.Fragment>
                                    <Select
                                        variant="plain"
                                        value={currency}
                                        onChange={(_, value) => setCurrency(value)}
                                        slotProps={{
                                            listbox: {
                                                variant: 'outlined',
                                            },
                                        }}
                                        sx={{ mr: -1.5, '&:hover': { bgcolor: 'transparent', color: "white" }, color: "#337666", backgroundColor: "#1A1A1F" }}
                                    >
                                        {
                                            state?.fiat?.map((el, idx) => {
                                                return <Option key={idx} sx={{ '&:hover': { bgcolor: 'transparent', color: "white" }, color: "#337666", backgroundColor: "#1A1A1F" }} value={`${el.symbol}-${el.sign}`}>{el.symbol}</Option>
                                            })
                                        }
                                    </Select>
                                </React.Fragment>
                            }
                            sx={{ width: 300, color: "#F8F8FF", backgroundColor: "#1A1A1F" }}
                        />
                    </Stack>
                </div>
            </div>
        </div>


    )
}

export default CurrencyConversion;