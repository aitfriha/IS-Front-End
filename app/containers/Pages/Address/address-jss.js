const styles = theme => ({
  leafletContainer:{
    height: '400px',
    width: '100%'
  },
  container: {
    transition: 'width 2s'
  },
  btnEnd: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  divDisplay: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    verticalAlign: 'middle'
  },
  endAdornment: {
    padding: '0px!important'
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  dateContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    verticalAlign: 'middle',
    '& :first-child': {
      marginRight: theme.spacing(2)
    }
  },
  btn: {
    marginTop: theme.spacing(2),
    alignItem: 'center',
    textAlign: 'center'

  }
});

export default styles;
