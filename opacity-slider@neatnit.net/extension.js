const PopupMenu = imports.ui.popupMenu;
const WindowMenu = imports.ui.windowMenu;

let isEnabled = false;
let _buildMenuBase, my_buildMenu;

// implement opacity slider that does the same thing as the scroll action:
// https://github.com/linuxmint/muffin/blob/e78b8335f3113c38b7611193ae55ff3e14820961/src/core/window.c#L8803-L8817
//
// namely:
// 1. set opacity
// 2. call meta_compositor_window_opacity_changed?????


function addSlider(to_menu, value, callback) {
    // variant of WindowMenu.prototype.addAction, but that adds a slider instead of a MnemonicLeftOrnamentedMenuItem
    let menuItem = new PopupMenu.PopupSliderMenuItem(value);
    to_menu.addMenuItem(menuItem);
    
    menuItem.connect('value-changed', (o, v) => callback(v) ); // callback receives value as argument
    
    // this._items.push(menuItem); // this is used for mnemonics, to uncomment this line you must extend PopupSliderMenuItem and implement stuff
    
    return menuItem;
}

function init(metadata) {
    // install ourselves by diverting the WindowMenu internal function
    // hacky as hell!
    
    global.log("opacity-slider@neatnit.net: overriding WindowMenu.prototype._buildMenu!")
    _buildMenuBase = WindowMenu.WindowMenu.prototype._buildMenu;
    WindowMenu.WindowMenu.prototype._buildMenu = function(window, ...args) {
        // Creating a right-click menu
        
        // Create default menu
        let retval = _buildMenuBase.call(this, window, ...args);
        
        // If we're enabled, create our extra slider 
        if (isEnabled) {
            this.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());
            
            let opacity_sub = new MnemonicSubMenuMenuItem(_("O_pacity"));
            this.addMenuItem(opacity_sub);
            this._items.push(opacity_sub);
            
            let slider = addSlider.call(this, opacity_sub, window.get_opacity()/255, (value) => {                
                // convert the value range (0 to 1) to an acceptable opacity
                const opacity_max = 255;
                const opacity_min = 30;
                
                const opacity = Math.round( (value * (opacity_max-opacity_min) ) + opacity_min );
                
                window.set_opacity(opacity);
            } );

            
        }
        
        return retval
    }
    
    my_buildMenu = WindowMenu.WindowMenu.prototype._buildMenu;
}

function enable() {
    isEnabled = true;
}

function disable() {
    global.logWarning("opacity slider: disable")
    isEnabled = false;
    
    
}
