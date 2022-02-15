
export const formatComma = (amount:number,lang: string):string  => {
    const commaFormatLangs = ["fr","de"];
    if(!commaFormatLangs.includes(lang)){
        return amount?.toLocaleString("us-US",{maximumFractionDigits:2})
    }
    return amount?.toLocaleString("de-DE",{maximumFractionDigits:2})
}