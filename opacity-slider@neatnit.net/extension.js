const PopupMenu = imports.ui.popupMenu;
const WindowMenu = imports.ui.windowMenu;

let isEnabled = false;

// implement opacity slider that does the same thing as the scroll action:
// https://github.com/linuxmint/muffin/blob/e78b8335f3113c38b7611193ae55ff3e14820961/src/core/window.c#L8803-L8817
//
// namely:
// 1. set opacity
// 2. call meta_compositor_window_opacity_changed?????

function init(metadata) {
    global.logWarning("opacity slider: init")
    // install ourselves by diverting the WindowMenu internal function
    // hacky as hell!
    
//    const _buildMenuBase = WindowMenu.WindowMenu.prototype._buildMenu;
//    WindowMenu.WindowMenu.prototype._buildMenu = function(s, window) {
//        return _buildMenuBase(s, window);
//        if (/*isEnabled*/ false) {
//            const opacity = window.opacity;
//            let slider = new PopupMenu.PopupSliderMenuItem(opacity/255);
//            
//        }
//    }
}

function enable() {
    global.logWarning("opacity slider: enable")
    isEnabled = true;
}

function disable() {
    global.logWarning("opacity slider: disable")
    isEnabled = false;
}
