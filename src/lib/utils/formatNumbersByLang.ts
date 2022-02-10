export const formatComma = (amount:string,lang:string) => {
    const commaFormatLangs = ["fr","de"];
    if(!commaFormatLangs.includes(lang)){
        return amount;
    }
    return amount.replace(".",",");
}