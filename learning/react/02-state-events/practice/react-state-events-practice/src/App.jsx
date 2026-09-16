import InteractiveProfile from "./mission/01-interactive-profile/InteractiveProfile";
import FormDashboard from "./mission/02-form-dashboard/FormDashboard";
import SkillManager from "./mission/03-skill-manager/SkillManager";
import Counter from "./practice/01-counter/Counter";
import Toggle from "./practice/02-toggle/Toggle";
import ControlledInput from "./practice/03-controlled-input/ControlledInput";
import SimpleForm from "./practice/04-simple-form/SimpleForm";
import ArrayState from "./practice/05-array-state/ArrayState";

function App() {
  return (
    <section>
      <Counter />
      <Toggle />
      <ControlledInput />
      <SimpleForm />
      <ArrayState />
      <InteractiveProfile />
      <FormDashboard />
      <SkillManager />
    </section>
  );
}

export default App;
