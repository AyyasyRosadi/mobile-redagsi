import React from "react"

export type TBase = {
    navigateTo? : string
    title? : string
    scroll? : boolean
    children? : React.ReactNode
}

export type TAlert = {
    show : boolean
    msg : any
    close? : (e:any) =>any
}

export type TMenu = {
    index : number
  }
  