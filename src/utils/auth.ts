import Store from './storage';
import { TOKEN } from '../constants/keys'

export const store = new Store(TOKEN); 
export const token = store.retrieve();

export const signOut = (callBack: any) => {
    store.insert({}, callBack)
}
export default !!token.token;