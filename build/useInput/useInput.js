import { DefaultStdin } from "../stdin/Stdin.js";
import { useListener } from "../useListener/useListener.js";
import Keyboard from "../stdin/Keyboard.js";
const Emitter = DefaultStdin.Keyboard.getEmitter();
export function useInput(cb, opts = { isActive: true }) {
    opts = { isActive: true, inputType: "char", ...opts };
    const wrapper = (char, state) => {
        if (!opts.isActive)
            return;
        const input = state.ctrlKeys || (opts.inputType === "char" ? char : state.chars) || "";
        cb(input, state.specialKeys);
    };
    useListener(Emitter, Keyboard.InputRecieved, wrapper);
}
//# sourceMappingURL=useInput.js.map