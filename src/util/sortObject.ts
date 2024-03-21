export const sortObject = (obj: any) => {

    const sorted: any = {}
    const string = []
    let key
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            string.push(encodeURIComponent(key))
        }
    }
    string.sort()
    for (key = 0; key < string.length; key++) {
        sorted[string[key]] = encodeURIComponent(obj[string[key]]).replace(/ /g, '+')
    }
    return sorted
}
