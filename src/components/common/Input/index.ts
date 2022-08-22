// import Checkbox from "./Checkbox"
import Input from "./Input";
import Select from "./Select";
// import Textarea from "./Textarea"

export default Object.assign<typeof Input, { Select: typeof Select }>(Input, { Select });
