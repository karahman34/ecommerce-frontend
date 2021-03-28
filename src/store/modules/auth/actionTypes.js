import { mergeActionModuleName } from "helpers/storeHelper"

export const moduleName = 'auth'

export const SET_USER = mergeActionModuleName(moduleName, 'SET_USER')
export const SET_LOGGED_IN = mergeActionModuleName(moduleName, 'SET_LOGGED_IN')