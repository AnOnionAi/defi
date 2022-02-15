
export const formatComma = (amount:number,lang: string):string  => {
    const commaFormatLangs = ["fr","de"];

    if(!commaFormatLangs.includes(lang) && amount < 1){
        return amount?.toLocaleString("us-US",{maximumFractionDigits:5})
    }

    if(!commaFormatLangs.includes(lang)){
        return amount?.toLocaleString("us-US",{maximumFractionDigits:2})
    }

    if(amount < 1){
        return amount?.toLocaleString("de-DE",{maximumFractionDigits:5})
    }
    return amount?.toLocaleString("de-DE",{maximumFractionDigits:2})
}