import React from 'react';
import './Navbar.css';



class Navbar extends React.Component {

    render() {
        return (
            <div id={'menu-wrapper-id'} className={'menu-wrapper ' + this.getClassNameWithSuffix('menu-wrapper')}
                 onClick={(e) => this.onBackGroundClick(e.target.id)}>
                <div className={'menu-white menu-white-opening-heb'}>
                    <div className={'menu-logo'}></div>
                    { this.getMenuItems() }
                </div>
            </div>
        );
    }

    onBackGroundClick(targetId) {
        if (targetId == 'menu-wrapper-id') {
            this.props.onClose();
        }
    }

    getClassNameWithSuffix(className) {
        if (this.props.menuStatus == 1) {
            return className + '-opening';
        }
        if (this.props.menuStatus == 3) {
            return className + '-closing';
        }
    }

    getMenuItems() {
        return this.props.options.map(item => this.getMenuItem(item));
    }

    getMenuItem(item) {
        if(item=='' ) return
        if (item.link != null) {
          
                return (
                    <a href={item.link} key={'menu-item-' + item.name}  style={{textDecoration:'none'}}>
                        { this.getItemDiv(item) }
                    </a>
                );
            
        }
        
        return (
            <div key={'menu-item-' + item.name}>
                { this.getItemDiv(item) }
            </div>
        );
    }

    getItemDiv(item) {
        return (
            <div className={'menu-item'} onClick={() => this.onItemClick(item)}>{ item.name }</div>
        );
    }
   

    onItemClick(item) {
        if (item.onClick != null) {
            item.onClick();
        }
       
    }
}

export default Navbar;
