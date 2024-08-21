
interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    loading: boolean;
}
  
const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    loading: true,
};
  
export default initialState;