class CalculateLocation{

    private convertToRadian(radian:number){
        return radian * (Math.PI/180)
    }

    public convertLatLongToKm(lat:number, lon:number, pos_lat:number, pos_lon:number):Promise<number>{
        return new Promise((res, _)=>{
            const R = 6371;
            const dLat = this.convertToRadian(pos_lat-lat)
            const dLon = this.convertToRadian(pos_lon-lon)
            const x1 = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(this.convertToRadian(lat)) * Math.cos(this.convertToRadian(pos_lat)) * Math.sin(dLon/2) * Math.sin(dLon/2)
            const x2 = 2 * Math.atan2(Math.sqrt(x1), Math.sqrt(1-x1))
            res(R * x2)
        })
        
    }

}

export default new CalculateLocation