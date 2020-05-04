import React, { Component } from 'react'
import classes from './Layout.module.css'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'
import { connect } from 'react-redux'

class Layout extends Component {

    state = {
        menuOpen: false
    }

    onToggle = ()=> {
        this.setState({ menuOpen: !this.state.menuOpen})
    }

    dropsHandlerClose = ()=> {
        this.setState({ menuOpen: false})
    }


    render() {
        return(
            <div className={classes.Layout}>
                <Drawer 
                isOpen={this.state.menuOpen}
                dropsHandlerClose = {this.dropsHandlerClose}
                isAuthenticated={this.props.isAuthenticated}
                />

                <MenuToggle 
                isOpen={this.state.menuOpen}
                onToggle={this.onToggle}
                />

                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}

export default connect(mapStateToProps)(Layout)