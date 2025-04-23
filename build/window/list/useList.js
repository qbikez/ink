import { useWindow } from "../useWindow.js";
export function useList(...args) {
    const list = useWindow(...args);
    return {
        listView: list.viewState,
        control: list.control,
        items: list.items,
        setItems: list.setItems,
    };
}
//# sourceMappingURL=useList.js.map