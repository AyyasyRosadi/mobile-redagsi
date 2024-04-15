export const currency = (number:number):string =>{
    return 'Rp ' + number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }