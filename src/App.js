import Home from "./Container/home";
import { Provider } from "react-redux";
import { store } from "./Store/store";


function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
