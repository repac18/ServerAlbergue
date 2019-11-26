import React           from 'react';
import IconButton      from '@material-ui/core/IconButton';
import Drawer          from '@material-ui/core/Drawer';
import MenuItems       from '../menu';
import {makeStyles}    from '@material-ui/core';
import clsx            from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Toolbar         from '@material-ui/core/Toolbar';
import MenuIcon        from '@material-ui/core/SvgIcon/SvgIcon';
import Typography      from '@material-ui/core/Typography';
import CerrarSesion    from './CerrarSesion';
import {AppBar as appbar}          from '@material-ui/core/AppBar';

export default class AppBar {
  constructor () {
    this.drawerWidth = 180;
    this.useStyles   = makeStyles (theme => ({
      root:             {
        display: 'flex'
      },
      toolbar:          {
        paddingRight: 22
      },
      toolbarIcon:      {
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'flex-end',
        padding:        '0 8px',
        ...theme.mixins.toolbar
      },
      appBar:           {
        zIndex:     theme.zIndex.drawer + 1,
        transition: theme.transitions.create ([
                                                'width',
                                                'margin'
                                              ], {
                                                easing:   theme.transitions.easing.sharp,
                                                duration: theme.transitions.duration.leavingScreen
                                              })
      },
      appBarShift:      {
        marginLeft: this.drawerWidth,
        width:      `calc(100% - ${ this.drawerWidth }px)`,
        transition: theme.transitions.create ([
                                                'width',
                                                'margin'
                                              ], {
                                                easing:   theme.transitions.easing.sharp,
                                                duration: theme.transitions.duration.enteringScreen
                                              })
      },
      menuButton:       {
        marginRight: 36
      },
      menuButtonHidden: {
        display: 'none'
      },
      title:            {
        flexGrow: 1
      },
      drawerPaper:      {
        position:   'relative',
        whiteSpace: 'nowrap',
        width:      this.drawerWidth,
        transition: theme.transitions.create ('width', {
          easing:   theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen
        })
      },
      drawerPaperClose: {
        overflowX:                     'hidden',
        transition:                    theme.transitions.create ('width', {
          easing:   theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }),
        width:                         theme.spacing (4),
        [theme.breakpoints.up ('sm')]: {
          width: theme.spacing (6)
        }
      },
      appBarSpacer:     theme.mixins.toolbar,
      content:          {
        flexGrow: 1,
        height:   '100vh',
        overflow: 'auto'
      },
      container:        {
        paddingTop:    theme.spacing (4),
        paddingBottom: theme.spacing (4)
      },
      paper:            {
        padding:       theme.spacing (2),
        display:       'flex',
        overflow:      'auto',
        flexDirection: 'column'
      },
      fixedHeight:      {
        height: 200
      }
    }));
  }
  
  Drawer (obtenerUsuario, menu, Access, refetch,login=true, visible = true) {
    const classes           = this.useStyles ();
    const [open, setOpen]   = React.useState (true);
    const handleDrawerClose = () => {
      setOpen (false);
    };
    return visible ? (
       <Drawer
          variant="permanent"
          classes={ {
            paper: clsx (classes.drawerPaper,
                         !open && classes.drawerPaperClose)
          } }
          open={ open }
       >
         <div className={ classes.toolbarIcon }>
           <IconButton onClick={ handleDrawerClose }>
             <ChevronLeftIcon/>
           </IconButton>
         </div>
         { (obtenerUsuario) && (
            < MenuItems Menus={ menu } Access={ Access } login={ login } refetch={ refetch }/>
         ) }
       </Drawer>
    ) : <div></div>;
  }
  
  Appbar(obtenerUsuario){
    const classes           = this.useStyles ();
    const [open, setOpen]   = React.useState (true);
    const handleDrawerOpen  = () => {
      setOpen (true);
    };
    return(
       <appbar position="absolute" className={ clsx (classes.appBar, open &&
          classes.appBarShift) }>
         <Toolbar className={ classes.toolbar }>
           <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={ handleDrawerOpen }
              className={ clsx (classes.menuButton,
                                open && classes.menuButtonHidden) }
           >
             <MenuIcon/>
           </IconButton>
           <Typography component="h2" variant="h6" color="inherit" noWrap
                       className={ classes.title }>
             ALBERGUE COATEPEQUE
           </Typography>
           { (obtenerUsuario) && (
              <CerrarSesion/>
           )}
         </Toolbar>
       </appbar>
    );
  }
  
}

export {AppBar};