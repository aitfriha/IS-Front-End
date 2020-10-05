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
    },
    margin: theme.spacing(2),
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    height: '60px'
  },
  assignmentContent: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      '& button': {
        width: '100%',
        margin: 5
      }
    },
    margin: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)'
  },
  assignDiv: {
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      '& button': {
        width: '100%',
        margin: 5
      }
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(3),
    marginTop: theme.spacing(3),
    boxShadow: '0 1px 2px 2px rgba(207, 0, 15, 1)',
    height: '40px',
    borderBottom: '2px solid #fff'
  },
  assignDivNone: {
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      '& button': {
        width: '100%',
        margin: 5
      }
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(3),
    height: '40px',
    borderBottom: '2px solid red'
  },
  assignDivCollapse: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  divHeader: {
    display: 'block',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      '& button': {
        width: '100%',
        margin: 5
      }
    },
    margin: theme.spacing(2),
    paddingTop: theme.spacing(2)
  },
  divLeft: {
    display: 'flex',
    justifyContent: 'flex-start',
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
    },
    margin: theme.spacing(2)
  },
  divRight: {
    float: 'right',
    '&:hover': {
      color: theme.palette.secondary.main,
      cursor: 'pointer'
    }
  },
  divAssignCenter: {
    display: 'inline-block',
    margin: '0 auto',
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
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
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
    position: 'relative',
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: 100,
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
    textTransform: 'capitalize',
    transition: 'color ease 0.3s',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '0.875rem',
    '&:hover': {
      background: 'none',
      color: theme.palette.primary.main
    }
  },
  tableContent: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5)
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
  root: {
    minWidth: 100,
    margin: 12,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 12,
  },
  medium: {
    alignItems: 'center',
    textAlign: 'center',
    margin: '0 auto',
    width: theme.spacing(10),
    height: theme.spacing(10),
    boxShadow: theme.glow.light
  },

  dropZone: {
    height: '300px',
    marginTop: 12,
    borderRadius: '5px',
    border: '1px solid red',
    backgroundColor: theme.palette.secondary.main
  },
  btnHover: {
    '& :hover': {
      backgroundColor: theme.palette.secondary.main
    }
  }

});

export default styles;
