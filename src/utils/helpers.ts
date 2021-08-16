import { BigNumber, ethers } from "ethers";
import { accounts } from "src/stores/MetaMaskAccount";


export const getEthersProvider = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider;
}

export const getSigner = () =>{
    const provider = getEthersProvider();
    return provider.getSigner();
}


export const parseBigNumberToInt = (n : BigNumber) => {
    const stringNumber = ethers.utils.formatUnits(n,18);
    return parseInt(stringNumber);
}

export const parseBigNumberToDecimal = (n: BigNumber) => {
 const stringNumber = ethers.utils.formatUnits(n,18)
 return parseFloat(stringNumber).toFixed(2);
}

