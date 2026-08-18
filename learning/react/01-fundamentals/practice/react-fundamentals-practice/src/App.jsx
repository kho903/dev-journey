import Profile from "./practice/01-jsx-component/Practice.jsx";
import PropsPractice from "./practice/02-props/Practice.jsx";
import ChildrenPractice from "./practice/03-children-composition/Practice.jsx";
import ArrayRenderingPractice from "./practice/04-array-rendering/Practice.jsx";
import ConditionalRenderingPractice from "./practice/05-conditional-rendering/Practice.jsx";
import DeveloperProfileMission from "./mission/01-developer-profile-cards/Mission.jsx";
import ReusableDashboardMission from "./mission/02-reusable-dashboard/Mission.jsx";
import TeamDirectoryMission from "./mission/03-team-directory/Mission.jsx";

function App() {
  return (
    <section>
      <Profile />
      <PropsPractice />
      <ChildrenPractice />
      <ArrayRenderingPractice />
      <ConditionalRenderingPractice />
      <DeveloperProfileMission />
      <ReusableDashboardMission />
      <TeamDirectoryMission />
    </section>
  );
}

export default App;
