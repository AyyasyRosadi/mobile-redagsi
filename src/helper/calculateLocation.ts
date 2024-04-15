
function convertToRadian(radian: number) {
    return radian * (Math.PI / 180)
}

function convertLatLongToKilometer(langitude: number, longitude: number, pos_langitude: number, pos_longitude: number): Promise<number> {
    return new Promise((res, _) => {
        const R = 6371;
        const diameterLangitude = convertToRadian(pos_langitude - langitude)
        const diameterLongitude = convertToRadian(pos_longitude - longitude)
        const x1 = Math.sin(diameterLangitude / 2) * Math.sin(diameterLangitude / 2) + Math.cos(convertToRadian(langitude)) * Math.cos(convertToRadian(pos_langitude)) * Math.sin(diameterLongitude / 2) * Math.sin(diameterLongitude / 2)
        const x2 = 2 * Math.atan2(Math.sqrt(x1), Math.sqrt(1 - x1))
        res(R * x2)
    })

}


export default convertLatLongToKilometer