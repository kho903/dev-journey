import Profile from "./practice/01-jsx-component/Practice.jsx";
import PropsPractice from "./practice/02-props/Practice.jsx";
import ChildrenPractice from "./practice/03-children-composition/Practice.jsx";
import ArrayRenderingPractice from "./practice/04-array-rendering/Practice.jsx";
import ConditionalRenderingPractice from "./practice/05-conditional-rendering/Practice.jsx";

function App() {
  return (
    <section>
      <Profile />
      <PropsPractice />
      <ChildrenPractice />
      <ArrayRenderingPractice />
      <ConditionalRenderingPractice />
    </section>
  );
}

export default App;
