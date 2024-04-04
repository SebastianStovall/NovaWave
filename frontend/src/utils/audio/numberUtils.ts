export function addCommasToNumber(number: number | undefined) {
    if(!number) return
    // Convert number to string
    let numStr = number.toString();

    // Split the string into parts separated by '.'
    let parts = numStr.split('.');

    // Add commas to the integer part
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Join the parts back together with '.' and return
    return parts.join('.');
}
