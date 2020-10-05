const styles = theme => ({
  divCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      '& button': {
        width: '100%',
        margin: 5
      }
    }
  },
  divSpace: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      '& button': {
        width: '100%',
        margin: 5
      }
    }
  },
  divRight: {
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      '& button': {
        width: '100%',
        margin: 5
      }
    }
  },

  divContactInline: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    width: '100%'
  },
  divInline: {
    display: 'flex',
    justifyContent: 'right',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    width: '50%'
  },
  iconButton: {
    display: 'flex',
    flexDirection: 'column',
    height: 300,
    width: 300,
    '& svg': {
      width: '50%',
      height: '50%',
      verticalAlign: 'middle'
    }
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  btnArea: {
    display: 'flex',
    justifyContent: 'space-around', // margin: `${theme.spacing(1)}px 0`,
    fontSize: 12,
    '& button': {
      margin: `0 ${theme.spacing(1)}px`
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      '& button': {
        width: '100%',
        margin: 5
      }
    }
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px 30px 20px',
    position: 'relative',
    fontSize: 20,
    fontWeight: 100,
    color: theme.palette.text.primary,
    textDecoration: 'none',
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(2)
    },
    '& img': {
      width: 30,
      marginRight: 10
    }
  },
  buttonLink: {
    background: 'none',
    padding: 0,
    textTransform: 'none',
    transition: 'color ease 0.3s',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '0.875rem',
    '&:hover': {
      background: 'none',
      color: theme.palette.secondary.main
    }
  },
  button: {
    background: theme.palette.primary.main,
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    color: 'white',
    height: 40,
    width: '15%',
    margin: theme.spacing(2),
    fontSize: '13px',
    padding: '0 30px',
    '&:hover': {
      background: theme.palette.secondary.main
    }
  },
  buttonAlgo: {
    background: theme.palette.primary.main,
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    color: 'white',
    height: 40,
    width: '45%',
    margin: theme.spacing(2),
    fontSize: '13px',
    padding: '0 30px',
    '&:hover': {
      background: theme.palette.secondary.main
    }
  },
  buttonWithoutWidth: {
    background: theme.palette.primary.main,
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    color: 'white',
    height: 40,
    marginTop: theme.spacing(2),
    fontSize: '13px',
    padding: '0 30px',
    '&:hover': {
      background: theme.palette.secondary.main
    }
  },
  buttonMenu: {
    height: 45,
    width: '20%',
    marginRight: theme.spacing(5),
    marginLeft: theme.spacing(5),
    padding: '0 30px'
  },
  buttonMenuSelected: {
    height: 45,
    width: '20%',
    marginRight: theme.spacing(5),
    marginLeft: theme.spacing(5),
    padding: '0 30px',
    color: theme.palette.primary.dark
  },
  subtitle: {
    fontSize: 14,
    marginTop: theme.spacing(4)
  },
  paper: {
    width: '80%',
    maxHeight: '80%'
  },
  circularProgress: {
    position: 'fixed',
    top: 'calc(50% - 75px)',
    left: 'calc(50% - 75px)'
  },
  iconRoot: {
    margin: '1%',
    fontSize: '100%'
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  searchBox: {
    font: 'inherit',
    display: 'block',
    verticalAlign: 'middle',
    whiteSpace: 'normal',
    margin: 0, // Reset for Safari
    color: 'inherit',
    '& > div': {
      border: 'none',
      '&:after': {
        display: 'none'
      }
    },
    '& input': {
      border: '1px solid ' + theme.palette.grey[200],
      borderRadius: '20px',
      transition: theme.transitions.create('width'),
      padding: 10,
      color: theme.palette.text.secondary,
      height: 20,
      width: 100,
      background: theme.palette.grey[200],
      '&:focus': {
        width: 250,
        textIndent: 0,
        outline: 0
      }
    }
  },
  paperColor: {
    backgroundColor: '#FAFAFA'
  },
  formControlAlgo: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  toolbarBtn: {
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
  large: {
    alignItems: 'center',
    textAlign: 'center',
    margin: '0 auto',
    width: theme.spacing(20),
    height: theme.spacing(20),
    boxShadow: theme.glow.light
  },
  btnCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  root: {
    flexGrow: 1,
    marginBottom: '10px'
  }
});
export default styles;
