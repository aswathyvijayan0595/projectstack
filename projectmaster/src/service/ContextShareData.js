import React, { createContext, useState } from 'react'
export const appUpdateContext=createContext()
export const editUpdateContext =createContext()

function ContextShareData({children}) {
    const [appUpdate,setAppUpdate]=useState([])
    const [editUpdate,setEditUpdate]=useState([])

  return (
  <>
  <appUpdateContext.Provider value={{appUpdate,setAppUpdate}}>
    <editUpdateContext.Provider value={{editUpdate,setEditUpdate}}>{children}</editUpdateContext.Provider>
  </appUpdateContext.Provider>
  </>
  )
}

export default ContextShareData