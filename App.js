import { Provider } from "react-redux";
import Homepage from "./pages/Homepage";
import finalStore from "./redux/store/store";

export default function App() {
  return (
    <Provider store={finalStore}>
      <Homepage />
    </Provider>
  );
}
