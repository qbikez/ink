import { spawnSync } from "child_process";
const State = {
    ShouldPreserveScreen: false,
};
export function saveScreenState() {
    spawnSync("tput", ["smcup"], { stdio: "inherit" });
}
export function restoreScreenState() {
    spawnSync("tput", ["rmcup"], { stdio: "inherit" });
}
export function preserveScreen() {
    State.ShouldPreserveScreen = true;
    const onExit = (exitStatus) => {
        if (exitStatus !== 0)
            return;
        restoreScreenState();
    };
    saveScreenState();
    process.on("exit", onExit);
}
export default {
    State,
    saveScreenState,
    restoreScreenState,
    preserveScreen,
};
//# sourceMappingURL=PreserveScreen.js.map