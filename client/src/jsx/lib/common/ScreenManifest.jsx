export default class ScreenManifest {
    constructor(raw_manifest) {
        this.raw_data = raw_manifest;
        this.idx_by_id = {};
        this.raw_data.screens.forEach((item, idx) => {
            this.idx_by_id[item.id] = idx;
        });
    }

    getScreenDataById(id, is_default=false) {
        const result = this.raw_data.screens[this.idx_by_id[id]];
        if (!result) {
            if (is_default) {
                return this.raw_data.screens[0];
            }
            return this.getDefaultScreenData();
        }
        return result;
    }
    getDefaultScreenData() {
        return this.getScreenDataById(this.raw_data["default"], true);
    }
}
