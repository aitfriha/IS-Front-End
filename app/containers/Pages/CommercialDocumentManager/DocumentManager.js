import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarBorder from '@material-ui/icons/StarBorder';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuIcons from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Modal from '@material-ui/core/Modal';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import DescriptionIcon from '@material-ui/icons/Description';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Chip from '@material-ui/core/Chip';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// import Lightbox from 'react-lightbox-component';
import ImgsViewer from 'react-images';

// import {Lightbox} from 'react-lightbox-component';
// import Lightbox from 'react-image-lightbox';
// import Lightbox from 'react-image-lightbox/style.css';

import {
  MuiPickersUtilsProvider,
  DatePicker
} from 'material-ui-pickers';
import 'moment/locale/es';
import MomentUtils from '@date-io/moment';
import Fade from '@material-ui/core/Fade';
import MenuList from '@material-ui/core/MenuList';
import {
  Notifications, Security, Public, PersonAdd, Group, FolderSpecial, MailOutline, VerifiedUser, ExpandLess, PermIdentity, Block, Done, FindInPage, ExpandMore, Edit, Theaters, AssignmentTurnedIn, HighlightOff, Visibility, NoteAdd, RestorePage, Refresh, Storage, GroupAdd, Create, Reply, MoreVert, PlaylistAdd, Comment, Close, AccountBalanceWallet, LockOpen, Undo, DeleteForever, Lock, Note, Receipt, Image, Audiotrack, Movie, InsertComment, MoveToInbox, LocalOffer, Add, Archive, Publish, PictureAsPdf, GetApp, Delete, Info, MoreHoriz, Share, HomeIcon, ViewList, Dehaze, Toc, AssignmentInd, Restore, Grade, Folder, FolderOpen, FolderShared, History, HourglassEmpty, Search, PermMedia, Favorite, LibraryBooks, Assignment, DeleteSweep, Dvr
} from '@material-ui/icons';

import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Confirmacion } from './Confirmacion';
import { CreateDocumentDialog } from './CreateDocumentDialog';
import Loading from '../../../components/Loading/index';
import notification from '../../../components/Notification/Notification';

// / tabla actividad
const columns = [
  {
    id: 'id', label: 'Id', minWidth: 50, display: false
  },
  {
    id: 'author', label: 'Autor', minWidth: 170, display: true
  },
  {
    id: 'text',
    label: 'Texto',
    minWidth: 100,
    display: true
  },
  {
    id: 'author',
    label: 'Autor',
    minWidth: 100,
    display: true
  },
  {
    id: 'creationdDate',
    label: 'Creación',
    minWidth: 100,
    display: true
  },
  {
    id: 'modificationDate',
    label: 'Modificación',
    minWidth: 100,
    display: false
  }
];

const inputProps = {
  step: 300,
};

const drawerWidth = 450;

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 5 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {

  },
  grow: {
    flexGrow: 1,
  },
  /* menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }, */
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing.unit * 0.5,
    width: 20,
    height: 20,
  },
  container: {
    // display: 'flex',
  },
  paper: {
    margin: theme.spacing.unit,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    /*   height: 'calc(100% - 150)',
      top: 150 */
  },
  iconspequennos: {
    marginLeft: '6px',
    marginRight: '6px',
    fontSize: '16px'
  },
  metadatadetailprimero: {
    display: 'flex',
    alignItems: 'center',
    // marginTop: '5px',
    fontSize: '13px',
    marginTop: '15px',
    color: '#FF0000'// '#039BE5'
  },
  metadatadetail: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '8px',
    fontSize: '13px',
    color: '#FF0000'// '#039BE5'
  },
  metadatacontributorprimero: {
    display: 'flex',
    alignItems: 'center',
    // marginTop: '5px',
    fontSize: '13px',
    // color: 'disabled',
    marginTop: '20px',
    marginLeft: '15px',
    color: '#FF0000'// '#039BE5'
  },
  metadatacontributor: {
    display: 'flex',
    alignItems: 'center',
    // marginTop: '5px',
    fontSize: '13px',
    marginTop: '8px',
    marginLeft: '15px',
    color: '#FF0000'// '#039BE5'
  },
  textspacenego: {
    marginLeft: '5px',
    color: '#000000'
  },
  tabs: {
    borderTop: '2px solid #FF0000', // #039BE5',
    borderRadius: '0px',
    marginTop: '25px'
  },
  tab: {
    borderRadius: '0px',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  avatar: {
    backgroundColor: '#FF0000'// '#039BE5'
  },
  avatarinactivo: {
    backgroundColor: '#dddddd',
  },
  small: {
    backgroundColor: '#FF0000', // '#039BE5'
    width: theme.spacing.unit * 3,
    height: theme.spacing.unit * 3,
  },
  card: {
    maxWidth: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  chip: {
    margin: theme.spacing.unit,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  input: {
    height: '41px'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 270,
    maxWidth: 270,
  },
  tbody: {
    height: '200px',
    overflow: 'auto',
    /*  overflowy: 'auto',
     overflowx: 'auto', */
  }

});

const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const options = [
  { icon: 'Star', action: 'Favoritos', hidden: false },
  { icon: 'Info', action: 'Detalles', hidden: false },
  { icon: 'FileCopy', action: 'Copiar', hidden: false },
  { icon: 'Delete', action: 'Eliminar', hidden: false },
  { icon: 'GetApp', action: 'Descargar', hidden: false },
];

const listiconos = [{ icon: 'Folder', tipo: 'Folder' },
  { icon: 'AssignmentInd', tipo: 'Otros' }];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, that) {
  return {
    fontWeight:
      that.state.name.indexOf(name) === -1
        ? that.props.theme.typography.fontWeightRegular
        : that.props.theme.typography.fontWeightMedium,
  };
}

let rows = [];
const headCells = [
  {
    id: 'tipo', numeric: false, disablePadding: true, label: 'Tipo', hidden: true
  },
  {
    id: 'name', numeric: false, disablePadding: false, label: 'Nombre', hidden: false
  },
  {
    id: 'tamanno', numeric: false, disablePadding: false, label: 'Tamaño', hidden: false
  },
  {
    id: 'modificado', numeric: false, disablePadding: false, label: 'Modificado', hidden: false
  }
];
const seleccionados = [];
let self;
const openmenuactions = false;
const anchor = null;
let conexion = 0;
let loadData = [];
let listaresultado = [];
let permisosdoc = {};
const historial = [];
const i = 0;
let seleccionado = {};

const dominio = '/commercial-document-manager';
const nombredominio = 'commercial-document-manager';
let workspace = '/UserWorkspaces/';
if (nombredominio != 'default-domain') {
  workspace = '/workspaces/';
}

// Parameters to connect to Nuxeo
const usercheq = 'Administrator';
const passcheq = 'Administrator';
const urlnuxeo = 'http://localhost:8180/nuxeo/';


let logedUser = localStorage.getItem('logedUser');
logedUser = JSON.parse(logedUser);
let administrador = logedUser.userRoles.map(role => role.roleName === 'ADMIN')[0];
const user = logedUser.userEmail;
let emailempresa = logedUser.userEmail;
const pass = logedUser.userEmail;

let grupos = [];

const Nuxeo = require('nuxeo');
const path = require('path');
const fs = require('fs');


let nuxeo = new Nuxeo({
  baseURL: urlnuxeo,
  auth: {
    method: 'basic',
    username: usercheq,
    password: usercheq
  }
});

class DocumentManager extends React.Component {
  constructor(props) {
    super(props);
    self = this;
    this.state = {
      anchorEl: null,
      openmenu: false,
      anchoraddEl: null,
      openpanel: false,
      openaddmenu: false,
      path: dominio + workspace + user + '/',
      textbuscar: '',
      tabactivo: 0,
      conexion: 0,
      showBackdrop: true,
      titulotoolbar: 'Archivo',
      iconvacio: 'Archivo',
      visualizacion: {
        mostrarimg: false,
        images: [],
      },
      notificacion: {
        variante: '',
        mensaje: ''
      },
      confirmacion: {
        open: false,
        enunciado: 'Confirmar Eliminación',
        texto: '',
      },
      ventadicionar: {
        opencrear: false,
        tipo: '',
        type: '',
        enunciado: '',
        mimeType: '',
        error: false,
        errorMessage: '',
        denom: '',
        descrip: '',
        id: '',
      },
      tabla: {
        order: 'asc',
        orderBy: 'name',
        selected: [],
        numSelected: 0,
        rowCount: 0,
      },
      menu: {
        menuselect: 'Archivo',
        hidebtnprincipales: false,
        btnupload: false,
        marginLeft: '20%',
      },
      acciones: {
        papelera: false,
        fav: false,
        unfav: false,
        bloq: false,
        edit: false,
        crear: true,
        unbloq: false,
        etiq: false,
        coment: false,
        detall: false,
        mover: false,
        eliminar: false,
        elimperm: false,
        elimadmin: false,
        elimgroup: false,
        gestusergroup: false,
        dowload: false,
        share: false,
        upload: true,
        version: false,
        menuvisible: false,
        permisos: false,
        comentar: false
      },
      comentario: {
        btncomentdisable: true,
        insertcomentvalue: '',
        totalcoment: 0,
        listcoments: [],
        idactualizar: '',
        addcomentbtn: true,
        btnlistartodos: false,
        textbtnlistartodos: 'Mostrar todos los comentarios',
      },
      versiones: {
        listversiones: [],
        totalversiones: 0,
        btnlisttodasvers: false,
        textverbtntodos: 'Mostrar todas las versiones',
      },
      historial: {
        listactividad: [],
        totalactividad: 0,
        btnlisttodasact: false,
        textactbtntodos: 'Mostrar todas las acciones',
      },
      mover: {
        btnclearmover: false,
        btnaceptarmovimiento: false,
        nosubcarpeta: false,
        pathmovorigen: [],
      },
      etiquetar: {
        btnetiquetardisable: true,
        insertetiqueta: '',
        totaletiquetas: 0,
        listetiquetas: [],
        addetiquetabtn: true,
        deletedisable: true,
      },
      antecesor: {
        mostrarbtnatras: false,
        pathantecesor: '',
        iconvacioantecesor: '',
        listpath: [{
          iconvacioantecesor: 'Archivo', path: dominio + workspace + user + '/', vinculo: false, denom: 'Archivo'
        }],
      },
      compartir: {
        todosusuariosshare: [],
        listusuarios: [],
        usuariosshare: '',
        usuarioemail: '',
        btnsharedisable: true,
        totalusuarios: 0,
        deletesharedisable: true,
        btnlistartodos: false,
        textbtnlistartodos: 'Mostrar todos los usuarios',
        companchorEl: null,
        openlist: false,
        permisoescritrura: false,
        permisotodos: false,
        duracionhasta: null,
        notificar: 'none',
        comentario: '',
        direcemail: null,
        errordirecmail: null,
        fechadisable: 'none',
        visible: 'none',
      },
      permisos: {
        panel1expand: true,
        panel2expand: false,
        panel3expand: false,
        listuserexternos: [],
        listcompartidos: [],
        listheredados: [],
        usuariospermisos: '',
        btnpermisosdisable: true,
        totalusuariospermisos: 0,
        deletepermisosdisable: true,
        companchorEl: null,
        openlist: false,
        permisoescritrura: false,
        permisotodos: false,
        duracionhasta: null,
        notificar: 'none',
        comentario: '',
        direcemail: null,
        errordirecmail: null,
        fechadisable: 'none',

      },
      publicar: {
        listseciones: [],
        listpublicados: [],
        name: [],
        btnpublicardisable: true,
        deletepublicardisable: true,
      },
      subscripcion: {
        expandir: false,
        notifcomment: false,
        notifmodificar: false,
        notifsubscripcion: false,
      },
      expiracion: {
        fechaexpiracion: null,
        expriracionvisible: true,
        fechamin: moment().add(1, 'day'),
      },
      usersygroups: {
        listusersygrups: [],
      },
      busqueda: {
        combotipo: '',
        comboestado: '',
        fechadesde: null,
        fechahasta: null,
        disablefechas: true,
        denombuscar: '',
        descripbuscar: '',
        tamanno: '',
        contribuyentes: '',
        // etiquetas: '',
        ejecutobuscar: '',
        users: [],
        etiquetas: [],
        btnbuscar: true,
        sql: '',
      },
      grupos: {
        usuarios: [],
        listusuarios: [],
        usuariosselect: '',
        btnsagregardisable: true,
        totalusuarios: 0,
        deleteuserdisable: true,
        btnlistartodos: false,
        textbtnlistartodos: 'Mostrar todos los usuarios',
        companchorEl: null,
        openlist: false,
        visible: 'none',
      },
      onlyoffice: {
        showwindows: false,
        doc: null
      }
    };
  }

  componentDidMount() {
    this.setState({
      onlyoffice: {
        showwindows: false,
        doc: null
      }
    });
    loadData = [];
    rows = [];
    // comments = [];
    this.conectarServer();
  }

  // / Mensaje de Confirmación eliminar grupos ///
  handleCloseConfirmacion = () => {
    const estado = this.state;
    estado.confirmacion.open = false;
    this.setState({
      estado
    });
  }

  // / Eliminar Grupos //

  handleYesConfirmDelete = () => {
    const estado = this.state;
    estado.showBackdrop = true;
    estado.confirmacion.open = false;
    this.setState({
      estado
    });
    this.handlerecursiveDeleteGroup(this.state.tabla.selected, 1, this.state.tabla.selected.length);
  }

  handlerecursiveDeleteGroup(lista, cont, longt) {
    let msg = 'El grupo ' + lista[0] + ' fue eliminado satisfactoriamente';
    nuxeo.groups()
      .delete(lista[0]).then((res) => {
        if (longt > cont) {
          const newList = lista.splice(0, 1);
          cont += 1;
          self.handlerecursiveDeleteGroup(lista, cont, longt);
        } else {
          if (longt > 1) {
            msg = 'Los grupos fueron eliminados satisfactoriamente';
          }
          self.setState({
            showBackdrop: false,
          });
          notification('success', msg);
          self.listarArchivos('path', 'Grupos');
        }
      });
  }

  // Expandir el acordion////
  handleChangeExpandir = (panel) => {
    const estado = this.state;
    if (panel === 'panel1') {
      estado.permisos.panel1expand = !this.state.permisos.panel1expand;
      estado.permisos.panel2expand = false;
      estado.permisos.panel3expand = false;
    }
    if (panel === 'panel2') {
      estado.permisos.panel1expand = false;
      estado.permisos.panel2expand = !this.state.permisos.panel2expand;
      estado.permisos.panel3expand = false;
    }
    if (panel === 'panel3') {
      estado.permisos.panel1expand = false;
      estado.permisos.panel2expand = false;
      estado.permisos.panel3expand = !this.state.permisos.panel3expand;
    }
    this.setState({
      estado
    });
  };


  // Buscar x titulo y etiquetas de cada archivo.
  handleBuscar = (event) => {
    if (event.target.value.length >= 3) {
      const estado = this.state;
      estado.textbuscar = event.target.value;
      estado.showBackdrop = true;
      this.setState({
        estado
      });
      const cont = 0;
      loadData = [];
      switch (this.state.iconvacio) {
        case 'Grupos': {
          nuxeo.operation('UserGroup.Suggestion')
            // .input('/')
            .params({
              searchType: 'GROUP_TYPE',
              searchTerm: this.state.textbuscar
            })
            .execute()
            .then((res) => {
              if (res.length > 0) {
                listaresultado = res;
                self.DevolverListaGruposFormateada(res);
              } else {
                self.cambiarEstadoVacio(loadData);
              }
            });
          break;
        }
        case 'Espacio de Grupo de Trabajo': {
          self.ejecutarQueryRepo("SELECT * FROM Section WHERE (dc:title ILIKE '%" + this.state.textbuscar + "%' OR ecm:tag ILIKE '%" + this.state.textbuscar + "%') AND ecm:isTrashed = 0 AND ecm:isProxy = 0 AND ecm:isVersion = 0 AND ecm:path STARTSWITH '" + dominio + '/Sections/', 2000000).then((docs) => {
            if (docs.length > 0) {
              listaresultado = docs;
              self.DevolverListaFormateada(docs, cont, docs.length, 'Espacio de Grupo de Trabajo');
            } else {
              self.cambiarEstadoVacio(loadData);
            }
          });
          break;
        }
        case 'Recientes': {
          self.ejecutarQueryRepo("SELECT * FROM File, Folder WHERE ecm:primaryType IN ('File', 'Folder', 'Note', 'Section') AND (dc:title ILIKE '%" + this.state.textbuscar + "%' OR ecm:tag ILIKE '%" + this.state.textbuscar + "%') AND ecm:isTrashed = 0 AND ecm:isProxy = 0 AND ecm:isVersion = 0 AND ecm:path STARTSWITH '" + dominio + workspace + "' ORDER BY dc:modified DESC", 5).then((docs) => {
            if (docs.length > 0) {
              listaresultado = docs;
              self.DevolverListaFormateada(docs, cont, docs.length, 'Recientes');
            } else {
              self.cambiarEstadoVacio(loadData);
            }
          });
          break;
        }
        case 'Expirados': {
          self.ejecutarQueryRepo("SELECT * FROM File, Folder WHERE ecm:primaryType IN ('File', 'Folder', 'Note') AND ecm:isTrashed = 0 AND ecm:isProxy = 0 AND ecm:isVersion = 0 AND dc:expired IS NOT NULL AND dc:expired <= DATE '" + moment(moment()).format('YYYY-MM-DD') + "' AND (dc:title ILIKE '%" + this.state.textbuscar + "%' OR ecm:tag ILIKE '%" + this.state.textbuscar + "%') AND ecm:path STARTSWITH '" + dominio + workspace + "'", 2000000).then((docs) => {
            if (docs.length > 0) {
              self.DevolverListaFormateada(docs, cont, docs.length, 'Expirados');
            } else {
              self.cambiarEstadoVacio(loadData);
            }
          });
          break;
        }
        case 'Favoritos': {
          self.ejecutarQueryRepo("SELECT * FROM File, Folder WHERE ecm:primaryType IN ('File', 'Folder', 'Note') AND (dc:title ILIKE '%" + this.state.textbuscar + "%' OR ecm:tag ILIKE '%" + this.state.textbuscar + "%') AND ecm:isTrashed = 0 AND ecm:isProxy = 0 AND ecm:isVersion = 0 AND (dc:expired IS NULL OR dc:expired > DATE '" + moment(moment()).format('YYYY-MM-DD') + "') AND ecm:path STARTSWITH '" + dominio + workspace + "'", 2000000).then((docs) => {
            if (docs.length > 0) {
              self.DevolverListaFormateada(docs, cont, docs.length, 'Favoritos');
            } else {
              self.cambiarEstadoVacio(loadData);
            }
          });
          break;
        }
        case 'Multimedia': {
          self.ejecutarQueryRepo("SELECT * FROM File WHERE ecm:isTrashed = 0 AND ecm:isProxy = 0 AND ecm:isVersion = 0 AND (dc:expired IS NULL OR dc:expired >= DATE '" + moment(moment()).format('YYYY-MM-DD') + "') AND (dc:title LIKE '%.gif' OR dc:title LIKE '%.png' OR dc:title LIKE '%.jpg' OR dc:title LIKE '%.jpeg' OR dc:title LIKE '%.sgv' OR dc:title LIKE '%.bmp' OR dc:title LIKE '%.psd' OR dc:title LIKE '%.tiff' OR dc:title LIKE '%.tif' OR dc:title LIKE '%.fax' OR dc:title LIKE '%.emf' OR dc:title LIKE '%.dpx' OR dc:title LIKE '%.srf' OR dc:title LIKE '%.mp3' OR dc:title LIKE '%.mpg' OR dc:title LIKE '%.wav' OR dc:title LIKE '%.aif' OR dc:title LIKE '%.aiff' OR dc:title LIKE '%.m4a' OR dc:title LIKE '%.m4b' OR dc:title LIKE '%.m4p' OR dc:title LIKE '%.m4r' OR dc:title LIKE '%.mka' OR dc:title LIKE '%.wax' OR dc:title LIKE '%.wma' OR dc:title LIKE '%.ogg' OR dc:title LIKE '%.mpga' OR dc:title LIKE '%.mpa' OR dc:title LIKE '%.mpe' OR dc:title LIKE '%.mpeg' OR dc:title LIKE '%.mpg' OR dc:title LIKE '%.mpv2' OR dc:title LIKE '%.mp4' OR dc:title LIKE '%.mov' OR dc:title LIKE '%.qt' OR dc:title LIKE '%.ogv' OR dc:title LIKE '%.webm' OR dc:title LIKE '%.mkv' OR dc:title LIKE '%.asf' OR dc:title LIKE '%.asr' OR dc:title LIKE '%.asx' OR dc:title LIKE '%.avi' OR dc:title LIKE '%.fli' OR dc:title LIKE '%.flv' OR dc:title LIKE '%.viv' OR dc:title LIKE '%.vivo' OR dc:title LIKE '%.m4v' OR dc:title LIKE '%.3gp' OR dc:title LIKE '%.3gc' OR dc:title LIKE '%.wmv' OR dc:title LIKE '%.wmx' OR dc:title LIKE '%.flv' OR dc:title LIKE '%.mov') AND (dc:title ILIKE '%" + this.state.textbuscar + "%' OR ecm:tag ILIKE '%" + this.state.textbuscar + "%') AND ecm:path STARTSWITH '" + dominio + workspace + "'", 2000000).then((docs) => {
            if (docs.length > 0) {
              self.DevolverListaFormateada(docs, cont, docs.length, 'Multimedia');
            } else {
              self.cambiarEstadoVacio(loadData);
            }
          });
          break;
        }
        case 'Eliminados': {
          self.ejecutarQueryRepo("SELECT * FROM File, Folder WHERE ecm:primaryType IN ('File', 'Folder', 'Note') AND ecm:isTrashed = 1 AND (dc:creator = '" + user + "' OR (ecm:acl/*/principal = '" + user + "' AND ecm:acl/*/grant = 1 AND ecm:acl/*/permission IN ('Everything'))) AND (dc:title ILIKE '%" + this.state.textbuscar + "%' OR ecm:tag ILIKE '%" + this.state.textbuscar + "%') AND ecm:path STARTSWITH '" + dominio + workspace + "' ORDER BY dc:created DESC", 2000000).then((docs) => {
            if (docs.length > 0) {
              listaresultado = docs;
              self.DevolverListaFormateada(docs, cont, docs.length, 'Eliminados');
            } else {
              self.cambiarEstadoVacio(loadData);
            }
          });
          break;
        }
        case 'Espacio Personal': {
          self.ejecutarQueryRepo("SELECT * FROM File, Folder WHERE ecm:primaryType IN ('File', 'Folder', 'Note') AND ecm:isTrashed = 0 AND ecm:isProxy = 0 AND ecm:isVersion = 0 AND (dc:expired IS NULL OR dc:expired >= DATE '" + moment(moment()).format('YYYY-MM-DD') + "') AND (dc:title ILIKE '%" + this.state.textbuscar + "%' OR ecm:tag ILIKE '%" + this.state.textbuscar + "%') AND dc:creator = '" + user + "' AND ecm:path STARTSWITH '" + self.state.path + "'", 2000000).then((docs) => {
            if (docs.length > 0) {
              listaresultado = docs;
              self.DevolverListaFormateada(docs, cont, docs.length, 'Espacio P. Busqueda');
            } else {
              self.cambiarEstadoVacio(loadData);
            }
          });
          break;
        }
        case 'Folder': {
          self.ejecutarQueryRepo("SELECT * FROM File, Folder WHERE ecm:primaryType IN ('File', 'Folder', 'Note') AND ecm:isTrashed = 0 AND ecm:isProxy = 0 AND ecm:isVersion = 0 AND (dc:expired IS NULL OR dc:expired >= DATE '" + moment(moment()).format('YYYY-MM-DD') + "') AND (dc:title ILIKE '%" + this.state.textbuscar + "%' OR ecm:tag ILIKE '%" + this.state.textbuscar + "%') AND ecm:path STARTSWITH '" + self.state.path + "'", 2000000).then((docs) => {
            if (docs.length > 0) {
              listaresultado = docs;
              if (self.state.menu.menuselect == 'Eliminados') {
                self.DevolverListaFormateada(docs, cont, docs.length, 'Folder Eliminada');
              } else {
                self.DevolverListaFormateada(docs, cont, docs.length, 'Folder Busqueda');
              }
            } else {
              self.cambiarEstadoVacio(loadData);
            }
          });
          break;
        }
        default: {
          self.ejecutarQueryRepo("SELECT * FROM File, Folder, Section WHERE ecm:primaryType IN ('File', 'Folder', 'Note', 'Section') AND ecm:isTrashed = 0 AND ecm:isProxy = 0 AND ecm:isVersion = 0 AND (dc:expired IS NULL OR dc:expired >= DATE '" + moment(moment()).format('YYYY-MM-DD') + "') AND (dc:title ILIKE '%" + self.state.textbuscar + "%' OR ecm:tag ILIKE '%" + self.state.textbuscar + "%') AND ecm:path STARTSWITH '" + dominio + workspace + "' ORDER BY dc:created DESC", 2000000).then((listdocs) => {
            listaresultado = listdocs;
            if (listdocs.length > 0) {
              self.DevolverListaFormateada(listdocs, cont, listdocs.length, 'Archivo Busqueda');
            } else {
              self.cambiarEstadoVacio(loadData);
            }
          });
          break;
        }
      }
    }
    if (event.target.value.length == 0) {
      this.listarArchivos(self.state.path, self.state.iconvacio);
    }
  }
  // // Búsqueda Avanzada de Documento ////

  handleBuscarAvanzado = () => {
    let sql = "SELECT * FROM Folder, File WHERE ecm:primaryType IN ('File', 'Folder', 'Note', 'Section') AND ecm:isProxy = 0 AND ecm:isVersion = 0 AND ecm:path STARTSWITH '" + dominio + workspace + "'";
    if (this.state.busqueda.combotipo) {
      sql = "SELECT * FROM File WHERE ecm:primaryType IN ('File') AND ecm:isProxy = 0 AND ecm:isVersion = 0 AND ecm:path STARTSWITH '" + dominio + workspace + "'";
      // sql = "SELECT * FROM File WHERE (dc:creator = '" + user + "' OR (ecm:acl/*/principal = '" + user + "' AND ecm:acl/*/grant = 1 AND ecm:acl/*/permission IN ('Read', 'ReadWrite','Everything'))) AND ecm:isProxy = 0 AND ecm:isVersion = 0";
      switch (this.state.busqueda.combotipo) {
        case 1: {
          // Documentos//
          // extension == 'doc' || extension == 'dot' || extension == 'dot' || extension == 'doc.xml' || extension == 'docb.xml' || extension == 'docb' || extension == 'ods' || extension == 'ots' || extension == 'odt' || extension == 'ott' || extension == 'odp' || extension == 'otp' || extension == 'odg' || extension == 'otg' || extension == 'pdf' || extension == 'docm' || extension == 'docx' || extension == 'dotm' || extension == 'dotx' || extension == 'dotx' || extension == 'pdf'
          sql += " AND (dc:title LIKE '%.doc' OR dc:title LIKE '%.dot' OR dc:title LIKE '%.docx' OR dc:title LIKE '%.docb' OR dc:title LIKE '%.ods' OR dc:title LIKE '%.ots' OR dc:title LIKE '%.odt' OR dc:title LIKE '%.ott' OR dc:title LIKE '%.odp' OR dc:title LIKE '%.otp' OR dc:title LIKE '%.odg' OR dc:title LIKE '%.otg' OR dc:title LIKE '%.pdf' OR dc:title LIKE '%.docm' OR dc:title LIKE '%.docx' OR dc:title LIKE '%.dotm' OR dc:title LIKE '%.dotx')";
          break;
        }
        case 2: {
          // Presentaciones//
          // extension == 'ppt' || extension == 'pot' || extension == 'pps' || extension == 'mpp' || extension == 'pub' || extension == 'pub' || extension == 'ppsm' || extension == 'ppsx' || extension == 'pptm' || extension == 'pptx' || extension == 'pptx' || extension == 'vsdx' || extension == 'vsd' || extension == 'vst'
          sql += " AND (dc:title LIKE '%.ppt' OR dc:title LIKE '%.pot' OR dc:title LIKE '%.pps' OR dc:title LIKE '%.mpp' OR dc:title LIKE '%.pub' OR dc:title LIKE '%.ppsm' OR dc:title LIKE '%.ppsx' OR dc:title LIKE '%.pptm' OR dc:title LIKE '%.pptx' OR dc:title LIKE '%.vsdx' OR dc:title LIKE '%.vsd' OR dc:title LIKE '%.vst')";
          break;
        }
        case 3: {
          // Hojas de Cálculos//
          // extension == 'xls' || extension == 'xlt' || extension == 'xlt' || extension == 'xlsb' || extension == 'xlsm' || extension == 'xlsm' || extension == 'xlsx' || extension == 'xps' || extension == 'csv'
          sql += " AND (dc:title LIKE '%.xls' OR dc:title LIKE '%.xlt' OR dc:title LIKE '%.xlsb' OR dc:title LIKE '%.xlsm' OR dc:title LIKE '%.xlsx' OR dc:title LIKE '%.xps' OR dc:title LIKE '%.csv')";
          break;
        }
        case 4: {
          // Notas//
          // extension == 'txt'
          sql += " AND (dc:title LIKE '%.txt')";
          break;
        }
        case 5: {
          // Audio//
          // extension == 'mp3' || extension == 'mpga' || extension == 'mp2' || extension == 'wav' || extension == 'm3u' || extension == 'aif' || extension == 'aifc' || extension == 'aiff' || extension == 'ogg' || extension == 'oga' || extension == 'spx' || extension == 'flac' || extension == 'ogm' || extension == 'ogx' || extension == 'aac' || extension == 'm4a' || extension == 'm4b' || extension == 'm4p' || extension == 'm4r' || extension == 'mka' || extension == 'wax' || extension == 'wma'
          sql += " AND (dc:title LIKE '%.mp3' OR dc:title LIKE '%.mp2' OR dc:title LIKE '%.mpga' OR dc:title LIKE '%.wav' OR dc:title LIKE '%.m3u' OR dc:title LIKE '%.aif' OR dc:title LIKE '%.aifc' OR dc:title LIKE '%.aiff' OR dc:title LIKE '%.ogg' OR dc:title LIKE '%.oga' OR dc:title LIKE '%.oga' OR dc:title LIKE '%.spx' OR dc:title LIKE '%.flac' OR dc:title LIKE '%.ogm' OR dc:title LIKE '%.ogx' OR dc:title LIKE '%.aac' OR dc:title LIKE '%.m4a' OR dc:title LIKE '%.m4b' OR dc:title LIKE '%.m4p' OR dc:title LIKE '%.m4r' OR dc:title LIKE '%.mka' OR dc:title LIKE '%.wax' OR dc:title LIKE '%.wma')";
          break;
        }
        case 6: {
          // Imágenes//
          // extension == 'gif' || extension == 'png' || extension == 'jpg' || extension == 'jpeg' || extension == 'pbm' || extension == 'bmp' || extension == 'ppm' || extension == 'fax' || extension == 'tiff' || extension == 'tif' || extension == 'svg' || extension == 'dpx' || extension == 'ai' || extension == 'psd' || extension == 'emf' || extension == 'vclmtf' || extension == 'srf'
          sql += " AND (dc:title LIKE '%.gif' OR dc:title LIKE '%.png' OR dc:title LIKE '%.jpg' OR dc:title LIKE '%.jpeg' OR dc:title LIKE '%.pbm' OR dc:title LIKE '%.bmp' OR dc:title LIKE '%.ppm' OR dc:title LIKE '%.fax' OR dc:title LIKE '%.tiff' OR dc:title LIKE '%tif' OR dc:title LIKE '%.svg' OR dc:title LIKE '%.dpx' OR dc:title LIKE '%.ai' OR dc:title LIKE '%.psd' OR dc:title LIKE '%.emf' OR dc:title LIKE '%.vclmtf' OR dc:title LIKE '%.srf')";
          break;
        }
        case 7: {
          // Videos//
          // extension == 'mpe' || extension == 'mpeg' || extension == 'mpg' || extension == 'mpv2' || extension == 'mp4' || extension == 'mov' || extension == 'qt' || extension == 'ogv' || extension == 'webm' || extension == 'mkv' || extension == 'asf' || extension == 'asr' || extension == 'asx' || extension == 'avi' || extension == 'fli' || extension == 'flv' || extension == 'viv' || extension == 'vivo' || extension == 'm4v' || extension == '3gp' || extension == '3g2' || extension == 'wmv' || extension == 'wmx' || extension == 'gxf' || extension == 'mxf'
          sql += " AND (dc:title LIKE '%.mpe' OR dc:title LIKE '%.mpeg' OR dc:title LIKE '%.mpg' OR dc:title LIKE '%.mpv2' OR dc:title LIKE '%.mp4' OR dc:title LIKE '%.mov' OR dc:title LIKE '%.qt' OR dc:title LIKE '%.ogv' OR dc:title LIKE '%.webm' OR dc:title LIKE '%mkv' OR dc:title LIKE '%.asf' OR dc:title LIKE '%.asr' OR dc:title LIKE '%.asx' OR dc:title LIKE '%.avi' OR dc:title LIKE '%.fli' OR dc:title LIKE '%.flv' OR dc:title LIKE '%.viv' OR dc:title LIKE '%.vivo' OR dc:title LIKE '%.m4v' OR dc:title LIKE '%.3gp' OR dc:title LIKE '%.3g2' OR dc:title LIKE '%.wmv' OR dc:title LIKE '%.gxf' OR dc:title LIKE '%.mxf')";
          break;
        }
        case 8: {
          // Otros//
          // extension == 'html' || extension == 'xhtml' || extension == 'shtml' || extension == 'stx' || extension == 'rst' || extension == 'rest' || extension == 'restx' || extension == 'rest' || extension == 'py' || extension == 'java' || extension == 'md' || extension == 'mkd' || extension == 'markdown' || extension == 'eml' || extension == 'msg' || extension == 'xml' || extension == 'graffle' || extension == 'twb' || extension == 'sxi' || extension == 'sxw' || extension == 'stw' || extension == 'sti' || extension == 'sxc' || extension == 'stc' || extension == 'sxd' || extension == 'std' || extension == 'std' || extension == 'ps' || extension == 'eps'
          sql += " AND (dc:title LIKE '%.html' OR dc:title LIKE '%.xhtml' OR dc:title LIKE '%.shtml' OR dc:title LIKE '%.stx' OR dc:title LIKE '%.rst' OR dc:title LIKE '%.rest' OR dc:title LIKE '%.restx' OR dc:title LIKE '%.rest' OR dc:title LIKE '%.py' OR dc:title LIKE '%.java' OR dc:title LIKE '%.md' OR dc:title LIKE '%.mkd' OR dc:title LIKE '%.markdown' OR dc:title LIKE '%.eml' OR dc:title LIKE '%.msg' OR dc:title LIKE '%.xml' OR dc:title LIKE '%.graffle' OR dc:title LIKE '%.twb' OR dc:title LIKE '%.sxi' OR dc:title LIKE '%.sxw' OR dc:title LIKE '%.stw' OR dc:title LIKE '%.sti' OR dc:title LIKE '%.sxc' OR dc:title LIKE '%.stc' OR dc:title LIKE '%.sxd' OR dc:title LIKE '%.std' OR dc:title LIKE '%.ps' OR dc:title LIKE '%.eps')";
          break;
        }
      }
    }
    if (this.state.busqueda.denombuscar) {
      sql = sql + " AND dc:title ILIKE '%" + this.state.busqueda.denombuscar + "%'";
    }
    if (this.state.busqueda.descripbuscar) {
      sql = sql + " AND dc:description ILIKE '%" + this.state.busqueda.descripbuscar + "%'";
    }
    // file:content/name = 'testfile.txt'
    if (this.state.busqueda.tamanno) {
      const bytes = this.state.busqueda.tamanno * 1024 * 1024;
      sql = sql + ' AND file:content/length >=' + bytes + '';
    }
    if (this.state.busqueda.comboestado) {
      switch (this.state.busqueda.comboestado) {
        case 1: {
          // Creado
          if (this.state.busqueda.fechadesde) {
            sql = sql + " AND dc:created >= DATE '" + this.state.busqueda.fechadesde + "'";
          }
          if (this.state.busqueda.fechahasta) {
            sql = sql + " AND dc:created <= DATE '" + this.state.busqueda.fechahasta + "'";
          }
          if (this.state.busqueda.ejecutobuscar) {
            sql = sql + " AND dc:creator ILIKE '%" + this.state.busqueda.ejecutobuscar + "%'";
          }
          break;
        }
        case 2: {
          // Modificado
          if (this.state.busqueda.fechadesde) {
            sql = sql + " AND dc:modified >= DATE '" + this.state.busqueda.fechadesde + "'";
          }
          if (this.state.busqueda.fechahasta) {
            sql = sql + " AND dc:modified <= DATE '" + this.state.busqueda.fechahasta + "'";
          }
          if (this.state.busqueda.ejecutobuscar) {
            sql = sql + " AND dc:lastContributor ILIKE '%" + this.state.busqueda.ejecutobuscar + "%'";
          }
          break;
        }
        case 3: {
          // Publicado
          if (this.state.busqueda.fechadesde) {
            sql = sql + " AND dc:publisher >= DATE '" + this.state.busqueda.fechadesde + "'";
          }
          if (this.state.busqueda.fechahasta) {
            sql = sql + " AND dc:publisher <= DATE '" + this.state.busqueda.fechahasta + "'";
          }
          if (this.state.busqueda.ejecutobuscar) {
            sql = sql + " AND dc:lastContributor ILIKE '%" + this.state.busqueda.ejecutobuscar + "%'";
          }
          break;
        }
        case 4: {
          // Publicado
          if (this.state.busqueda.fechadesde) {
            sql = sql + " AND dc:expired >= DATE '" + this.state.busqueda.fechadesde + "'";
          }
          if (this.state.busqueda.fechahasta) {
            sql = sql + " AND dc:expired <= DATE '" + this.state.busqueda.fechahasta + "'";
          }
          if (this.state.busqueda.ejecutobuscar) {
            sql = sql + " AND dc:lastContributor ILIKE '%" + this.state.busqueda.ejecutobuscar + "%'";
          }
          break;
        }
        case 5: {
          // Bloqueado
          if (this.state.busqueda.fechadesde) {
            sql = sql + " AND ecm:lockCreated >= DATE '" + this.state.busqueda.fechadesde + "'";
          }
          if (this.state.busqueda.fechahasta) {
            sql = sql + " AND ecm:lockCreated <= DATE '" + this.state.busqueda.fechahasta + "'";
          }
          if (this.state.busqueda.ejecutobuscar) {
            sql = sql + " AND ecm:lockOwner ILIKE '%" + this.state.busqueda.ejecutobuscar + "%'";
          }
          break;
        }
        case 6: {
          // Eliminado
          sql += ' AND ecm:isTrashed = 1';
          if (this.state.busqueda.fechadesde) {
            sql = sql + " AND dc:modified >= DATE '" + this.state.busqueda.fechadesde + "'";
          }
          if (this.state.busqueda.fechahasta) {
            sql = sql + " AND dc:modified <= DATE '" + this.state.busqueda.fechahasta + "'";
          }
          if (this.state.busqueda.ejecutobuscar) {
            sql = sql + " AND dc:lastContributor ILIKE '%" + this.state.busqueda.ejecutobuscar + "%'";
          }
          break;
        }
      }
    }
    // console.log(this.state.busqueda.etiquetas);
    if (this.state.busqueda.etiquetas) {
      const etiquetasspace = this.state.busqueda.etiquetas.trim();
      const arrayetiquetas = etiquetasspace.split(',');
      let sql1 = '';
      let union = false;
      if (arrayetiquetas[0] !== '' && arrayetiquetas[0] !== ' ') {
        sql1 = " AND (ecm:tag ILIKE '%" + arrayetiquetas[0] + "%'";
        union = true;
      }
      let i = 1;
      while (i < arrayetiquetas.length) {
        if (arrayetiquetas[i] !== '' && arrayetiquetas[i] !== ' ') {
          if (union) {
            sql1 = sql1 + " OR ecm:tag ILIKE '%" + arrayetiquetas[i] + "%'";
          } else {
            sql1 = sql1 + " AND (ecm:tag ILIKE '%" + arrayetiquetas[i] + "%'";
            union = true;
          }
        }
        i += 1;
      }
      sql1 += ')';
      sql += sql1;
    }
    if (this.state.busqueda.contribuyentes !== '') {
      const contribuyentesspace = this.state.busqueda.contribuyentes.trim();
      const arraycontrib = contribuyentesspace.split(',');
      let sql2 = '';
      let union = false;
      if (arraycontrib[0] !== '' && arraycontrib[0] !== null && arraycontrib[0] !== ' ') {
        sql2 = " AND (dc:contributors ILIKE '%" + arraycontrib[0] + "%'";
        union = true;
      }
      let i = 1;
      while (i < arraycontrib.length) {
        if (arraycontrib[i] !== '' && arraycontrib[i] !== null && arraycontrib[i] !== ' ') {
          if (union) {
            sql2 = sql2 + " OR dc:contributors ILIKE '%" + arraycontrib[i] + "%'";
          } else {
            sql2 = sql2 + " AND (dc:contributors ILIKE '%" + arraycontrib[i] + "%'";
            union = true;
          }
        }
        i += 1;
      }
      sql2 += ' )';
      sql += sql2;
    }
    // console.log(sql);
    const objstate = this.state;
    objstate.busqueda.sql = sql,
    objstate.showBackdrop = true,
    objstate.antecesor.listpath = [{
      iconvacioantecesor: 'Búsqueda', pathantecesor: dominio + workspace + user + '/', mostrarbtnatras: false, denom: 'Búsqueda'
    }],
    this.setState({
      objstate
    });
    self.ejecutarQueryRepo(self.state.busqueda.sql, 2000000).then((docs) => {
      loadData = [];
      if (docs.length > 0) {
        const cont = 0;
        listaresultado = docs;
        // console.log(docs)
        self.DevolverListaFormateada(docs, cont, docs.length, 'Busqueda');
      } else {
        self.cambiarEstadoVacio(loadData);
      }
    });
  }


  handleChangeComboTipo = (e) => {
    let disabled = true;
    if (e.target.value !== '') {
      disabled = false;
    }
    const objstate = this.state;
    objstate.busqueda.combotipo = e.target.value;
    objstate.busqueda.btnbuscar = disabled;
    this.setState({
      objstate
    });
  }

  handleChangeEstado = (e) => {
    const objstate = this.state;
    objstate.busqueda.comboestado = e.target.value;
    objstate.busqueda.disablefechas = false;
    this.setState({
      objstate
    });
  }

  handleChangeEtiquetas = (e) => {
    let disabled = true;
    if (e.target.value !== '') {
      disabled = false;
    }
    const objstate = this.state;
    objstate.busqueda.etiquetas = e.target.value;
    objstate.busqueda.btnbuscar = disabled;
    this.setState({
      objstate
    });
  }

  handleChangeContribuyentes = (e) => {
    let disabled = true;
    if (e.target.value !== '') {
      disabled = false;
    }
    const objstate = this.state;
    objstate.busqueda.contribuyentes = e.target.value;
    objstate.busqueda.btnbuscar = disabled;
    this.setState({
      objstate
    });
  }

  handleDateChangefechadesde = (date) => {
    let disabled = true;
    if (date !== '') {
      disabled = false;
    }
    const fecha = moment(date).format('YYYY-MM-DD');
    const objstate = this.state;
    objstate.busqueda.fechadesde = fecha;
    objstate.busqueda.btnbuscar = disabled;
    this.setState({
      objstate
    });
  }

  cambiarEstado = (e) => {
    if (e.target.value == '') {
      const objstate = this.state;
      objstate.busqueda.fechadesde = null;
      objstate.busqueda.btnbuscar = true;
      this.setState({
        objstate
      });
    }
  }

  cambiarEstadoHasta = (e) => {
    if (e.target.value == '') {
      const objstate = this.state;
      objstate.busqueda.fechahasta = null;
      objstate.busqueda.btnbuscar = true;
      this.setState({
        objstate
      });
    }
  }

  handleDateChangefechahasta = (date) => {
    let disabled = true;
    if (date !== '') {
      disabled = false;
    }
    const fecha = moment(date).format('YYYY-MM-DD');
    const objstate = this.state;
    objstate.busqueda.fechahasta = fecha;
    objstate.busqueda.btnbuscar = disabled;
    this.setState({
      objstate
    });
  }

  handleChangeejecuto = (e) => {
    let disabled = true;
    if (e.target.value !== '') {
      disabled = false;
    }
    const objstate = this.state;
    objstate.busqueda.ejecutobuscar = e.target.value;
    objstate.busqueda.btnbuscar = disabled;
    this.setState({
      objstate
    });
  }

  handleChangedenominacion = (e) => {
    let disabled = true;
    if (e.target.value !== '') {
      disabled = false;
    }
    const objstate = this.state;
    objstate.busqueda.denombuscar = e.target.value;
    objstate.busqueda.btnbuscar = disabled;
    this.setState({
      objstate
    });
  }

  handleChangedescripcion = (e) => {
    let disabled = true;
    if (e.target.value !== '') {
      disabled = false;
    }
    const objstate = this.state;
    objstate.busqueda.descripbuscar = e.target.value;
    objstate.busqueda.btnbuscar = disabled;
    this.setState({
      objstate
    });
  }

  handleChangetamanno = (e) => {
    let disabled = true;
    if (e.target.value !== '') {
      disabled = false;
    }
    const objstate = this.state;
    objstate.busqueda.tamanno = e.target.value;
    objstate.busqueda.btnbuscar = disabled;
    this.setState({
      objstate
    });
  }


  // /// Tabs Selected/////
  handleCambioTabActivo = (event, value) => {
    switch (value) {
      case 0: {
        this.listarActividad(seleccionado.path);
        break;
      }
      case 1: {
        this.listarDocPublicadoSecciones(seleccionado.id);
        break;
      }
      case 2: {
        this.listarACLShare(seleccionado.path, false);
        break;
      }
      case 3: {
        this.listarComment(seleccionado.path, false);
        break;
      }
      case 4: {
        let disable = false;
        if (seleccionado.etiquetas.length == 0) {
          disable = true;
        }
        this.setState({
          etiquetar: {
            btnetiquetardisable: true,
            insertetiqueta: '',
            totaletiquetas: seleccionado.etiquetas.length,
            listetiquetas: seleccionado.etiquetas,
            addetiquetabtn: true,
            deletedisable: disable,
          },
        });
        break;
      }
      case 5: {
        this.setState({
          compartir: {
            usuariosshare: '',
            btnsharedisable: true,
            deletesharedisable: true,
            visible: 'none',
          },
          permisos: {
            panel1expand: true,
            panel2expand: false,
            panel3expand: false,
            listuserexternos: [],
            listcompartidos: [],
            listheredados: [],
            usuariospermisos: '',
            btnpermisosdisable: true,
            deletepermisosdisable: true,
          },
        });
        this.listarACLSdocumentos(seleccionado.path, false);
        break;
      }
      case 6: {
        this.setState({
          versiones: {
            listversiones: [],
            totalversiones: 0,
            btnlisttodasvers: false,
            textverbtntodos: 'Mostrar todas las versiones',
          },
        });
        this.listarVersiones(seleccionado.path, false);
        break;
      }
      case 7: {
        this.listarMicelaneas();
        break;
      }
    }
    this.setState({ tabactivo: value });
  };


  // / Menu seleccionado Comments ////
  mostrarComment = (open, comment) => {
    let tabactivo = 4;
    if (open) {
      if (comment) {
        tabactivo = 3;
      }
      this.setState({
        openpanel: open,
        tabactivo,
      });
    } else {
      const itemnew = this.state;
      itemnew.openpanel = open;
      itemnew.tabla.selected = [];
      itemnew.tabla.numSelected = 0;
      this.setState({
        itemnew
      });
    }
    this.handleMenuActionsClose();
    const selected = this.obtenerseleccionado(this.state.tabla.selected[0]);
    if (comment) {
      this.listarComment(selected.path, false);
    } else {
      const estado = this.state;
      estado.etiquetar.listetiquetas = selected.etiquetas;
      this.setState({
        estado
      });
    }
  }

  // / Menu seleccionado Gestionar Miembros ////
  mostrarMiembros = (open) => {
    const itemnew = this.state;
    if (open) {
      itemnew.openpanel = open;
      itemnew.tabactivo = 8;
      itemnew.grupos.showtab = '';
    } else {
      itemnew.openpanel = open;
      itemnew.tabla.selected = [];
      itemnew.tabla.numSelected = 0;
    }
    this.setState({
      itemnew
    });
    this.handleMenuActionsClose();
    const selected = this.obtenerseleccionado(this.state.tabla.selected[0]);
    this.listarUserGrupo(selected.id, false);
  }


  // / Menu seleccionado Detalle ///
  toggleDrawer = (open) => {
    if (open) {
      let tab = 0;
      if (this.state.menu.menuselect === 'Espacio de Grupo de Trabajo') {
        tab = 5;
      }
      if (this.state.menu.menuselect === 'Grupos') {
        tab = 7;
      }
      this.handleActionsMenuDetail();
      this.setState({
        openpanel: open,
        tabactivo: tab,
      });
    } else {
      const itemnew = this.state;
      itemnew.openpanel = open;
      itemnew.tabla.selected = [];
      itemnew.tabla.numSelected = 0;
      this.setState({
        itemnew
      });
    }
  };


  // Menu seleccionados acciones(abrir menu)///
  handleClickMenuActions = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      openmenu: true,
    });
  };

  // Seleccionar Items del Menu seleccionados acciones(abrir Items)///
  handleActionsMenu = () => {
    this.handleMenuActionsClose();
  }

  // Menu seleccionados acciones(cerrar menu)///
  handleMenuActionsClose = () => {
    this.setState({
      anchorEl: null,
      openmenu: false,
    });
  };

  // Menu seleccionados acciones(Información del documento seleccionado)///
  handleActionsMenuDetail = () => {
    this.handleMenuActionsClose();
    const selected = this.obtenerseleccionado(this.state.tabla.selected[0]);
    if (this.state.menu.menuselect != 'Espacio de Grupo de Trabajo' && this.state.menu.menuselect != 'Grupos') {
      this.listarActividad(selected.path);
    }
    if (this.state.menu.menuselect === 'Espacio de Grupo de Trabajo') {
      //  console.log('Entro Aquí');
      this.listarACLSdocumentos(selected.path, false);
    }
  }

  devolverAccion(accion) {
    switch (accion) {
      case 'download': {
        return 'Documento Descargado';
      }
      case 'documentCreated': {
        return 'Documento creado';
      }
      case 'documentCreatedByCopy': {
        return 'Documento creado por copia';
      }
      case 'documentDuplicated': {
        return 'Documento duplicado';
      }
      case 'documentMoved': {
        return 'Documento movido de ubicación';
      }
      case 'documentRemoved': {
        return 'Documento eliminado';
      }
      case 'documentModified': {
        return 'Documento modificado';
      }
      case 'documentLocked': {
        return 'Documento bloqueado';
      }
      case 'documentUnlocked': {
        return 'Documento desbloqueado';
      }
      case 'documentSecurityUpdated': {
        return 'La seguridad del documento fue actualizada';
      }
      case 'lifecycle_transition_event': {
        return 'El evento de transición del ciclo de vida fue desbloqueado';
      }
      case 'loginSuccess': {
        return 'Acceso exitoso';
      }
      case 'loginFailed': {
        return 'Acceso fallido';
      }
      case 'logout': {
        return 'Cierre de seción';
      }
      case 'documentCheckedIn': {
        return 'Documento registrado';
      }
      case 'versionRemoved': {
        return 'Versión del documento eleminado';
      }
      case 'documentProxyPublished': {
        return 'Documento publicado';
      }
      case 'sectionContentPublished': {
        return 'La sección contenido fue publicada';
      }
      case 'documentRestored': {
        return 'Documento restaurado';
      }
      case 'addedToCollection': {
        return 'Documento fue añadido a favoritos';
      }
      case 'removedFromCollection': {
        return 'Documento fue removido de favorito';
      }
      case 'documentUntrashed': {
        return 'Documento recuperado de los eliminados';
      }
      case 'documentTrashed': {
        return 'Documento enviado a eliminados';
      }
    }
  }

  // / Seleccionar el usuario a compartir Documento ////
  handleSeleccionarUsuarioGrupos = (event, user) => {
    const estado = self.state;
    estado.grupos.btnsagregardisable = false;
    estado.grupos.usuariosselect = user.username;
    estado.grupos.companchorEl = null;
    estado.grupos.openlist = false;
    estado.grupos.visible = 'none';
    self.setState({
      estado
    });
  }


  // // Devuelve la Cantidad de Usuarios de un Grupo ////
  devuelvecantusuarios = (grupo) => {
    nuxeo.operation('UserGroup.Suggestion')
      .params({
        groupRestriction: grupo,
        searchType: 'USER_TYPE',
      })
      .execute()
      .then((users) => {
        let cant = 0;
        if (users.length > 0) {
          cant = users.length;
        }
        return cant;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  // Listar Usuarios del Grupo ///
  listarUserGrupo = (grupo, todos) => {
    nuxeo.operation('UserGroup.Suggestion')
      .params({
        groupRestriction: grupo,
        searchType: 'USER_TYPE',
      })
      .execute()
      .then((users) => {
        const listusuarios = [];
        users.forEach(element => {
          let repetido = true;
          let pos = 0;
          let avatar = '';
          while (repetido) {
            if (repetido) {
              if (pos === 0) {
                avatar = element.username.charAt().toUpperCase();
              } else if (pos === 1) {
                const temp = element.username.split('.');
                avatar = element.username.charAt().toUpperCase();
                if (temp.length === 1 || temp[1] !== '') {
                  avatar += element.username.charAt(pos + 1).toUpperCase();
                } else {
                  avatar += temp[1].charAt().toUpperCase();
                }
              } else {
                avatar += element.username.charAt(pos).toUpperCase();
              }
            }
            let esta = false;
            for (let i = 0; i < listusuarios.length; i++) {
              if (avatar === listusuarios[i].avatar && element.username !== listusuarios[i].username) {
                esta = true;
              }
            }
            if (!esta) {
              repetido = false;
            }
            pos += 1;
          }
          const obj = {
            name: element.username,
            email: element.email,
            id: element.id,
            avatar,
            lastname: element.lastname,
          };
          listusuarios.push(obj);
        });
        const encontrado = rows.find(fila => seleccionado.id === fila.id);
        if (users.length > 0) {
          encontrado.cantmiembros = users.length;
        }
        let usuarios = listusuarios;
        if (!todos) {
          const newList = usuarios.slice(0, 3);
          usuarios = newList;
        }
        const estadonew = self.state;
        estadonew.grupos.usuarios = listusuarios;
        estadonew.grupos.listusuarios = usuarios;
        estadonew.grupos.totalusuarios = users.length;
        estadonew.grupos.deleteuserdisable = !(users.length > 0 && grupo != 'administrators');
        estadonew.grupos.usuariosselect = '';
        estadonew.grupos.companchorEl = null;
        estadonew.grupos.openlist = false;
        estadonew.grupos.visible = 'none';
        estadonew.grupos.btnsagregardisable = true;
        self.setState({
          estadonew
        });
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  // Preparar Actividad//
  prepararlistaractividad = () => {
    const todos = !this.state.historial.btnlisttodasact;
    let text = 'Mostrar todas las acciones';
    if (todos) {
      text = 'Mostrar las últimas cuatro acciones';
    }
    this.setState({
      historial: {
        listactividad: this.state.historial.listactividad,
        totalactividad: this.state.historial.totalactividad,
        btnlisttodasact: todos,
        textactbtntodos: text,
      },
    });
    this.listarActividad(seleccionado.path, todos);
  }

  // Listar Actividad//
  listarActividad = (path, todos) => {
    nuxeo.repository()
      .fetch(path)
      .then((doc) => {
        const id = doc.uid;
        nuxeo.request('id/' + doc.uid + '/@audit')
          .get()
          .then((res) => {
            let historial = res.entries;
            if (!todos) {
              const newList = historial.slice(0, 4);
              historial = newList;
            }
            self.setState({
              historial: {
                listactividad: historial,
                totalactividad: res.entries.length,
                btnlisttodasact: self.state.historial.btnlisttodasact,
                textactbtntodos: self.state.historial.textactbtntodos,
              },
            });
          })
          .catch((error) => {
            throw new Error(error);
          });
      })
      .catch((error) => {
        throw error;
      });
  }

  // / llamar al método listar///
  prepararlistarComments = () => {
    const todos = !this.state.comentario.btnlistartodos;
    let text = 'Mostrar todos los comentarios';
    if (todos) {
      text = 'Mostrar los últimos tres comentarios';
    }
    this.setState({
      comentario: {
        btncomentdisable: this.state.comentario.btncomentdisable,
        insertcomentvalue: '',
        totalcoment: this.state.comentario.totalcoment,
        listcoments: this.state.comentario.listcoments,
        idactualizar: this.state.comentario.lisidactualizar,
        addcomentbtn: this.state.comentario.addcomentbtn,
        btnlistartodos: todos,
        textbtnlistartodos: text,
      },
    });
    this.listarComment(seleccionado.path, todos);
  }

  // / acciones de comentar documento ///
  listarComment = (path, todos) => {
    nuxeo.repository()
      .fetch(path)
      .then((doc) => {
        const id = doc.uid;
        nuxeo.request('id/' + doc.uid + '/@comment')
          .get()
          .then((res) => {
            // console.log(res.entries);
            const listcomentarios = [];
            res.entries.forEach(element => {
              let repetido = true;
              let pos = 0;
              let avatar = '';
              while (repetido) {
                if (repetido) {
                  if (pos === 0) {
                    avatar = element.author.charAt().toUpperCase();
                  } else if (pos === 1) {
                    const temp = element.author.split('.');
                    avatar = element.author.charAt().toUpperCase();
                    if (temp.length === 1 || temp[1] !== '') {
                      avatar += element.author.charAt(pos + 1).toUpperCase();
                    } else {
                      avatar += temp[1].charAt().toUpperCase();
                    }
                  } else {
                    avatar += element.author.charAt(pos).toUpperCase();
                  }
                }
                let esta = false;
                for (let i = 0; i < listcomentarios.length; i++) {
                  if (avatar === listcomentarios[i].avatar && element.author !== listcomentarios[i].autor) {
                    esta = true;
                  }
                }
                if (!esta) {
                  repetido = false;
                }
                pos += 1;
              }
              const obj = {
                autor: element.author,
                text: element.text,
                id: element.id,
                avatar,
                fecha: moment(element.modificationDate, 'YYYY-MM-DDTHH:mm:ss.SSSSZ').format('YYYY-MM-DD HH:mm:ss'),
              };
              listcomentarios.push(obj);
            });
            const encontrado = rows.find(fila => seleccionado.id === fila.id);
            if (res.totalSize > 0) {
              seleccionado.comentado = true;
              encontrado.comentado = true;
            } else {
              seleccionado.comentado = false;
              encontrado.comentado = false;
            }
            let comentarios = listcomentarios;
            if (!todos) {
              const newList = comentarios.slice(0, 3);
              comentarios = newList;
            }
            const estadonew = self.state;
            estadonew.comentario.btncomentdisable = true;
            estadonew.comentario.insertcomentvalue = '';
            estadonew.comentario.totalcoment = res.totalSize;
            estadonew.comentario.listcoments = comentarios;
            estadonew.comentario.addcomentbtn = true;
            estadonew.comentario.idactualizar = '';
            estadonew.comentario.btnlistartodos = self.state.comentario.btnlistartodos;
            estadonew.comentario.textbtnlistartodos = self.state.comentario.textbtnlistartodos;
            self.setState({
              estadonew
            });
          })
          .catch((error) => {
            throw new Error(error);
          });
      })
      .catch((error) => {
        throw error;
      });
  }

  // / cambiar valor campo comentario///
  setValueInsertarComentario = (event) => {
    const error = !!((event.target.value === null || event.target.value === ''));
    const value = !error ? event.target.value : '';
    const disable = !((!error && value !== ''));
    this.setState({
      comentario: {
        btncomentdisable: disable,
        insertcomentvalue: value,
        totalcoment: this.state.comentario.totalcoment,
        listcoments: this.state.comentario.listcoments,
        addcomentbtn: this.state.comentario.addcomentbtn,
        idactualizar: this.state.comentario.idactualizar,
        btnlistartodos: this.state.comentario.btnlistartodos,
        textbtnlistartodos: this.state.comentario.textbtnlistartodos,
      },
    });
  }

  // / Add comentario al documento////
  handleActionAddComent = (e, id) => {
    const adicionar = this.state.comentario.addcomentbtn;
    if (adicionar) {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          'entity-type': 'comment',
          parentId: id, // commented document model id
          ancestorIds: [],
          author: user,
          text: this.state.comentario.insertcomentvalue,
          creationdDate: moment(),
          modificationDate: moment()
        })
      };
      var request = nuxeo.request('id/' + id + '/@comment')
        .post(options)
        .then((res) => {
          notification('success', 'El comentario fue adicionado satisfactoriamente');
          self.setState({
            comentario: {
              btncomentdisable: true,
              insertcomentvalue: '',
              totalcoment: self.state.comentario.totalcoment + 1,
              listcoments: self.state.comentario.listcoments,
              addcomentbtn: true,
              idactualizar: '',
              btnlistartodos: self.state.comentario.btnlistartodos,
              textbtnlistartodos: self.state.comentario.textbtnlistartodos,
            },
          });
          self.listarComment(seleccionado.path, false);
        })
        .catch((error) => {
          notification('danger', 'Error al adicionar el comentario');
        });
    } else {
      const options = {
        method: 'PUT',
        body: JSON.stringify({
          'entity-type': 'comment',
          parentId: seleccionado.id, // commented document model id
          ancestorIds: [],
          author: user,
          text: this.state.comentario.insertcomentvalue,
          creationdDate: moment(),
          modificationDate: moment()
        })
      };
      var request = nuxeo.request('id/' + seleccionado.id + '/@comment/' + this.state.comentario.idactualizar)
        .put(options)
        .then((res) => {
          notification('success', 'El comentario fue actualizado satisfactoriamente');
          self.setState({
            comentario: {
              btncomentdisable: true,
              insertcomentvalue: '',
              totalcoment: self.state.comentario.totalcoment,
              listcoments: self.state.comentario.listcoments,
              addcomentbtn: true,
              idactualizar: '',
              btnlistartodos: self.state.comentario.btnlistartodos,
              textbtnlistartodos: self.state.comentario.textbtnlistartodos,
            },
          });
          self.listarComment(seleccionado.path, false);
        })
        .catch((error) => {
          notification('danger', 'Error al actualizar el comentario');
        });
    }
  }

  // / Eliminar Comentario ///
  handleClickDeleteComment = (id) => {
    const options = {
      method: 'DELETE',
    };
    const request = nuxeo.request('id/' + seleccionado.id + '/@comment/' + id)
      .delete(options)
      .then((res) => {
        notification('success', 'El comentario fue eliminado satisfactoriamente');
        self.setState({
          comentario: {
            btncomentdisable: true,
            insertcomentvalue: '',
            totalcoment: self.state.comentario.totalcoment - 1,
            listcoments: self.state.comentario.listcoments,
            addcomentbtn: true,
            idactualizar: '',
            btnlistartodos: self.state.comentario.btnlistartodos,
            textbtnlistartodos: self.state.comentario.textbtnlistartodos,
          },
        });

        self.listarComment(seleccionado.path, false);
      })
      .catch((error) => {
        notificacion('danger', 'Error al eliminar el comentario');
      });
  };

  // / Preparar Actualización del Comentario
  prepararActualizar = (id, text) => {
    this.setState({
      comentario: {
        btncomentdisable: false,
        insertcomentvalue: text,
        totalcoment: this.state.comentario.totalcoment,
        listcoments: this.state.comentario.listcoments,
        addcomentbtn: false,
        idactualizar: id,
        btnlistartodos: this.state.comentario.btnlistartodos,
        textbtnlistartodos: this.state.comentario.textbtnlistartodos,
      },
    });
  }

  // Etiquetar Documento///
  handleActionEtiquetarDocumento = () => {
    nuxeo.operation('Services.TagDocument')
      .input(seleccionado.path)
      .enrichers({ document: ['tags'] })
      .params({ tags: this.state.etiquetar.insertetiqueta })
      .execute({ schemas: ['file', 'dublincore', 'common', 'uid', 'tags'] })
      .then((doc) => {
        const encontrado = rows.find(fila => seleccionado.id === fila.id);
        if (doc.contextParameters.tags.length > 0) {
          seleccionado.etiquetado = true;
          encontrado.etiquetado = true;
          encontrado.etiquetas = doc.contextParameters.tags;
        } else {
          seleccionado.comentado = false;
          encontrado.comentado = false;
        }
        notification('success', 'El documento fue etiquetado satisfactoriamente');
        self.setState({
          etiquetar: {
            btnetiquetardisable: true,
            insertetiqueta: '',
            totaletiquetas: doc.contextParameters.tags.length,
            listetiquetas: doc.contextParameters.tags,
            addetiquetabtn: self.state.etiquetar.addetiquetabtn,
            deletedisable: false,
          }
        });
      })
      .catch((error) => {
        notification('danger', 'Error al etiquetar el documento');
      });
  }

  // / Remover etiqueta del documento///
  handleDeleteTags = (row) => {
    nuxeo.operation('Services.UntagDocument')
      .input(seleccionado.path)
      .enrichers({ document: ['tags'] })
      .params({ tags: row })
      .execute({ schemas: ['file', 'dublincore', 'common', 'uid', 'tags'] })
      .then((doc) => {
        let disable = false;
        const encontrado = rows.find(fila => seleccionado.id === fila.id);
        if (doc.contextParameters.tags.length > 0) {
          seleccionado.etiquetado = true;
          encontrado.etiquetado = true;
          seleccionado.etiquetas = doc.contextParameters.tags;
        } else {
          disable = true;
          seleccionado.etiquetado = false;
          encontrado.etiquetado = false;
          seleccionado.etiquetas = [];
        }
        notification('success', 'La etiqueta fue removida satisfactoriamente');
        self.setState({
          etiquetar: {
            btnetiquetardisable: self.state.etiquetar.btnetiquetardisable,
            insertetiqueta: self.state.etiquetar.insertetiqueta,
            totaletiquetas: doc.contextParameters.tags.length,
            listetiquetas: doc.contextParameters.tags,
            addetiquetabtn: self.state.etiquetar.addetiquetabtn,
            deletedisable: disable,
          }
        });
      })
      .catch((error) => {
        notification('danger', 'Error al remover la etiqueta del documento');
      });
  }

  // /Eliminar todas las etiquetas del documento////
  handleTodasDeleteTags = () => {
    nuxeo.operation('Services.RemoveDocumentTags')
      .input(seleccionado.path)
      .enrichers({ document: ['tags'] })
      .execute({ schemas: ['file', 'dublincore', 'common', 'uid', 'tags'] })
      .then((doc) => {
        const encontrado = rows.find(fila => seleccionado.id === fila.id);
        seleccionado.etiquetado = false;
        encontrado.etiquetado = false;
        encontrado.etiquetas = [];

        notification('success', 'Las etiquetas fueron removidas satisfactoriamente');
        self.setState({
          etiquetar: {
            btnetiquetardisable: self.state.etiquetar.btnetiquetardisable,
            insertetiqueta: self.state.etiquetar.insertetiqueta,
            totaletiquetas: 0,
            listetiquetas: [],
            addetiquetabtn: self.state.etiquetar.addetiquetabtn,
            deletedisable: true,
          }
        });
      })
      .catch((error) => {
        notification('danger', 'Error al remover la etiqueta del documento');
      });
  }

  // / cambiar valor campo comentario///
  setValueInsertarEtiqueta = (event) => {
    const error = !!((event.target.value === null || event.target.value === ''));
    const value = !error ? event.target.value : '';
    const disable = !((!error && value !== ''));
    this.setState({
      etiquetar: {
        btnetiquetardisable: disable,
        insertetiqueta: value,
        totaletiquetas: this.state.etiquetar.totaletiquetas,
        listetiquetas: this.state.etiquetar.listetiquetas,
        addetiquetabtn: this.state.etiquetar.addetiquetabtn,
      },
    });
  }

  // / llamar al método listar versiones///
  prepararlistarVersiones = () => {
    const todos = !this.state.versiones.btnlisttodasvers;
    this.setState({
      versiones: {
        listversiones: this.state.versiones.listversiones,
        totalversiones: this.state.versiones.totalversiones,
        textverbtntodos: 'Mostrar las últimas versiones',
        btnlisttodasvers: todos,
      },
    });
    this.listarVersiones(seleccionado.path, todos);
  }

  // / Listar Versiones del documento ////
  listarVersiones = (path, todos) => {
    nuxeo.operation('Document.GetVersions')
      .input(path)
      .param('isTrashed', false)
      .execute({ schemas: ['file', 'dublincore', 'common', 'uid'] })
      .then((docs) => {
        let versiones = [];
        for (let i = docs.entries.length - 1; i >= 0; i--) {
          versiones.push(docs.entries[i]);
        }
        if (!todos) {
          const newList = versiones.slice(0, 4);
          versiones = newList;
        }
        self.setState({
          versiones: {
            listversiones: versiones,
            totalversiones: versiones.length,
            textverbtntodos: self.state.versiones.textverbtntodos,
            btnlisttodasvers: self.state.versiones.btnlisttodasvers,
          },
        });
      })
      .then(resp => {

      })
      .catch((error) => {
        throw error;
      });
  }

  // / Crear Versión ///
  crearVersion = () => {
    nuxeo.operation('Document.CreateVersion')
      .input(seleccionado.path)
      .params({ increment: 'Major', saveDocument: true })
      .execute({ schemas: ['file', 'dublincore', 'common', 'uid'] })
      .then((doc) => {
        //  console.log(doc);

        /*  rows = []
            var cont = 1;
            loadData = [];
            self.DevolvverLista(docs.entries, cont, docs.entries.length)  */
      })
      .then(resp => {

      })
      .catch((error) => {
        throw error;
      });
  }

  // / Restaurar Versión ///
  restaurarVersion = (id) => {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        // id: "Document.RestoreVersion",
        label: seleccionado.id,
        /*   category: "Document",
        requires: null,
        description: "",
        // url : "Document.RestoreVersion",
        signature: ["document", "document"],
        params: [{ checkout: true }, { createVersion: true }] */
      })
    };
    const request = nuxeo.request('id/' + id + '/@op/Document.RestoreVersion')
      .post(options)
      .then((res) => {
        notification('success', 'El documento fue restaurado satisfactoriamente');
        self.setState({
          versiones: {
            listversiones: self.state.versiones.listversiones,
            totalversiones: self.state.versiones.totalversiones,
            textverbtntodos: self.state.versiones.textverbtntodos,
            btnlisttodasvers: self.state.versiones.btnlisttodasvers,
          },
        });
        self.listarVersiones(seleccionado.path, false);
      })
      .catch((error) => {
        notification('danger', 'Error al restaurar el documento');
      });
  }

  // / Mostrar Versión ////

  handleClickMostrarVersion = () => {
    alert('Se muestra el documento');
  }


  // / Publicar Documento en las Seciones///
  /* handleListSecciones = () =>{
    self.ejecutarQueryRepo("SELECT * FROM Section", 2000).then(function (docs) {
      //console.log(docs);
      let list =[];
      docs.forEach(element => {
        let descrip = element.properties['dc:description'];
        if(descrip ==='' || descrip ===null){
         descrip = element.title;
        }
        let obj = {
              'name': element.title,
              'descripcion': descrip,
              'id': element.uid
        }
        list.push(obj);
      })
      let estado = self.state;
      estado.publicar.listseciones= list;
      self.setState({
        estado
      });
    })
  } */

  /*     nuxeo.operation('Document.GetChildren').enrichers({ document: ['favorites', 'acls', 'publications', 'tags'] })
    .input('/default-domain/sections/')
    .execute({ schemas: ['file', 'dublincore'] })
    .then(function (docs) {
       console.log(docs);
        let list = [];
        let esta = false;
        let tienepermiso = true;
        docs.entries.forEach(element => {
          if (element.properties['dc:creator'] === user) {
            esta = true;
            tienepermiso = true;
          }
          if (element.contextParameters.acls.length > 0 && !esta) {
            let acls = doc.contextParameters.acls;
            for (var i = acls.length - 1; i >= 0; i--) {
              let aces = acls[i].aces;
              for (var j = aces.length - 1; j >= 0; j--) {
                let pertenece = false;
                grupos.forEach(group => {
                  if(aces[j].username === group){
                    pertenece =true;
                  }
                });
                if (aces[j].granted){
                  if (aces[j].username === "Everyone" || aces[j].username === user || pertenece) {
                    permisos.push(aces[j].permission);
                    tienepermiso = true;
                  }
                } else {
                  if (aces[j].username === "Everyone" || aces[j].username === user || pertenece) {
                    permisos.splice(aces[j].permission);
                    if (permisos.length === 0) {
                      tienepermiso = false;
                    }
                  }
                }
              }
            }
          }
          if(tienepermiso){
            let descrip = element.properties['dc:description'];
            if(descrip ==='' || descrip ===null){
             descrip = element.title;
            }
            let obj = {
                  'name': element.title,
                  'descripcion': descrip,
                  'id': element.uid
            }
            list.push(obj);
          }
        });
       // console.log(list);
        let estado = self.state;
        estado.publicar.listseciones= list;
        self.setState({
          estado
        });
        self.listarArchivos(self.state.path, 'Archivo');
    }) */

  // / Trabajo con los Grupos ///
  handleActionsMenuEliminarGroup = () => {
    // console.log(this.state.tabla.selected);
    this.handleMenuActionsClose();
    let texto = 'Está seguro que desea eliminar el grupo ' + this.state.tabla.selected[0] + ' ?';
    if (this.state.tabla.selected.length > 1) {
      texto = 'Está seguro que desea eliminar los grupos seleccionados ?';
    }
    const estado = this.state;
    estado.confirmacion.texto = texto;
    estado.confirmacion.open = true;
    this.setState({
      estado
    });
  }


  // / Seleccion para publicar ////
  handleChangeSelectSecion = (event) => {
    const estado = this.state;
    estado.publicar.name = event.target.value;
    if (event.target.value.length > 0) {
      estado.publicar.btnpublicardisable = false;
    } else {
      estado.publicar.btnpublicardisable = true;
    }
    this.setState({ estado });
  };


  // / Eliminar la publicación del documento de una seción ////
  handleEliminarPublicacionSecion = (path) => {
    // console.log(path);
    nuxeo.repository()
      .delete(path)
      .then((res) => {
        self.listarDocPublicadoSecciones(seleccionado.id);
        notification('success', 'El documento ya no está publicado en la seción seleccionada');
        /* self.setState({
          notificacion: {
            variante: 'success',
            mensaje: 'El documento ya no está publicado en la seción seleccionada',
          },
        }) */
      });
  }


  // / Eliminar todas las publicaciones del Documento ////
  handleDeletePublicadosAll = (e) => {
    nuxeo.operation('Document.UnpublishAll')
      .input(seleccionado.path)
      .execute()
      .then((resp) => {
        nuxeo.operation('Document.FollowLifecycleTransition')
          .input(seleccionado.path)
          .params({ value: 'backToProject' })
          .execute()
          .then((doc) => {
            seleccionado.estado = 'proyecto';
            self.listarDocPublicadoSecciones(seleccionado.id);
            notification('success', 'El documento dejó de publicarse satisfactoriamente');
            /* self.setState({
              notificacion: {
                variante: 'success',
                mensaje: 'El documento dejó de publicarse satisfactoriamente',
              },
            }) */
          });
      });
  }

  // // Listar Seciones donde se ha publicado el documento ///
  listarDocPublicadoSecciones = (id) => {
    const listpub = [];
    let list = [];
    self.ejecutarQueryRepo('SELECT * FROM Section', 2000).then((docs1) => {
      docs1.forEach(element => {
        // console.log(element);
        if (self.ChequearPermisosyFiltro(element, 'Espacio de Grupo de Trabajo')) {
          let esta = false;
          listpub.forEach(sec => {
            if (sec.name === element.title) {
              esta = true;
            }
          });
          if (!esta) {
            let descrip = element.properties['dc:description'];
            if (descrip === '' || descrip === null) {
              descrip = element.title;
            }
            const cadena = element.path.split('/');
            const secion = cadena[3];
            const obj1 = {
              name: element.title,
              namepath: secion,
              descripcion: descrip,
              id: element.uid
            };
            list.push(obj1);
          }
        }
      });
      // console.log(list)
      self.ejecutarQueryRepo("SELECT * FROM Document WHERE ecm:isTrashed = 0 AND ecm:isProxy = 1 AND ecm:proxyVersionableId = '" + id + "'", 2000000).then((docs) => {
        console.log(docs);
        docs.forEach(element => {
          const cadena = element.path.split('/');
          const secion = cadena[3];
          let fecha = null;
          let name = element.title;
          list.forEach(sec => {
            if (secion === sec.namepath) {
              name = sec.name;
            }
          });

          if (element.properties['dc:modified']) {
            fecha = moment(element.properties['dc:modified']).format('YYYY-MM-DD HH:mm:ss');
          }
          const obj = {
            publicado: element.properties['dc:lastContributor'],
            fechapublic: fecha,
            name,
            path: element.path
          };
          listpub.push(obj);
          // console.log(listpub);
        });
        let disable = false;
        const filtro = [];
        if (listpub.length > 0) {
          seleccionado.estado = 'publicado';
          list.forEach(sec => {
            let esta = false;
            listpub.forEach(secpub => {
              if (sec.name === secpub.name) {
                esta = true;
              }
            });
            if (!esta) {
              filtro.push(sec);
            }
          });
          list = filtro;
        } else {
          seleccionado.estado = 'proyecto';
          disable = true;
        }
        const estado = self.state;
        estado.publicar.btnpublicardisable = true;
        estado.publicar.name = [];
        estado.publicar.listseciones = list;
        estado.publicar.listpublicados = listpub;
        estado.publicar.deletepublicardisable = disable;
        self.setState({
          estado
        });
      });
    });
  }

  // / Cambiar Estado ///
  cambiarEstadoDOC = (doc) => {
    const msg = 'El documento fue publicado satisfactoriamente';
    if (doc.state === 'project') {
      // console.log('entro aquí');
      nuxeo.operation('Document.FollowLifecycleTransition')
        .input(doc.path)
        .params({ value: 'approve' })
        .execute()
        .then((doc) => {
          seleccionado.estado = 'publicado';
        });
    }
    doc.set({
      'dc:publisher': moment(),
    });
    doc.save();
    self.listarDocPublicadoSecciones(doc.uid);
    notification('success', msg);
  }

  // / Publicar Documento ////
  handleActionPublicar = (e) => {
    const seciones = [];
    this.state.publicar.name.forEach(element => {
      this.state.publicar.listseciones.forEach(secion => {
        if (element === secion.name) {
          seciones.push(secion.id);
        }
      });
    });
    nuxeo.operation('Document.PublishToSections')
      .input(seleccionado.path)
      .params({
        target: seciones,
        override: true
      })
      .execute({ schemas: ['file', 'dublincore'] })
      .then((docs) => {
        nuxeo.repository().fetch(seleccionado.path)
          .then((doc) => {
            self.cambiarEstadoDOC(doc);
          });
      });
  }

  // / Mostrar formulario actualizar permiso ////
  prepararActPermiso = (index) => {
    const { listusuarios } = this.state.compartir;
    listusuarios[index].mostrarformulario = true;
    let disable = 'none';
    if (listusuarios[index].duracionhasta) {
      disable = 'block';
    }
    const estado = this.state;
    estado.compartir.listusuarios = listusuarios;
    estado.compartir.permisoescritrura = listusuarios[index].permescritura;
    estado.compartir.permisotodos = listusuarios[index].permtodos;
    estado.compartir.duracionhasta = listusuarios[index].duracionhasta;
    estado.compartir.notificar = 'none';
    estado.compartir.fechadisable = disable;
    this.setState({
      estado
    });
  };

  // / Cancelar la edición del permiso ////
  cancelarEdicionPermiso = (index) => {
    const { listusuarios } = this.state.compartir;
    listusuarios[index].mostrarformulario = false;
    const estado = this.state;
    estado.compartir.listusuarios = listusuarios;
    estado.compartir.permisoescritrura = false;
    estado.compartir.permisotodos = false;
    estado.compartir.duracionhasta = null;
    estado.compartir.notificar = 'none';
    estado.compartir.comentario = '';
    estado.compartir.direcemail = null;
    estado.compartir.errordirecmail = null;
    estado.compartir.fechadisable = 'none';
    this.setState({
      estado
    });
  }

  // / Cambiar estado permiso escritura ////
  handleChangeEscritura = (acl) => {
    const estado = this.state;
    if (acl === 'compartidos') {
      estado.compartir.permisoescritrura = !this.state.compartir.permisoescritrura;
      estado.compartir.permisotodos = false;
    } else {
      estado.permisos.permisoescritrura = !this.state.permisos.permisoescritrura;
      estado.permisos.permisotodos = false;
    }
    this.setState({
      estado
    });
  }

  // / Cambiar estado permiso escritura ////
  handleChangeTodos = (acl) => {
    const estado = this.state;
    if (acl === 'compartidos') {
      estado.compartir.permisoescritrura = false;
      estado.compartir.permisotodos = !this.state.compartir.permisotodos;
    } else {
      estado.permisos.permisoescritrura = false;
      estado.permisos.permisotodos = !this.state.permisos.permisotodos;
    }
    this.setState({
      estado
    });
  }

  // / Mostrar campo de fecha hasta ////
  handleMostrarFechaHasta = (acl) => {
    let display = '';
    let fecha = '';
    if (acl === 'compartidos') {
      display = this.state.compartir.fechadisable;
      fecha = this.state.compartir.duracionhasta;
    } else {
      display = this.state.permisos.fechadisable;
      fecha = this.state.permisos.duracionhasta;
    }
    if (display === 'none') {
      display = 'block';
    } else {
      display = 'none';
      fecha = null;
    }
    const estado = this.state;
    if (acl === 'compartidos') {
      estado.compartir.fechadisable = display;
      estado.compartir.duracionhasta = fecha;
    } else {
      estado.permisos.fechadisable = display;
      estado.permisos.duracionhasta = fecha;
    }
    this.setState({
      estado
    });
  }

  // / Cambiar la fecha de la duracion ///
  handleChangeDuracion = (date) => {
    const fecha = moment(date).format('YYYY-MM-DD');
    const objstate = this.state;
    objstate.compartir.duracionhasta = fecha;
    objstate.permisos.duracionhasta = fecha;
    this.setState({
      objstate
    });
  }

  cambiarEstadoDuracion = (e) => {
    if (e.target.value == '') {
      const objstate = this.state;
      objstate.compartir.duracionhasta = null;
      objstate.permisos.duracionhasta = null;
      this.setState({
        objstate
      });
    }
  }

  // / Mostrar campo de dirección de correo ////
  handleMostrarDircorreo = () => {
    let display = this.state.compartir.notificar;
    if (display === 'none') {
      display = 'block';
    } else {
      display = 'none';
    }

    const estado = this.state;
    estado.compartir.notificar = display;
    estado.compartir.direcemail = null;
    estado.compartir.errordirecmail = null;
    this.setState({
      estado
    });
  }

  // / Cambiar Dirección de Correo ////
  handleChangeDirCorreo = (e) => {
    const dir = e.target.value;
    let error = null;
    if (dir === '') {
      error = 'Campo requerido';
    }
    if (!emailPattern.test(dir) && dir.length > 0) {
      error = 'Formato incorrecto';
    }
    const objstate = this.state;
    objstate.compartir.direcemail = e.target.value;
    objstate.compartir.errordirecmail = error;
    this.setState({
      objstate
    });
  }


  // / llamar al método listar Compartidos///
  prepararlistarShare = () => {
    const todos = !this.state.compartir.btnlistartodos;
    let lista = [];
    let text = 'Mostrar todos los usuarios';
    if (todos) {
      text = 'Mostrar los últimos dos usuarios';
      lista = this.state.compartir.todosusuariosshare;
    } else {
      lista = this.state.compartir.todosusuariosshare.slice(0, 2);
    }
    const estado = self.state;
    estado.compartir.listusuarios = lista;
    estado.compartir.btnlistartodos = todos;
    estado.compartir.textbtnlistartodos = text;
    self.setState({
      estado
    });
    // this.listarACLShare(seleccionado.path, todos);
  }

  // / llamar al método listar Usuarios del Grupo///
  prepararlistarUserGrupos = () => {
    const todos = !this.state.grupos.btnlistartodos;
    let lista = [];
    let text = 'Mostrar todos los usuarios';
    if (todos) {
      text = 'Mostrar solo tres usuarios';
      lista = this.state.grupos.usuarios;
    } else {
      lista = this.state.grupos.usuarios.slice(0, 3);
    }
    const estado = self.state;
    estado.grupos.listusuarios = lista;
    estado.grupos.btnlistartodos = todos;
    estado.grupos.textbtnlistartodos = text;
    self.setState({
      estado
    });
  }


  ordenar = (lista) => {
    let swapp;
    let n = lista.length - 1;
    const x = lista;
    do {
      swapp = false;
      for (let i = 0; i < n; i++) {
        if (new Date(x[i].begin).getTime() < new Date(x[i + 1].begin).getTime()) {
          const temp = x[i];
          x[i] = x[i + 1];
          x[i + 1] = temp;
          swapp = true;
        }
      }
      n--;
    } while (swapp);
    return x;
  }


  // / Listar ACL compartir documento ///
  listarACLShare = (path, todos) => {
    nuxeo.repository()
      .fetch(path)
      .then((doc) => {
        const id = doc.uid;
        nuxeo.request('id/' + doc.uid + '/@acl')
          .get()
          .then((res) => {
            let disable = true;
            const encontrado = res.acl.find(fila => fila.name === 'compartidos');
            let usuariosconpermiso = [];
            if (encontrado) {
              const listaclordenada = self.ordenar(encontrado.ace);
              listaclordenada.forEach(element => {
                let repetido = true;
                let pos = 0;
                let avatar = '';
                while (repetido) {
                  if (repetido) {
                    if (pos === 0) {
                      avatar = element.username.charAt().toUpperCase();
                    } else if (pos === 1) {
                      const temp = element.username.split('.');
                      avatar = element.username.charAt().toUpperCase();
                      if (temp.length === 1) {
                        avatar += element.username.charAt(pos + 1).toUpperCase();
                      } else {
                        avatar += temp[1].charAt().toUpperCase();
                      }
                    } else {
                      avatar += element.username.charAt(pos).toUpperCase();
                    }
                  }
                  let esta = false;
                  for (let i = 0; i < usuariosconpermiso.length; i++) {
                    if (avatar === usuariosconpermiso[i].avatar) {
                      esta = true;
                    }
                  }
                  if (!esta) {
                    repetido = false;
                  }
                  pos += 1;
                }
                let duracion = 'Permanente';
                let estatus = 'Inactivo';
                const concedido = moment(element.begin).format('YYYY-MM-DD HH:mm:ss');
                if (element.end) {
                  duracion = 'Hasta el ' + moment(element.end).format('YYYY-MM-DD HH:mm:ss');
                }
                if (element.status == 'effective') {
                  estatus = 'Activo';
                }
                const permisos = element.permission.split(',');
                let j = 0;
                let permtraducidos = '';
                let todos = false;
                let escritura = false;
                while (j < permisos.length) {
                  let traduc = '';
                  if (permisos[j] === 'Read') {
                    traduc = 'Lectura';
                  }
                  if (permisos[j] === 'ReadWrite') {
                    traduc = 'Lectura y escritura';
                    escritura = true;
                  }
                  if (permisos[j] === 'Everything') {
                    traduc = 'Todos los permisos';
                    todos = true;
                  }
                  if (j === 0) {
                    permtraducidos = traduc;
                  } else {
                    permtraducidos = permtraducidos + ' , ' + traduc;
                  }
                  j += 1;
                }
                const obj = {
                  id: element.id,
                  permission: permtraducidos,
                  status: estatus,
                  username: element.username,
                  creator: element.creator,
                  duracion,
                  avatar,
                  mostrarformulario: false,
                  permtodos: todos,
                  concedido,
                  permescritura: escritura,
                  duracionhasta: element.end,
                };
                usuariosconpermiso.push(obj);
              });
            }
            const todosusers = usuariosconpermiso;
            if (!todos) {
              const newList = usuariosconpermiso.slice(0, 2);
              usuariosconpermiso = newList;
            }
            let { btnlistartodos } = self.state.compartir;
            let { textbtnlistartodos } = self.state.compartir;
            if (usuariosconpermiso.length > 0) {
              disable = false;
            } else {
              btnlistartodos = true;
              textbtnlistartodos = 'Mostrar todos los usuarios';
            }
            const estado = self.state;
            estado.compartir.listusuarios = usuariosconpermiso;
            estado.compartir.todosusuariosshare = todosusers;
            estado.compartir.btnlistartodos = btnlistartodos;
            estado.compartir.usuariosshare = '';
            estado.compartir.btnsharedisable = true;
            estado.compartir.companchorEl = null;
            estado.compartir.openlist = false;
            estado.compartir.visible = 'none';
            estado.compartir.textbtnlistartodos = textbtnlistartodos;
            estado.compartir.totalusuarios = usuariosconpermiso.length;
            estado.compartir.deletesharedisable = disable;
            self.setState({
              estado
            });
          })
          .catch((error) => {
            throw error;
          });
      })
      .catch((error) => {
        throw error;
      });
  }

  // / Buscar User ó Grupos por la denominación ////

  handleCloseMenuUser = (event, vacio) => {
    let denom = event.target.value;
    if (vacio) {
      denom = '';
    }
    const estado = self.state;
    if (self.state.menu.menuselect === 'Grupos') {
      estado.grupos.btnagregardisable = true;
      estado.grupos.usuariosselect = denom;
      estado.grupos.companchorEl = null;
      estado.grupos.openlist = false;
      estado.grupos.visible = 'none';
    } else {
      estado.usersygroups.listusersygrups = [];
      estado.compartir.btnsharedisable = true;
      estado.compartir.usuariosshare = denom;
      estado.compartir.companchorEl = null;
      estado.compartir.openlist = false;
      estado.compartir.visible = 'none';
    }
    self.setState({
      estado
    });
  }


  // / Seleccionar el usuario a compartir Documento ////
  handleSeleccionarUsuario = (event, user) => {
    const estado = self.state;
    estado.compartir.btnsharedisable = false;
    estado.compartir.usuariosshare = user;
    estado.compartir.companchorEl = null;
    estado.compartir.openlist = false;
    estado.compartir.visible = 'none';
    self.setState({
      estado
    });
  }

  // / Buscar Usuario para Compartir Documento ////
  handleBuscarUsersGroups = (event) => {
    const denom = event.target.value;
    console.log(denom);
    if (denom.length > 2) {
      const { currentTarget } = event;
      nuxeo.operation('UserGroup.Suggestion')
        .params({
          searchTerm: denom
        })
        .execute()
        .then((users) => {
          const usuarios = [];
          const usuariocomp = false;
          users.forEach(element => {
            let encontrado = null;
            if (element.id === user || element.id === seleccionado.creadopor) {
              encontrado = element.id;
            } else {
              if (self.state.menu.menuselect === 'Grupos') {
                encontrado = self.state.grupos.listusuarios.find(fila => element.id === fila.id);
              }
              if (self.state.menu.menuselect === 'Espacio de Grupo de Trabajo') {
                encontrado = self.state.permisos.listuserexternos.find(fila => element.id === fila.username);
              } else if (self.state.menu.menuselect != 'Espacio de Grupo de Trabajo' && self.state.menu.menuselect != 'Grupos') {
                encontrado = self.state.compartir.todosusuariosshare.find(fila => element.id === fila.username);
              }
            }
            if (!encontrado) {
              let repetido = true;
              let pos = 0;
              let avatar = '';
              while (repetido) {
                if (repetido) {
                  if (pos === 0) {
                    avatar = element.id.charAt().toUpperCase();
                  } else if (pos === 1) {
                    const temp = element.id.split('.');
                    avatar = element.id.charAt().toUpperCase();
                    if (temp.length === 1 || temp[1] !== '') {
                      avatar += element.id.charAt(pos + 1).toUpperCase();
                    } else {
                      avatar += temp[1].charAt().toUpperCase();
                    }
                  } else {
                    avatar += element.id.charAt(pos).toUpperCase();
                  }
                }
                let esta = false;
                for (let i = 0; i < usuarios.length; i++) {
                  if (avatar === usuarios[i].avatar) {
                    esta = true;
                  }
                }
                if (!esta) {
                  repetido = false;
                }
                pos += 1;
              }
              const obj = {
                username: element.id,
                name: element.displayLabel,
                email: element.email,
                avatar,
              };
              usuarios.push(obj);
            }
          });
          const disable = true;
          let abrir = false;
          let display = 'none';
          const email = '';
          if (usuarios.length > 0) {
            abrir = true;
            display = 'block';
          }
          // console.log(usuarios);
          const estado = self.state;
          if (self.state.menu.menuselect === 'Grupos') {
            estado.grupos.btnagregardisable = disable;
            estado.grupos.usuariosselect = denom;
            estado.usersygroups.listusersygrups = usuarios;
            estado.grupos.companchorEl = currentTarget;
            estado.grupos.openlist = abrir;
            estado.grupos.visible = display;
          } else {
            estado.compartir.btnsharedisable = disable;
            estado.compartir.usuariosshare = denom;
            estado.usersygroups.listusersygrups = usuarios;
            estado.compartir.companchorEl = currentTarget;
            estado.compartir.openlist = abrir;
            estado.compartir.visible = display;
          }
          self.setState({
            estado
          });
        })
        .catch((error) => {
          throw new Error(error);
        });
    } else {
      this.handleCloseMenuUser(event, false);
    }
  }


  // /Notificar a todos los usuarios con acceso al documento////
  handleNotificarEmail = (listuser, acl) => {
    const cont = 1;
    if (acl === 'compartidos') {
      self.recursiveNotificarEmail(listuser, cont, listuser.length);
    } else {
      self.sendEmailUser(listuser, cont, listuser.length);
    }
  }

  recursiveNotificarEmail = (listuser, cont, length) => {
    let msg = 'El documento dejó de compartirse de forma satisfactoria';
    const msgemail = 'Hoy ' + moment().format('YYYY-MM-DD HH:mm:ss') + ' el usuario ' + user + ' dejó de compartir el documento ' + seleccionado.name;
    nuxeo.operation('UserGroup.Suggestion')
      .params({
        searchTerm: listuser[0].username
      })
      .execute()
      .then((users) => {
        if (users[0].type === 'USER_TYPE') {
          nuxeo.operation('Document.Mail')
            .input(seleccionado.path)
            .params({
              message: msgemail,
              subject: 'Sistemas Internos, dejó de compartirse el documento',
              from: emailempresa,
              to: users[0].email,
            })
            .execute()
            .then((doc) => {
              if (length > cont) {
                const newList = listuser.splice(0, 1);
                cont += 1;
                self.recursiveNotificarEmail(listuser, cont, length);
              } else {
                if (length > 1) {
                  msg = 'El documento dejó de compartirse de forma satisfactoria';
                }
                self.listarACLShare(doc.path, self.state.compartir.btnlistartodos);
                notification('success', msg);
              }
            });
        } else if (length > cont) {
          const newList = listuser.splice(0, 1);
          cont += 1;
          self.recursiveNotificarEmail(listuser, cont, length);
        } else {
          if (length > 1) {
            msg = 'El documento dejó de compartirse de forma satisfactoria';
          }
          self.listarACLShare(seleccionado.path, self.state.compartir.btnlistartodos);
          notification('success', msg);
        }
      });
  }

  sendEmailUser(listuser, cont, length) {
    let msg = 'El documento ya no está disponible para los usuarios externos';
    const msgemail = 'Hoy ' + moment().format('YYYY-MM-DD HH:mm:ss') + ' el usuario ' + user + ' le retiró el acceso al documento ' + seleccionado.name;
    nuxeo.operation('Document.Mail')
      .input(seleccionado.path)
      .params({
        message: msgemail,
        subject: 'Sistema de Aguas, Permiso revocado',
        from: emailempresa,
        to: listuser[0].email,
      })
      .execute()
      .then((doc) => {
        if (length > cont) {
          const newList = listuser.splice(0, 1);
          cont += 1;
          self.sendEmailUser(listuser, cont, length);
        } else {
          if (length > 1) {
            msg = 'El documento ya no está disponible para los usuarios externos';
          }
          self.listarACLSdocumentos(doc.path, false);
          notification('success', msg);
        }
      });
  }

  // /Eliminar todos los permisos de usuarios en la seción////
  handleDeletePermisosUserAll = (acl) => {
    nuxeo.operation('Document.RemoveACL')
      .input(seleccionado.path)
      .params({ acl })
      .execute()
      .then((doc) => {
        self.listarACLSdocumentos(doc.path, false);
        notification('success', 'Todos los permisos concedidos en la secció fueron eliminados');
      })
      .catch((error) => {
        notification('danger', 'Error al eliminar los permisos concedidos');
      });
  }

  // /Eliminar el permiso concedido al usuario////
  handleDeletePermUserSec = (obj, acl) => {
    const user = obj.displayusername;
    nuxeo.operation('Document.RemovePermission')
      .input(seleccionado.path)
      .params({
        acl,
        id: obj.id,
        user: obj.username
      })
      .execute()
      .then((doc) => {
        self.listarACLSdocumentos(doc.path, false);
        notification('success', 'El permiso fue eliminado satisfactoriamente');
      })
      .catch((error) => {
        notification('danger', 'Error al eliminar el permiso concedido');
      });
  }


  // /Dejar de compartir el documento////
  handleDeleteShareAll = (acl) => {
    nuxeo.operation('Document.RemoveACL')
      .input(seleccionado.path)
      .params({ acl })
      .execute()
      .then((doc) => {
        let usuarios = [];
        if (acl === 'compartidos') {
          usuarios = self.state.compartir.listusuarios;
          self.handleNotificarEmail(usuarios, 'compartidos');
        } else {
          usuarios = self.state.permisos.listuserexternos;
          self.handleNotificarEmail(usuarios, 'local');
        }
      })
      .catch((error) => {
        notification('danger', 'Error al dejar de compartir el documento');
      });
  }

  // /Dejar de compartir con un usuario////
  handleDeleteShare = (obj, acl) => {
    const user = obj.displayusername;
    nuxeo.operation('Document.RemovePermission')
      .input(seleccionado.path)
      .params({
        acl,
        id: obj.id,
        user: obj.username
      })
      .execute()
      .then((doc) => {
        const list = [];
        list.push(obj);
        nuxeo.operation('UserGroup.Suggestion')
          .params({
            searchTerm: obj.username,
          })
          .execute()
          .then((users) => {
            // console.log(users);
            if (users[0].type === 'USER_TYPE') {
              self.handleNotificarEmail(list, acl);
            } else {
              const estado = self.state;
              if (acl === 'compartidos') {
                self.listarACLShare(doc.path, self.state.compartir.btnlistartodos);
                estado.compartir.btnsharedisable = true;
                estado.compartir.usuariosshare = '';
                estado.compartir.usuarioemail = '';
              } else {
                self.listarACLSdocumentos(doc.path, false);
                estado.permisos.btnpermisosdisable = true;
                estado.permisos.usuariospermisos = '';
                estado.permisos.usuarioemail = '';
              }
              notification('success', 'El documento dejó de com satisfactoriamente');
            }
          });
      })
      .catch((error) => {
        notification('danger', 'Error al dejar de compartir el documento');
      });
  }

  handleSendEmailForPermision = (id, acl) => {
    nuxeo.operation('Document.SendNotificationEmailForPermission')
      .enrichers({ document: ['favorites', 'breadcrumb', 'userVisiblePermissions', 'acls', 'publications', 'tags'] })
      .input(seleccionado.path)
      .params({
        id,
      })
      .execute()
      .then((doc) => {
        const estado = self.state;
        if (acl === 'compartidos') {
          self.listarACLShare(doc.path, self.state.compartir.btnlistartodos);
          estado.compartir.btnsharedisable = true;
          estado.compartir.usuariosshare = '';
          estado.compartir.usuarioemail = '';
        } else {
          self.listarACLSdocumentos(doc.path, false);
          estado.permisos.btnpermisosdisable = true;
          estado.permisos.usuariospermisos = '';
          estado.permisos.usuarioemail = '';
        }
        estado.notificacion.variante = 'success';
        estado.notificacion.mensaje = 'El documento fue compartido satisfactoriamente';
        self.setState({
          estado
        });
      });
  }

  // / Dar Permiso a la Seción ////
  handleActionPermitirUser = (e) => {
    // console.log('voy a compartir');
    nuxeo.operation('Document.AddPermission')
      .enrichers({ document: ['favorites', 'breadcrumb', 'userVisiblePermissions', 'acls', 'publications', 'tags'] })
      .input(seleccionado.path)
      .params({
        permission: 'ReadWrite',
        username: this.state.compartir.usuariosshare,
        acl: 'local',
        begin: moment(),
      })
      .execute()
      .then((doc1) => {
        const estado = self.state;
        self.listarACLSdocumentos(doc1.path, false);
        estado.compartir.btnsharedisable = true;
        estado.compartir.usuariosshare = '';
        estado.compartir.usuarioemail = '';

        notification('success', 'El permiso fue otorgado satisfactoriamente');
      })
      .catch((error) => {
        notification('danger', 'Error al otorgar el permiso');
      });
  }

  // / Agregar Usuario al Grupo////
  handleActionAgregar = (e) => {
    nuxeo.request('group/' + seleccionado.id + '/user/' + this.state.grupos.usuariosselect)
      .post()
      .then((res) => {
        self.listarUserGrupo(seleccionado.id, false);
        notification('success', 'El usuario fue añadido satisfactoriamente');
      })
      .catch((error) => {
        notification('danger', 'Error al adicionar el usuario al grupo');
      });
  }

  // / Eliminar todos los usuarios del grupo///
  handleActionsEliminarTodosUsers = () => {
    const seleccionados = this.state.grupos.usuarios;
    const contador = 1;
    this.handlerecursiveEliminarUserGrupo(seleccionados, contador, seleccionados.length);
  }

  handlerecursiveEliminarUserGrupo(lista, cont, longt) {
    nuxeo.request('group/' + seleccionado.id + '/user/' + lista[0].id)
      .delete()
      .catch((r) => {
        if (longt > cont) {
          const newList = lista.splice(0, 1);
          cont += 1;
          self.handlerecursiveEliminarUserGrupo(lista, cont, longt);
        } else {
          self.listarUserGrupo(seleccionado.id, false);
          notification('success', 'Los usuarios fueron eliminados del grupo satisfactoriamente');
        }
      });
  }

  // / Eliminar Usuario del Grupo ////
  handleActionQuitar = (row) => {
    nuxeo.request('group/' + seleccionado.id + '/user/' + row.id)
      .delete()
      .catch((r) => {
        self.listarUserGrupo(seleccionado.id, false);
        notification('success', 'El usuario fue eliminado del grupo satisfactoriamente');
      });
  }

  // / Compartir Documento ////
  handleActionShare = (e) => {
    nuxeo.operation('Document.AddPermission')
      .enrichers({ document: ['favorites', 'breadcrumb', 'userVisiblePermissions', 'acls', 'publications', 'tags'] })
      .input(seleccionado.path)
      .params({
        permission: 'Read',
        username: this.state.compartir.usuariosshare,
        acl: 'compartidos',
        begin: moment(),
      })
      .execute()
      .then((doc1) => {
        const aces = doc1.contextParameters.acls.find(fila => fila.name === 'compartidos');
        let id = '';
        aces.aces.forEach(element => {
          if (element.username === self.state.compartir.usuariosshare) {
            id = element.id;
          }
        });
        self.handleSendEmailForPermision(id, 'compartidos');
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  // / Actualizar el permiso ///
  editarPermiso = (permiso, acl) => {
    let permconcedido = 'Read';
    const hasta = null;
    let notificar = false;
    let diremail = null;
    let duracion = null;
    if (acl === 'compartidos') {
      if (this.state.compartir.permisoescritrura) {
        permconcedido = 'ReadWrite';
      }
      if (this.state.compartir.permisotodos) {
        permconcedido = 'Everything';
      }
      if (this.state.compartir.notificar === 'block') {
        notificar = true;
        diremail = this.state.compartir.direcemail;
      }
      duracion = self.state.compartir.duracionhasta;
    } else {
      if (this.state.permisos.permisoescritrura) {
        permconcedido = 'ReadWrite';
      }
      if (this.state.permisos.permisotodos) {
        permconcedido = 'Everything';
      }
      if (this.state.permisos.notificar === 'block') {
        notificar = true;
        diremail = this.state.permisos.direcemail;
      }
      duracion = self.state.permisos.duracionhasta;
    }

    nuxeo.operation('Document.ReplacePermission')
      .enrichers({ document: ['favorites', 'breadcrumb', 'userVisiblePermissions', 'acls', 'publications', 'tags'] })
      .input(seleccionado.path)
      .params({
        id: permiso.id,
        permission: permconcedido,
        username: permiso.username,
        acl,
        begin: moment(permiso.concedido),
        end: moment(duracion),
      })
      .execute()
      .then((doc1) => {
        let aces = '';
        let id = '';
        if (acl === 'compartidos') {
          aces = doc1.contextParameters.acls.find(fila => fila.name === 'compartidos');
        } else {
          aces = doc1.contextParameters.acls.find(fila => fila.name === 'local');
        }
        aces.aces.forEach(element => {
          if (element.username === permiso.username) {
            id = element.id;
          }
        });
        self.handleSendEmailForPermision(id, acl);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }


  // / Verificar Correo ////
  handleVerificarEmail = (event) => {
    // const { currentTarget } = event;
    const expresion = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
    // console.log(expresion.test(String(event.target.value).toLowerCase()))
    const denom = String(event.target.value).toLowerCase();
    const array = denom.split('@');
    const estado = self.state;
    if (expresion.test(denom)) {
      estado.permisos.btnpermisosdisable = false;
      estado.permisos.usuariospermisos = array[0];
      estado.permisos.direcemail = denom;
      // console.log(array[0]);
    } else {
      estado.permisos.btnpermisosdisable = true;
      estado.permisos.usuariospermisos = '';
      estado.permisos.direcemail = denom;
    }
    self.setState({
      estado
    });
  }

  // / Permitir Acceso Externo al documento////
  handleActionConcederPermisoExterno = (e) => {
    const fecha = moment().add(1, 'months');
    nuxeo.operation('Document.AddPermission')
      .enrichers({ document: ['favorites', 'breadcrumb', 'userVisiblePermissions', 'acls', 'publications', 'tags'] })
      .input(seleccionado.path)
      .params({
        permission: 'Read',
        notify: true,
        email: this.state.permisos.direcemail,
        acl: 'local',
        begin: moment(),
        end: fecha,
        blockInheritance: false,
      })
      .execute({ schemas: ['file', 'dublincore'] })
      .then((doc) => {
        self.listarACLSdocumentos(doc.path, false);
        const estado = self.state;
        estado.permisos.btnpermisosdisable = true;
        estado.permisos.usuariospermisos = '';
        estado.permisos.direcemail = '';

        notification('success', 'Permiso concedido y el usuario fue notificado satisfactoriamente');
      })
      .catch((error) => {
        notification('danger', 'Error al conceder el permiso y notificar al usuario');
      });
  }

  // / Mostrar detalle ////
  mostrarDetalle = (index) => {
    const listusuarios = this.state.permisos.listcompartidos;
    listusuarios[index].mostrarformulario = !listusuarios[index].mostrarformulario;
    const estado = this.state;
    estado.permisos.listcompartidos = listusuarios;
    this.setState({
      estado
    });
  };

  // / Listar ACLS permisos documento ///
  listarACLSdocumentos = (path, todos) => {
    nuxeo.repository()
      .fetch(path)
      .then((doc) => {
        const id = doc.uid;
        nuxeo.request('id/' + doc.uid + '/@acl')
          .get()
          .then((res) => {
            // console.log(res);
            let local = [];
            let compartidos = [];
            const heredados = [];
            res.acl.forEach(element => {
              const usuariospermitidos = [];
              element.ace.forEach(ace => {
                let repetido = true;
                let pos = 0;
                let avatar = '';
                const usuario = ace.username;
                let displayuser = ace.username;
                let transient = '';
                let email = '';
                // if (element.name === 'local') {
                transient = ace.username.split('/');
                // console.log(transient.length);
                if (transient.length > 1) {
                  email = transient[1].split('@');
                  displayuser = email[0];
                }
                //  }
                if (displayuser === 'Everyone') {
                  displayuser = 'Todos los usuarios';
                }
                while (repetido) {
                  if (repetido) {
                    if (pos === 0) {
                      avatar = displayuser.charAt().toUpperCase();
                    } else if (pos === 1) {
                      const temp = displayuser.split('.');
                      avatar = displayuser.charAt().toUpperCase();
                      if (temp.length === 1) {
                        avatar += displayuser.charAt(pos + 1).toUpperCase();
                      } else {
                        avatar += temp[1].charAt().toUpperCase();
                      }
                    } else {
                      avatar += displayuser.charAt(pos).toUpperCase();
                    }
                  }
                  let esta = false;
                  for (let i = 0; i < usuariospermitidos.length; i++) {
                    if (avatar === usuariospermitidos[i].avatar) {
                      esta = true;
                    }
                  }
                  if (!esta) {
                    repetido = false;
                  }
                  pos += 1;
                }
                // console.log(ace);
                let duracion = 'Permanente';
                let estatus = 'Inactivo';
                let concedido = null;
                if (ace.begin) {
                  concedido = moment(ace.begin).format('YYYY-MM-DD HH:mm:ss');
                }
                if (ace.end) {
                  duracion = 'Hasta el ' + moment(ace.end).format('YYYY-MM-DD HH:mm:ss');
                }
                if (ace.status == 'effective') {
                  estatus = 'Activo';
                }
                const permisos = ace.permission.split(',');
                let j = 0;
                let permtraducidos = '';
                let todos = false;
                let escritura = false;
                const permisootorgado = ace.granted;
                while (j < permisos.length) {
                  let traduc = '';
                  if (permisos[j] === 'Read') {
                    if (permisootorgado) {
                      traduc = 'Lectura';
                    } else {
                      traduc = 'No tiene permiso de lectura';
                    }
                  }
                  if (permisos[j] === 'ReadWrite') {
                    if (permisootorgado) {
                      traduc = 'Lectura y escritura';
                      escritura = true;
                    } else {
                      traduc = 'No tiene permiso de lectura, ni de escritura';
                    }
                  }
                  if (permisos[j] === 'Everything') {
                    if (permisootorgado) {
                      traduc = 'Todos los permisos';
                      todos = true;
                    } else {
                      traduc = 'No tienen permiso';
                    }
                  }
                  if (j === 0) {
                    permtraducidos = traduc;
                  } else {
                    permtraducidos = permtraducidos + ' , ' + traduc;
                  }
                  j += 1;
                }
                const obj = {
                  id: ace.id,
                  permission: permtraducidos,
                  status: estatus,
                  username: usuario,
                  displayusername: displayuser,
                  email: transient[1],
                  creator: ace.creator,
                  duracion,
                  avatar,
                  mostrarformulario: false,
                  permtodos: todos,
                  concedido,
                  permescritura: escritura,
                  duracionhasta: ace.end,
                };
                usuariospermitidos.push(obj);
              });
              switch (element.name) {
                case 'local':
                  local = usuariospermitidos;
                  break;
                case 'compartidos':
                  compartidos = usuariospermitidos;
                  break;
                default:
                  for (let i = usuariospermitidos.length - 1; i >= 0; i--) {
                    heredados.push(usuariospermitidos[i]);
                  }
                  // heredados = usuariospermitidos;
                  break;
              }
            });
            const estado = self.state;
            if (self.state.menu.menuselect === 'Espacio de Grupo de Trabajo') {
              estado.permisos.listuserexternos = local;
              estado.compartir.deletesharedisable = !(local.length > 0);
            } else {
              estado.permisos.listuserexternos = local;
              estado.permisos.listcompartidos = compartidos;
              estado.permisos.listheredados = heredados;
              estado.permisos.deletepermisosdisable = !(local.length > 0);
            }
            self.setState({
              estado
            });
            // console.log('disable ' + estado.permisos.deletepermisosdisable);
          })
          .catch((error) => {
            throw error;
          });
      })
      .catch((error) => {
        throw error;
      });
  }


  // Listar Micelaneas ///
  listarMicelaneas = () => {
    // console.log(seleccionado);
    nuxeo.operation('Repository.GetDocument')
      .params({ value: seleccionado.id })
      .enrichers({ document: ['publications', 'subscribedNotifications'] })
      .execute()
      .then((doc) => {
        self.verificarExpira(seleccionado);
        self.verificarsubscripcion(doc, false);
      });
  }

  // Ver cuales de las notificaciones está seleccionadas ///
  verificarsubscripcion = (doc, mostrarnotif, subscrip) => {
    let msg = 'Usted ya no está subscrito al documento';
    const estado = this.state;
    let modif = false;
    let comment = false;
    estado.showBackdrop = false;
    if (doc.contextParameters.subscribedNotifications.length >= 2) {
      estado.subscripcion.notifsubscripcion = true;
      modif = true;
      comment = true;
      msg = 'La subscripción se realizó de forma satisfactoria';
    } else {
      estado.subscripcion.notifsubscripcion = false;
      doc.contextParameters.subscribedNotifications.forEach(element => {
        if (element === 'Modifications') {
          modif = true;
          msg = 'Usted se subscribió a las notificaciones de modificación';
        }
        if (element === 'CommentAdded') {
          comment = true;
          msg = 'Usted se subscribió a las notificaciones de nuevo comentario';
        }
      });
    }
    if (!subscrip) {
      if (!modif && comment) {
        msg = 'Usted ya no está subscrito a las notificaciones de modificación';
      }
      if (modif && !comment) {
        msg = 'Usted ya no está subscrito a las notificaciones de nuevos comentario';
      }
    }
    estado.subscripcion.notifmodificar = modif;
    estado.subscripcion.notifcomment = comment;
    if (mostrarnotif) {
      notification('success', msg);
    }
    estado.subscripcion.expandir = self.state.subscripcion.expandir;
  }

  // Expandir el opciones de subscripcion////
  handleChangeExpandirSubscrip = () => {
    const estado = this.state;
    estado.subscripcion.expandir = !this.state.subscripcion.expandir;
    this.setState({
      estado
    });
  };


  // / Suscribirse al documento ///

  SubscribirseAlDocumento = (notificacion) => {
    let notif = {};
    if (notificacion !== 'Todos') {
      notif = { notifications: notificacion };
    }
    nuxeo.operation('Document.Subscribe')
      .input(seleccionado.path)
      .enrichers({ document: ['publications', 'subscribedNotifications'] })
      .params(notif)
      .execute()
      .then((doc) => {
        self.verificarsubscripcion(doc, true, true);
      })
      .catch((error) => {
        // throw error;
        notification('danger', error);
      });
  }

  // / undescribirse de un documento ///
  UnSubscribirseDelDocumento = (notificacion) => {
    let notif = {};
    const msg = 'Ustad ya no está subscrito al documento';
    if (notificacion !== 'Todos') {
      notif = { notifications: notificacion };
    }
    nuxeo.operation('Document.Unsubscribe')
      .input(seleccionado.path)
      .enrichers({ document: ['publications', 'subscribedNotifications'] })
      .params(notif)
      .execute()
      .then((doc) => {
        self.verificarsubscripcion(doc, true, false);
      })
      .catch((error) => {
        notification('danger', error);
      });
  }


  // /  subscribirse a las notificaciones de un documento ///
  handleChangeSubscribirse = (subscripcion, notificacion) => {
    const estado = this.state;
    estado.showBackdrop = true;
    this.setState({
      estado
    });
    const marcado = !subscripcion;
    if (marcado) {
      this.SubscribirseAlDocumento(notificacion);
    } else {
      this.UnSubscribirseDelDocumento(notificacion);
    }
  }


  // Cambiar la fecha de expiracion //
  handleChangeExpiracion = (date) => {
    const fecha = moment(date).format('YYYY-MM-DD');
    nuxeo.repository()
      .fetch(seleccionado.path)
      .then((doc) => {
        // doc.title !== 'foo'
        doc.set({
          'dc:expired': fecha,
        });
        doc.save();
        // console.log(doc);
        const objstate = self.state;
        objstate.expiracion.fechaexpiracion = fecha;
        notification('success', 'El documento expirará el ' + fecha);
        self.setState({
          objstate
        });
      });
  }

  cambiarEstadoExpiracion = (e) => {
    if (e.target.value == '') {
      const objstate = this.state;
      objstate.expiracion.fechaexpiracion = fecha;
      this.setState({
        objstate
      });
    }
  }

  // / verificar si expira el documento //
  verificarExpira = (doc) => {
    let fecha = moment().add(1, 'day');
    let disable = true;
    const { extension } = doc;
    let permiso = false;
    if (extension == '.doc' || extension == '.dot' || extension == '.docb' || extension == '.ods' || extension == '.ots' || extension == '.odt' || extension == '.ott' || extension == '.odp' || extension == '.otp' || extension == '.odg' || extension == '.otg' || extension == '.pdf' || extension == '.docm' || extension == '.docx' || extension == '.dotm' || extension == '.dotx' || extension == '.xls' || extension == '.xlt' || extension == '.xlsb' || extension == '.xlsm' || extension == '.xlsx' || extension == '.xps' || extension == '.csv' || extension == '.ppt' || extension == '.pot' || extension == '.pps' || extension == '.mpp' || extension == '.pub' || extension == '.ppsm' || extension == '.ppsx' || extension == '.pptm' || extension == '.pptx' || extension == '.vsdx' || extension == '.vsd' || extension == '.vst') {
      disable = false;
      doc.permisos.forEach(element => {
        if (element === 'Everything') {
          permiso = true;
        }
      });
      if (permiso === false) {
        disable = true;
      }
    }
    if (doc.expira != null) {
      fecha = doc.expira;
    }
    const objstate = this.state;
    objstate.expiracion.expriracionvisible = disable;
    objstate.expiracion.fechaexpiracion = doc.expira;
    objstate.expiracion.fechamin = fecha;
    this.setState({
      objstate
    });
  }


  // / Mostrar formulario editar permiso ////
  prepararActPermisoExt = (index) => {
    const listusuarios = this.state.permisos.listuserexternos;
    listusuarios[index].mostrarformulario = true;
    let disable = 'none';
    if (listusuarios[index].duracionhasta) {
      disable = 'block';
    }
    const estado = this.state;
    estado.permisos.listuserexternos = listusuarios;
    estado.permisos.permisoescritrura = listusuarios[index].permescritura;
    estado.permisos.permisotodos = listusuarios[index].permtodos;
    estado.permisos.duracionhasta = listusuarios[index].duracionhasta;
    estado.permisos.notificar = 'none';
    estado.permisos.fechadisable = disable;
    this.setState({
      estado
    });
  };


  // / Cancelar la edición del permiso del usuario ////
  cancelarPermisoEdicion = (index) => {
    const listusuarios = this.state.permisos.listuserexternos;
    listusuarios[index].mostrarformulario = false;
    const estado = this.state;
    estado.permisos.listuserexternos = listusuarios;
    estado.permisos.permisoescritrura = false;
    estado.permisos.permisotodos = false;
    estado.permisos.duracionhasta = null;
    estado.permisos.notificar = 'none';
    estado.permisos.comentario = '';
    estado.permisos.direcemail = null;
    estado.permisos.errordirecmail = null;
    estado.permisos.fechadisable = 'none';
    this.setState({
      estado
    });
  }


  // Menu seleccionados acciones(adicionar Archivos a Favoritos)///
  handleActionsMenuAddFavorite = () => {
    this.handleMenuActionsClose();
    const seleccionados = this.devuelveseleccionados();
    const contador = 1;
    this.handlerecursiveAddFav(seleccionados, contador, seleccionados.length);
  }


  handlerecursiveAddFav(lista, cont, longt) {
    let msg = 'El achrivo ' + lista[0].name + ' fue seleccionado como favorito';
    // let encontrado = rows.find(fila => lista[0] === fila.name)
    nuxeo.operation('Document.AddToFavorites')
      .input(lista[0].path)
      .execute()
      .then((doc) => {
        if (longt > cont) {
          const newList = lista.splice(0, 1);
          cont += 1;
          self.handlerecursiveAddFav(lista, cont, longt);
        } else {
          if (longt > 1) {
            msg = 'Los archivos fueron seleccionados como favoritos';
          }
          if (self.state.menu.menuselect === 'Búsqueda') {
            self.handleEjecutarQuery(self.state.busqueda.sql);
          } else {
            self.listarArchivos(self.state.path, self.state.iconvacio);
          }
          notification('success', msg);
        }
      })
      .catch((error) => {
        // throw error;
        notification('danger', error);
      });
  }


  // Menu seleccionados acciones(remover Archivos de Favoritos)///
  handleActionsMenuRemoveFavorite = () => {
    this.handleMenuActionsClose();
    const seleccionados = this.devuelveseleccionados();
    const contador = 1;
    this.handlerecursiveRemoveFav(seleccionados, contador, seleccionados.length);
    // let msg = 'El achrivo ' + seleccionados[0] + ' ya no es favorito'
  }

  handlerecursiveRemoveFav(lista, cont, longt) {
    let msg = 'El achrivo ' + lista[0].name + ' ya no es favorito';
    nuxeo.operation('Document.RemoveFromFavorites')
      .input(lista[0].path)
      .execute()
      .then((doc) => {
        if (longt > cont) {
          const newList = lista.splice(0, 1);
          cont += 1;
          self.handlerecursiveRemoveFav(lista, cont, longt);
        } else {
          if (longt > 1) {
            msg = 'Los archivos seleccionados ya no son favoritos';
          }
          if (self.state.menu.menuselect === 'Búsqueda') {
            self.handleEjecutarQuery(self.state.busqueda.sql);
          } else {
            self.listarArchivos(self.state.path, self.state.iconvacio);
          }
          notification('success', msg);
        }
      })
      .catch((error) => {
        // throw error;
        notification('danger', error);
      });
  }


  // Menu seleccionados acciones(Bloquear Archivo)///
  handleActionsMenuBloquear = () => {
    this.handleMenuActionsClose();
    const seleccionado = this.devuelveseleccionados();
    // let seleccionado = this.state.tabla.selected;
    nuxeo.operation('Document.Lock')
      .input(seleccionado[0].path)
      .execute()
      .then((doc) => {
        if (self.state.menu.menuselect === 'Búsqueda') {
          self.handleEjecutarQuery(self.state.busqueda.sql);
        } else {
          self.listarArchivos(self.state.path, self.state.iconvacio);
        }
        notification('success', 'El archivo ' + seleccionado[0].name + ' fue bloqueado satisfactoriamente');
      })
      .catch((error) => {
        // throw error;
        notification('danger', error);
      });
  }

  // Menu seleccionados acciones(Bloquear Archivo)///
  handleActionsMenuDesbloquear = () => {
    this.handleMenuActionsClose();
    const seleccionado = this.devuelveseleccionados();
    // let seleccionado = this.state.tabla.selected;
    nuxeo.operation('Document.Unlock')
      .input(seleccionado[0].path)
      .execute()
      .then((doc) => {
        if (self.state.menu.menuselect === 'Búsqueda') {
          self.handleEjecutarQuery(self.state.busqueda.sql);
        } else {
          self.listarArchivos(self.state.path, self.state.iconvacio);
        }
        notification('success', 'El archivo ' + seleccionado[0].name + ' fue desbloqueado satisfactoriamente');
      })
      .catch((error) => {
        // throw error;
        notification('danger', error);
      });
  }

  prepararMovimiento = () => {
    const seleccionados = [];
    this.state.tabla.selected.forEach(element => {
      const encontrado = rows.find(fila => element === fila.name);
      if (encontrado) {
        const obj = {
          id: encontrado.id,
          path: encontrado.path,
          name: encontrado.name
        };
        seleccionados.push(obj);
      }
    });
    const item = this.state;
    // item.acciones.mover = false;
    item.mover.btnclearmover = true;
    item.mover.btnaceptarmovimiento = true;
    item.mover.nosubcarpeta = false;
    item.mover.pathmovorigen = seleccionados;
    item.tabla.selected = [];
    item.tabla.numSelected = 0;
    self.setState({
      item
    });
    this.handleMenuActionsClose();
    // alert('SE esta preparando el movimiento');
  }

  cancelarMovimiento = () => {
    const item = this.state;
    // item.acciones.mover = false;
    item.mover.btnclearmover = false;
    item.mover.btnaceptarmovimiento = false;
    item.mover.nosubcarpeta = false;
    item.mover.pathmovorigen = [];
    self.setState({
      item
    });
  }

  handleActionsMenuMover = () => {
    const contador = 1;
    this.handlerecursiveMover(this.state.mover.pathmovorigen, contador, this.state.mover.pathmovorigen.length);
  }

  handlerecursiveMover = (lista, cont, longt) => {
    let msg = 'El achrivo ' + lista[0].name + ' fue movido satisfactoriamente';
    if (this.state.mover.pathmovorigen.length > 1) {
      msg = 'Los archivos fueron movidos satisfactoriamente';
    }
    nuxeo.operation('Document.Move')
      .input(lista[0].path)
      .params({ target: this.state.path })
      .execute()
      .then((doc) => {
        if (longt > cont) {
          const newList = lista.splice(0, 1);
          cont += 1;
          self.handlerecursiveMover(lista, cont, longt);
        } else {
          if (longt > 1) {
            msg = 'Los archivos fueron movidos satisfactoriamente';
          }
          self.listarArchivos(self.state.path, self.state.iconvacio);
          const item = self.state;
          item.mover.btnclearmover = false;
          item.mover.btnaceptarmovimiento = false;
          item.mover.nosubcarpeta = false;
          item.mover.pathmovorigen = [];
          notification('success', msg);
          self.setState({
            item
          });
        }
      })
      .catch((error) => {
        // throw error;
        notification('danger', error);
      });
  }

  devuelveseleccionados = () => {
    const seleccionados = [];
    const marcados = this.state.tabla.selected;
    for (let j = 0; j < marcados.length; j++) {
      for (let i = 0; i < rows.length; i++) {
        if (marcados[j] === rows[i].name) {
          const obj = {
            id: rows[i].id,
            path: rows[i].path,
            name: rows[i].name,
            tipo: rows[i].tipo,
            eliminado: rows[i].eliminado,
            preview: rows[i].preview,
            thumbnail: rows[i].thumbnail,
            src: rows[i].src,
          };
          seleccionados.push(obj);
        }
      }
    }
    return seleccionados;
  }


  // Menu seleccionados acciones(Eliminar Archivos)///
  handleActionsMenuEliminar = () => {
    this.handleMenuActionsClose();
    const seleccionados = this.devuelveseleccionados();
    const contador = 1;
    this.handlerecursiveEliminar(seleccionados, contador, seleccionados.length);
  }

  handlerecursiveEliminar(lista, cont, longt) {
    let msg = 'El achrivo ' + lista[0].name + ' fue eliminado satisfactoriamente';
    if (self.state.acciones.elimadmin) {
      const msg = 'La seción ' + lista[0].name + ' fue eliminada satisfactoriamente';
    }
    if (lista[0].eliminado === false) {
      nuxeo.operation('Document.Trash')
        .input(lista[0].path)
        .execute()
        .then((doc) => {
          if (longt > cont) {
            const newList = lista.splice(0, 1);
            cont += 1;
            self.handlerecursiveEliminar(lista, cont, longt);
          } else {
            if (longt > 1) {
              msg = 'Los archivos fueron eliminados satisfactoriamente';
              if (self.state.acciones.elimadmin) {
                msg = 'Las seciones fueron eliminadas satisfactoriamente';
              }
            }
            if (self.state.menu.menuselect === 'Búsqueda') {
              self.handleEjecutarQuery(self.state.busqueda.sql);
            } else {
              // self.cargarArchivos()
              self.listarArchivos(self.state.path, self.state.iconvacio);
            }
            notification('success', msg);
          }
        })
        .catch((error) => {
          // throw error;
          notification('danger', error);
        });
    } else if (longt > cont) {
      const newList = lista.splice(0, 1);
      cont += 1;
      self.handlerecursiveEliminar(lista, cont, longt);
    } else {
      if (longt > 1) {
        msg = 'Los archivos fueron eliminados satisfactoriamente';
        if (self.state.acciones.elimadmin) {
          msg = 'Las seciones fueron eliminadas satisfactoriamente';
        }
      }
      if (self.state.menu.menuselect === 'Búsqueda') {
        self.handleEjecutarQuery(self.state.busqueda.sql);
      } else {
        // self.cargarArchivos()
        self.listarArchivos(self.state.path, self.state.iconvacio);
      }
      notification('success', msg);
    }
  }

  // Menu seleccionados acciones(Recuperar Archivos)///
  handleActionsMenuRecuperar = () => {
    this.handleMenuActionsClose();
    const seleccionados = this.state.tabla.selected;
    const contador = 1;
    this.handlerecursiveRecuperar(seleccionados, contador, seleccionados.length);
  }

  handlerecursiveRecuperar(lista, cont, longt) {
    let msg = 'El achrivo ' + lista[0] + ' fue recuperado satisfactoriamente';
    const encontrado = rows.find(fila => lista[0] === fila.name);
    nuxeo.operation('Document.Untrash')
      .input(encontrado.path)
      .execute()
      .then((doc) => {
        if (longt > cont) {
          const newList = lista.splice(0, 1);
          cont += 1;
          self.handlerecursiveRecuperar(lista, cont, longt);
        } else {
          if (longt > 1) {
            msg = 'Los archivos fueron recuperados satisfactoriamente';
          }
          notification('success', msg);
          self.listarArchivos(self.state.path, 'Eliminados');
        }
      })
      .then(response => {

      })
      .catch((error) => {
        // throw error;
        notification('danger', error);
      });
  }

  // Menu seleccionados acciones(Eliminar Permanente)///
  handleActionsMenuEliminarPerm = () => {
    this.handleMenuActionsClose();
    const seleccionados = this.state.tabla.selected;
    const contador = 1;
    this.handlerecursivePurgue(seleccionados, contador, seleccionados.length);
  }

  handlerecursivePurgue(lista, cont, longt) {
    let msg = 'El achrivo ' + lista[0] + ' fue eliminado satisfactoriamente';
    const encontrado = rows.find(fila => lista[0] === fila.name);
    nuxeo.repository()
      .delete(encontrado.path)
      .then((res) => {
        if (longt > cont) {
          const newList = lista.splice(0, 1);
          cont += 1;
          self.handlerecursivePurgue(lista, cont, longt);
        } else {
          if (longt > 1) {
            msg = 'Los archivos fueron eliminados satisfactoriamente.';
          }
          notification('success', msg);
          /* self.setState({
            notificacion: {
              variante: 'success',
              mensaje: msg
            },
          }) */
          self.listarArchivos(self.state.path, 'Eliminados');
        }
      }).catch((error) => {
        // throw error;
        notification('danger', error);
        /* self.setState({
          notificacion: {
            variante: 'error',
            mensaje: error
          },
        }) */
      });
  }

  // Menu seleccionados acciones(Eliminar Permanente)///
  handleClicDeletePerm = () => {
    this.handleMenuActionsClose();
    const contador = 1;
    this.handlerecursiveDeletePerm(rows, contador, rows.length);
  }

  handlerecursiveDeletePerm(lista, cont, longt) {
    let msg = 'El achrivo ' + lista[0].name + ' fue eliminado satisfactoriamente';
    nuxeo.repository()
      .delete(lista[0].path)
      .then((res) => {
        if (longt > cont) {
          const newList = lista.splice(0, 1);
          cont += 1;
          self.handlerecursiveDeletePerm(lista, cont, longt);
        } else {
          if (longt > 1) {
            msg = 'Los archivos fueron eliminados satisfactoriamente.';
          }
          self.listarArchivos(self.state.path, 'Eliminados');
          notification('success', msg);
          /* self.setState({
            notificacion: {
              variante: 'success',
              mensaje: msg
            },
          }) */
        }
      }).catch((error) => {
        // throw error;
        notification('danger', error);
        /* self.setState({
          notificacion: {
            variante: 'error',
            mensaje: error
          },
        }) */
      });
  }

  isSubcarpeta = (obj) => {
    let esta = false;
    if (!this.state.mover.nosubcarpeta) {
      const seleccionados = this.state.mover.pathmovorigen;
      seleccionados.forEach(element => {
        if (element.name === obj.name) {
          esta = true;
        }
      });
    } else {
      esta = true;
    }
    return esta;
  }

  // / Ir hacia Atrás//
  handleClickAtras = (event) => {
    if (this.state.antecesor.listpath.length > 2) {
      nuxeo.repository()
        .fetch(this.state.antecesor.pathantecesor)
        .then((doc) => {
          let denom = doc.title;
          if (doc.type === 'Workspace') {
            denom = self.state.menu.menuselect;
          }
          const encontrado = self.state.antecesor.listpath.find(fila => denom === fila.denom);
          self.handleSeleccionarCamino(encontrado);
        })
        .then((doc) => {
          // doc.title === 'foo'
        })
        .catch((error) => {
          throw error;
        });
    } else if (self.state.menu.menuselect === 'Búsqueda') {
      self.handleEjecutarQuery(self.state.busqueda.sql);
    } else {
      self.handleActionsListItem(self.state.menu.menuselect);
    }
  };

  // / Menu crear archivo (abrir menu)//
  handleClickAddMenuActions = (event) => {
    this.setState({
      anchoraddEl: event.currentTarget,
      openaddmenu: true,
    });
  };

  // / Menu crear archivo (cerrar menu)//
  handleMenuAddActionsClose = () => {
    this.setState({
      anchoraddEl: null,
      openaddmenu: false,
    });
  };

  obtenerseleccionado = (name) => {
    rows.forEach(element => {
      if (element.name === name) {
        // console.log(element);
        seleccionado = {
          id: element.id,
          tipo: element.tipo,
          name: element.name,
          descripcion: element.descripcion,
          estado: element.estado,
          contribuyentes: element.contribuyentes,
          path: element.path,
          parent: element.parent,
          creado: element.creado,
          creadopor: element.creadopor,
          ultcontribuyente: element.ultcontribuyente,
          fechamodif: element.fechamodif,
          modificado: element.modificado,
          tamanno: element.tamanno,
          favorito: element.favorito,
          compartido: element.compartido,
          bloqueado: element.bloqueado,
          permisos: element.permisos,
          expira: element.expira,
          proxysecion: element.proxysecion,
          ownerbloq: element.ownerbloq,
          fechabloq: element.fechabloq,
          etiquetado: element.etiquetado,
          etiquetas: element.etiquetas,
          comentado: element.comentado,
          extension: element.extension,
          denominacion: element.denominacion,
          mineType: element.mineType,
          preview: element.preview,
          thumbnail: element.thumbnail,
          src: element.src,
        };
      }
    });
    return seleccionado;
  }

  mostrarActualizar = () => {
    this.handleMenuActionsClose();
    if (this.state.menu.menuselect === 'Grupos') {
      // console.log('Grupos')
      let select = {};
      // console.log(rows);
      rows.forEach(grupo => {
        if (grupo.name === this.state.tabla.selected[0]) {
          // console.log(grupo)
          select = grupo;
        }
      });
      this.setState({
        ventadicionar: {
          opencrear: true,
          renombrar: true,
          tipo: 'Grupo',
          type: 'Grupo',
          mimeType: 'Folder',
          enunciado: 'Renombrar',
          error: false,
          errorMessage: '',
          denom: select.name,
          descrip: select.descripcion,
          id: select.id,
        },
      });
    } else {
      const select = this.obtenerseleccionado(this.state.tabla.selected[0]);
      let tipo = 'Default';
      if (select.tipo === 'Section') {
        tipo = select.tipo;
      }
      // console.log(select.extension);
      this.setState({
        ventadicionar: {
          opencrear: true,
          renombrar: true,
          tipo,
          type: select.extension,
          mimeType: select.mimeType,
          enunciado: 'Renombrar',
          error: false,
          errorMessage: '',
          denom: select.denominacion,
          descrip: select.descripcion,
          id: select.id,
        },
      });
    }

    this.handleMenuAddActionsClose();
  }

  handleActionsMenuadd = (e, tipo) => {
    // alert('crear documento del tipo' + tipo)\
    let type = '';
    let mimeType = '';
    switch (tipo) {
      case 'Folder': {
        tipo = 'Folder';
        type = 'Folder';
        mimeType = 'Folder';
        break;
      }
      case 'File': {
        tipo = 'Documento';
        type = '.doc';
        mimeType = 'application/msword';
        break;
      }
      case 'Nota': {
        tipo = 'Nota';
        type = '.txt';
        mimeType = 'text/plain';
        break;
      }
      case 'Hoja': {
        tipo = 'Hoja de Cálculo';
        type = '.xls';
        mimeType = 'application/vnd.ms-excel';
        break;
      }
      case 'Presentacion': {
        tipo = 'Presentación';
        type = '.ppt';
        mimeType = 'application/vnd.ms-powerpoint';
        break;
      }
      case 'Secion': {
        tipo = 'Espacio de GT';
        type = 'Section';
        mimeType = 'Folder';
        break;
      }
      case 'Grupo': {
        tipo = 'Grupo';
        type = 'Grupo';
        mimeType = 'Folder';
        break;
      }
      default: {
        tipo = 'Default';
        type = 'Folder';
        mimeType = 'Folder';
        break;
      }
    }
    let enunciado = 'Crear ' + tipo;
    if (tipo === 'Default') {
      enunciado = 'Crear Carpeta';
    }

    this.setState({
      ventadicionar: {
        opencrear: true,
        renombrar: false,
        tipo,
        type,
        enunciado,
        mimeType,
        error: false,
        errorMessage: '',
        denom: '',
        descrip: '',
        id: '',
      },
    });
    this.handleMenuAddActionsClose();
  }

  // /Action ListItem////
  devuelveiconsitems = () => {
    switch (this.state.iconvacio) {
      case 'Archivo': {
        return <Archive style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '40px', marginBottom: '10px' }} />;
        break;
      }
      case 'Recientes': {
        return <History style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '40px', marginBottom: '10px' }} />;
        break;
      }
      case 'Búsqueda': {
        return <Search style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '40px', marginBottom: '10px' }} />;
        break;
      }
      case 'Expirados': {
        return <HourglassEmpty style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '40px', marginBottom: '10px' }} />;
        break;
      }
      case 'Favoritos': {
        return <Grade style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '40px', marginBottom: '10px' }} />;
        break;
      }
      case 'Multimedia': {
        return <PermMedia style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '40px', marginBottom: '10px' }} />;
        break;
      }
      case 'Espacio Personal': {
        return <FolderShared style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '40px', marginBottom: '10px' }} />;
        break;
      }
      case 'Eliminados': {
        return <DeleteSweep style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '40px', marginBottom: '10px' }} />;
        break;
      }
      case 'Espacio de Grupo de Trabajo': {
        return <FolderSpecial style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '40px', marginBottom: '10px' }} />;
        break;
      }
      case 'Grupos': {
        return <Group style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '40px', marginBottom: '10px' }} />;
        break;
      }
      default: {
        return <Folder style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '40px', marginBottom: '10px' }} />;
        break;
      }

        break;
    }
  }

  // /Icono camino////
  devuelveiconscamino = (tipo) => {
    switch (tipo) {
      case 'Archivo': {
        return (
          <Archive style={{
            color: 'primary', fontSize: '23px', marginBottom: '5px', marginRight: '2px'
          }}
          />
        );
        break;
      }
      case 'Recientes': {
        return (
          <History style={{
            color: 'primary', fontSize: '22px', marginBottom: '5px', marginRight: '2px'
          }}
          />
        );
        break;
      }
      case 'Búsqueda': {
        return (
          <Search style={{
            color: 'primary', fontSize: '23px', marginBottom: '5px', marginRight: '2px'
          }}
          />
        );
        break;
      }
      case 'Expirados': {
        return (
          <HourglassEmpty style={{
            color: 'primary', fontSize: '22px', marginBottom: '5px', marginRight: '2px'
          }}
          />
        );
        break;
      }
      case 'Favoritos': {
        return (
          <Grade style={{
            color: 'primary', fontSize: '22px', marginBottom: '5px', marginRight: '2px'
          }}
          />
        );
        break;
      }
      case 'Multimedia': {
        return (
          <PermMedia style={{
            color: 'primary', fontSize: '23px', marginBottom: '5px', marginRight: '4px'
          }}
          />
        );
        break;
      }
      case 'Espacio Personal': {
        return (
          <FolderShared style={{
            color: 'primary', fontSize: '23px', marginBottom: '5px', marginRight: '2px'
          }}
          />
        );
        break;
      }
      case 'Eliminados': {
        return (
          <DeleteSweep style={{
            color: 'primary', fontSize: '23px', marginBottom: '5px', marginRight: '2px'
          }}
          />
        );
        break;
      }
      case 'Espacio de Grupo de Trabajo': {
        return (
          <FolderSpecial style={{
            color: 'primary', fontSize: '23px', marginBottom: '5px', marginRight: '2px'
          }}
          />
        );
        break;
      }
      case 'Grupos': {
        return (
          <Group style={{
            color: 'primary', fontSize: '23px', marginBottom: '5px', marginRight: '2px'
          }}
          />
        );
        break;
      }
      case 'Folder': {
        return (
          <Folder style={{
            color: 'primary', fontSize: '23px', marginBottom: '5px', marginRight: '2px'
          }}
          />
        );
        break;
      }
      default: {

      }
    }
  }


  handleActionsListItem = (item) => {
    let btnhide = false;
    let url = dominio + workspace + user + '/';
    switch (item) {
      case 'Grupos': {
        url = dominio + '/sections/';
        const itemnew = this.state;
        itemnew.titulotoolbar = item;
        itemnew.showBackdrop = true;
        itemnew.iconvacio = item;
        itemnew.path = url;
        itemnew.tabla.order = 'asc';
        itemnew.tabla.orderBy = 'name';
        itemnew.tabla.selected = [];
        itemnew.tabla.numSelected = 0;
        itemnew.tabla.rowCount = 0;
        itemnew.menu.menuselect = item;
        itemnew.menu.hidebtnprincipales = btnhide;
        itemnew.acciones.papelera = false;
        itemnew.acciones.crear = true;
        itemnew.acciones.upload = false;
        itemnew.acciones.dowload = false;
        itemnew.mover.nosubcarpeta = false;
        itemnew.antecesor.mostrarbtnatras = false;
        itemnew.antecesor.pathantecesor = '';
        itemnew.antecesor.iconvacioantecesor = '';
        itemnew.antecesor.listpath = [{
          iconvacioantecesor: 'Grupos', pathantecesor: '', mostrarbtnatras: false, denom: 'Grupos'
        }],
        this.setState({
          itemnew
        });
        this.listarArchivos(this.state.path, 'Grupos');
        break;
      }
      case 'Espacio de Grupo de Trabajo': {
        url = dominio + '/sections/';
        const itemnew = this.state;
        itemnew.titulotoolbar = item;
        itemnew.showBackdrop = true;
        itemnew.iconvacio = item;
        itemnew.path = url;
        itemnew.tabla.order = 'asc';
        itemnew.tabla.orderBy = 'name';
        itemnew.tabla.selected = [];
        itemnew.tabla.numSelected = 0;
        itemnew.tabla.rowCount = 0;
        itemnew.menu.menuselect = item;
        itemnew.menu.hidebtnprincipales = btnhide;
        itemnew.acciones.papelera = false;
        itemnew.acciones.crear = true;
        itemnew.acciones.upload = false;
        itemnew.mover.nosubcarpeta = false;
        itemnew.antecesor.mostrarbtnatras = false;
        itemnew.antecesor.pathantecesor = '';
        itemnew.antecesor.iconvacioantecesor = '';
        itemnew.antecesor.listpath = [{
          iconvacioantecesor: 'Espacio de Grupo de Trabajo', pathantecesor: '', mostrarbtnatras: false, denom: 'Espacio de Grupo de Trabajo'
        }],
        this.setState({
          itemnew
        });
        this.listarArchivos(this.state.path, 'Espacio de Grupo de Trabajo');
        break;
      }
      case 'Archivo': {
        const itemnew = this.state;
        itemnew.titulotoolbar = item;
        itemnew.showBackdrop = true;
        itemnew.iconvacio = item;
        itemnew.path = url;
        itemnew.tabla.order = 'asc';
        itemnew.tabla.orderBy = 'name';
        itemnew.tabla.selected = [];
        itemnew.tabla.numSelected = 0;
        itemnew.tabla.rowCount = 0;
        itemnew.menu.menuselect = item;
        itemnew.menu.hidebtnprincipales = btnhide;
        itemnew.acciones.papelera = false;
        itemnew.acciones.crear = true;
        itemnew.acciones.upload = true;
        itemnew.mover.nosubcarpeta = false;
        itemnew.antecesor.mostrarbtnatras = false;
        itemnew.antecesor.pathantecesor = '';
        itemnew.antecesor.iconvacioantecesor = '';
        itemnew.antecesor.listpath = [{
          iconvacioantecesor: 'Archivo', pathantecesor: '', mostrarbtnatras: false, denom: 'Archivo'
        }],
        this.setState({
          itemnew
        });
        this.listarArchivos(this.state.path, 'Archivo');
        break;
      }
      case 'Recientes': {
        btnhide = true;
        const itemnew = this.state;
        itemnew.titulotoolbar = item;
        itemnew.showBackdrop = true;
        itemnew.iconvacio = item;
        itemnew.path = url;
        itemnew.tabla.order = 'asc';
        itemnew.tabla.orderBy = 'name';
        itemnew.tabla.selected = [];
        itemnew.tabla.numSelected = 0;
        itemnew.tabla.rowCount = 0;
        itemnew.menu.menuselect = item;
        itemnew.menu.hidebtnprincipales = btnhide;
        itemnew.acciones.papelera = false;
        itemnew.acciones.crear = false;
        itemnew.acciones.upload = false;
        itemnew.mover.nosubcarpeta = false;
        itemnew.antecesor.mostrarbtnatras = false;
        itemnew.antecesor.pathantecesor = '';
        itemnew.antecesor.iconvacioantecesor = '';
        itemnew.antecesor.listpath = [{
          iconvacioantecesor: 'Recientes', pathantecesor: '', mostrarbtnatras: false, denom: 'Recientes'
        }],
        this.setState({
          itemnew
        });
        this.listarArchivos(this.state.path, 'Recientes');
        break;
      }
      case 'Búsqueda': {
        btnhide = true;
        const itemnew = this.state;
        itemnew.titulotoolbar = item;
        itemnew.showBackdrop = false;
        itemnew.iconvacio = item;
        itemnew.path = url;
        itemnew.tabla.order = 'asc';
        itemnew.tabla.orderBy = 'name';
        itemnew.tabla.selected = [];
        itemnew.tabla.numSelected = 0;
        itemnew.tabla.rowCount = 0;
        itemnew.menu.menuselect = item;
        itemnew.menu.hidebtnprincipales = btnhide;
        itemnew.acciones.papelera = false;
        itemnew.acciones.crear = false;
        itemnew.acciones.upload = false;
        itemnew.mover.nosubcarpeta = false;
        itemnew.antecesor.mostrarbtnatras = false;
        itemnew.antecesor.pathantecesor = '';
        itemnew.antecesor.iconvacioantecesor = '';
        itemnew.busqueda.combotipo = '';
        itemnew.busqueda.comboestado = '';
        itemnew.busqueda.fechadesde = null;
        itemnew.busqueda.fechahasta = null;
        itemnew.busqueda.disablefechas = true;
        itemnew.busqueda.denombuscar = '';
        itemnew.busqueda.descripbuscar = '';
        itemnew.busqueda.tamanno = '';
        itemnew.busqueda.contribuyentes = '';
        itemnew.busqueda.etiquetas = '';
        itemnew.busqueda.ejecutobuscar = '';
        itemnew.busqueda.users = [];
        // itemnew.busqueda.etiquetas = [];
        itemnew.busqueda.btnbuscar = true;
        itemnew.busqueda.sql = '',
        itemnew.antecesor.listpath = [{
          iconvacioantecesor: 'Búsqueda', pathantecesor: url, mostrarbtnatras: false, denom: 'Búsqueda'
        }],
        this.setState({
          itemnew
        });
        // this.listarArchivos(this.state.path, 'Recientes')
        break;
      }
      case 'Expirados': {
        btnhide = true;
        const itemnew = this.state;
        itemnew.titulotoolbar = item;
        itemnew.showBackdrop = true;
        itemnew.iconvacio = item;
        itemnew.path = url;
        itemnew.tabla.order = 'asc';
        itemnew.tabla.orderBy = 'name';
        itemnew.tabla.selected = [];
        itemnew.tabla.numSelected = 0;
        itemnew.tabla.rowCount = 0;
        itemnew.menu.menuselect = item;
        itemnew.menu.hidebtnprincipales = btnhide;
        itemnew.acciones.papelera = false;
        itemnew.acciones.crear = false;
        itemnew.acciones.upload = false;
        itemnew.mover.nosubcarpeta = false;
        itemnew.antecesor.mostrarbtnatras = false;
        itemnew.antecesor.pathantecesor = '';
        itemnew.antecesor.iconvacioantecesor = '';
        itemnew.antecesor.listpath = [{
          iconvacioantecesor: 'Expirados', pathantecesor: '', mostrarbtnatras: false, denom: 'Expirados'
        }],
        this.setState({
          itemnew
        });
        this.listarArchivos(this.state.path, 'Expirados');
        break;
      }
      case 'Favoritos': {
        btnhide = true;
        const itemnew = this.state;
        itemnew.titulotoolbar = item;
        itemnew.showBackdrop = true;
        itemnew.iconvacio = item;
        itemnew.path = url;
        itemnew.tabla.order = 'asc';
        itemnew.tabla.orderBy = 'name';
        itemnew.tabla.selected = [];
        itemnew.tabla.numSelected = 0;
        itemnew.tabla.rowCount = 0;
        itemnew.menu.menuselect = item;
        itemnew.menu.hidebtnprincipales = btnhide;
        itemnew.acciones.papelera = false;
        itemnew.acciones.crear = false;
        itemnew.acciones.upload = false;
        itemnew.mover.nosubcarpeta = false;
        itemnew.antecesor.mostrarbtnatras = false;
        itemnew.antecesor.pathantecesor = '';
        itemnew.antecesor.iconvacioantecesor = '';
        itemnew.antecesor.listpath = [{
          iconvacioantecesor: 'Favoritos', pathantecesor: '', mostrarbtnatras: false, denom: 'Favoritos'
        }],
        this.setState({
          itemnew
        });
        this.listarArchivos(this.state.path, 'Favoritos');
        break;
      }
      case 'Multimedia': {
        btnhide = true;
        const itemnew = this.state;
        itemnew.titulotoolbar = item;
        itemnew.showBackdrop = true;
        itemnew.iconvacio = item;
        itemnew.path = url;
        itemnew.tabla.order = 'asc';
        itemnew.tabla.orderBy = 'name';
        itemnew.tabla.selected = [];
        itemnew.tabla.numSelected = 0;
        itemnew.tabla.rowCount = 0;
        itemnew.menu.menuselect = item;
        itemnew.menu.hidebtnprincipales = btnhide;
        itemnew.acciones.papelera = false;
        itemnew.acciones.crear = false;
        itemnew.acciones.upload = false;
        itemnew.mover.nosubcarpeta = false;
        itemnew.antecesor.mostrarbtnatras = false;
        itemnew.antecesor.pathantecesor = '';
        itemnew.antecesor.iconvacioantecesor = '';
        itemnew.antecesor.listpath = [{
          iconvacioantecesor: 'Multimedia', pathantecesor: '', mostrarbtnatras: false, denom: 'Multimedia'
        }],
        this.setState({
          itemnew
        });
        this.listarArchivos(this.state.path, 'Multimedia');
        break;
      }
      case 'Espacio Personal': {
        const itemnew = this.state;
        itemnew.titulotoolbar = item;
        itemnew.showBackdrop = true;
        itemnew.iconvacio = item;
        itemnew.path = url;
        itemnew.tabla.order = 'asc';
        itemnew.tabla.orderBy = 'name';
        itemnew.tabla.selected = [];
        itemnew.tabla.numSelected = 0;
        itemnew.tabla.rowCount = 0;
        itemnew.menu.menuselect = item;
        itemnew.menu.hidebtnprincipales = btnhide;
        itemnew.acciones.papelera = false;
        itemnew.acciones.crear = true;
        itemnew.acciones.upload = true;
        itemnew.mover.nosubcarpeta = false;
        itemnew.antecesor.mostrarbtnatras = false;
        itemnew.antecesor.pathantecesor = '';
        itemnew.antecesor.iconvacioantecesor = '';
        itemnew.antecesor.listpath = [{
          iconvacioantecesor: 'Espacio Personal', pathantecesor: '', mostrarbtnatras: false, denom: 'Espacio Personal'
        }],
        this.setState({
          itemnew
        });
        this.listarArchivos(this.state.path, 'Espacio Personal');
        // this.cargarEspacioPersonal();
        break;
      }
      default: {
        btnhide = true;
        const itemnew = this.state;
        itemnew.titulotoolbar = item;
        itemnew.showBackdrop = true;
        itemnew.iconvacio = item;
        itemnew.path = url;
        itemnew.tabla.order = 'asc';
        itemnew.tabla.orderBy = 'name';
        itemnew.tabla.selected = [];
        itemnew.tabla.numSelected = 0;
        itemnew.tabla.rowCount = 0;
        itemnew.menu.menuselect = item;
        itemnew.menu.hidebtnprincipales = btnhide;
        itemnew.acciones.papelera = true;
        itemnew.acciones.crear = false;
        itemnew.acciones.upload = false;
        itemnew.mover.nosubcarpeta = false;
        itemnew.antecesor.mostrarbtnatras = false;
        itemnew.antecesor.pathantecesor = '';
        itemnew.antecesor.iconvacioantecesor = '';
        itemnew.antecesor.listpath = [{
          iconvacioantecesor: 'Eliminados', pathantecesor: '', mostrarbtnatras: false, denom: 'Eliminados'
        }],
        this.setState({
          itemnew
        });
        this.listarArchivos(this.state.path, 'Eliminados');
        break;
      }
    }
  }


  desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }

  getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => this.desc(a, b, orderBy) : (a, b) => -this.desc(a, b, orderBy);
  }

  handleSelectAllClick = (event) => {
    let newSelecteds = [];
    if (event.target.checked) {
      newSelecteds = rows.map((n) => n.name);
    }
    let varvisiblemenu = false;
    let vardel = false;
    let varmov = false;
    let varelimperm = false;
    const varunbloq = false;
    const varbloq = false;
    const varunfav = false;
    const varedit = false;
    const varcrear = this.state.acciones.crear;
    const varfav = false;
    const vardetail = false;
    const varcoment = false;
    const varpermisos = false;
    const vartag = false;
    const varshare = false;
    const varpublicar = false;
    const vardownload = true;
    const varelimadmin = false;
    const varupload = this.state.acciones.upload;
    const varversion = false;
    const vargestusergroup = false;
    let permwrite = 0;
    let permtodos = 0;
    newSelecteds.forEach(element => {
      const selected = this.obtenerseleccionado(element);
      selected.permisos.forEach(permiso => {
        if (permiso === 'ReadWrite') {
          permwrite += 1;
        }
        if (permiso === 'Everything') {
          permtodos += 1;
        }
      });
    });
    if (newSelecteds.length > 0) {
      if (!this.state.acciones.papelera) {
        if (newSelecteds.length === permwrite) {
          vardel = true;
          varvisiblemenu = true;
        } else {
          vardel = false;
          varvisiblemenu = false;
        }
        if (newSelecteds.length === permtodos) {
          vardel = true;
          varmov = true;
          if (this.state.menu.menuselect === 'Búsqueda') {
            varmov = false;
          }
          varvisiblemenu = true;
        } else {
          vardel = false;
          varmov = false;
          varvisiblemenu = false;
        }
      } else {
        if (newSelecteds.length === permwrite) {
          varelimperm = true;
          varvisiblemenu = true;
        } else {
          varelimperm = false;
          varvisiblemenu = false;
        }
        if (newSelecteds.length === permtodos) {
          varelimperm = true;
          varvisiblemenu = true;
        } else {
          varelimperm = false;
          varvisiblemenu = false;
        }
      }
    }
    const itemnew = this.state;
    itemnew.tabla.numSelected = newSelecteds.length;
    itemnew.tabla.order = this.state.tabla.order;
    itemnew.tabla.selected = newSelecteds;
    itemnew.tabla.orderBy = this.state.tabla.orderBy;
    itemnew.tabla.rowCount = rows.length;
    itemnew.acciones.eliminar = vardel;
    itemnew.acciones.mover = varmov;
    itemnew.acciones.menuvisible = varvisiblemenu;

    itemnew.acciones.bloq = varbloq;
    itemnew.acciones.unbloq = varunbloq;
    itemnew.acciones.edit = varedit;
    itemnew.acciones.unfav = varunfav;
    itemnew.acciones.fav = varfav;
    itemnew.acciones.detall = vardetail;
    itemnew.acciones.coment = varcoment;
    itemnew.acciones.etiq = vartag;
    itemnew.acciones.elimperm = varelimperm;
    itemnew.acciones.elimadmin = varelimadmin;
    itemnew.acciones.share = varshare;
    itemnew.acciones.comentar = varcoment;
    itemnew.acciones.permisos = varpermisos;
    itemnew.acciones.download = vardownload;
    itemnew.acciones.upload = this.state.acciones.upload;
    itemnew.acciones.version = varversion;
    itemnew.acciones.gestusergroup = vargestusergroup;
    this.setState({
      itemnew
    });
  };

  handleSelectAllClickGroup = (event) => {
    let newSelecteds = [];
    if (event.target.checked) {
      newSelecteds = rows.map((n) => n.name);
    }
    let varvisiblemenu = true;
    let vardelgroup = true;
    let mostrar = true;
    // console.log(rows);
    rows.forEach(element => {
      // console.log(element.sistema);
      if (element.sistema === 'Sistema') {
        mostrar = false;
      }
    });
    if (!mostrar) {
      varvisiblemenu = false;
      vardelgroup = false;
    }
    const itemnew = this.state;
    itemnew.tabla.numSelected = newSelecteds.length;
    itemnew.tabla.order = this.state.tabla.order;
    itemnew.tabla.selected = newSelecteds;
    itemnew.tabla.orderBy = this.state.tabla.orderBy;
    itemnew.tabla.rowCount = rows.length;
    itemnew.acciones.elimgroup = vardelgroup;
    itemnew.acciones.menuvisible = varvisiblemenu;
    itemnew.acciones.download = false;
    this.setState({
      itemnew
    });
  };

  createSortHandler = property => event => {
    this.handleRequestSort(event, property);
  };

  handleRequestSort = (event, property) => {
    const isAsc = this.state.tabla.orderBy === property && this.state.tabla.order === 'asc';
    this.setState({
      tabla: {
        order: isAsc ? 'desc' : 'asc',
        orderBy: property,
        selected: this.state.tabla.selected,
        numSelected: this.state.tabla.selected.length,
        rowCount: rows.length,
      },
    });
  };

  stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }

  isSelected = (name) => {
    const seleccionados = this.state.tabla.selected;
    const selectedIndex = seleccionados.indexOf(name);
    if (selectedIndex >= 0) {
      return true;
    }
    return false;
  }

  handleRowClick = (event, name) => {
    const seleccionados = this.state.tabla.selected;
    const selectedIndex = seleccionados.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(seleccionados, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(seleccionados.slice(1));
    } else if (selectedIndex === seleccionados.length - 1) {
      newSelected = newSelected.concat(seleccionados.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        seleccionados.slice(0, selectedIndex),
        seleccionados.slice(selectedIndex + 1),
      );
    }
    let varunbloq = false;
    let varbloq = false;
    let varunfav = false;
    let varedit = false;
    let varcrear = this.state.acciones.crear;
    let varfav = false;
    let vardetail = false;
    let varcoment = false;
    let varpermisos = false;
    let vartag = false;
    let varmov = false;
    let vardel = false;
    let vardelperm = this.state.acciones.papelera;
    let varshare = false;
    let varpublicar = false;
    let vardownload = true;
    let varelimadmin = false;
    let varupload = this.state.acciones.upload;
    let varversion = false;
    let varvisiblemenu = true;
    const varelimgroup = false;
    if (newSelected.length === 1 && !this.state.acciones.papelera) {
      const selected = this.obtenerseleccionado(newSelected[0]);
      // console.log(selected.permisos);
      if (selected.tipo === 'Section' || selected.tipo === 'Group') {
        varcoment = false,
        vartag = false;
        varunfav = false;
        varfav = false;
        varupload = false;
        varcrear = false;
        varunbloq = false;
        varbloq = false;
        varshare = false;
        varpermisos = true;
        varpublicar = false;
        varversion = false;
        vardownload = false;
        vardetail = false;
        vardel = false;
        varelimadmin = false;
        varedit = false;
        varvisiblemenu = false;
        if (this.state.menu.menuselect === 'Espacio de Grupo de Trabajo') {
          vardetail = true;
          varelimadmin = true;
          varedit = true;
          varvisiblemenu = true;
        }
      }
      if (selected.tipo !== 'Section' && selected.tipo !== 'Group') {
        if (selected.bloqueado) {
          if (selected.ownerbloq === user) {
            varcoment = true,
            vartag = true;
            vardetail = true;
            if (selected.favorito) {
              varunfav = true;
            } else {
              varunfav = false;
            }
            varfav = !varunfav;
            varversion = true;
            vardownload = true;
            varpublicar = true;
            varedit = true;
            if (selected.tipo === 'Folder') {
              varupload = true;
              varcrear = true;
            } else {
              if (selected.bloqueado) {
                varunbloq = true;
                varpublicar = false;
              } else {
                varunbloq = false;
                varpublicar = true;
              }
              varbloq = !varunbloq;
            }
            vardel = true;
            if (this.state.menu.menuselect === 'Búsqueda') {
              varmov = false;
              varpublicar = false;
            } else {
              varmov = true;
              varpublicar = true;
            }
            varshare = true;
            varpermisos = true;
            vardelperm = true;
          } else {
            varpublicar = false;
            varcoment = true,
            vartag = true;
            vardetail = true;
            if (selected.favorito) {
              varunfav = true;
            } else {
              varunfav = false;
            }
            varfav = !varunfav;
          }
        } else {
          selected.permisos.forEach(element => {
            if (element === 'Read') {
              varcoment = true,
              vartag = true;
              varpublicar = false;
              vardetail = true;
              if (selected.favorito) {
                varunfav = true;
              } else {
                varunfav = false;
              }
              varfav = !varunfav;
            }
            if (element === 'ReadWrite') {
              varcoment = true,
              vartag = true;
              vardetail = true;
              vardownload = true;
              varedit = true;
              if (selected.favorito) {
                varunfav = true;
              } else {
                varunfav = false;
              }
              varfav = !varunfav;
              if (selected.tipo === 'Folder') {
                varupload = true;
                varcrear = true;
              }
              vardel = true;
              if (element.proxysecion) {
                varupload = false;
                varpermisos = false;
                varedit = false;
                varcrear = false;
                vardel = false;
              }
            }
            if (element === 'Everything') {
              varcoment = true,
              vartag = true;
              vardetail = true;
              varpublicar = true;
              if (selected.favorito) {
                varunfav = true;
              } else {
                varunfav = false;
              }
              varfav = !varunfav;
              varversion = true;
              vardownload = true;
              varedit = true;
              if (selected.tipo === 'Folder') {
                varupload = true;
                varcrear = true;
              } else {
                if (selected.bloqueado) {
                  varunbloq = true;
                } else {
                  varunbloq = false;
                }
                varbloq = !varunbloq;
              }
              vardel = true;
              if (this.state.menu.menuselect === 'Búsqueda') {
                varmov = false;
              } else {
                varmov = true;
              }
              varshare = true;
              varpermisos = true;
              vardelperm = true;
            }
          });
        }
      }
      // console.log('es proxy: ' + selected.proxysecion)
      if (selected.proxysecion) {
        varmov = false;
        vardel = false;
        varedit = false;
        vardelperm = false;
        varshare = false;
        varpublicar = false;
        varelimadmin = false;
        varupload = false;
        varversion = false;
        varpermisos = false;
        varvisiblemenu = true;
      }
    } else if (newSelected.length > 1 && !this.state.acciones.papelera) {
      let permwrite = 0;
      let permtodos = 0;
      let publicsecion = false;
      newSelected.forEach(element => {
        const selected = this.obtenerseleccionado(element);
        selected.permisos.forEach(permiso => {
          if (permiso === 'ReadWrite') {
            permwrite += 1;
          }
          if (permiso === 'Everything') {
            permtodos += 1;
          }
        });
        if (selected.proxysecion) {
          publicsecion = true;
        }
      });
      if (newSelected.length === permwrite && !publicsecion) {
        vardel = true;
        varvisiblemenu = true;
      } else {
        vardel = false;
        varvisiblemenu = false;
      }
      if (newSelected.length === permtodos && !publicsecion) {
        vardel = true;
        varmov = true;
        if (this.state.menu.menuselect === 'Búsqueda' && !publicsecion) {
          varmov = false;
        }
        varvisiblemenu = true;
      } else {
        vardel = false;
        varmov = false;
        varvisiblemenu = false;
      }
      // console.log(this.state.menu.menuselect)
      if (this.state.menu.menuselect === 'Espacio de Grupo de Trabajo' || this.state.menu.menuselect === 'Grupos') {
        vardownload = false;
        varpublicar = false;
      }
    } else if (newSelected.length > 1 && this.state.acciones.papelera) {
      varelimadmin = false;
      vardetail = false;
      varedit = false;
    }

    const itemnew = this.state;
    itemnew.tabla.numSelected = newSelected.length;
    itemnew.tabla.order = this.state.tabla.order;
    itemnew.tabla.selected = newSelected;
    itemnew.tabla.orderBy = this.state.tabla.orderBy;
    itemnew.tabla.rowCount = rows.length;
    itemnew.acciones.bloq = varbloq;
    itemnew.acciones.unbloq = varunbloq;
    itemnew.acciones.edit = varedit;
    itemnew.acciones.unfav = varunfav;
    itemnew.acciones.fav = varfav;
    itemnew.acciones.detall = vardetail;
    itemnew.acciones.coment = varcoment;
    itemnew.acciones.etiq = vartag;
    itemnew.acciones.mover = varmov;
    itemnew.acciones.eliminar = vardel;
    itemnew.acciones.elimperm = vardelperm;
    itemnew.acciones.elimadmin = varelimadmin;
    itemnew.acciones.share = varshare;
    itemnew.acciones.comentar = varcoment;
    itemnew.acciones.permisos = varpermisos;
    itemnew.acciones.download = vardownload;
    itemnew.acciones.upload = varupload;
    itemnew.acciones.version = varversion;
    itemnew.acciones.gestusergroup = false;
    itemnew.acciones.elimgroup = varelimgroup;
    itemnew.acciones.menuvisible = varvisiblemenu;
    this.setState({
      itemnew
    });
  };

  verificargruposistema = (lista) => {
    let sistema = false;
    lista.forEach(select => {
      rows.forEach(obj => {
        if (select === obj.name && obj.sistema === 'Sistema') {
          sistema = true;
        }
      });
    });
    return sistema;
  }

  handleRowClickGroup = (event, name) => {
    const seleccionados = this.state.tabla.selected;
    const selectedIndex = seleccionados.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(seleccionados, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(seleccionados.slice(1));
    } else if (selectedIndex === seleccionados.length - 1) {
      newSelected = newSelected.concat(seleccionados.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        seleccionados.slice(0, selectedIndex),
        seleccionados.slice(selectedIndex + 1),
      );
    }

    const varunbloq = false;
    const varbloq = false;
    const varunfav = false;
    const varcrear = false;
    const varfav = false;
    const vardetail = false;
    const varcoment = false;
    const vartag = false;
    const varmov = false;
    const vardel = false;
    const vardelperm = false;
    const varshare = false;
    const varpublicar = false;
    const vardownload = false;
    const varelimadmin = false;
    const varupload = false;
    const varversion = false;
    const varpermisos = false;
    let varedit = false;
    let varelimgroup = false;
    let varvisiblemenu = true;
    let vargestusergroup = false;

    if (newSelected.length === 1) {
      vargestusergroup = true;
      varedit = true;
      if (!this.verificargruposistema(newSelected)) {
        varelimgroup = true;
      }
    }
    if (newSelected.length > 1) {
      vargestusergroup = false;
      if (!this.verificargruposistema(newSelected)) {
        varelimgroup = true;
      } else {
        varvisiblemenu = false;
      }
    }

    const itemnew = this.state;
    itemnew.tabla.numSelected = newSelected.length;
    itemnew.tabla.order = this.state.tabla.order;
    itemnew.tabla.selected = newSelected;
    itemnew.tabla.orderBy = this.state.tabla.orderBy;
    itemnew.tabla.rowCount = rows.length;
    itemnew.acciones.edit = varedit;
    itemnew.acciones.gestusergroup = vargestusergroup;
    itemnew.acciones.permisos = varpermisos;
    itemnew.acciones.menuvisible = varvisiblemenu;
    itemnew.acciones.elimgroup = varelimgroup;
    itemnew.acciones.bloq = varbloq;
    itemnew.acciones.unbloq = varunbloq;
    itemnew.acciones.unfav = varunfav;
    itemnew.acciones.fav = varfav;
    itemnew.acciones.detall = vardetail;
    itemnew.acciones.coment = varcoment;
    itemnew.acciones.etiq = vartag;
    itemnew.acciones.mover = varmov;
    itemnew.acciones.eliminar = vardel;
    itemnew.acciones.elimperm = vardelperm;
    itemnew.acciones.elimadmin = varelimadmin;
    itemnew.acciones.share = varshare;
    itemnew.acciones.comentar = varcoment;
    itemnew.acciones.download = vardownload;
    itemnew.acciones.upload = varupload;
    itemnew.acciones.version = varversion;
    this.setState({
      itemnew
    });
  }


  handleSeleccionarCamino = (row) => {
    // console.log(row);
    const listacamino = self.state.antecesor.listpath;
    let path = row.path + '/';
    let pos = 0;
    listacamino.forEach((element, index) => {
      if (row.denom === element.denom) {
        pos = index;
      }
    });
    let atras = false;
    const subcarpeta = self.isSubcarpeta(row);
    let pathantecesor = dominio + workspace + user + '/';
    const iconvacioantecesor = self.state.iconvacio;
    const newlist = listacamino.splice(pos + 1);
    listacamino[listacamino.length - 1].vinculo = false;
    if (listacamino.length > 1) {
      atras = true;
    }
    let tipo = 'Folder';
    if (this.state.antecesor.listpath.length > 1) {
      // this.verificarPermisos(row);
      nuxeo.operation('Document.GetParent')
        .input(row.path)
        .execute()
        .then((padre) => {
          path = row.path;
          pathantecesor = padre.path;
          const itemnew = self.state;
          itemnew.titulotoolbar = row.denom;
          itemnew.path = path;
          itemnew.iconvacio = tipo;
          itemnew.mover.nosubcarpeta = subcarpeta;
          itemnew.antecesor.mostrarbtnatras = atras;
          itemnew.antecesor.pathantecesor = pathantecesor;
          itemnew.antecesor.iconvacioantecesor = iconvacioantecesor;
          itemnew.antecesor.listpath = listacamino;
          self.setState({
            itemnew
          });
          self.listarArchivos(path, tipo);
        });
    } else {
      tipo = self.state.menu.menuselect;
      const itemnew = self.state;
      itemnew.titulotoolbar = self.state.menu.menuselect;
      itemnew.path = pathantecesor;
      itemnew.iconvacio = self.state.menu.menuselect;
      itemnew.mover.nosubcarpeta = subcarpeta;
      itemnew.antecesor.mostrarbtnatras = atras;
      itemnew.antecesor.pathantecesor = pathantecesor;
      itemnew.antecesor.iconvacioantecesor = iconvacioantecesor;
      itemnew.antecesor.listpath = listacamino;
      self.setState({
        itemnew
      });
      if (self.state.menu.menuselect === 'Búsqueda') {
        self.handleEjecutarQuery(self.state.busqueda.sql);
      } else {
        self.handleActionsListItem(tipo);
      }
    }
  }

  verificarPermisos = (row) => {
    let varedit = false;
    let varmov = false;
    let varshare = false;
    let varpermisos = false;
    let vardownload = false;
    let varupload = false;
    const varvisiblemenu = true;
    let varbtnprincipales = true;
    row.permisos.forEach(element => {
      if (element === 'ReadWrite') {
        vardownload = true;
        if (row.tipo === 'Folder') {
          varupload = true;
          varedit = true;
          varbtnprincipales = false;
        }
      }
      if (element === 'Everything') {
        vardownload = true;
        if (row.tipo === 'Folder') {
          varupload = true;
          varedit = true;
          varbtnprincipales = false;
        }
        if (this.state.menu.menuselect === 'Búsqueda') {
          varmov = false;
        } else {
          varmov = true;
        }
        varshare = true;
        varpermisos = true;
      }
    });
    const estado = this.state;
    estado.acciones.edit = varedit;
    estado.acciones.mover = varmov;
    estado.acciones.share = varshare;
    estado.acciones.permisos = varpermisos;
    estado.acciones.download = vardownload;
    estado.acciones.upload = varupload;
    estado.acciones.menuvisible = varvisiblemenu;
    estado.menu.hidebtnprincipales = varbtnprincipales;
    this.setState({
      estado
    });
    // console.log(this.state.acciones.upload);
  }


  visualizardoc(doc) {
    const estado = this.state;
    estado.onlyoffice.showwindows = true;
    estado.onlyoffice.doc = doc;
    this.setState({
      estado
    });
  }


  visualizarimagen = (img) => {
    console.log(img);
    const array = [];
    const objimg = {
      src: img.preview,
      // dir: "http://localhost:8180/nuxeo/nxpicsfile/dep-comercioelectronico/fa47f719-ea28-4c85-a95c-6e01184fd909/Original:content/41ee5f8572922481744243f9ef495db0.jpg",
      title: img.name,
      description: img.descripcion
    };
    array.push(objimg);
    const estado = this.state;
    estado.visualizacion.images = array;
    estado.visualizacion.mostrarimg = true;
    this.setState({
      estado
    });
    console.log(array);


    /*   <Lightbox
            mainSrc={array[0].src}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
          onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length,
              })
            }
          /> */
  }

  handleAbrirClick = (row) => {
    const path = row.path + '/';
    const pathantecesor = this.state.path;
    const iconvacioantecesor = this.state.iconvacio;
    const subcarpeta = this.isSubcarpeta(row);
    const listacamino = this.state.antecesor.listpath;
    listacamino[listacamino.length - 1].vinculo = true;
    if (listacamino[listacamino.length - 1].iconvacioantecesor !== 'null') {
      this.verificarPermisos(row);
      if (row.tipo === 'Folder' || row.tipo === 'Section') {
        let tipodoc = 'Folder';
        if (row.tipo === 'Section') {
          tipodoc = 'Espacio de Grupo de Trabajo';
        }
        listacamino.push({
          iconvacioantecesor: tipodoc, path: row.path, vinculo: false, denom: row.name
        });
        const itemnew = this.state;
        itemnew.titulotoolbar = row.name;
        itemnew.path = path;
        itemnew.iconvacio = tipodoc;
        itemnew.mover.nosubcarpeta = subcarpeta;
        itemnew.antecesor.mostrarbtnatras = true;
        itemnew.antecesor.pathantecesor = pathantecesor;
        itemnew.antecesor.iconvacioantecesor = iconvacioantecesor;
        itemnew.antecesor.listpath = listacamino;
        this.setState({
          itemnew
        });
        this.listarArchivos(path, 'Folder');
      } else {
        const { extension } = row;
        /*   listacamino.push({ iconvacioantecesor: 'null', path: row.path, vinculo: false, denom: row.name });
          let itemnew = this.state;
          itemnew.titulotoolbar = row.name;
          itemnew.path = path;
          itemnew.iconvacio = 'null';
          itemnew.mover.nosubcarpeta = true;
          itemnew.antecesor.mostrarbtnatras = true;
          itemnew.antecesor.pathantecesor = pathantecesor;
          itemnew.antecesor.iconvacioantecesor = iconvacioantecesor;
          itemnew.antecesor.listpath = listacamino;
          this.setState({
            itemnew
          }) */
        if (extension == '.gif' || extension == '.png' || extension == '.jpg' || extension == '.jpeg' || extension == '.pbm' || extension == '.bmp' || extension == '.ppm' || extension == '.fax' || extension == '.tiff' || extension == '.tif' || extension == '.svg' || extension == '.dpx' || extension == '.ai' || extension == '.psd' || extension == '.emf' || extension == '.vclmtf' || extension == '.srf') {
          this.visualizarimagen(row);
        } else {
          this.visualizardoc(row);
          console.log(row);
          /*   var docEditor = new DocsAPI.DocEditor("placeholder", config);
            let config = {
              "document": {
                  "fileType": "docx",
                  "key": "implementalsystem",
                  "title": "Example Document Title.docx",
                  "url": row.preview
              },
              "documentType": "word",
              "editorConfig": {
                  "callbackUrl": "https://example.com/url-to-callback.ashx"
              }
          }; */
        }


        /* switch (row.extension) {
          case 'File': {
            let array = row.name.split('.');
            let extension = array[array.length - 1];
            console.log(row.tipo);
            console.log(extension);
            if (extension == 'txt' || extension == 'html' || extension == 'xhtml' || extension == 'shtml' || extension == 'stx' || extension == 'rst' || extension == 'rest' || extension == 'restx' || extension == 'rest' || extension == 'py' || extension == 'java' || extension == 'md' || extension == 'mkd' || extension == 'markdown' || extension == 'eml' || extension == 'msg' || extension == 'xml' || extension == 'graffle' || extension == 'twb' || extension == 'sxi' || extension == 'sxw' || extension == 'stw' || extension == 'sti' || extension == 'sxc' || extension == 'stc' || extension == 'sxd' || extension == 'std' || extension == 'std' || extension == 'ps' || extension == 'eps') {
              return <Note color='primary' style={{ marginRight: '10px', fontSize: '40px' }} />;
            }
            if (extension == 'doc' || extension == 'dot' || extension == 'dot' || extension == 'doc.xml' || extension == 'docb.xml' || extension == 'docb' || extension == 'ods' || extension == 'ots' || extension == 'odt' || extension == 'ott' || extension == 'odp' || extension == 'otp' || extension == 'odg' || extension == 'otg' || extension == 'docm' || extension == 'docx' || extension == 'dotm' || extension == 'dotx' || extension == 'dotx' || extension == 'pdf') {
              return <DescriptionIcon color='primary' style={{ marginRight: '10px', fontSize: '40px' }} />;
            }
            if (extension == 'xls' || extension == 'xlt' || extension == 'xlt' || extension == 'xlsb' || extension == 'xlsm' || extension == 'xlsm' || extension == 'xlsx' || extension == 'xps' || extension == 'csv') {
              return <ChromeReaderModeIcon color='primary' style={{ marginRight: '10px', fontSize: '40px' }} />;
            }
            if (extension == 'ppt' || extension == 'pot' || extension == 'pps' || extension == 'mpp' || extension == 'pub' || extension == 'pub' || extension == 'ppsm' || extension == 'ppsx' || extension == 'pptm' || extension == 'pptx' || extension == 'pptx' || extension == 'vsdx' || extension == 'vsd' || extension == 'vst') {
              return <Dvr color='primary' style={{ marginRight: '10px', fontSize: '40px' }} />;
            }
            if (extension == 'zip' || extension == 'rar' || extension == '7zip' || extension == 'jar') {
              return <AccountBalanceWallet color='primary' style={{ marginRight: '10px', fontSize: '40px' }} />;
            }
            if (extension == 'gif' || extension == 'png' || extension == 'jpg' || extension == 'jpeg' || extension == 'pbm' || extension == 'bmp' || extension == 'ppm' || extension == 'fax' || extension == 'tiff' || extension == 'tif' || extension == 'svg' || extension == 'dpx' || extension == 'ai' || extension == 'psd' || extension == 'emf' || extension == 'vclmtf' || extension == 'srf') {
              return <Image color='primary' style={{ marginRight: '10px', fontSize: '40px' }} />;
            }
            if (extension == 'mp3' || extension == 'mpga' || extension == 'mp2' || extension == 'wav' || extension == 'm3u' || extension == 'aif' || extension == 'aifc' || extension == 'aiff' || extension == 'ogg' || extension == 'oga' || extension == 'spx' || extension == 'flac' || extension == 'ogm' || extension == 'ogx' || extension == 'aac' || extension == 'm4a' || extension == 'm4b' || extension == 'm4p' || extension == 'm4r' || extension == 'mka' || extension == 'wax' || extension == 'wma' || extension == 'wax') {
              return <Audiotrack color='primary' style={{ marginRight: '10px', fontSize: '40px' }} />;
            }
            if (extension == 'mpa' || extension == 'mpe' || extension == 'mpeg' || extension == 'mpg' || extension == 'mpv2' || extension == 'mp4' || extension == 'mov' || extension == 'qt' || extension == 'ogv' || extension == 'webm' || extension == 'mkv' || extension == 'asf' || extension == 'asr' || extension == 'asx' || extension == 'avi' || extension == 'fli' || extension == 'flv' || extension == 'viv' || extension == 'vivo' || extension == 'm4v' || extension == '3gp' || extension == '3g2' || extension == 'wmv' || extension == 'wmx' || extension == 'gxf' || extension == 'mxf') {
              return <Theaters color='primary' style={{ marginRight: '10px', fontSize: '40px' }} />;
            }
            else{
              return <Receipt color='primary' style={{ marginRight: '10px', fontSize: '40px' }} />;
            }
            break;
          }


          default:
            break;
        } */
      }
    }
  }

  tiempotranscurrido = (ultmodif) => {
    const ms = moment(moment()) - moment(ultmodif);
    const d = moment.duration(ms);
    let texttiempotrans = 'ahora';
    if (d.years() > 0) {
      if (d.years() == 1) {
        texttiempotrans = 'Hace ' + d.years() + ' año';
      } else {
        texttiempotrans = 'Hace ' + d.years() + ' años';
      }
    }
    if (d.years() == 0 && d.months() > 0) {
      if (d.months() == 1) {
        texttiempotrans = 'Hace ' + d.months() + ' mes';
      } else {
        texttiempotrans = 'Hace ' + d.months() + ' meses';
      }
    }
    if (d.years() == 0 && d.months() == 0 && d.days() > 0) {
      if (d.days() == 1) {
        texttiempotrans = 'Hace ' + d.days() + ' día';
      } else {
        texttiempotrans = 'Hace ' + d.days() + ' días';
      }
    }
    if (d.years() == 0 && d.months() == 0 && d.days() == 0 && d.hours() > 0) {
      if (d.hours() == 1) {
        texttiempotrans = 'Hace ' + d.hours() + ' hr';
      } else {
        texttiempotrans = 'Hace ' + d.hours() + ' hrs';
      }
    }
    if (d.years() == 0 && d.months() == 0 && d.days() == 0 && d.hours() == 0 && d.minutes() > 0) {
      if (d.minutes() == 1) {
        texttiempotrans = 'Hace ' + d.minutes() + ' min';
      } else {
        texttiempotrans = 'Hace ' + d.minutes() + ' min';
      }
    }
    if (d.years() == 0 && d.months() == 0 && d.days() == 0 && d.hours() == 0 && d.minutes() == 0 && d.seconds() > 0) {
      if (d.seconds() == 1) {
        texttiempotrans = 'Hace ' + d.seconds() + ' seg';
      } else {
        texttiempotrans = 'Hace ' + d.seconds() + ' seg';
      }
    }
    return texttiempotrans;
    //
  }

  DevuelveIcons = (row) => {
    switch (row.tipo) {
      case 'Folder': {
        return <Folder color="primary" style={{ marginRight: '10px', fontSize: '40px' }} />;
        break;
      }
      case 'File': {
        const array = row.name.split('.');
        const extension = array[array.length - 1].toLowerCase();
        /*  console.log(row.tipo);
         console.log(extension); */
        if (extension == 'txt' || extension == 'html' || extension == 'xhtml' || extension == 'shtml' || extension == 'stx' || extension == 'rst' || extension == 'rest' || extension == 'restx' || extension == 'rest' || extension == 'py' || extension == 'java' || extension == 'md' || extension == 'mkd' || extension == 'markdown' || extension == 'eml' || extension == 'msg' || extension == 'xml' || extension == 'graffle' || extension == 'twb' || extension == 'sxi' || extension == 'sxw' || extension == 'stw' || extension == 'sti' || extension == 'sxc' || extension == 'stc' || extension == 'sxd' || extension == 'std' || extension == 'std' || extension == 'ps' || extension == 'eps') {
          return <Note color="primary" style={{ marginRight: '10px', fontSize: '40px' }} />;
        }
        if (extension == 'doc' || extension == 'dot' || extension == 'dot' || extension == 'doc.xml' || extension == 'docb.xml' || extension == 'docb' || extension == 'ods' || extension == 'ots' || extension == 'odt' || extension == 'ott' || extension == 'odp' || extension == 'otp' || extension == 'odg' || extension == 'otg' || extension == 'docm' || extension == 'docx' || extension == 'dotm' || extension == 'dotx' || extension == 'dotx' || extension == 'pdf') {
          return <DescriptionIcon color="primary" style={{ marginRight: '10px', fontSize: '40px' }} />;
        }
        if (extension == 'xls' || extension == 'xlt' || extension == 'xlt' || extension == 'xlsb' || extension == 'xlsm' || extension == 'xlsm' || extension == 'xlsx' || extension == 'xps' || extension == 'csv') {
          return <ChromeReaderModeIcon color="primary" style={{ marginRight: '10px', fontSize: '40px' }} />;
        }
        if (extension == 'ppt' || extension == 'pot' || extension == 'pps' || extension == 'mpp' || extension == 'pub' || extension == 'pub' || extension == 'ppsm' || extension == 'ppsx' || extension == 'pptm' || extension == 'pptx' || extension == 'pptx' || extension == 'vsdx' || extension == 'vsd' || extension == 'vst') {
          return <Dvr color="primary" style={{ marginRight: '10px', fontSize: '40px' }} />;
        }
        if (extension == 'zip' || extension == 'rar' || extension == '7zip' || extension == 'jar') {
          return <AccountBalanceWallet color="primary" style={{ marginRight: '10px', fontSize: '40px' }} />;
        }
        if (extension == 'gif' || extension == 'png' || extension == 'jpg' || extension == 'jpeg' || extension == 'pbm' || extension == 'bmp' || extension == 'ppm' || extension == 'fax' || extension == 'tiff' || extension == 'tif' || extension == 'svg' || extension == 'dpx' || extension == 'ai' || extension == 'psd' || extension == 'emf' || extension == 'vclmtf' || extension == 'srf') {
          return <Image color="primary" style={{ marginRight: '10px', fontSize: '40px' }} />;
        }
        if (extension == 'mp3' || extension == 'mpga' || extension == 'mp2' || extension == 'wav' || extension == 'm3u' || extension == 'aif' || extension == 'aifc' || extension == 'aiff' || extension == 'ogg' || extension == 'oga' || extension == 'spx' || extension == 'flac' || extension == 'ogm' || extension == 'ogx' || extension == 'aac' || extension == 'm4a' || extension == 'm4b' || extension == 'm4p' || extension == 'm4r' || extension == 'mka' || extension == 'wax' || extension == 'wma' || extension == 'wax') {
          return <Audiotrack color="primary" style={{ marginRight: '10px', fontSize: '40px' }} />;
        }
        if (extension == 'mpa' || extension == 'mpe' || extension == 'mpeg' || extension == 'mpg' || extension == 'mpv2' || extension == 'mp4' || extension == 'mov' || extension == 'qt' || extension == 'ogv' || extension == 'webm' || extension == 'mkv' || extension == 'asf' || extension == 'asr' || extension == 'asx' || extension == 'avi' || extension == 'fli' || extension == 'flv' || extension == 'viv' || extension == 'vivo' || extension == 'm4v' || extension == '3gp' || extension == '3g2' || extension == 'wmv' || extension == 'wmx' || extension == 'gxf' || extension == 'mxf') {
          return <Theaters color="primary" style={{ marginRight: '10px', fontSize: '40px' }} />;
        }

        return <Receipt color="primary" style={{ marginRight: '10px', fontSize: '40px' }} />;

        break;
      }
      case 'Section': {
        return <FolderSpecial color="primary" style={{ marginRight: '10px', fontSize: '40px' }} />;
        break;
      }
      case 'Grupos': {
        return <Group color="primary" style={{ marginRight: '10px', fontSize: '40px' }} />;
        break;
      }
      default: {
        return <Receipt color="primary" style={{ marginRight: '10px', fontSize: '40px' }} />;
      }
        break;
    }
  }

  DevuelveIconsDetaill = (row) => {
    // console.log(row);
    switch (row.tipo) {
      case 'Folder': {
        return <Folder color="primary" style={{ marginLeft: '10px', marginRight: '10px', fontSize: '90px' }} onClick={(event) => this.handleAbrirClick(event, row)} />;
        break;
      }
      case 'File': {
        const array = row.name.split('.');
        const extension = array[array.length - 1].toLowerCase();
        if (extension == 'txt' || extension == 'html' || extension == 'xhtml' || extension == 'shtml' || extension == 'stx' || extension == 'rst' || extension == 'rest' || extension == 'restx' || extension == 'rest' || extension == 'py' || extension == 'java' || extension == 'md' || extension == 'mkd' || extension == 'markdown' || extension == 'eml' || extension == 'msg' || extension == 'xml' || extension == 'graffle' || extension == 'twb' || extension == 'sxi' || extension == 'sxw' || extension == 'stw' || extension == 'sti' || extension == 'sxc' || extension == 'stc' || extension == 'sxd' || extension == 'std' || extension == 'std' || extension == 'ps' || extension == 'eps') {
          return <Note color="primary" style={{ marginLeft: '10px', marginRight: '10px', fontSize: '90px' }} onClick={(event) => this.handleAbrirClick(event, row)} />;
        }
        if (extension == 'doc' || extension == 'dot' || extension == 'dot' || extension == 'doc.xml' || extension == 'docb.xml' || extension == 'docb' || extension == 'ods' || extension == 'ots' || extension == 'odt' || extension == 'ott' || extension == 'odp' || extension == 'otp' || extension == 'odg' || extension == 'otg' || extension == 'pdf' || extension == 'docm' || extension == 'docx' || extension == 'dotm' || extension == 'dotx' || extension == 'dotx' || extension == 'pdf') {
          return <DescriptionIcon color="primary" style={{ marginLeft: '10px', marginRight: '10px', fontSize: '90px' }} onClick={(event) => this.handleAbrirClick(event, row)} />;
        }
        if (extension == 'xls' || extension == 'xlt' || extension == 'xlt' || extension == 'xlsb' || extension == 'xlsm' || extension == 'xlsm' || extension == 'xlsx' || extension == 'xps' || extension == 'csv') {
          return <ChromeReaderModeIcon color="primary" style={{ marginLeft: '10px', marginRight: '10px', fontSize: '90px' }} onClick={(event) => this.handleAbrirClick(event, row)} />;
        }
        if (extension == 'ppt' || extension == 'pot' || extension == 'pps' || extension == 'mpp' || extension == 'pub' || extension == 'pub' || extension == 'ppsm' || extension == 'ppsx' || extension == 'pptm' || extension == 'pptx' || extension == 'pptx' || extension == 'vsdx' || extension == 'vsd' || extension == 'vst') {
          return <Dvr color="primary" style={{ marginLeft: '10px', marginRight: '10px', fontSize: '90px' }} onClick={(event) => this.handleAbrirClick(event, row)} />;
        }
        if (extension == 'zip' || extension == 'rar' || extension == '7zip' || extension == 'jar') {
          return <AccountBalanceWallet color="primary" style={{ marginLeft: '10px', marginRight: '10px', fontSize: '90px' }} onClick={(event) => this.handleAbrirClick(event, row)} />;
        }
        if (extension == 'gif' || extension === 'png' || extension == 'jpg' || extension == 'jpeg' || extension == 'pbm' || extension == 'bmp' || extension == 'ppm' || extension == 'fax' || extension == 'tiff' || extension == 'tif' || extension == 'svg' || extension == 'dpx' || extension == 'ai' || extension == 'psd' || extension == 'emf' || extension == 'vclmtf' || extension == 'srf') {
          return <Image color="primary" style={{ marginLeft: '10px', marginRight: '10px', fontSize: '90px' }} onClick={(event) => this.handleAbrirClick(event, row)} />;
        }
        if (extension == 'mp3' || extension == 'mpga' || extension == 'mp2' || extension == 'wav' || extension == 'm3u' || extension == 'aif' || extension == 'aifc' || extension == 'aiff' || extension == 'ogg' || extension == 'oga' || extension == 'spx' || extension == 'flac' || extension == 'ogm' || extension == 'ogx' || extension == 'aac' || extension == 'm4a' || extension == 'm4b' || extension == 'm4p' || extension == 'm4r' || extension == 'mka' || extension == 'wax' || extension == 'wma' || extension == 'wax' || extension == 'wax' || extension == 'wax') {
          return <Audiotrack color="primary" style={{ marginLeft: '10px', marginRight: '10px', fontSize: '90px' }} onClick={(event) => this.handleAbrirClick(event, row)} />;
        }
        if (extension == 'mpa' || extension == 'mpe' || extension == 'mpeg' || extension == 'mpg' || extension == 'mpv2' || extension == 'mp4' || extension == 'mov' || extension == 'qt' || extension == 'ogv' || extension == 'webm' || extension == 'mkv' || extension == 'asf' || extension == 'asr' || extension == 'asx' || extension == 'avi' || extension == 'fli' || extension == 'flv' || extension == 'viv' || extension == 'vivo' || extension == 'm4v' || extension == '3gp' || extension == '3g2' || extension == 'wmv' || extension == 'wmx' || extension == 'gxf' || extension == 'mxf' || extension == 'mxf' || extension == 'mxf' || extension == 'mxf' || extension == 'mxf' || extension == 'mxf') {
          return <Theaters color="primary" style={{ marginLeft: '10px', marginRight: '10px', fontSize: '90px' }} onClick={(event) => this.handleAbrirClick(event, row)} />;
        }

        return <Receipt color="primary" style={{ marginLeft: '10px', marginRight: '10px', fontSize: '90px' }} />;

        break;
      }
      case 'Section': {
        return <FolderSpecial color="primary" style={{ marginLeft: '10px', marginRight: '10px', fontSize: '90px' }} onClick={(event) => this.handleAbrirClick(event, row)} />;
        break;
      }
      case 'Grupos': {
        return <Group color="primary" style={{ marginRight: '10px', fontSize: '90px' }} />;
        break;
      }
      default: {
        return <Receipt color="primary" style={{ marginLeft: '10px', marginRight: '10px', fontSize: '90px' }} onClick={(event) => this.handleAbrirClick(event, row)} />;
      }
        break;
    }
  }

  Devuelveinfo = (row) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Tooltip title="Abrir">
        <div style={{ display: 'flex', alignItems: 'center', }}>
          {this.DevuelveIcons(row)}
          {row.name}
          {' '}
          {<React.Fragment>{this.state.menu.menuselect === 'Búsqueda' && row.eliminado && <span style={{ marginLeft: '5px', color: '#000000', }}> (Actualmente eliminado)</span>}</React.Fragment>}
        </div>
      </Tooltip>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {row.compartido && <Tooltip title="Compartido"><Share color="disabled" style={{ marginRight: '6px', fontSize: '16px' }} /></Tooltip>}
        {row.bloqueado && <Tooltip title="Bloqueado"><Lock color="disabled" style={{ marginRight: '6px', fontSize: '16px' }} /></Tooltip>}
        {row.favorito && <Tooltip title="Favorito"><Grade color="disabled" style={{ marginRight: '6px', fontSize: '16px' }} /></Tooltip>}
        {row.etiquetado && <Tooltip title="Etiquetado"><LocalOffer color="disabled" style={{ marginRight: '6px', fontSize: '16px' }} /></Tooltip>}
        {row.comentado && <Tooltip title="Comentado"><InsertComment color="disabled" style={{ marginRight: '6px', fontSize: '16px' }} /></Tooltip>}
      </div>
    </div>
  )

  obtenertamaño = (tamanno) => {
    if (tamanno == 0) {
      return 1 + 'bytes';
    }
    let size = Math.round(tamanno / 1024, 2);
    if (size < 1024) {
      return size + ' KB';
    }
    size = Math.round(size / 1024, 2);
    if (size < 1024) {
      return size + ' MB';
    }
    size = Math.round(size / 1024, 2);
    if (size < 1024) {
      return size + ' GB';
    }
    return size + ' T';
  }

  // / Devolver estado a vacio //
  cambiarEstadoVacio = (lista) => {
    rows = [];
    rows = lista;
    const itemnew = self.state;
    itemnew.titulotoolbar = self.state.titulotoolbar;
    itemnew.showBackdrop = false;
    itemnew.iconvacio = self.state.iconvacio;
    itemnew.path = self.state.path;
    itemnew.tabla.order = 'asc';
    itemnew.tabla.orderBy = 'name';
    itemnew.tabla.selected = [];
    itemnew.tabla.numSelected = 0;
    itemnew.tabla.rowCount = lista.length;
    itemnew.menu.menuselect = self.state.menu.menuselect;
    itemnew.menu.hidebtnprincipales = self.state.menu.hidebtnprincipales;
    itemnew.ventadicionar.opencrear = false;
    itemnew.ventadicionar.renombrar = false;
    itemnew.ventadicionar.tipo = '';
    itemnew.ventadicionar.type = '';
    itemnew.ventadicionar.enunciado = '';
    itemnew.ventadicionar.mimeType = '';
    itemnew.ventadicionar.error = '';
    itemnew.ventadicionar.errorMessage = '';
    itemnew.ventadicionar.denom = '';
    itemnew.ventadicionar.descrip = '';
    itemnew.ventadicionar.id = '';
    self.setState({
      itemnew
    });
  }

  // / verificar formato //
  verificarFormato = (obj) => {
    const array = obj.properties['file:content']['mime-type'].split('/');
    if (array[0] === 'video' || array[0] === 'imagen') {
      return true;
    }

    return false;
  }

  // ejecutar consultas en el repositorio ///
  ejecutarQueryRepo(query, element) {
    return nuxeo.operation('Repository.Query').enrichers({ document: ['favorites', 'acls', 'publications', 'thumbnail', 'preview', 'tags'] })
      .params({
        language: 'NXQL',
        query,
        sortOrder: 'DESC',
        pageSize: element,
        maxResults: element
      })
      .execute({ schemas: ['file', 'dublincore'] })
      .then((docs) => docs.entries);
  }

  // / Devuelve la extension de un documento///
  Devolverextension = (name) => {
    let denom = name.trim();
    const array = denom.split('.');
    let extension = '';
    let i = 0;
    if (array.length > 1) {
      while (i < array.length - 1) {
        if (i > 0) {
          denom = denom + '.' + array[i];
        } else {
          denom = array[i];
        }
        i += 1;
      }
      extension = '.' + array[array.length - 1];
    }
    const obj = {
      extension,
      denominacion: denom
    };
    return obj;
  }

  // / verificar si el documento tiene a su padre en el resultado de la consulta ///
  Verificarpadre(doc) {
    let tienepadre = false;
    listaresultado.forEach(element => {
      if (doc.parentRef === element.uid && element.tipo === 'Folder') {
        tienepadre = true;
      }
    });
    return tienepadre;
  }

  // / construye el objeto con las propiedades que se necesitan //
  ConstruirObjetoDocumento(doc, statusbloq, statusownerbloq, fechabloq, comentado) {
    const textmodif = self.tiempotranscurrido(doc.lastModified);
    let tamanno = 1 + 'bytes';
    let file = [];
    let extension = '';
    let denominacion = doc.title;
    let mineType = '';
    let state = 'proyecto';
    let src = '';
    let preview = '';
    let thumbnail = '';
    if (doc.properties.hasOwnProperty('file:content')) {
      if (doc.properties['file:content']) {
        file = doc.properties['file:content'];
        tamanno = self.obtenertamaño(file.length);
      }
      const array = self.Devolverextension(doc.title);
      mineType = file['mime-type'];
      extension = array.extension;
      src = file.data;
      denominacion = array.denominacion;
    }
    let etiquetado = false;
    let etiquetasdoc = [];
    if (doc.contextParameters.tags) {
      if (doc.contextParameters.tags.length > 0) {
        etiquetado = true;
        etiquetasdoc = doc.contextParameters.tags;
      }
    }
    let fechaexpira = null;
    if (doc.properties['dc:expired'] !== null) {
      fechaexpira = moment(doc.properties['dc:expired'], 'YYYY-MM-DDTHH:mm:ss.SSSSZ').format('YYYY-MM-DD HH:mm:ss');
    }
    if (doc.state === 'approved' && doc.contextParameters.publications.resultsCount > 0) {
      state = 'publicado';
    }
    if (doc.contextParameters.preview) {
      preview = doc.contextParameters.preview.url;
    }
    if (doc.contextParameters.thumbnail) {
      thumbnail = doc.contextParameters.thumbnail.url;
    }
    // console.log(doc);

    const objdocument = {
      id: doc.uid,
      tipo: doc.type,
      name: doc.title,
      descripcion: doc.properties['dc:description'],
      estado: state,
      path: doc.path,
      parent: doc.parentRef,
      creado: moment(doc.properties['dc:created'], 'YYYY-MM-DDTHH:mm:ss.SSSSZ').format('YYYY-MM-DD HH:mm:ss'),
      creadopor: doc.properties['dc:creator'],
      ultcontribuyente: doc.properties['dc:lastContributor'],
      fechamodif: moment(doc.properties['dc:modified'], 'YYYY-MM-DDTHH:mm:ss.SSSSZ').format('YYYY-MM-DD HH:mm:ss'),
      contribuyentes: doc.properties['dc:contributors'],
      expira: fechaexpira,
      modificado: textmodif,
      tamanno,
      favorito: doc.contextParameters.favorites.isFavorite,
      compartido: permisosdoc.compartido,
      bloqueado: statusbloq,
      eliminado: doc.isTrashed,
      permisos: permisosdoc.permisos,
      ownerbloq: statusownerbloq,
      proxysecion: doc.isProxy,
      etiquetas: etiquetasdoc,
      fechabloq,
      etiquetado,
      comentado,
      extension,
      denominacion,
      mineType,
      preview,
      thumbnail,
      src
    };
    // console.log(objdocument);
    loadData.push(objdocument);
  }

  // / chequea que el usuario loguedo tenga permiso al documento y que el documento cumpla con las condiciones del filtro introducido///
  ChequearPermisosyFiltro(doc, filtro) {
    const permisos = [];
    permisosdoc = {};
    let compartido = false;
    let esta = false;
    let tienepermiso = true;
    if (doc.properties['dc:creator'] === user) {
      permisos.push('Everything');
      esta = true;
    }
    if (doc.contextParameters.acls.length > 0 && !esta) {
      const { acls } = doc.contextParameters;
      for (let i = acls.length - 1; i >= 0; i--) {
        const { aces } = acls[i];
        for (var j = aces.length - 1; j >= 0; j--) {
          let pertenece = false;
          grupos.forEach(group => {
            if (aces[j].username === group) {
              pertenece = true;
            }
          });
          if (aces[j].granted) {
            if (aces[j].username === 'Everyone' || aces[j].username === user || pertenece) {
              permisos.push(aces[j].permission);
              tienepermiso = true;
              compartido = true;
            }
          } else if (aces[j].username === 'Everyone' || aces[j].username === user || pertenece) {
            permisos.splice(aces[j].permission);
            if (permisos.length === 0) {
              tienepermiso = false;
              compartido = false;
            }
          }
        }
      }
    }
    let cumple = false;
    switch (filtro) {
      case 'Espacio de Grupo de Trabajo': {
        if (tienepermiso && (doc.type === 'Section') && !doc.isTrashed) {
          cumple = true;
        }
        break;
      }
      case 'Archivo': {
        if (tienepermiso && !doc.isTrashed && (doc.type === 'File' || doc.type === 'Folder' || doc.type === 'Section')) {
          cumple = true;
        }
        break;
      }
      case 'Recientes': {
        // console.log(tienepermiso + 'tipo '+ doc.type + ' si tiene padre '+  self.Verificarpadre(doc) );
        if (tienepermiso && (doc.type === 'File' || doc.type === 'Folder') && !self.Verificarpadre(doc)) {
          cumple = true;
        }
        break;
      }
      case 'Expirados': {
        if (tienepermiso && (doc.type === 'File' || doc.type === 'Folder') && !self.Verificarpadre(doc)) {
          cumple = true;
        }
        break;
      }
      case 'Favoritos': {
        if (tienepermiso && doc.contextParameters.favorites.isFavorite === true) {
          cumple = true;
        }
        break;
      }
      case 'Multimedia': {
        if (tienepermiso) {
          cumple = true;
        }
        break;
      }
      case 'Espacio Personal': {
        if (tienepermiso && (doc.type === 'File' || doc.type === 'Folder') && !doc.isTrashed) {
          cumple = true;
        }
        break;
      }
      case 'Eliminados': {
        if (tienepermiso && doc.isTrashed && !self.Verificarpadre(doc)) {
          cumple = true;
        }
        break;
      }

      case 'Espacio P. Busqueda': {
        if (tienepermiso && (doc.type === 'File' || doc.type === 'Folder') && !doc.isTrashed && !self.Verificarpadre(doc)) {
          cumple = true;
        }
        break;
      }

      case 'Archivo Busqueda': {
        if (tienepermiso && !doc.isTrashed && (doc.type === 'File' || doc.type === 'Folder') && !self.Verificarpadre(doc)) {
          cumple = true;
        }
        break;
      }

      case 'Folder Eliminada': {
        if (tienepermiso && doc.isTrashed && !self.Verificarpadre(doc)) {
          cumple = true;
        }
        break;
      }
      case 'Folder': {
        if (tienepermiso && (doc.type === 'File' || doc.type === 'Folder') && !doc.isTrashed) {
          cumple = true;
        }
        break;
      }
      case 'Folder Busqueda': {
        if (tienepermiso && (doc.type === 'File' || doc.type === 'Folder') && !doc.isTrashed && !self.Verificarpadre(doc)) {
          cumple = true;
        }
        break;
      }
      case 'Busqueda': {
        if (tienepermiso && (doc.type === 'File' || doc.type === 'Folder')) {
          cumple = true;
        }
        break;
      }
    }
    permisosdoc = {
      permisos,
      compartido,
    };
    return cumple;
  }


  // / devuelve dada una lista, la lista con los documentos con las propiedades que se necesitan y que cumplan con los permisos y los filtros solicitados ///
  DevolverListaFormateada(lista, cont, long, filtro) {
    const resultcheck = self.ChequearPermisosyFiltro(lista[cont], filtro);
    if (resultcheck) {
      lista[cont].fetchLockStatus()
        .then((status) => {
          nuxeo.request('id/' + lista[cont].uid + '/@comment')
            .get()
            .then((res) => {
              let comentado = false;
              if (res.totalSize > 0) {
                comentado = true;
              }
              let statusbloq = false;
              let statusownerbloq = '';
              let fechabloq = '';
              if (status.lockOwner !== undefined) {
                statusbloq = true;
                statusownerbloq = status.lockOwner;
                fechabloq = status.lockCreated;
              }
              self.ConstruirObjetoDocumento(lista[cont], statusbloq, statusownerbloq, fechabloq, comentado);
              cont += 1;
              if (long > cont) {
                // let newList = lista.splice(0, 1);
                // cont = cont + 1;
                self.DevolverListaFormateada(lista, cont, long, filtro);
              } else if (long === cont) {
                self.cambiarEstadoVacio(loadData);
              }
            });
        });
    } else {
      cont += 1;
      if (long > cont) {
        // let newList = lista.splice(0, 1);
        self.DevolverListaFormateada(lista, cont, long, filtro);
      } else if (long === cont) {
        // console.log(loadData);
        self.cambiarEstadoVacio(loadData);
      }
    }
  }

  // / Listar grupos ////
  DevolverListaGruposFormateada(lista, cont, long) {
    nuxeo.operation('UserGroup.Suggestion')
      .params({
        groupRestriction: lista[cont].groupname,
        searchType: 'USER_TYPE',
      })
      .execute()
      .then((users) => {
        const cantidad = users.length;
        let sistema = 'Sistema';
        if (lista[cont].groupname !== 'administrators' && lista[cont].groupname !== 'members' && lista[cont].groupname !== 'powerusers') {
          sistema = 'Usuarios';
        }
        const objgroup = {
          id: lista[cont].id,
          // tipo: grupo.type,
          name: lista[cont].grouplabel,
          id: lista[cont].groupname,
          displaylabel: lista[cont].displayLabel,
          descripcion: lista[cont].description,
          cantmiembros: cantidad,
          sistema,
          tipo: 'Grupos'
        };
        loadData.push(objgroup);
        cont += 1;
        if (long > cont) {
          self.DevolverListaGruposFormateada(lista, cont, long);
        } else if (long === cont) {
          self.cambiarEstadoVacio(loadData);
        }
      });
  }

  // //listar archivos///
  listarArchivos = (path, tipo) => {
    const itemnew = this.state;
    itemnew.showBackdrop = true;
    this.setState({
      itemnew
    });
    const cont = 0;
    loadData = [];
    switch (tipo) {
      case 'Grupos': {
        nuxeo.operation('UserGroup.Suggestion')
          // .input('/')
          .params({ searchType: 'GROUP_TYPE' })
          .execute()
          .then((res) => {
            // console.log(res)
            if (res.length > 0) {
              listaresultado = res;
              self.DevolverListaGruposFormateada(res, cont, res.length);
            } else {
              self.cambiarEstadoVacio(loadData);
            }
          });
        break;
      }
      case 'Espacio de Grupo de Trabajo': {
        nuxeo.operation('Document.GetChildren').enrichers({ document: ['favorites', 'acls', 'publications', 'tags'] })
          .input(path)
          .execute({ schemas: ['file', 'dublincore'] })
          .then((docs) => {
            if (docs.entries.length > 0) {
              self.DevolverListaFormateada(docs.entries, cont, docs.entries.length, 'Espacio de Grupo de Trabajo');
            } else {
              self.cambiarEstadoVacio(loadData);
            }
          });
        break;
      }
      case 'Recientes': {
        self.ejecutarQueryRepo("SELECT * FROM File, Folder WHERE ecm:primaryType IN ('File', 'Folder', 'Note', 'Section') AND ecm:isTrashed = 0 AND ecm:isProxy = 0 AND ecm:isVersion = 0 AND ecm:path STARTSWITH '" + dominio + workspace + "' ORDER BY dc:modified DESC", 5).then((docs) => {
          if (docs.length > 0) {
            listaresultado = docs;
            self.DevolverListaFormateada(docs, cont, docs.length, 'Recientes');
          } else {
            self.cambiarEstadoVacio(loadData);
          }
        });
        break;
      }
      case 'Expirados': {
        self.ejecutarQueryRepo("SELECT * FROM File, Folder WHERE ecm:primaryType IN ('File', 'Folder', 'Note') AND ecm:isTrashed = 0 AND ecm:isProxy = 0 AND ecm:isVersion = 0 AND dc:expired IS NOT NULL AND dc:expired <= DATE '" + moment(moment()).format('YYYY-MM-DD') + "' AND ecm:path STARTSWITH '" + dominio + workspace + "'", 2000000).then((docs) => {
          if (docs.length > 0) {
            listaresultado = docs;
            self.DevolverListaFormateada(docs, cont, docs.length, 'Expirados');
          } else {
            self.cambiarEstadoVacio(loadData);
          }
        });
        break;
      }
      case 'Multimedia': {
        self.ejecutarQueryRepo("SELECT * FROM File WHERE ecm:isTrashed = 0 AND ecm:isProxy = 0 AND ecm:isVersion = 0 AND (dc:expired IS NULL OR dc:expired >= DATE '" + moment(moment()).format('YYYY-MM-DD') + "') AND (dc:title LIKE '%.gif' OR dc:title LIKE '%.png' OR dc:title LIKE '%.jpg' OR dc:title LIKE '%.jpeg' OR dc:title LIKE '%.sgv' OR dc:title LIKE '%.bmp' OR dc:title LIKE '%.psd' OR dc:title LIKE '%.tiff' OR dc:title LIKE '%.tif' OR dc:title LIKE '%.fax' OR dc:title LIKE '%.emf' OR dc:title LIKE '%.dpx' OR dc:title LIKE '%.srf' OR dc:title LIKE '%.mp3' OR dc:title LIKE '%.mpg' OR dc:title LIKE '%.wav' OR dc:title LIKE '%.aif' OR dc:title LIKE '%.aiff' OR dc:title LIKE '%.m4a' OR dc:title LIKE '%.m4b' OR dc:title LIKE '%.m4p' OR dc:title LIKE '%.m4r' OR dc:title LIKE '%.mka' OR dc:title LIKE '%.wax' OR dc:title LIKE '%.wma' OR dc:title LIKE '%.ogg' OR dc:title LIKE '%.mpga' OR dc:title LIKE '%.mpa' OR dc:title LIKE '%.mpe' OR dc:title LIKE '%.mpeg' OR dc:title LIKE '%.mpg' OR dc:title LIKE '%.mpv2' OR dc:title LIKE '%.mp4' OR dc:title LIKE '%.mov' OR dc:title LIKE '%.qt' OR dc:title LIKE '%.ogv' OR dc:title LIKE '%.webm' OR dc:title LIKE '%.mkv' OR dc:title LIKE '%.asf' OR dc:title LIKE '%.asr' OR dc:title LIKE '%.asx' OR dc:title LIKE '%.avi' OR dc:title LIKE '%.fli' OR dc:title LIKE '%.flv' OR dc:title LIKE '%.viv' OR dc:title LIKE '%.vivo' OR dc:title LIKE '%.m4v' OR dc:title LIKE '%.3gp' OR dc:title LIKE '%.3gc' OR dc:title LIKE '%.wmv' OR dc:title LIKE '%.wmx' OR dc:title LIKE '%.flv' OR dc:title LIKE '%.mov') AND ecm:path STARTSWITH '" + dominio + workspace + "'", 2000000).then((docs) => {
          if (docs.length > 0) {
            self.DevolverListaFormateada(docs, cont, docs.length, 'Multimedia');
          } else {
            self.cambiarEstadoVacio(loadData);
          }
        });
        break;
      }
      case 'Favoritos': {
        nuxeo.operation('Favorite.GetDocuments').enrichers({ document: ['favorites', 'acls', 'publications', 'thumbnail', 'preview', 'tags'] })
          .input(path)
          .context({ 'enrichers.document': 'favorites' })
          .execute({ schemas: ['file', 'dublincore'] })
          .then((docs) => {
            if (docs.entries.length > 0) {
              listaresultado = docs;
              self.DevolverListaFormateada(docs.entries, cont, docs.entries.length, 'Favoritos');
            } else {
              self.cambiarEstadoVacio(loadData);
            }
          });
        break;
      }
      case 'Espacio Personal': {
        nuxeo.operation('Document.GetChildren').enrichers({ document: ['favorites', 'acls', 'publications', 'thumbnail', 'preview', 'tags'] })
          .input(path)
          .execute({ schemas: ['file', 'dublincore'] })
          .then((docs) => {
            if (docs.entries.length > 0) {
              self.DevolverListaFormateada(docs.entries, cont, docs.entries.length, 'Espacio Personal');
            } else {
              self.cambiarEstadoVacio(loadData);
            }
          });
        break;
      }
      case 'Folder': {
        nuxeo.operation('Document.GetChildren').enrichers({ document: ['favorites', 'acls', 'publications', 'thumbnail', 'preview', 'tags'] })
          .input(path)
          .execute({ schemas: ['file', 'dublincore'] })
          .then((docs) => {
            if (docs.entries.length > 0) {
              if (self.state.menu.menuselect == 'Eliminados') {
                self.DevolverListaFormateada(docs.entries, cont, docs.entries.length, 'Folder Eliminada');
              } else {
                self.DevolverListaFormateada(docs.entries, cont, docs.entries.length, 'Folder');
              }
            } else {
              self.cambiarEstadoVacio(loadData);
            }
          });
        break;
      }
      case 'Eliminados': {
        self.ejecutarQueryRepo("SELECT * FROM File, Folder WHERE ecm:primaryType IN ('File', 'Folder', 'Note') AND ecm:isTrashed = 1 AND (dc:creator = '" + user + "' OR (ecm:acl/*/principal = '" + user + "' AND ecm:acl/*/grant = 1 AND ecm:acl/*/permission IN ('Everything'))) AND ecm:path STARTSWITH '" + dominio + workspace + "' ORDER BY dc:created DESC", 2000000).then((docs) => {
          if (docs.length > 0) {
            listaresultado = docs;
            self.DevolverListaFormateada(docs, cont, docs.length, 'Eliminados');
          } else {
            self.cambiarEstadoVacio(loadData);
          }
        });
        break;
      }
      default: {
        nuxeo.operation('Document.GetChildren').enrichers({ document: ['favorites', 'acls', 'publications', 'thumbnail', 'preview', 'tags'] })
          .input(path)
          .execute({ schemas: ['file', 'dublincore'] })
          .then((docs) => {
            const documentos = docs.entries;
            self.ejecutarQueryRepo("SELECT * FROM File, Folder, Section WHERE ecm:primaryType IN ('File', 'Folder', 'Note', 'Section') AND ecm:isTrashed = 0 AND ecm:isProxy = 0 AND ecm:isVersion = 0 AND dc:creator <>'" + user + "' AND (dc:expired IS NULL OR dc:expired >= DATE '" + moment(moment()).format('YYYY-MM-DD') + "') AND ecm:path STARTSWITH '" + dominio + workspace + "' ORDER BY dc:created DESC", 2000000).then((listdocs) => {
              listaresultado = listdocs;
              listaresultado.forEach(element => {
                let esta = false;
                documentos.forEach(doc => {
                  // console.log(doc);
                  if (doc.uid === element.uid) {
                    esta = true;
                  }
                });
                if (!esta) {
                  documentos.push(element);
                }
              });
              if (documentos.length > 0) {
                self.DevolverListaFormateada(documentos, cont, documentos.length, 'Archivo');
              } else {
                self.cambiarEstadoVacio(loadData);
              }
            });
          });
        break;
      }
    }
  }


  crearusuario = () => {
    nuxeo = new Nuxeo({
      baseURL: urlnuxeo,
      auth: {
        method: 'basic',
        username: usercheq,
        password: usercheq
      }
    });
    const newUser = {
      properties: {
        username: user,
        password: user,
        firstName: user,
        company: 'Módulo de Gestión Documental',
        email: emailempresa,
      },
    };
    nuxeo.users()
      .create(newUser)
      .then((users) => {
        // console.log(users);
        self.crearworkspaceuser();
      });
  }


  creardominio = () => {
    nuxeo = new Nuxeo({
      baseURL: urlnuxeo,
      auth: {
        method: 'basic',
        username: usercheq,
        password: usercheq
      }
    });

    nuxeo.operation('Document.Create')
      .enrichers({ document: ['favorites', 'breadcrumb', 'acls', 'publications', 'tags'] })
      .input('/')
      .params({
        type: 'Domain',
        name: nombredominio
      })
      .execute()
      .then((doc) => {
        // console.log('Modif');
        self.ejecutarQueryRepo("SELECT * FROM Document WHERE ecm:path STARTSWITH'" + dominio + "'", 5).then((docs) => {
          if (docs.length === 0) {
            nuxeo.operation('Document.RemoveACL')
              .input(docs[0].path)
              .params({ acl: 'inherited', })
              .execute()
              .then((doc) => {
                nuxeo.operation('Document.AddACE')
                  .input(doc.path)
                  .params({
                    acl: 'local',
                    user: 'Everyone',
                    permission: 'Everything',
                    grant: false,
                    overwrite: true
                  })
                  .execute()
                  .then((doc) => {
                    doc.set({
                      'dc:title': user,
                      'dc:type': 'UserWorkspacesRoot',

                    });
                    doc.save();
                    self.existeusuario();
                  });
              });
          } else {
            self.existeusuario();
          }
        });
      });
  }

  existeusuario = () => {
    nuxeo = new Nuxeo({
      baseURL: urlnuxeo,
      auth: {
        method: 'basic',
        username: usercheq,
        password: usercheq
      }
    });
    nuxeo.operation('UserGroup.Suggestion')
      .params({
        searchType: 'USER_TYPE',
        searchTerm: user
      })
      .execute()
      .then((res) => {
        if (res.length > 0) {
          self.ejecutarQueryRepo("SELECT * FROM Workspace WHERE ecm:name='" + user + "' AND ecm:path STARTSWITH '" + dominio + workspace + "'", 5).then((docs) => {
            if (docs.length === 0) {
              self.crearworkspaceuser();
            } else {
              self.conectaranuxeo();
            }
          });
        } else {
          self.crearusuario();
        }
      });
  }

  crearworkspaceuser = () => {
    nuxeo = new Nuxeo({
      baseURL: urlnuxeo,
      auth: {
        method: 'basic',
        username: usercheq,
        password: usercheq
      }
    });
    nuxeo.operation('Document.Create')
      .enrichers({ document: ['acls'] })
      .input(dominio + workspace)
      .params({
        type: 'Workspace',
        name: user
      })
      .execute()
      .then((doc) => {
        // console.log(doc);
        nuxeo.operation('Document.AddACE')
          .enrichers({ document: ['acls'] })
          .input(doc.path)
          .params({
            acl: 'local',
            user,
            permission: 'Everything',
            grant: true,
            overwrite: true
          })
          .execute()
          .then((doc1) => {
            // console.log(doc1);
            self.conectaranuxeo();
          });

        //
      });
  }

  conectaranuxeo = () => {
    nuxeo = new Nuxeo({
      baseURL: urlnuxeo,
      auth: {
        method: 'basic',
        username: user,
        password: user
      }
    });

    nuxeo.connect({
      baseURL: urlnuxeo,
      auth: {
        method: 'basic',
        username: user,
        password: user
      }
    })
      .then((client) => {
        conexion = 1;
        // let url = dominio + workspace + user + '/';

        administrador = client.user.isAdministrator;
        grupos = client.user.properties.groups;
        emailempresa = client.user.properties.email;
        self.listarArchivos(self.state.path, 'Archivo');
      }).catch((error) => {
        rows = [];
        notification('danger', 'Usuario no autorizado');
        self.setState({
          showBackdrop: false,
          titulotoolbar: self.state.titulotoolbar,
          iconvacio: self.state.iconvacio,
          textbuscar: '',
          tabla: {
            rowCount: 0,
            order: 'asc',
            selected: [],
            orderBy: 'name',
            numSelected: 0,
          },
          menu: {
            menuselect: self.state.menu.menuselect,
          },
          comentario: {
            listcoments: [],
          }
        });
        conexion = 2;
        // throw error;
      });
  }


  conectarServer = () => {
    const variante = '';
    const mensaje = '';
    self.ejecutarQueryRepo("SELECT * FROM Domain WHERE ecm:name='" + nombredominio + "'", 5).then((docs) => {
      // console.log(docs);
      if (docs.length === 0) {
        self.creardominio();
      } else {
        self.existeusuario();
      }
    });
  }

  // // Crear documentos ///
  // // Crear documentos ///
  handleYesConfirmCrear = (datos) => {
    if (this.state.ventadicionar.type === 'Grupo') {
      const tipoadd = 'Folder';
      const denomadd = datos.denominacion.trim();
      nuxeo.operation('UserGroup.Suggestion')
        .params({
          searchType: 'GROUP_TYPE',
          searchTerm: denomadd
        })
        .execute()
        .then((res) => {
          let similitud = 0;
          res.forEach(grupo => {
            if (grupo.groupname === denomadd) {
              similitud += 1;
            }
          });
          if (similitud === 0 || (similitud === 1 && self.state.ventadicionar.renombrar === true && res[0].id === self.state.ventadicionar.id)) {
            let msg = 'El grupo ' + denomadd + ' fue creado satisfactoriamente';
            let id = denomadd;
            if (self.state.ventadicionar.renombrar === true) {
              msg = 'El grupo ' + denomadd + ' fue modificado satisfactoriamente';
              id = self.state.ventadicionar.id;
            }
            nuxeo.operation('Group.CreateOrUpdate')
              .params({
                groupname: id,
                grouplabel: denomadd,
                description: datos.descripcion,
                mode: 'createorUpadate'
              })
              .execute()
              .then((group) => {
                self.listarArchivos('path', 'Grupos');
                notification('success', msg);
              });
          } else {
            self.setState({
              ventadicionar: {
                opencrear: true,
                renombrar: self.state.ventadicionar.renombrar,
                tipo: self.state.ventadicionar.tipo,
                type: self.state.ventadicionar.type,
                enunciado: self.state.ventadicionar.enunciado,
                mimeType: self.state.ventadicionar.mimeType,
                error: true,
                denom: datos.denominacion,
                descrip: datos.descripcion,
                id: self.state.ventadicionar.id,
                errorMessage: 'Cambiar valor, ya existe un grupo con esa denominación',
              },
            });
          }
        });
    } else {
      let tipoadd = 'Folder';
      let denomadd = datos.denominacion.trim();
      if (this.state.ventadicionar.type !== tipoadd) {
        if (this.state.ventadicionar.type === 'Section') {
          tipoadd = 'Section';
          denomadd = datos.denominacion.trim();
        } else {
          tipoadd = 'File';
          denomadd = datos.denominacion.trim() + this.state.ventadicionar.type;
        }
      }
      const exist = true;
      nuxeo.operation('Document.FetchByProperty')
        .params({ property: 'dc:title', values: denomadd })
        .execute()
        .then((docs) => {
          // console.log(docs)
          if (docs.entries.length == 0 || (self.state.ventadicionar.renombrar === true && docs.entries[0].uid === self.state.ventadicionar.id)) {
            if (self.state.ventadicionar.renombrar) {
              nuxeo.repository()
                .fetch(seleccionado.path)
                .then((doc) => {
                  // doc.title !== 'foo'
                  doc.set({
                    'dc:title': denomadd,
                    'dc:description': datos.descripcion
                  });
                  doc.save();
                  if (self.state.menu.menuselect === 'Búsqueda') {
                    self.handleEjecutarQuery(self.state.busqueda.sql);
                  } else {
                    self.listarArchivos(self.state.path, self.state.iconvacio);
                  }
                  notification('success', 'El archivo se renombró satisfactoriamente');
                })
                .catch((error) => {
                  throw error;
                });
            } else {
              const newDocument = {
                'entity-type': 'document',
                name: denomadd,
                type: tipoadd,
                properties: {
                  'dc:title': denomadd,
                  'dc:description': datos.descripcion
                }
              };
              // console.log(self.state.path)
              nuxeo.repository()
                .create(self.state.path, newDocument)
                .then((doc) => {
                  if (self.state.menu.menuselect === 'Búsqueda') {
                    self.handleEjecutarQuery(self.state.busqueda.sql);
                  } else {
                    self.listarArchivos(self.state.path, self.state.iconvacio);
                  }
                  notification('success', 'El archivo se creó satisfactoriamente');
                })
                .catch((error) => {
                  throw error;
                });
            }
          } else {
            // console.log('poner error')
            self.setState({
              ventadicionar: {
                opencrear: true,
                renombrar: self.state.ventadicionar.renombrar,
                tipo: self.state.ventadicionar.tipo,
                type: self.state.ventadicionar.type,
                enunciado: self.state.ventadicionar.enunciado,
                mimeType: self.state.ventadicionar.mimeType,
                error: true,
                denom: datos.denominacion,
                descrip: datos.descripcion,
                id: self.state.ventadicionar.id,
                errorMessage: 'Cambiar valor, ya existe un archivo con esa denominación',
              },
            });
          }
        });
    }
  }

  handleNoConfirmCrear = () => {
    this.setState({
      ventadicionar: {
        opencrear: false,
        renombrar: false,
        tipo: '',
        type: '',
        enunciado: '',
        mimeType: '',
        error: false,
        errorMessage: '',
        denom: '',
        descrip: '',
      },
    });
  }

  // // Compartir Archivos ////
  handleClickMostrarShare = () => {
    const itemnew = this.state;
    itemnew.openpanel = true;
    itemnew.tabactivo = 2;
    this.setState({
      itemnew
    });
    this.handleMenuActionsClose();
    this.listarACLShare(seleccionado.path, false);
  }

  // / Descargar Archivos ////
  handleClickDownload = () => {
    const seleccionados = this.devuelveseleccionados();
    const contador = 1;
    const estado = this.state;
    estado.showBackdrop = true;
    this.setState({
      estado
    });
    // console.log(seleccionados);
    this.handlerecursiveDownload(seleccionados, contador, seleccionados.length);
  }

  handlerecursiveDownload(lista, cont, longt) {
    let msg = 'El achrivo ' + lista[0].name + ' fue descargado satisfactoriamente.';
    if (lista[0].tipo === 'Folder') {
      nuxeo.operation('Blob.BulkDownload')
        .input(lista[0].path)
        .execute()
        .then((resp) => {
          resp.blob().then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = lista[0].name;
            a.click();
            if (longt > cont) {
              const newList = lista.splice(0, 1);
              cont += 1;
              self.handlerecursiveDownload(lista, cont, longt);
            } else {
              if (longt > 1) {
                msg = 'Los archivos fueron descargados satisfactoriamente';
              }
              notification('success', msg);
              self.setState({
                showBackdrop: false,
                tabla: {
                  rowCount: self.state.tabla.rowCount,
                  order: 'asc',
                  selected: [],
                  orderBy: 'name',
                  numSelected: 0,
                },
              });
            }
          }).catch((error) => {
            // throw error;
            notification('danger', 'Error al descargar el archivo');
            self.setState({
              tabla: {
                rowCount: self.state.tabla.rowCount,
                order: 'asc',
                selected: [],
                orderBy: 'name',
                numSelected: 0,
              },
            });
          });
        });
    } else {
      nuxeo.operation('Document.GetBlobs')
        .input(lista[0].path)
        .execute()
        .then((resp) => {
          resp.blob().then(blob => {
            // console.log(blob);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = lista[0].name;
            a.click();
            if (longt > cont) {
              const newList = lista.splice(0, 1);
              cont += 1;
              self.handlerecursiveDownload(lista, cont, longt);
            } else {
              if (longt > 1) {
                msg = 'Los archivos fueron descargados satisfactoriamente';
              }
              notification('success', msg);
              self.setState({
                showBackdrop: false,
                tabla: {
                  rowCount: self.state.tabla.rowCount,
                  order: 'asc',
                  selected: [],
                  orderBy: 'name',
                  numSelected: 0,
                },
              });
            }
          }).catch((error) => {
            // throw error;
            notification('danger', 'Error al descargar el archivo');
            self.setState({
              tabla: {
                rowCount: self.state.tabla.rowCount,
                order: 'asc',
                selected: [],
                orderBy: 'name',
                numSelected: 0,
              },
            });
          });
        });
    }
  }


  // / Subir Archivos /////
  onChangeupload = (event) => {
    this.setState({
      showBackdrop: true,
    });
    const contador = 1;
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      this.handlerecursiveuploadFiles(files, 0, contador, files.length);
    } else {
      self.setState({
        showBackdrop: false,
      });
      notification('danger', 'Debe seleccionar al menos un archivo');
      /* self.setState({
        showBackdrop: false,
        notificacion: {
          variante: 'error',
          mensaje: 'Debe seleccionar al menos un archivo'
        },
      }) */
    }

    // console.log('cargando');
  }

  // / Buscar denominación existe//
  handleBuscarRepetidos = (denomadd, rep, lista, cont, longt) => {
    // console.log(denomadd);
    nuxeo.operation('Document.FetchByProperty')
      .params({ property: 'dc:title', values: denomadd })
      .execute()
      .then((docs) => {
        if (docs.entries.length > 0) {
          let denom = lista[0].name.trim();
          const array = denom.split('.');
          let i = 0;
          while (i < array.length - 1) {
            if (i > 0) {
              denom = denom + '.' + array[i];
            } else {
              denom = array[i];
            }
            i += 1;
          }
          if (rep == 0) {
            rep = rep + docs.entries.length + 1;
          } else {
            rep += docs.entries.length;
          }
          denom = denom + '(' + rep + ').' + array[array.length - 1];
          self.handleBuscarRepetidos(denom, rep, lista, cont, longt);
        } else {
          let msg = 'El achrivo ' + denomadd + ' fue importado satisfactoriamente';
          // console.log(lista[0]);
          const blob = new Nuxeo.Blob({
            content: lista[0], name: denomadd, mimeType: lista[0].type, size: lista[0].size
          });
          // console.log(blob);
          const newDocument = {
            'entity-type': 'document',
            name: denomadd,
            type: 'File',
            properties: {
              'dc:title': denomadd
            }
          };
          nuxeo.repository()
            .create(self.state.path, newDocument)
            .then((doc) => {
              nuxeo.batchUpload()
                .upload(blob)
                .then((res) =>
                  // let objblod = res.blob;
                  nuxeo.operation('Blob.AttachOnDocument')
                    .param('document', self.state.path + denomadd)
                    .input(res.blob)
                    .execute()
                )
                .then(() => {
                  if (longt > cont) {
                    const newList = lista.splice(0, 1);
                    cont += 1;
                    self.handlerecursiveuploadFiles(lista, 0, cont, longt);
                  } else {
                    if (longt > 1) {
                      msg = 'Los archivos fueron importados satisfactoriamente.';
                    }
                    // self.cargarArchivos();
                    self.listarArchivos(self.state.path, self.state.iconvacio);
                    notification('success', msg);
                    self.setState({
                      showBackdrop: false,
                      titulotoolbar: self.state.titulotoolbar,
                      iconvacio: self.state.iconvacio,

                    });
                  }
                })
                .then((doc) => {

                })
                .catch((error) => {
                  notification('danger', error);
                });
            })
            .catch((error) => {
              notification('danger', error);
              /* self.setState({
                notificacion: {
                  variante: 'error',
                  mensaje: error
                },
              }) */
            });
        }
      });
  }


  handlerecursiveuploadFiles(lista, rep, cont, longt) {
    this.handleBuscarRepetidos(lista[0].name, rep, lista, cont, longt);
  }

  render() {
    const { classes } = this.props;
    const title = brand.name + ' - Gestión Documental';
    const description = brand.desc;
    const { openpanel } = this.state;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock whiteBg title="Gestión Documental" desc="Aquí podrá gestionar todas sus archivos (documentos, hoja de cálculos, imagenes, videos, entre otros)">
          <Grid
            container
            direction="row"
          >
            <Grid item sm={12} md={3} lg={3} align="left">
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={(
                  <ListSubheader component="div" id="nested-list-subheader">
                    MENÚ PRINCIPAL
                  </ListSubheader>
                )}
                style={{ borderRight: 2 }}
                className={classes.root}
              >
                <ListItem button onClick={(e) => this.handleActionsListItem('Archivo')} selected={this.state.menu.menuselect === 'Archivo'}>
                  <ListItemIcon>
                    <Archive />
                  </ListItemIcon>
                  <ListItemText primary="Archivo" />
                </ListItem>
                <ListItem button onClick={(e) => this.handleActionsListItem('Recientes')} selected={this.state.menu.menuselect === 'Recientes'}>
                  <ListItemIcon>
                    <History />
                  </ListItemIcon>
                  <ListItemText primary="Recientes" />
                </ListItem>
                <ListItem button onClick={(e) => this.handleActionsListItem('Búsqueda')} selected={this.state.menu.menuselect === 'Búsqueda'}>
                  <ListItemIcon>
                    <Search />
                  </ListItemIcon>
                  <ListItemText primary="Búsqueda" />
                </ListItem>
                <ListItem button onClick={(e) => this.handleActionsListItem('Expirados')} selected={this.state.menu.menuselect === 'Expirados'}>
                  <ListItemIcon>
                    <HourglassEmpty />
                  </ListItemIcon>
                  <ListItemText primary="Expirados" />
                </ListItem>
                <ListItem button onClick={(e) => this.handleActionsListItem('Favoritos')} selected={this.state.menu.menuselect === 'Favoritos'}>
                  <ListItemIcon>
                    <Grade />
                  </ListItemIcon>
                  <ListItemText primary="Favoritos" />
                </ListItem>
                <ListItem button onClick={(e) => this.handleActionsListItem('Multimedia')} selected={this.state.menu.menuselect === 'Multimedia'}>
                  <ListItemIcon>
                    <PermMedia />
                  </ListItemIcon>
                  <ListItemText primary="Multimedia" />
                </ListItem>
                <ListItem button onClick={(e) => this.handleActionsListItem('Espacio Personal')} selected={this.state.menu.menuselect === 'Espacio Personal'}>
                  <ListItemIcon>
                    <FolderShared />
                  </ListItemIcon>
                  <ListItemText primary="Esp. Personal" />
                </ListItem>
                <ListItem button onClick={(e) => this.handleActionsListItem('Eliminados')} selected={this.state.menu.menuselect === 'Eliminados'}>
                  <ListItemIcon>
                    <DeleteSweep />
                  </ListItemIcon>
                  <ListItemText primary="Eliminados" />
                </ListItem>
                {/* <ListItem button onClick={(e) => this.handleActionsListItem('Notificaciones')} selected={'Notificaciones' === this.state.menu.menuselect ? true : false} >
                  <ListItemIcon>
                    <Notifications />
                  </ListItemIcon>
                  <ListItemText primary="Notificaciones" />
                </ListItem> */}
                <ListItem button onClick={(e) => this.handleActionsListItem('Espacio de Grupo de Trabajo')} selected={this.state.menu.menuselect === 'Espacio de Grupo de Trabajo'} style={{ display: administrador ? '' : 'none' }}>
                  <ListItemIcon>
                    <FolderSpecial />
                  </ListItemIcon>
                  <ListItemText primary="Esp. de GT" />
                </ListItem>
                <ListItem button onClick={(e) => this.handleActionsListItem('Grupos')} selected={this.state.menu.menuselect === 'Grupos'} style={{ display: administrador ? '' : 'none' }}>
                  <ListItemIcon>
                    <Group />
                  </ListItemIcon>
                  <ListItemText primary="Grupos" />
                </ListItem>
              </List>
            </Grid>

            <Grid item sm={12} md={9} lg={9} style={{ borderLeft: '2px solid #FF0000' }}>
              <Grid item sm={12} md={12} lg={12}>
                <div style={{
                  marginLeft: '10px', marginTop: '15px', color: '#FF0000', display: 'flex', alignItems: 'center'
                }}
                >
                  {this.state.antecesor.listpath.map((row, index) => (
                    <React.Fragment>
                      {index > 0 && <div style={{ paddingLeft: '3px', paddingRight: '3px' }}><b>/</b></div>}
                      {row.vinculo ? (
                        <Link color="inherit" onClick={(event) => this.handleSeleccionarCamino(row)} style={{ paddingRight: '3px' }}>
                          {this.devuelveiconscamino(row.iconvacioantecesor)}
                          {' '}
                          {row.denom}
                        </Link>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {this.devuelveiconscamino(row.iconvacioantecesor)}
                          {' '}
                          <Typography color="primary" style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '16px' }}>{row.denom}</Typography>
                          {' '}

                        </div>
                      )
                      }
                    </React.Fragment>
                  ))
                  }
                </div>
              </Grid>
              <Grid item sm={12} md={12} lg={12}>
                <div>
                  <CssBaseline />
                  <AppBar
                    position="static"
                    style={{ marginTop: '30px' }}
                    className={classes.appBar}
                  >
                    <Toolbar variant="dense" style={{ justifyContent: 'space-between' }}>
                      {this.state.tabla.numSelected > 0 ? (
                        this.state.menu.menuselect !== 'Grupos' ? (
                          <Typography className={classes.title} style={{ color: '#FFFFFF' }} variant="subtitle1">
                            <b>
                              {this.state.tabla.numSelected}
                              {' '}
archivos seleccionados
                            </b>
                          </Typography>
                        ) : (
                          <Typography className={classes.title} style={{ color: '#FFFFFF' }} variant="subtitle1">
                            <b>
                              {this.state.tabla.numSelected}
                              {' '}
grupos seleccionados
                            </b>
                          </Typography>
                        )
                      ) : (
                      // console.log(this.state.menu.menuselect),
                        <Typography className={classes.title} variant="h6" id="tableTitle" style={{ color: '#FFFFFF' }}>
                          {this.state.titulotoolbar}
                        </Typography>
                      )
                      }
                      <div style={{ display: 'flex', alignItems: 'center', marginRight: '70px' }}>
                        {this.state.tabla.numSelected > 0 ? (
                          <React.Fragment>
                            <div className={classes.sectionDesktop} style={{ color: '#FFFFFF' }}>
                              {!this.state.menu.hidebtnprincipales
                                && (
                                  <React.Fragment>
                                    {this.state.acciones.share && (
                                      <Tooltip title="Compartir">
                                        <IconButton
                                          aria-label="compartir"
                                          onClick={this.handleClickMostrarShare}
                                          style={{ color: '#FFFFFF' }}
                                        >
                                          <Share />
                                        </IconButton>
                                      </Tooltip>
                                    )
                                    }
                                    {this.state.acciones.download && (
                                      <Tooltip title="Descargar archivo">
                                        <IconButton
                                          aria-label="descargar"
                                          onClick={this.handleClickDownload}
                                          style={{ color: '#FFFFFF' }}
                                        >
                                          <GetApp />
                                        </IconButton>
                                      </Tooltip>
                                    )
                                    }
                                  </React.Fragment>
                                )
                              }
                              {this.state.acciones.menuvisible && (
                                <div>
                                  <Tooltip title="Más acciones">
                                    <IconButton
                                      aria-label="acciones"
                                      aria-controls="long-menu"
                                      aria-haspopup="true"
                                      onClick={this.handleClickMenuActions}
                                      style={{ color: '#FFFFFF' }}
                                    >
                                      <MenuIcons />
                                    </IconButton>
                                  </Tooltip>
                                  <Menu
                                    id="long-menu"
                                    anchorEl={this.state.anchorEl}
                                    keepMounted
                                    open={this.state.openmenu}
                                    onClose={this.handleMenuActionsClose}
                                  >
                                    {this.state.acciones.fav
                                    && (
                                      <Tooltip title="Añadir a favoritos">
                                        <MenuItem key="favorito" onClick={this.handleActionsMenuAddFavorite}>
                                          <Grade color="primary" style={{ marginRight: '5px' }} />
                                        Favoritos
                                        </MenuItem>
                                      </Tooltip>
                                    )
                                    }
                                    {this.state.acciones.unfav
                                    && (
                                      <Tooltip title="Quitar de favoritos">
                                        <MenuItem key="quitarfavorito" onClick={this.handleActionsMenuRemoveFavorite}>
                                          <StarBorder color="primary" style={{ marginRight: '5px' }} />
                                        Quitar Fav.
                                        </MenuItem>
                                      </Tooltip>
                                    )
                                    }
                                    {this.state.acciones.bloq && (
                                      <Tooltip title="Bloquear">
                                        <MenuItem
                                          key="bloquear"
                                          onClick={this.handleActionsMenuBloquear}
                                          // onClick={this.handleActionsMenuDesbloquear}
                                        >
                                          <Lock color="primary" style={{ marginRight: '5px', fontSize: '20px' }} />
                                      Bloquear
                                        </MenuItem>
                                      </Tooltip>
                                    )
                                    }
                                    {this.state.acciones.unbloq && (
                                      <Tooltip title="Desbloquear">
                                        <MenuItem key="desbloquear" onClick={this.handleActionsMenuDesbloquear}>
                                          <LockOpen color="primary" style={{ marginRight: '5px' }} />
                                      Desbloq.
                                        </MenuItem>
                                      </Tooltip>
                                    )
                                    }
                                    {this.state.acciones.etiq
                                    && (
                                      <Tooltip title="Etiquetar">
                                        <MenuItem key="etiquetar" onClick={(event) => this.mostrarComment(true, false)}>
                                          <LocalOffer color="primary" style={{ marginRight: '5px' }} />
                                        Etiquetar
                                        </MenuItem>
                                      </Tooltip>
                                    )
                                    }
                                    {this.state.acciones.coment
                                    && (
                                      <Tooltip title="Comentar">
                                        <MenuItem key="comentar" onClick={(event) => this.mostrarComment(true, true)}>
                                          <InsertComment color="primary" style={{ marginRight: '5px' }} />
                                        Comentar
                                        </MenuItem>
                                      </Tooltip>
                                    )
                                    }
                                    {this.state.acciones.edit
                                    && (
                                      <Tooltip title="Renombrar">
                                        <MenuItem key="renombrar" onClick={(event) => this.mostrarActualizar()}>
                                          <Edit color="primary" style={{ marginRight: '5px' }} />
                                        Renombrar
                                        </MenuItem>
                                      </Tooltip>
                                    )
                                    }
                                    {this.state.acciones.detall
                                    && (
                                      <Tooltip title="Metadatos del archivo">
                                        <MenuItem key="detalle" onClick={(event) => this.toggleDrawer(true)}>
                                          <Info color="primary" style={{ marginRight: '5px' }} />
                                        Detalle
                                        </MenuItem>
                                      </Tooltip>
                                    )
                                    }
                                    {this.state.acciones.mover
                                    && (
                                      <Tooltip title="Mover archivo">
                                        <MenuItem key="mover" onClick={(event) => this.prepararMovimiento()}>
                                          <MoveToInbox color="primary" style={{ marginRight: '5px' }} />
                                        Mover
                                        </MenuItem>
                                      </Tooltip>
                                    )
                                    }
                                    {this.state.acciones.eliminar
                                    && (
                                      <Tooltip title="Eliminar archivo">
                                        <MenuItem key="eliminar" onClick={this.handleActionsMenuEliminar}>
                                          <Delete color="primary" style={{ marginRight: '5px' }} />
                                        Eliminar
                                        </MenuItem>
                                      </Tooltip>
                                    )
                                    }
                                    {this.state.acciones.elimadmin
                                    && (
                                      <Tooltip title="Eliminar">
                                        <MenuItem key="eliminaradmin" onClick={this.handleActionsMenuEliminar}>
                                          <Delete color="primary" style={{ marginRight: '5px' }} />
                                        Eliminar
                                        </MenuItem>
                                      </Tooltip>
                                    )
                                    }
                                    {this.state.acciones.gestusergroup
                                    && (
                                      <Tooltip title="Gestionar Miembros">
                                        <MenuItem key="gestusergroup" onClick={(event) => this.mostrarMiembros(true)}>
                                          <PersonAdd color="primary" style={{ marginRight: '5px', fontSize: '20px' }} />
                                         Miembros
                                        </MenuItem>
                                      </Tooltip>
                                    )
                                    }
                                    {this.state.acciones.elimgroup
                                    && (
                                      <Tooltip title="Eliminar Grupos">
                                        <MenuItem key="eliminargroup" onClick={this.handleActionsMenuEliminarGroup}>
                                          <Delete color="primary" style={{ marginRight: '5px' }} />
                                        Eliminar
                                        </MenuItem>
                                      </Tooltip>
                                    )
                                    }
                                    {this.state.acciones.papelera
                                    && (
                                      <React.Fragment>
                                        <Tooltip title="Recuperar archivo">
                                          <MenuItem key="recuperar" onClick={this.handleActionsMenuRecuperar}>
                                            <Undo color="primary" style={{ marginRight: '5px' }} />
                                          Recuperar
                                          </MenuItem>
                                        </Tooltip>
                                        <Tooltip title="Eliminar permanentemente">
                                          <MenuItem key="eliminarperm" onClick={this.handleActionsMenuEliminarPerm}>
                                            <Delete color="primary" style={{ marginRight: '5px' }} />
                                          Permanente
                                          </MenuItem>
                                        </Tooltip>
                                      </React.Fragment>
                                    )
                                    }
                                  </Menu>
                                </div>
                              )
                              }
                            </div>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            {this.state.antecesor.mostrarbtnatras
                                && (
                                  <Tooltip title="Ir hacia atrás">
                                    <IconButton
                                      style={{ color: '#FFFFFF' }}
                                      id="atrasdocument"
                                      aria-label="atras"
                                      aria-haspopup="true"
                                      onClick={this.handleClickAtras}
                                    >
                                      <Reply />
                                    </IconButton>
                                  </Tooltip>
                                )
                            }
                            {this.state.menu.hidebtnprincipales === false ? (
                              <React.Fragment>
                                { this.state.acciones.crear ? (
                                  this.state.menu.menuselect !== 'Espacio de Grupo de Trabajo' && this.state.menu.menuselect !== 'Grupos' ? (
                                    <React.Fragment>
                                      <Tooltip title="Crear archivo">
                                        <IconButton
                                          style={{ color: '#FFFFFF' }}
                                          id="adddocument"
                                          aria-label="acciones"
                                          aria-controls="long-menu"
                                          aria-haspopup="true"
                                          onClick={this.handleClickAddMenuActions}
                                        >
                                          <Add />
                                        </IconButton>
                                      </Tooltip>
                                      <Menu
                                        id="long-menu"
                                        anchorEl={this.state.anchoraddEl}
                                        keepMounted
                                        open={this.state.openaddmenu}
                                        onClose={this.handleMenuAddActionsClose}
                                      >
                                        <Tooltip title="Crear Carpeta">
                                          <MenuItem key="folder" onClick={(event) => this.handleActionsMenuadd(event, 'Folder')}>
                                            <Folder color="primary" style={{ marginRight: '5px', fontSize: '20px' }} />
                                         Carpeta
                                          </MenuItem>
                                        </Tooltip>
                                        <Tooltip title="Crear documento">
                                          <MenuItem key="documento" onClick={(event) => this.handleActionsMenuadd(event, 'File')}>
                                            <DescriptionIcon color="primary" style={{ marginRight: '5px', fontSize: '20px' }} />
                                         Documento
                                          </MenuItem>
                                        </Tooltip>
                                        <Tooltip title="Crear nota">
                                          <MenuItem key="nota" onClick={(event) => this.handleActionsMenuadd(event, 'Nota')}>
                                            <InsertDriveFileIcon color="primary" style={{ marginRight: '5px', fontSize: '20px' }} />
                                         Nota
                                          </MenuItem>
                                        </Tooltip>
                                        <Tooltip title="Crear Hoja de Cálculo">
                                          <MenuItem key="hoja" onClick={(event) => this.handleActionsMenuadd(event, 'Hoja')}>
                                            <ChromeReaderModeIcon color="primary" style={{ marginRight: '5px', fontSize: '20px' }} />
                                         Hoja de Cálculo
                                          </MenuItem>
                                        </Tooltip>
                                        <Tooltip title="Crear presentacion">
                                          <MenuItem key="presentacion" onClick={(event) => this.handleActionsMenuadd(event, 'Presentacion')}>
                                            <Dvr color="primary" style={{ marginRight: '5px', fontSize: '20px' }} />
                                         Presentación
                                          </MenuItem>
                                        </Tooltip>
                                      </Menu>
                                    </React.Fragment>
                                  ) : (
                                    this.state.menu.menuselect === 'Espacio de Grupo de Trabajo' ? (
                                      <React.Fragment>
                                        <Tooltip title="Crear">
                                          <IconButton
                                            style={{ color: '#FFFFFF' }}
                                            id="adddocument"
                                            aria-label="acciones"
                                            aria-controls="long-menuadd"
                                            aria-haspopup="true"
                                            onClick={(event) => this.handleActionsMenuadd(event, 'Secion')}
                                          >
                                            <Add />
                                          </IconButton>
                                        </Tooltip>
                                      </React.Fragment>
                                    ) : (
                                      this.state.menu.menuselect === 'Grupos' ? (
                                        <React.Fragment>
                                          <Tooltip title="Crear">
                                            <IconButton
                                              style={{ color: '#FFFFFF' }}
                                              id="adddocument"
                                              aria-label="acciones"
                                              aria-controls="long-menuadd"
                                              aria-haspopup="true"
                                              onClick={(event) => this.handleActionsMenuadd(event, 'Grupo')}
                                            >
                                              <Add />
                                            </IconButton>
                                          </Tooltip>
                                        </React.Fragment>
                                      ) : (null)
                                    ))
                                ) : (null)

                                }
                                <div className={classes.search}>
                                  <div className={classes.searchIcon}>
                                    <SearchIcon />
                                  </div>
                                  <InputBase
                                    onChange={(event) => this.handleBuscar(event)}
                                    placeholder="Buscar…"
                                    classes={{
                                      root: classes.inputRoot,
                                      input: classes.inputInput,
                                    }}
                                  />
                                </div>
                              </React.Fragment>
                            ) : (
                              <React.Fragment>
                                {this.state.menu.menuselect !== 'Búsqueda'
                                      && (
                                        <div className={classes.search} style={{ color: '#FFFFFF' }}>
                                          <div className={classes.searchIcon}>
                                            <SearchIcon />
                                          </div>
                                          <InputBase
                                            onChange={(event) => this.handleBuscar(event)}
                                            placeholder="Buscar…"
                                            classes={{
                                              root: classes.inputRoot,
                                              input: classes.inputInput,
                                            }}
                                          />
                                        </div>
                                      )
                                }
                              </React.Fragment>
                            )}
                          </React.Fragment>
                        )}
                      </div>
                    </Toolbar>
                  </AppBar>
                  <main
                    className={classes.content, {
                      [classes.contentShift]: openpanel,
                    }}
                  >
                    {this.state.menu.menuselect === 'Búsqueda'
                      && (
                        <div style={{ margin: '10px' }}>
                          <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                              <Typography className={classes.heading} color="primary">Introduzca los criterios por los que desea filtrar los documentos</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails style={{ paddingLeft: '20px' }}>
                              <Grid container direction="row">
                                <Grid item xs={12} md={1} style={{ marginRight: '10px', minWidth: '170px' }} spacing={2}>
                                  <TextField
                                    id="titulo"
                                    label="Denominación"
                                    value={this.state.busqueda.denombuscar}
                                    onChange={this.handleChangedenominacion}
                                  />
                                </Grid>
                                <Grid item xs={12} md={1} style={{ marginRight: '10px', minWidth: '170px' }} spacing={2}>
                                  <TextField
                                    id="descripcion"
                                    label="Descripción"
                                    value={this.state.busqueda.descripbuscar}
                                    onChange={this.handleChangedescripcion}
                                  />
                                </Grid>
                                <Grid item xs={12} md={1} style={{ marginRight: '10px', marginTop: '3px', minWidth: '170px' }} spacing={2}>
                                  <FormControl size="small" fullWidth>
                                    <InputLabel htmlFor="combotipo">Tipo Documento</InputLabel>
                                    <Select
                                      id="combotipo"
                                      value={this.state.busqueda.combotipo}
                                      onChange={this.handleChangeComboTipo}
                                    >
                                      <MenuItem value=""><em>Vacio</em></MenuItem>
                                      <MenuItem value={1}>Documentos</MenuItem>
                                      <MenuItem value={2}>Presentaciones</MenuItem>
                                      <MenuItem value={3}>Hojas de cálculos</MenuItem>
                                      <MenuItem value={4}>Notas</MenuItem>
                                      <MenuItem value={5}>Audio</MenuItem>
                                      <MenuItem value={6}>Imágenes</MenuItem>
                                      <MenuItem value={7}>Video</MenuItem>
                                      <MenuItem value={8}>Otros</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} md={1} style={{ marginRight: '10px', minWidth: '170px' }} spacing={2}>
                                  <TextField
                                    id="tamaño"
                                    type="number"
                                    label="Tamaño en MB"
                                    value={this.state.busqueda.tamanno}
                                    onChange={this.handleChangetamanno}
                                    style={{}}
                                  />
                                </Grid>
                                <Grid item xs={12} md={1} style={{ marginRight: '10px', marginTop: '3px', minWidth: '170px' }} spacing={2}>
                                  <FormControl size="small" fullWidth>
                                    <InputLabel htmlFor="comboestado">Estado</InputLabel>
                                    <Select
                                      id="comboestado"
                                      value={this.state.busqueda.comboestado}
                                      onChange={this.handleChangeEstado}
                                    >
                                      <MenuItem value=""><em>Vacio</em></MenuItem>
                                      <MenuItem value={1}>Creado</MenuItem>
                                      <MenuItem value={2}>Modificado</MenuItem>
                                      <MenuItem value={3}>Publicado</MenuItem>
                                      <MenuItem value={4}>Expirado</MenuItem>
                                      <MenuItem value={5}>Bloqueado</MenuItem>
                                      <MenuItem value={6}>Eliminado</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} md={1} style={{ marginRight: '10px', marginTop: '16px', minWidth: '170px' }} spacing={2}>
                                  <MuiPickersUtilsProvider utils={MomentUtils} locale="es" moment={moment}>
                                    <DatePicker
                                      id="fechadesde"
                                      disabled={this.state.busqueda.disablefechas}
                                      keyboard
                                      placeholder="Fecha Desde"
                                      format="YYYY/MM/DD"
                                      // handle clearing outside => pass plain array if you are not controlling value outside
                                      mask={value => (value ? [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]
                                        : [])
                                      }
                                      maxDate={this.state.busqueda.fechahasta !== 'null' ? moment(this.state.busqueda.fechahasta) : moment()}
                                      value={this.state.busqueda.fechadesde}
                                      onChange={this.handleDateChangefechadesde}
                                      disableOpenOnEnter
                                      animateYearScrolling={false}
                                      // autoOk={true}
                                      // clearable
                                      onInputChange={(e) => this.cambiarEstado(e)}
                                    />
                                  </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item xs={12} md={1} style={{ marginRight: '10px', marginTop: '16px', minWidth: '170px' }} spacing={2}>
                                  <MuiPickersUtilsProvider utils={MomentUtils} locale="es" moment={moment}>
                                    <DatePicker
                                      id="fechahasta"
                                      disabled={this.state.busqueda.disablefechas}
                                      keyboard
                                      placeholder="Fecha Hasta"
                                      format="YYYY/MM/DD"
                                      // handle clearing outside => pass plain array if you are not controlling value outside
                                      mask={value => (value ? [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]
                                        : [])
                                      }
                                      minDate={moment(this.state.busqueda.fechadesde).add(1, 'day')}
                                      maxDate={moment()}
                                      value={this.state.busqueda.fechahasta}
                                      onChange={this.handleDateChangefechahasta}
                                      disableOpenOnEnter
                                      animateYearScrolling={false}
                                      // autoOk={true}
                                      // clearable
                                      onInputChange={(e) => this.cambiarEstadoHasta(e)}
                                    />
                                  </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item xs={12} md={1} style={{ marginRight: '10px', minWidth: '170px' }} spacing={2}>
                                  <TextField
                                    id="ejecuto"
                                    label="Ejecutó"
                                    disabled={this.state.busqueda.disablefechas}
                                    value={this.state.busqueda.ejecutobuscar}
                                    onChange={this.handleChangeejecuto}
                                  />
                                </Grid>
                                <Grid item xs={12} md={1} style={{ marginRight: '10px', minWidth: '170px' }} spacing={2}>
                                  <TextField
                                    id="etiqueta"
                                    type="search"
                                    label="Etiquetas"
                                    value={this.state.busqueda.etiquetas}
                                    onChange={this.handleChangeEtiquetas}
                                  />
                                </Grid>
                                <Grid item xs={12} md={1} style={{ marginRight: '10px', minWidth: '170px' }} spacing={2}>
                                  <TextField
                                    id="contribuyentes"
                                    type="search"
                                    label="Contribuyentes"
                                    value={this.state.busqueda.contribuyentes}
                                    onChange={this.handleChangeContribuyentes}
                                  />
                                </Grid>
                                <div style={{ marginLeft: '15px', marginTop: '5px' }}>
                                  <Tooltip title="Buscar">
                                    <IconButton aria-label="settings" disabled={this.state.busqueda.btnbuscar}>
                                      <Search
                color="primary"
                style={{ fontSize: '25px' }}
                onClick={(e) => this.handleBuscarAvanzado()}
              />
                                    </IconButton>
                                  </Tooltip>
                                </div>
                              </Grid>

                            </ExpansionPanelDetails>
                          </ExpansionPanel>
                        </div>
                      )
                    }
                    <div style={{ maxWidth: '100%' }}>
                      <Table
                        className={classes.root}
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"
                      // maxHeight = '100px'
                      // stickyHeader
                      /*  style={{ position: 'sticky',
                         top: 0}} */
                      >
                        {this.state.tabla.rowCount > 0 ? (
                          this.state.menu.menuselect === 'Grupos' ? (
                            <React.Fragment>
                              <div style={{ maxHeight: '350px', overflow: 'auto', }}>
                                <TableHead>
                                  <TableRow>
                                    <TableCell
                                      padding="checkbox"
                                      style={{
                                        width: '2%', position: 'sticky', top: 0, backgroundColor: '#FFFFFF', zIndex: 10
                                      }}
                                    >
                                      <Tooltip title="Seleccionar todos">
                                        <Checkbox
                                          indeterminate={this.state.tabla.numSelected > 0 && this.state.tabla.numSelected < this.state.tabla.rowCount}
                                          checked={this.state.tabla.numSelected > 0 && this.state.tabla.numSelected === this.state.tabla.rowCount}
                                          onChange={this.handleSelectAllClickGroup}
                                          inputProps={{ 'aria-label': 'select all desserts' }}
                                        />
                                      </Tooltip>
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        width: '35%', position: 'sticky', top: 0, backgroundColor: '#FFFFFF', zIndex: 10
                                      }}
                                      key="name"
                                      align="center"
                                      padding="default"
                                      sortDirection={this.state.tabla.orderBy === 'name' ? this.state.tabla.order : false}
                                    >
                                      <TableSortLabel
                                        active={this.state.tabla.orderBy === 'name'}
                                        direction={this.state.tabla.orderBy === 'name' ? this.state.tabla.order : 'asc'}
                                        onClick={this.createSortHandler('name')}
                                      >
                                        Denominación
                                      </TableSortLabel>
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        width: '40%', position: 'sticky', top: 0, backgroundColor: '#FFFFFF', zIndex: 10
                                      }}
                                      key="descripcion"
                                      align="center"
                                      padding="default"
                                      sortDirection={this.state.tabla.orderBy === 'descripcion' ? this.state.tabla.order : false}
                                    >
                                      <TableSortLabel
                                        active={this.state.tabla.orderBy === 'descripcion'}
                                        direction={this.state.tabla.orderBy === 'descripcion' ? this.state.tabla.order : 'asc'}
                                        onClick={this.createSortHandler('descripcion')}
                                      >
                                        Descripción
                                      </TableSortLabel>
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        width: '10%', position: 'sticky', top: 0, backgroundColor: '#FFFFFF', zIndex: 10
                                      }}
                                      key="sistema"
                                      align="center"
                                      padding="default"
                                      sortDirection={this.state.tabla.orderBy === 'sistema' ? this.state.tabla.order : false}
                                    >
                                      <TableSortLabel
                                        active={this.state.tabla.orderBy === 'sistema'}
                                        direction={this.state.tabla.orderBy === 'sistema' ? this.state.tabla.order : 'asc'}
                                        onClick={this.createSortHandler('sistema')}
                                      >
                                        Creado
                                      </TableSortLabel>
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        width: '15%', position: 'sticky', top: 0, backgroundColor: '#FFFFFF', zIndex: 10
                                      }}
                                      key="cantmiembros"
                                      align="center"
                                      padding="default"
                                      sortDirection={this.state.tabla.orderBy === 'cantmiembros' ? this.state.tabla.order : false}
                                    >
                                      <TableSortLabel
                                        active={this.state.tabla.orderBy === 'cantmiembros'}
                                        direction={this.state.tabla.orderBy === 'cantmiembros' ? this.state.tabla.order : 'asc'}
                                        onClick={this.createSortHandler('cantmiembros')}
                                      >
                                        Miembros
                                      </TableSortLabel>
                                    </TableCell>
                                  </TableRow>
                                </TableHead>

                                <TableBody style={{ maxHeight: '100px', overflow: 'scroll' }}>
                                  {this.stableSort(rows, this.getSorting(this.state.tabla.order, this.state.tabla.orderBy))
                                    .map((row, index) => {
                                      const isItemSelected = this.isSelected(row.name);
                                      const labelId = `enhanced-table-checkbox-${index}`;
                                      return (
                                        <TableRow
                                          hover
                                          aria-checked={isItemSelected}
                                          tabIndex={-1}
                                          key={row.id}
                                          selected={isItemSelected}
                                        >
                                          <TableCell padding="checkbox">
                                            <Tooltip title="Seleccione">
                                              <Checkbox
                                                id={'checkbox' + row.id}
                                                checked={isItemSelected}
                                                onClick={(event) => this.handleRowClickGroup(event, row.name)}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                              />
                                            </Tooltip>
                                          </TableCell>
                                          <TableCell component="th" id={labelId} scope="row" padding="none">
                                            {this.Devuelveinfo(row)}
                                          </TableCell>
                                          <TableCell align="left">{row.descripcion}</TableCell>
                                          <TableCell align="left">{row.sistema}</TableCell>
                                          <TableCell align="center">{row.cantmiembros}</TableCell>
                                        </TableRow>
                                      );
                                    })}
                                </TableBody>
                                {this.state.showBackdrop && (
                                  <Modal
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                    open={this.state.showBackdrop}
                                  >
                                    <Loading color="primary" />
                                  </Modal>
                                )}
                              </div>
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <div style={{ maxHeight: '350px', overflow: 'auto', }}>
                                <TableHead>
                                  <TableRow>
                                    <TableCell
                                      padding="checkbox"
                                      style={{
                                        width: '2%', backgroundColor: '#FFFFFF', position: 'sticky', top: 0, zIndex: 10,
                                      }}
                                    >
                                      <Tooltip title="Seleccionar todos">
                                        <Checkbox
                                          indeterminate={this.state.tabla.numSelected > 0 && this.state.tabla.numSelected < this.state.tabla.rowCount}
                                          checked={this.state.tabla.numSelected > 0 && this.state.tabla.numSelected === this.state.tabla.rowCount}
                                          onChange={this.handleSelectAllClick}
                                          inputProps={{ 'aria-label': 'select all desserts' }}
                                          style={{ backgroundColor: '#FFFFFF', }}
                                        />
                                      </Tooltip>
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        width: '68%', position: 'sticky', top: 0, backgroundColor: '#FFFFFF', zIndex: 10
                                      }}
                                      key="name"
                                      align="center"
                                      padding="default"
                                      sortDirection={this.state.tabla.orderBy === 'name' ? this.state.tabla.order : false}
                                    >
                                      <TableSortLabel
                                        active={this.state.tabla.orderBy === 'name'}
                                        direction={this.state.tabla.orderBy === 'name' ? this.state.tabla.order : 'asc'}
                                        onClick={this.createSortHandler('name')}
                                      >
                                          Nombre
                                      </TableSortLabel>
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        width: '15%', position: 'sticky', top: 0, backgroundColor: '#FFFFFF', zIndex: 10
                                      }}
                                      key="tamanno"
                                      align="center"
                                      padding="default"
                                      sortDirection={this.state.tabla.orderBy === 'tamanno' ? this.state.tabla.order : false}
                                    >
                                      <TableSortLabel
                                        active={this.state.tabla.orderBy === 'tamanno'}
                                        direction={this.state.tabla.orderBy === 'tamanno' ? this.state.tabla.order : 'asc'}
                                        onClick={this.createSortHandler('tamanno')}
                                      >
                                          Tamaño
                                      </TableSortLabel>
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        width: '15%', position: 'sticky', top: 0, backgroundColor: '#FFFFFF', zIndex: 10
                                      }}
                                      key="modificado"
                                      align="center"
                                      padding="default"
                                      sortDirection={this.state.tabla.orderBy === 'modificado' ? this.state.tabla.order : false}
                                    >
                                      <TableSortLabel
                                        active={this.state.tabla.orderBy === 'modificado'}
                                        direction={this.state.tabla.orderBy === 'modificado' ? this.state.tabla.order : 'asc'}
                                        onClick={this.createSortHandler('modificado')}
                                      >
                                          Modificado
                                      </TableSortLabel>
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {this.stableSort(rows, this.getSorting(this.state.tabla.order, this.state.tabla.orderBy))
                                    .map((row, index) => {
                                      const isItemSelected = this.isSelected(row.name);
                                      const labelId = `enhanced-table-checkbox-${index}`;
                                      return (
                                        <TableRow
                                          hover
                                          aria-checked={isItemSelected}
                                          tabIndex={-1}
                                          key={row.id}
                                          selected={isItemSelected}
                                        >
                                          <TableCell padding="checkbox" style={{ width: '2%' }}>
                                            <Tooltip title="Seleccione">
                                              <Checkbox
                                                id={'checkbox' + row.id}
                                                checked={isItemSelected}
                                                onClick={(event) => this.handleRowClick(event, row.name)}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                              />
                                            </Tooltip>
                                          </TableCell>
                                          <TableCell style={{ width: '68%' }} component="th" id={labelId} scope="row" padding="none" onClick={(event) => this.handleAbrirClick(row)}>
                                            {this.Devuelveinfo(row)}
                                          </TableCell>
                                          <TableCell align="right" style={{ width: '15%' }}>{row.tamanno}</TableCell>
                                          <TableCell align="right" style={{ width: '15%' }}>{row.modificado}</TableCell>
                                        </TableRow>
                                      );
                                    })}
                                </TableBody>
                                {this.state.showBackdrop && (
                                  <Modal
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                    open={this.state.showBackdrop}
                                  >
                                    <Loading color="primary" />
                                  </Modal>
                                )}
                              </div>
                            </React.Fragment>
                          )
                        ) : (
                          <div style={{ textAlign: 'center', marginTop: '12%' }}>
                            {this.devuelveiconsitems()}
                            {this.state.iconvacio != 'Espacio de Grupo de Trabajo' && this.state.iconvacio != 'Grupos' && <Typography style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '16px' }}><b>No hay archivos que mostrar...</b></Typography>}
                            {this.state.iconvacio === 'Espacio de Grupo de Trabajo' && <Typography style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '16px' }}><b>No hay espacios de grupos de trabajo que mostrar...</b></Typography>}
                            {this.state.iconvacio === 'Grupos' && <Typography style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '16px' }}><b>No hay grupos que mostrar...</b></Typography>}
                          </div>
                        )}
                      </Table>
                    </div>
                  </main>
                  <Drawer
                    anchor="right"
                    open={openpanel}
                    classes={{
                      paper: classes.drawerPaper,
                    }}
                  >
                    <div style={{ borderRadius: '0px' }}>
                      <div style={{ display: 'flex', backgroundColor: '#FF0000', height: 'auto' }}>
                        <IconButton onClick={(event) => this.toggleDrawer(false)}>
                          <ChevronRightIcon style={{ marginLeft: '5px', color: '#FFFFFF', fontSize: '20px' }} />
                        </IconButton>
                        <Typography className={classes.title} variant="h7" id="tableTitle" style={{ /* color: '#FF0000', */ marginLeft: '5px', paddingTop: '10px', color: '#FFFFFF' }}>
                          {seleccionado.name}
                        </Typography>
                      </div>
                      <Grid container direction="row">
                        <Grid item sm={12} md={4} lg={5}>
                          <div style={{
                            display: 'flex', alignItems: 'center', marginLeft: '35px', marginTop: '10px'
                          }}
                          >
                            {this.DevuelveIconsDetaill(seleccionado)}
                          </div>
                          <div style={{
                            display: 'flex', alignItems: 'center', marginLeft: '20px', marginTop: '10px'
                          }}
                          >
                            {seleccionado.compartido && <Tooltip title="Compartido"><Share color="primary" className={classes.iconspequennos} /></Tooltip>}
                            {seleccionado.bloqueado && <Tooltip title="Bloqueado"><Lock color="primary" className={classes.iconspequennos} /></Tooltip>}
                            {seleccionado.favorito && <Tooltip title="Favorito"><Grade color="primary" className={classes.iconspequennos} /></Tooltip>}
                            {seleccionado.etiquetado && <Tooltip title="Etiquetado"><LocalOffer color="primary" className={classes.iconspequennos} /></Tooltip>}
                            {seleccionado.comentado && <Tooltip title="Comentado"><InsertComment color="primary" className={classes.iconspequennos} /></Tooltip>}
                          </div>
                        </Grid>
                        <Grid item sm={12} md={8} lg={7}>
                          {this.state.menu.menuselect != 'Espacio de Grupo de Trabajo' && this.state.menu.menuselect != 'Grupos' && (
                            <div className={classes.metadatadetailprimero}>
                              <b> estado: </b>
                              <Chip
                                size="small"
                                label={seleccionado.estado}
                                color="primary"
                                style={{ marginLeft: '5px', height: '25px' }}
                              />
                            </div>
                          )}
                          {this.state.menu.menuselect != 'Grupos' && (
                            <div className={classes.metadatadetail}>
                              <b> creado: </b>
                              <span className={classes.textspacenego}>{seleccionado.creado}</span>
                            </div>
                          )}
                          {this.state.menu.menuselect != 'Grupos' && (
                            <div className={classes.metadatadetail}>
                              <b> creado por: </b>
                              <span className={classes.textspacenego}>{seleccionado.creadopor}</span>
                            </div>
                          )}
                          {this.state.menu.menuselect != 'Grupos' && (
                            <div className={classes.metadatadetail}>
                              <b> tamaño: </b>
                              <span className={classes.textspacenego}>{seleccionado.tamanno}</span>
                            </div>
                          )}
                          {this.state.menu.menuselect === 'Grupos' && <div className={classes.metadatadetail}><b> Descripción: </b></div>}
                          {this.state.menu.menuselect === 'Grupos' && <div className={classes.metadatadetail}>{seleccionado.descripcion}</div>}
                        </Grid>
                      </Grid>
                      {this.state.menu.menuselect != 'Grupos'
                        && (
                          <Grid item sm={12} md={12} lg={12}>
                            <div className={classes.metadatacontributorprimero}>
                              <b> descripción: </b>
                              <span className={classes.textspacenego}>{seleccionado.descripcion}</span>
                            </div>
                            <div className={classes.metadatacontributor}>
                              <b> contribuyentes: </b>
                              <span className={classes.textspacenego}>{seleccionado.contribuyentes}</span>
                            </div>
                            <div className={classes.metadatacontributor}>
                              <b> último contribuyente: </b>
                              <span className={classes.textspacenego}>{seleccionado.ultcontribuyente}</span>
                            </div>
                            <div className={classes.metadatacontributor}>
                              <b> modificado: </b>
                              <span className={classes.textspacenego}>{seleccionado.fechamodif}</span>
                            </div>
                          </Grid>
                        )}
                      <Grid item sm={12} md={12} lg={12}>
                        <Tabs
                          value={this.state.tabactivo}
                          onChange={this.handleCambioTabActivo}
                          indicatorColor="primary"
                          textColor="primary"
                          variant="scrollable"
                          scrollButtons="auto"
                          className={classes.tabs}
                        >
                          <Tooltip title="Actividad"><Tab className={classes.tab} label="Actividad" style={{ display: this.state.menu.menuselect === 'Grupos' ? 'none' : '' }} /></Tooltip>
                          <Tooltip title="Publicar"><Tab className={classes.tab} label="Publicar" disabled={!this.state.acciones.share} style={{ display: this.state.menu.menuselect === 'Grupos' ? 'none' : '' }} /></Tooltip>
                          <Tooltip title="Compartir"><Tab className={classes.tab} label="Compartir" disabled={!this.state.acciones.share} style={{ display: this.state.menu.menuselect === 'Grupos' ? 'none' : '' }} /></Tooltip>
                          <Tooltip title="Comentar"><Tab className={classes.tab} label="Comentar" disabled={!this.state.acciones.comentar} style={{ display: this.state.menu.menuselect === 'Grupos' ? 'none' : '' }} /></Tooltip>
                          <Tooltip title="Etiquetar"><Tab className={classes.tab} label="Etiquetar" disabled={!this.state.acciones.comentar} style={{ display: this.state.menu.menuselect === 'Grupos' ? 'none' : '' }} /></Tooltip>
                          <Tooltip title="Permisos"><Tab className={classes.tab} label="Permisos" disabled={!this.state.acciones.permisos} style={{ display: this.state.menu.menuselect === 'Grupos' ? 'none' : '' }} /></Tooltip>
                          <Tooltip title="Versiones"><Tab className={classes.tab} label="Versiones" disabled={!this.state.acciones.version} style={{ display: this.state.menu.menuselect === 'Grupos' ? 'none' : '' }} /></Tooltip>
                          <Tooltip title="Micelaneas"><Tab className={classes.tab} label="Micelaneas" disabled={!this.state.acciones.comentar} style={{ display: this.state.menu.menuselect === 'Grupos' ? 'none' : '' }} /></Tooltip>
                          <Tooltip title="Miembros"><Tab className={classes.tab} label="Miembros" style={{ display: this.state.menu.menuselect === 'Grupos' ? '' : 'none' }} /></Tooltip>
                        </Tabs>
                        {this.state.tabactivo === 0
                          && (
                            <TabContainer style={{ borderBottom: '2px solid #FFFFFF' }}>
                              <div style={{ height: '325px' }}>
                                <React.Fragment>
                                  {this.state.historial.totalactividad > 0 ? (
                                    <Grid container>
                                      {this.state.historial.listactividad.map((row, index) => (
                                        <Card className={classes.root} style={{ width: '400px', marginTop: '10px' }}>
                                          <CardHeader
                                            style={{ padding: '10px' }}
                                            avatar={(
                                              <Tooltip title={row.principalName}>
                                                <Avatar aria-label="recipe" className={classes.avatar}>
                                                  {row.principalName.charAt().toUpperCase()}
                                                </Avatar>
                                              </Tooltip>
                                            )}
                                            title={this.devolverAccion(row.eventId)}
                                            subheader={moment(row.eventDate, 'YYYY-MM-DDTHH:mm:ss.SSSSZ').format('YYYY-MM-DD HH:mm:ss')}
                                          />
                                        </Card>
                                      ))
                                      }
                                      {this.state.historial.totalactividad >= 4
                                      && (
                                        <div style={{ marginLeft: '100px' }}>
                                          <Button color="secundary" className={classes.button} onClick={(e) => this.prepararlistaractividad()}>
                                            <Typography textAlign="center" style={{ fontSize: '10px', color: '#FF0000' }}>
                                              <b>{this.state.historial.textactbtntodos}</b>
                                            </Typography>
                                          </Button>
                                        </div>
                                      )
                                      }
                                    </Grid>
                                  )
                                    : (
                                      <div style={{ textAlign: 'center', marginTop: '25%', height: '325px' }}>
                                        <History style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '30px', marginBottom: '10px' }} />
                                        <Typography style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '14px' }}><b>No se ha registrado actividad en el documento seleccionado...</b></Typography>
                                      </div>

                                    )}

                                </React.Fragment>
                              </div>

                            </TabContainer>
                          )
                        }
                        {this.state.tabactivo === 1
                          && (
                            <TabContainer style={{ borderBottom: '2px solid #FFFFFF' }} disabled>
                              <div style={{ textAlign: 'center', height: '325px' }}>
                                <div className={classes.margin}>
                                  <Grid container>
                                    <Grid item>
                                      <Public
                                        style={{
                                          verticalAlign: 'center', position: 'relative', marginTop: '17px', marginRight: '15px'
                                        }}
                                        color="primary"
                                      />
                                    </Grid>
                                    <Grid item style={{ width: '280px' }}>
                                      <FormControl size="small" variant="outlined" className={classes.formControl}>
                                        <InputLabel
                                          ref={ref => { this.InputLabelRef = ref; }}
                                          htmlFor="select-multiple-checkbox"
                                        >
Publicar en...
                                        </InputLabel>
                                        <Select
                                          multiple
                                          value={this.state.publicar.name}
                                          onChange={this.handleChangeSelectSecion}
                                          input={<OutlinedInput name="age" labelWidth={80} id="select-multiple-checkbox" />}
                                          renderValue={selected => selected.join(', ')}
                                        >
                                          {this.state.publicar.listseciones ? (
                                            this.state.publicar.listseciones.map(secion => (
                                              <MenuItem key={secion.name} value={secion.name} style={{ maxHeight: 36 }}>
                                                <Checkbox checked={this.state.publicar.name.indexOf(secion.name) > -1} />
                                                <Tooltip title={secion.descripcion}>
                                                  <div>{secion.name}</div>
                                                </Tooltip>
                                              </MenuItem>
                                            ))
                                          ) : (
                                            <MenuItem key="nulo" value="nulo">
                                              <Tooltip title="No hay seciones donde publicar ó el documento ya fue publicado">
                                                <div>No hay secciones donde publicar </div>
                                              </Tooltip>
                                            </MenuItem>
                                          )
                                          }

                                        </Select>
                                      </FormControl>
                                    </Grid>
                                    <Grid item>
                                      <Tooltip title="Publicar documento">
                                        <IconButton
                                          color="primary"
                                          aria-label="upload picture"
                                          component="span"
                                          style={{
                                            verticalAlign: 'center', position: 'relative', marginTop: '5px', marginLeft: '5px'
                                          }}
                                          disabled={this.state.publicar.btnpublicardisable}
                                          onClick={(e) => this.handleActionPublicar(e)}
                                        >
                                          <Done />
                                        </IconButton>
                                      </Tooltip>
                                    </Grid>
                                  </Grid>
                                </div>
                                <React.Fragment>
                                  <div>
                                    <div style={{
                                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #FF0000'
                                    }}
                                    >
                                      <Typography align="left" variant="h7" color="primary" style={{ marginLeft: '5px' }}><b>Espacios de GT donde se ha publicado:</b></Typography>
                                      <Tooltip title="Dejar de publicar el documento">
                                        <IconButton color="primary" component="span" disabled={this.state.publicar.deletepublicardisable} onClick={(e) => this.handleDeletePublicadosAll(e)}>
                                          <HighlightOff />
                                        </IconButton>
                                      </Tooltip>
                                    </div>
                                    {this.state.publicar.listpublicados.length > 0 ? (
                                      <Grid container>
                                        {this.state.publicar.listpublicados.map((row, index) => (
                                          <Card className={classes.root} style={{ width: '400px', marginTop: '10px' }}>
                                            <CardContent style={{ padding: '0px 12px 12px 12px' }}>
                                              <div style={{
                                                padding: '15px 0px 15px 0px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                                              }}
                                              >
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                  <FolderSpecial color="primary" />
                                                  <span style={{ marginLeft: '12px', fontSize: '16px' }}>{row.name}</span>
                                                </div>
                                                <div>
                                                  <Tooltip title="Eliminar la publicación en este espacio de GT">
                                                    <IconButton aria-label="settings">
                                                      <Delete
                                                        color="primary"
                                                        style={{ fontSize: '18px' }}
                                                        onClick={(e) => this.handleEliminarPublicacionSecion(row.path)}
                                                      />
                                                    </IconButton>
                                                  </Tooltip>
                                                </div>
                                              </div>

                                              <div style={{ padding: '0px 0px 0px 35px' }}>
                                                <Typography textAlign="justify" variant="body2" color="textSecondary" component="p">
                                                  <b>Publicó: </b>
                                                  {' '}
                                                  <Chip
                                                    size="small"
                                                    label={row.publicado}
                                                    color="primary"
                                                    style={{ marginLeft: '5px', height: '22px' }}
                                                  />
                                                </Typography>
                                                <Typography textAlign="justify" variant="body2" color="textSecondary" component="p">
                                                  <b>Fecha: </b>
                                                  {' '}
                                                  {row.fechapublic}
                                                </Typography>
                                              </div>
                                            </CardContent>
                                          </Card>
                                        ))
                                        }
                                      </Grid>
                                    )
                                      : (
                                        <div style={{ textAlign: 'center', marginTop: '25%', height: '325px' }}>
                                          <Public style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '30px', marginBottom: '10px' }} />
                                          <Typography style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '14px' }}><b>No se ha publicado el documento seleccionado...</b></Typography>
                                        </div>
                                      )}
                                  </div>
                                </React.Fragment>
                              </div>
                            </TabContainer>
                          )
                        }
                        {this.state.tabactivo === 2
                          && (
                            <TabContainer style={{ borderBottom: '2px solid #FFFFFF' }} disabled>
                              <div style={{ textAlign: 'center', height: '325px' }}>
                                <div className={classes.margin}>
                                  <Grid container>
                                    <Grid item>
                                      <Share
                                        style={{
                                          verticalAlign: 'center', position: 'relative', marginTop: '18px', marginRight: '15px'
                                        }}
                                        color="primary"
                                      />
                                    </Grid>
                                    <Grid item style={{ width: '280px' }}>
                                      <FormControl>
                                        <TextField
                                          variant="outlined"
                                          type="search"
                                          value={this.state.compartir.usuariosshare}
                                          style={{
                                            marginTop: '10px', marginBottom: '7px', padding: '0px', width: '280px'
                                          }}
                                          size="small"
                                          label="Compartir con..."
                                          onChange={(event) => this.handleBuscarUsersGroups(event)}
                                        />
                                        <Popper open={!!(this.state.compartir.openlist && this.state.usersygroups.listusersygrups.length > 0)} anchorEl={this.state.compartir.companchorEl} transition disablePortal style={{ zIndex: '1', display: this.state.compartir.visible }} s>
                                          {({ TransitionProps }) => (
                                            <Paper style={{ width: '280px', maxHeight: '200px', overflow: 'auto' }}>
                                              <MenuList>
                                                {this.state.usersygroups.listusersygrups.length > 0 ? (
                                                  this.state.usersygroups.listusersygrups.map((row, index) => (
                                                    <MenuItem key={row.username} onClick={(event) => this.handleSeleccionarUsuario(event, row.username)}>
                                                      <Tooltip title={row.name}>
                                                        <Avatar
                                                          aria-label="recipe"
                                                          className={classes.avatar}
                                                          style={{
                                                            marginRight: '10px', height: '30px', width: '30px', fontSize: '12px'
                                                          }}
                                                        >
                                                          {row.avatar}
                                                        </Avatar>
                                                      </Tooltip>
                                                      {row.username}
                                                    </MenuItem>
                                                  ))
                                                ) : (
                                                  'vacio'
                                                )}
                                              </MenuList>
                                            </Paper>
                                          )}
                                        </Popper>
                                      </FormControl>
                                    </Grid>
                                    <Grid item>
                                      <Tooltip title="Compartir documento">
                                        <IconButton
                                          color="primary"
                                          aria-label="upload picture"
                                          component="span"
                                          style={{
                                            verticalAlign: 'center', position: 'relative', marginTop: '7px', marginLeft: '5px'
                                          }}
                                          disabled={this.state.compartir.btnsharedisable}
                                          onClick={(e) => this.handleActionShare(e)}
                                        >
                                          <Done />
                                        </IconButton>
                                      </Tooltip>
                                    </Grid>
                                  </Grid>
                                </div>
                                <React.Fragment>
                                  <div>
                                    <div style={{
                                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #FF0000'
                                    }}
                                    >
                                      <Typography align="left" variant="h7" color="primary" style={{ marginLeft: '5px' }}><b>Usuarios ó Grupos con los que se ha compartido</b></Typography>
                                      <Tooltip title="Dejar de compartir el documento">
                                        <IconButton color="primary" component="span" disabled={this.state.compartir.deletesharedisable} onClick={(e) => this.handleDeleteShareAll('compartidos')}>
                                          <HighlightOff />
                                        </IconButton>
                                      </Tooltip>
                                    </div>
                                    {this.state.compartir.totalusuarios > 0 ? (
                                      <Grid container>
                                        {this.state.compartir.listusuarios.map((row, index) => (
                                          <Card className={classes.root} style={{ width: '400px', marginTop: '10px' }}>
                                            <CardContent style={{ padding: '0px 12px 12px 12px' }}>
                                              <div style={{
                                                padding: '15px 0px 15px 0px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                                              }}
                                              >
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                  {row.status === 'Activo' ? (
                                                    <Tooltip title={row.status}>
                                                      <Avatar aria-label="recipe" className={classes.avatar}>
                                                        {row.avatar}
                                                      </Avatar>
                                                    </Tooltip>
                                                  ) : (
                                                    <Tooltip title={row.status}>
                                                      <Avatar aria-label="recipe" className={classes.avatarinactivo}>
                                                        {row.avatar}
                                                      </Avatar>
                                                    </Tooltip>
                                                  )}
                                                  <span style={{ marginLeft: '15px', fontSize: '16px' }}>{row.username}</span>

                                                </div>
                                                <div>
                                                  <Tooltip title="Editar Permiso">
                                                    <IconButton aria-label="settings" disabled={row.mostrarformulario}>
                                                      <Create
                                                        color="primary"
                                                        style={{ fontSize: '18px' }}
                                                        onClick={(e) => this.prepararActPermiso(index)}
                                                      />
                                                    </IconButton>
                                                  </Tooltip>
                                                  <Tooltip title="Dejar de compartir con este usuario">
                                                    <IconButton aria-label="settings">
                                                      <Delete
                                                        color="primary"
                                                        style={{ fontSize: '18px' }}
                                                        onClick={(e) => this.handleDeleteShare(row, 'compartidos')}
                                                      />
                                                    </IconButton>
                                                  </Tooltip>
                                                </div>
                                              </div>

                                              <div style={{ padding: '0px 0px 0px 35px' }}>
                                                <Typography textAlign="justify" variant="body2" color="textSecondary" component="p">
                                                  <b>Permisos: </b>
                                                  {' '}
                                                  <Chip
                                                    size="small"
                                                    label={row.permission}
                                                    color="primary"
                                                    style={{ marginLeft: '5px', height: '22px' }}
                                                  />
                                                </Typography>
                                                <Typography textAlign="justify" variant="body2" color="textSecondary" component="p">
                                                  <b>Compartió: </b>
                                                  {' '}
                                                  {row.creator}
                                                </Typography>
                                                <Typography textAlign="justify" variant="body2" color="textSecondary" component="p">
                                                  <b>Concedido: </b>
                                                  {' '}
                                                  {row.concedido}
                                                </Typography>
                                                <Typography textAlign="justify" variant="body2" color="textSecondary" component="p">
                                                  <b>Duración: </b>
                                                  {' '}
                                                  {row.duracion}
                                                </Typography>
                                              </div>
                                            </CardContent>
                                            <Collapse in={row.mostrarformulario} timeout="auto" unmountOnExit>
                                              <Divider variant="middle" />
                                              <div style={{
                                                display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginRight: '15px'
                                              }}
                                              >
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                  <Create
                                                    color="primary"
                                                    style={{ marginLeft: '30px', fontSize: '18px' }}
                                                  />
                                                  <span style={{ marginLeft: '5px', color: '#FF0000' }}>Editar Permiso</span>
                                                </div>
                                                <Tooltip title="Cancelar la edición del permiso">
                                                  <IconButton>
                                                    <Close
                                                      color="primary"
                                                      style={{ fontSize: '18px' }}
                                                      onClick={(e) => this.cancelarEdicionPermiso(index)}
                                                    />
                                                  </IconButton>
                                                </Tooltip>
                                              </div>
                                              <CardContent style={{ padding: '0px 20px 10px 20px', textAlign: 'left', fontSize: '8px' }}>
                                                <FormControlLabel
                                                  style={{ fontSize: '8px', height: '30px' }}
                                                  control={
                                                    <Checkbox fontSize="small" checked={this.state.compartir.permisoescritrura} size="small" onChange={(e) => this.handleChangeEscritura('compartidos')} value={this.state.compartir.permisoescritrura} />
                                                  }
                                                  label="Permitir editar y eliminar el documento"
                                                />
                                                <FormControlLabel
                                                  style={{ fontSize: '8px', height: '30px' }}
                                                  control={
                                                    <Checkbox fontSize="small" value={this.state.compartir.permisotodos} checked={this.state.compartir.permisotodos} onChange={(e) => this.handleChangeTodos('compartidos')} />
                                                  }
                                                  label="Ototgar todos los permisos"
                                                />
                                                <FormControlLabel
                                                  style={{ fontSize: '8px', height: '30px' }}
                                                  control={
                                                    <Checkbox fontSize="small" value={this.state.compartir.fechadisable !== 'none'} checked={this.state.compartir.fechadisable !== 'none'} onChange={(e) => this.handleMostrarFechaHasta('compartidos')} />
                                                  }
                                                  label="Definir duración del permiso"
                                                />
                                                <FormControl
                                                  variant="outlined"
                                                  style={{
                                                    marginLeft: '4em', marginTop: '8px', width: '195px', display: this.state.compartir.fechadisable
                                                  }}
                                                >
                                                  <MuiPickersUtilsProvider utils={MomentUtils} locale="es" moment={moment}>
                                                    <DatePicker
                                                      id="duracionhasta"
                                                      keyboard
                                                      placeholder="Fecha hasta"
                                                      format="YYYY/MM/DD"
                                                      // handle clearing outside => pass plain array if you are not controlling value outside
                                                      mask={value => (value ? [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]
                                                        : [])
                                                      }
                                                      minDate={moment()}
                                                      value={this.state.compartir.duracionhasta}
                                                      onChange={this.handleChangeDuracion}
                                                      disableOpenOnEnter
                                                      animateYearScrolling={false}
                                                      // autoOk={true}
                                                      // clearable
                                                      onInputChange={(e) => this.cambiarEstadoDuracion(e)}
                                                    />
                                                  </MuiPickersUtilsProvider>
                                                </FormControl>
                                                <Button variant="outlined" size="small" color="primary" className={classes.button} style={{ float: 'right' }} onClick={(e) => this.editarPermiso(row, 'compartidos')} disabled={!(this.state.compartir.notificar === 'none' || (this.state.compartir.notificar === 'block' && this.state.compartir.direcemail !== null && this.state.compartir.errordirecmail === null))}>
                                                  Editar
                                                </Button>
                                              </CardContent>
                                            </Collapse>
                                          </Card>
                                        ))
                                        }
                                        {this.state.compartir.listusuarios.length >= 2
                                        && (
                                          <div style={{ marginLeft: '100px' }}>
                                            <Button color="secundary" className={classes.button} onClick={(e) => this.prepararlistarShare()}>
                                              <Typography textAlign="center" style={{ fontSize: '10px', color: '#FF0000' }}>
                                                <b>{this.state.compartir.textbtnlistartodos}</b>
                                              </Typography>
                                            </Button>
                                          </div>
                                        )
                                        }
                                      </Grid>
                                    )
                                      : (
                                        <div style={{ textAlign: 'center', marginTop: '25%', height: '325px' }}>
                                          <Share style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '30px', marginBottom: '10px' }} />
                                          <Typography style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '14px' }}><b>No se ha compartido el documento seleccionado...</b></Typography>
                                        </div>
                                      )}
                                  </div>
                                </React.Fragment>
                              </div>
                            </TabContainer>
                          )
                        }
                        {this.state.tabactivo === 3
                          && (
                            <TabContainer style={{ borderBottom: '2px solid #FFFFFF' }}>
                              <div style={{ textAlign: 'center', height: '325px' }}>
                                <div className={classes.margin}>
                                  <Grid container>
                                    <Grid item>
                                      <Comment
                                        style={{
                                          verticalAlign: 'center', position: 'relative', marginTop: '19px', marginRight: '15px'
                                        }}
                                        color="primary"
                                      />
                                    </Grid>
                                    <Grid item style={{ width: '280px' }}>
                                      <FormGroup>
                                        <TextField
                                          variant="outlined"
                                          id="comentario"
                                          label="Insertar comentario"
                                          value={this.state.comentario.insertcomentvalue}
                                          width="280px"
                                          style={{ marginTop: '10px', marginBottom: '7px' }}
                                          size="small"
                                          onChange={(event) => this.setValueInsertarComentario(event)}
                                        />
                                      </FormGroup>
                                    </Grid>
                                    <Grid item>
                                      <Tooltip title="Insertar comentario">
                                        <IconButton
                                          color="primary"
                                          aria-label="upload picture"
                                          component="span"
                                          style={{
                                            verticalAlign: 'center', position: 'relative', marginTop: '7px', marginLeft: '5px'
                                          }}
                                          disabled={this.state.comentario.btncomentdisable}
                                          onClick={(e) => this.handleActionAddComent(e, seleccionado.id)}
                                        >
                                          <PlaylistAdd />
                                        </IconButton>
                                      </Tooltip>
                                    </Grid>
                                  </Grid>
                                </div>
                                <React.Fragment>
                                  <div>
                                    <div style={{ borderBottom: '1px solid #FF0000', paddingTop: '10px', marginBottom: '10px' }}>
                                      <Typography align="left" variant="h7" color="primary" style={{ marginBottom: '5px', marginLeft: '5px' }}><b>Comentarios del documento seleccionado</b></Typography>
                                    </div>
                                    {this.state.comentario.totalcoment > 0 ? (
                                      <Grid container>
                                        {this.state.comentario.listcoments.map((row, index) => (
                                          <Card className={classes.root} style={{ width: '400px', marginTop: '10px' }}>
                <CardContent style={{ padding: '0px 12px 12px 12px' }}>
                                              <div style={{
                                                padding: '15px 0px 15px 0px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                                              }}
                                              >
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                  <Tooltip title={row.autor}>
                                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                                      {row.avatar}
                                                    </Avatar>
                                                  </Tooltip>
                                                  <div>
                                                    <span style={{ marginLeft: '15px', fontSize: '16px' }}>{row.fecha}</span>
                                                  </div>
                                                </div>
                                                <div>
                                                  {row.autor === user ? (
                                                    <React.Fragment>
                                                      <Tooltip title="Actualizar Comentario">
                                                        <IconButton aria-label="settings">
                                                          <Create
                                                            color="primary"
                                                            // style={{ fontSize: '18px' }}
                                                            onClick={(e) => this.prepararActualizar(row.id, row.text)}
                                                          />
                                                        </IconButton>
                                                      </Tooltip>
                                                      <Tooltip title="Eliminar Comentario">
                                                        <IconButton aria-label="settings">
                                                          <Delete
                                                            color="primary"
                                                            // style={{ fontSize: '18px' }}
                                                            onClick={(e) => this.handleClickDeleteComment(row.id)}
                                                          />
                                                        </IconButton>
                                                      </Tooltip>
                                                    </React.Fragment>
                                                  ) : (
                                                    seleccionado.permisos[seleccionado.permisos.length - 1] === 'Everything' && (
                                                      <React.Fragment>
                                                        <Tooltip title="Eliminar Comentario">
                                                          <IconButton aria-label="settings">
                                                            <Delete
                                                              color="primary"
                                                              // style={{ fontSize: '18px' }}
                                                              onClick={(e) => this.handleClickDeleteComment(row.id)}
                                                            />
                                                          </IconButton>
                                                        </Tooltip>
                                                      </React.Fragment>
                                                    )
                                                  )
                                                  }
                                                </div>
                                              </div>

                                              <div>
                                                <Typography textAlign="justify" variant="body2" color="textSecondary" component="p">
                                                  <b>Comentó : </b>
                                                  {' '}
                                                  {row.text}
                                                </Typography>

                                              </div>
                                            </CardContent>
              </Card>
                                        ))
                                        }
                                        {this.state.comentario.listcoments.length >= 3
                                        && (
                                          <div style={{ marginLeft: '100px' }}>
                                            <Button color="secundary" className={classes.button} onClick={(e) => this.prepararlistarComments()}>
                                              <Typography textAlign="center" style={{ fontSize: '10px', color: '#FF0000' }}>
                                                <b>{this.state.comentario.textbtnlistartodos}</b>
                                              </Typography>
                                            </Button>
                                          </div>
                                        )
                                        }
                                      </Grid>
                                    )
                                      : (
                                        <div style={{ textAlign: 'center', marginTop: '25%', height: '325px' }}>
                                          <Comment style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '30px', marginBottom: '10px' }} />
                                          <Typography style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '14px' }}><b>No se han realizado comentarios...</b></Typography>
                                        </div>
                                      )}
                                  </div>
                                </React.Fragment>
                              </div>
                            </TabContainer>
                          )
                        }
                        {this.state.tabactivo === 4
                          && (
                            <TabContainer style={{ borderBottom: '2px solid #FFFFFF' }}>
                              <div style={{ textAlign: 'center', height: '325px' }}>
                                <div className={classes.margin}>
                                  <Grid container>
                                    <Grid item>
                                      <LocalOffer
                                        style={{
                                          verticalAlign: 'center', position: 'relative', marginTop: '19px', marginRight: '15px'
                                        }}
                                        color="primary"
                                      />
                                    </Grid>
                                    <Grid item style={{ width: '280px' }}>
                                      <FormGroup>
                                        <TextField
                                        variant="outlined"
                                        id="etiquetas"
                                        label="Etiquetar documento"
                                        value={this.state.etiquetar.insertetiqueta
                                          }
                                        width="280px"
                                        style={{ marginTop: '10px', marginBottom: '7px' }}
                                        size="small"
                                        onChange={(event) => this.setValueInsertarEtiqueta(event)}
                                      />
                                      </FormGroup>
                                    </Grid>
                                    <Grid item>
                                      <Tooltip title="Etiquetar documento">
                                        <IconButton
                                        color="primary"
                                        component="span"
                                        style={{
                                            verticalAlign: 'center', position: 'relative', marginTop: '7px', marginLeft: '5px'
                                          }}
                                        disabled={this.state.etiquetar.btnetiquetardisable}
                                        onClick={(e) => this.handleActionEtiquetarDocumento()}
                                      >
                                        <AddIcon />
                                      </IconButton>
                                      </Tooltip>
                                    </Grid>
                                  </Grid>
                                </div>
                                <React.Fragment>
                                  <div>
                                    <div style={{
                                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #FF0000'
                                    }}
                                    >
                                      <Typography align="left" variant="h7" color="primary" style={{ marginLeft: '5px' }}><b>Etiquetas del documento seleccionado</b></Typography>
                                      <Tooltip title="Eliminar todas las etiquetas del documento">
                                        <IconButton color="primary" component="span" disabled={this.state.etiquetar.deletedisable} onClick={(e) => this.handleTodasDeleteTags()}>
                                        <DeleteForever />
                                      </IconButton>
                                      </Tooltip>
                                    </div>
                                    {this.state.etiquetar.totaletiquetas > 0 ? (
                                      <Grid container>
                                        {this.state.etiquetar.listetiquetas.map((row, index) => (
                                        <Chip
                                            label={row}
                                            onDelete={(event) => this.handleDeleteTags(row)}
                                            className={classes.chip}
                                          // color="primary"
                                          />
                                        ))
                                        }
                                      </Grid>
                                    )
                                      : (
                                        <div style={{ textAlign: 'center', marginTop: '25%', height: '325px' }}>
                                          <LocalOffer style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '30px', marginBottom: '10px' }} />
                                          <Typography style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '14px' }}><b>No se ha etiquetado el documento seleccionado...</b></Typography>
                                        </div>
                                      )}
                                  </div>
                                </React.Fragment>
                              </div>
                            </TabContainer>
                          )

                        }
                        {this.state.tabactivo === 5
                          && (
                            <TabContainer style={{ borderBottom: '2px solid #FFFFFF' }}>
                              {this.state.menu.menuselect != 'Espacio de Grupo de Trabajo' && this.state.menu.menuselect != 'Grupos' && seleccionado.tipo != 'Section' ? (
                                <div style={{ textAlign: 'center', height: '325px' }}>
                                  <div className={classes.margin}>
                                    <Grid container>
                                      <Grid item>
                                        <MailOutline
                                          style={{
                                            verticalAlign: 'center', position: 'relative', marginTop: '19px', marginRight: '15px'
                                          }}
                                          color="primary"
                                        />
                                      </Grid>
                                      <Grid item style={{ width: '280px' }}>
                                        <FormControl>
                                          <TextField
                variant="outlined"
                type="email"
                value={this.state.permisos.direcemail}
                style={{
                                              marginTop: '10px', marginBottom: '7px', padding: '0px', width: '280px'
                                            }}
                size="small"
                label="Conceder permiso a..."
                onChange={this.handleVerificarEmail}
              />
                                        </FormControl>
                                      </Grid>
                                      <Grid item>
                                        <Tooltip title="Conceder permiso al usuario">
                                          <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                style={{
                                              verticalAlign: 'center', position: 'relative', marginTop: '7px', marginLeft: '5px'
                                            }}
                disabled={this.state.permisos.btnpermisosdisable}
                onClick={(e) => this.handleActionConcederPermisoExterno(e)}
              >
                <Done />
              </IconButton>
                                        </Tooltip>
                                      </Grid>
                                    </Grid>
                                  </div>
                                  <React.Fragment>
                                    <div>
                                      <div style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #FF0000'
                                      }}
                                      >
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                          <Tooltip title="Expandir listado">
                <IconButton color="primary" component="span" onClick={(e) => this.handleChangeExpandir('panel1')}>
                                              {this.state.permisos.panel1expand ? <ExpandLess /> : <ExpandMore />}
                                            </IconButton>
              </Tooltip>
                                          <Typography align="left" variant="h7" color="primary" style={{ marginLeft: '5px' }}><b>Usuarios externos con permisos</b></Typography>
                                        </div>
                                        <Tooltip title="Eliminar los permisos concedidos en el documento">
                                          <IconButton color="primary" component="span" disabled={this.state.permisos.deletepermisosdisable} onClick={(e) => this.handleDeleteShareAll('local')}>
                <HighlightOff />
              </IconButton>
                                        </Tooltip>
                                      </div>
                                      <Collapse in={this.state.permisos.panel1expand} timeout="auto" unmountOnExit>
                                        {this.state.permisos.listuserexternos.length > 0 ? (
                                          <Grid container>
                {this.state.permisos.listuserexternos.map((row, index) => (
                                              <Card className={classes.root} style={{ width: '400px', marginTop: '10px' }}>
                                                <CardContent style={{ padding: '0px 12px 12px 12px' }}>
                                                  <div style={{
                                                    padding: '15px 0px 15px 0px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                                                  }}
                                                  >
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                      {row.status === 'Activo' ? (
                                                        <Tooltip title={row.status}>
                                                          <Avatar aria-label="recipe" className={classes.avatar}>
                                                            {row.avatar}
                                                          </Avatar>
                                                        </Tooltip>
                                                      ) : (
                                                        <Tooltip title={row.status}>
                                                          <Avatar aria-label="recipe" className={classes.avatarinactivo}>
                                                            {row.avatar}
                                                          </Avatar>
                                                        </Tooltip>
                                                      )}
                                                      <span style={{ marginLeft: '15px', fontSize: '16px' }}>{row.displayusername}</span>

                                                    </div>
                                                    <div>
                                                      <Tooltip title="Editar Permiso">
                                                        <IconButton aria-label="settings" disabled={row.mostrarformulario}>
                                                          <Create
                                                            color="primary"
                                                            style={{ fontSize: '18px' }}
                                                            onClick={(e) => this.prepararActPermisoExt(index)}
                                                          />
                                                        </IconButton>
                                                      </Tooltip>
                                                      <Tooltip title="Eliminar permisos del usuario">
                                                        <IconButton aria-label="settings">
                                                          <Delete
                                                            color="primary"
                                                            style={{ fontSize: '18px' }}
                                                            onClick={(e) => this.handleDeleteShare(row, 'local')}
                                                          />
                                                        </IconButton>
                                                      </Tooltip>
                                                    </div>
                                                  </div>
                                                  <div style={{ padding: '0px 0px 0px 35px' }}>
                                                    <Typography textAlign="justify" variant="body2" color="textSecondary" component="p">
                                                      <b>Permisos: </b>
                                                      {' '}
                                                      <Chip
                                                        size="small"
                                                        label={row.permission}
                                                        color="primary"
                                                        style={{ marginLeft: '5px', height: '22px' }}
                                                      />
                                                    </Typography>
                                                    <Typography textAlign="justify" variant="body2" color="textSecondary" component="p">
                                                      <b>Compartió: </b>
                                                      {' '}
                                                      {row.creator}
                                                    </Typography>
                                                    <Typography textAlign="justify" variant="body2" color="textSecondary" component="p">
                                                      <b>Concedido: </b>
                                                      {' '}
                                                      {row.concedido}
                                                    </Typography>
                                                    <Typography textAlign="justify" variant="body2" color="textSecondary" component="p">
                                                      <b>Duración: </b>
                                                      {' '}
                                                      {row.duracion}
                                                    </Typography>
                                                  </div>
                                                </CardContent>
                                                <Collapse in={row.mostrarformulario} timeout="auto" unmountOnExit>
                                                  <Divider variant="middle" />
                                                  <div style={{
                                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginRight: '15px'
                                                  }}
                                                  >
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                      <Create
                                                        color="primary"
                                                        style={{ marginLeft: '30px', fontSize: '18px' }}
                                                      />
                                                      <span style={{ marginLeft: '5px', color: '#FF0000' }}>Editar Permiso</span>
                                                    </div>
                                                    <Tooltip title="Cancelar la edición del permiso">
                                                      <IconButton>
                                                        <Close
                                                          color="primary"
                                                          style={{ fontSize: '18px' }}
                                                          onClick={(e) => this.cancelarPermisoEdicion(index)}
                                                        />
                                                      </IconButton>
                                                    </Tooltip>
                                                  </div>
                                                  <CardContent style={{ padding: '0px 20px 10px 20px', textAlign: 'left', fontSize: '8px' }}>
                                                    <FormControlLabel
                                                      style={{ fontSize: '8px', height: '30px' }}
                                                      control={
                                                        <Checkbox fontSize="small" checked={this.state.permisos.permisoescritrura} size="small" onChange={(e) => this.handleChangeEscritura('local')} value={this.state.compartir.permisoescritrura} />
                                                      }
                                                      label="Permitir editar y eliminar el documento"
                                                    />
                                                    <FormControlLabel
                                                      style={{ fontSize: '8px', height: '30px' }}
                                                      control={
                                                        <Checkbox fontSize="small" value={this.state.permisos.permisotodos} checked={this.state.permisos.permisotodos} onChange={(e) => this.handleChangeTodos('local')} />
                                                      }
                                                      label="Ototgar todos los permisos"
                                                    />
                                                    <Typography textAlign="justify" variant="body2" color="textSecondary" component="p">
                                                      Definir fecha limite del permiso
                                                    </Typography>
                                                    <FormControl variant="outlined" style={{ marginLeft: '4em', marginTop: '8px', width: '195px' }}>
                                                      <MuiPickersUtilsProvider utils={MomentUtils} locale="es" moment={moment}>
                                                        <DatePicker
                                                          id="duracionhasta"
                                                          keyboard
                                                          placeholder="Fecha hasta"
                                                          format="YYYY/MM/DD"
                                                          // handle clearing outside => pass plain array if you are not controlling value outside
                                                          mask={value => (value ? [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]
                                                            : [])
                                                          }
                                                          minDate={moment()}
                                                          value={this.state.permisos.duracionhasta}
                                                          onChange={this.handleChangeDuracion}
                                                          disableOpenOnEnter
                                                          animateYearScrolling={false}
                                                          // autoOk={true}
                                                          // clearable
                                                          onInputChange={(e) => this.cambiarEstadoDuracion(e)}
                                                        />
                                                      </MuiPickersUtilsProvider>
                                                    </FormControl>
                                                    <Button variant="outlined" size="small" color="primary" className={classes.button} style={{ float: 'right' }} onClick={(e) => this.editarPermiso(row, 'local')} disabled={!(this.state.permisos.notificar === 'none' || (this.state.permisos.notificar === 'block' && this.state.permisos.direcemail !== null && this.state.permisos.errordirecmail === null))}>
                                                      Editar
                                                    </Button>
                                                  </CardContent>
                                                </Collapse>
                                              </Card>
                                            ))
                                            }
              </Grid>
                                        ) : (
                                          <div style={{ textAlign: 'center', marginTop: '15%', height: '105px' }}>
                                            <VerifiedUser style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '35px', marginBottom: '10px' }} />
                                            <Typography style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '14px' }}><b>No se le ha concedido permisos a ningún usuario...</b></Typography>
                                          </div>
                                        )}
                                      </Collapse>

                                      <div style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #FF0000'
                                      }}
                                      >
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                          <Tooltip title="Expandir listado">
                <IconButton color="primary" component="span" onClick={(e) => this.handleChangeExpandir('panel2')}>
                                              {this.state.permisos.panel2expand ? <ExpandLess /> : <ExpandMore />}
                                            </IconButton>
              </Tooltip>
                                          <Typography align="left" variant="h7" color="primary" style={{ marginLeft: '5px' }}><b>Usuarios con el documento compartido</b></Typography>
                                        </div>
                                      </div>
                                      <Collapse in={this.state.permisos.panel2expand} timeout="auto" unmountOnExit>
                                        {this.state.permisos.listcompartidos.length > 0 ? (
                                          <Grid container>
                {this.state.permisos.listcompartidos.map((row, index) => (
                                              <Card className={classes.root} style={{ width: '400px', marginTop: '10px' }}>
                                                <CardContent style={{ padding: '0px 12px 12px 12px' }}>
                                                  <div style={{
                                                    padding: '15px 0px 0px 0px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                                                  }}
                                                  >
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                      {row.status === 'Activo' ? (
                                                        <Tooltip title={row.status}>
                                                          <Avatar aria-label="recipe" className={classes.avatar}>
                                                            {row.avatar}
                                                          </Avatar>
                                                        </Tooltip>
                                                      ) : (
                                                        <Tooltip title={row.status}>
                                                          <Avatar aria-label="recipe" className={classes.avatarinactivo}>
                                                            {row.avatar}
                                                          </Avatar>
                                                        </Tooltip>
                                                      )}
                                                      <span style={{ marginLeft: '15px', fontSize: '16px' }}>{row.displayusername}</span>

                                                    </div>
                                                    <Tooltip title="Detalle">
                                                      <IconButton color="primary" component="span" onClick={(e) => this.mostrarDetalle(index)}>
                                                        {row.mostrarformulario ? <ExpandLess /> : <ExpandMore />}
                                                      </IconButton>
                                                    </Tooltip>
                                                  </div>
                                                  <div style={{ padding: '0px 0px 0px 45px' }} hidden={row.mostrarformulario}>
                                                    <Typography textAlign="justify" variant="body2" color="textSecondary" component="p">
                                                      <b>Permisos: </b>
                                                      {' '}
                                                      <Chip
                                                        size="small"
                                                        label={row.permission}
                                                        color="primary"
                                                        style={{ marginLeft: '5px', height: '22px' }}
                                                      />
                                                    </Typography>
                                                  </div>
                                                </CardContent>
                                                <Collapse in={row.mostrarformulario} timeout="auto" unmountOnExit>
                                                  <div style={{ padding: '0px 0px 10px 45px' }}>
                                                    <Typography textAlign="justify" variant="body2" color="textSecondary" component="p">
                                                      <b>Permisos: </b>
                                                      {' '}
                                                      <Chip
                                                        size="small"
                                                        label={row.permission}
                                                        color="primary"
                                                        style={{ marginLeft: '5px', height: '22px' }}
                                                      />
                                                    </Typography>
                                                    <Typography textAlign="justify" variant="body2" color="textSecondary" component="p">
                                                      <b>Compartió: </b>
                                                      {' '}
                                                      {row.creator}
                                                    </Typography>
                                                    <Typography textAlign="justify" variant="body2" color="textSecondary" component="p">
                                                      <b>Concedido: </b>
                                                      {' '}
                                                      {row.concedido}
                                                    </Typography>
                                                    <Typography textAlign="justify" variant="body2" color="textSecondary" component="p">
                                                      <b>Duración: </b>
                                                      {' '}
                                                      {row.duracion}
                                                    </Typography>
                                                  </div>
                                                </Collapse>
                                              </Card>
                                            ))
                                            }
              </Grid>
                                        ) : (
                                          <div style={{ textAlign: 'center', marginTop: '25%', height: '105px' }}>
                                            <VerifiedUser style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '35px', marginBottom: '10px' }} />
                                            <Typography style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '14px' }}><b>No se ha compartido el documento...</b></Typography>
                                          </div>
                                        )}

                                      </Collapse>
                                      <div style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #FF0000'
                                      }}
                                      >
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                          <Tooltip title="Expandir listado">
                <IconButton color="primary" component="span" onClick={(e) => this.handleChangeExpandir('panel3')}>
                                              {this.state.permisos.panel3expand ? <ExpandLess /> : <ExpandMore />}
                                            </IconButton>
              </Tooltip>
                                          <Typography align="left" variant="h7" color="primary" style={{ marginLeft: '5px' }}><b>Permisos heredados</b></Typography>
                                        </div>
                                      </div>
                                      <Collapse in={this.state.permisos.panel3expand} timeout="auto" unmountOnExit>
                                        {this.state.permisos.listheredados.length > 0 ? (
                                          <Grid container>
                {this.state.permisos.listheredados.map((row, index) => (
                                              <Card className={classes.root} style={{ width: '400px', marginTop: '10px' }}>
                                                <CardContent style={{ padding: '0px 12px 12px 12px' }}>
                                                  <div style={{
                                                    padding: '15px 0px 0px 0px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                                                  }}
                                                  >
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                      {row.status === 'Activo' ? (
                                                        <Tooltip title={row.status}>
                                                          <Avatar aria-label="recipe" className={classes.avatar}>
                                                            {row.avatar}
                                                          </Avatar>
                                                        </Tooltip>
                                                      ) : (
                                                        <Tooltip title={row.status}>
                                                          <Avatar aria-label="recipe" className={classes.avatarinactivo}>
                                                            {row.avatar}
                                                          </Avatar>
                                                        </Tooltip>
                                                      )}
                                                      <span style={{ marginLeft: '15px', fontSize: '16px' }}>{row.displayusername}</span>

                                                    </div>
                                                  </div>
                                                  <div style={{ padding: '0px 0px 0px 45px' }}>
                                                    <Typography textAlign="justify" variant="body2" color="textSecondary" component="p">
                                                      <b>Permisos: </b>
                                                      {' '}
                                                      <Chip
                                                        size="small"
                                                        label={row.permission}
                                                        color="primary"
                                                        style={{ marginLeft: '5px', height: '22px' }}
                                                      />
                                                    </Typography>
                                                  </div>
                                                </CardContent>
                                              </Card>
                                            ))
                                            }
              </Grid>
                                        ) : (
                                          <div style={{ textAlign: 'center', marginTop: '25%', height: '105px' }}>
                                            <VerifiedUser style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '35px', marginBottom: '10px' }} />
                                            <Typography style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '14px' }}><b>No se han heredado permisos...</b></Typography>
                                          </div>
                                        )}

                                      </Collapse>
                                    </div>
                                  </React.Fragment>
                                </div>

                              ) : (
                                <div style={{ textAlign: 'center', height: '325px' }}>
                                  <div className={classes.margin}>
                                    <Grid container>
                                      <Grid item>
                                        <Security
                                          style={{
                                            verticalAlign: 'center', position: 'relative', marginTop: '19px', marginRight: '15px'
                                          }}
                                          color="primary"
                                        />
                                      </Grid>
                                      <Grid item style={{ width: '280px' }}>
                                        <FormControl>
                                          <TextField
                                            variant="outlined"
                                            type="search"
                                            value={this.state.compartir.usuariosshare}
                                            style={{
                                              marginTop: '10px', marginBottom: '7px', padding: '0px', width: '280px'
                                            }}
                                            size="small"
                                            label="Permitir a..."
                                            onChange={(event) => this.handleBuscarUsersGroups(event)}
                                          />
                                          <Popper open={!!(this.state.compartir.openlist && this.state.usersygroups.listusersygrups.length > 0)} anchorEl={this.state.compartir.companchorEl} transition disablePortal style={{ zIndex: '1', display: this.state.compartir.visible }}>
                                            {({ TransitionProps }) => (
                                            <Paper style={{ width: '280px', maxHeight: '200px', overflow: 'auto' }}>
                                                <MenuList>
                                                  {this.state.usersygroups.listusersygrups.length > 0 ? (
                                                    this.state.usersygroups.listusersygrups.map((row, index) => (
                                                      <MenuItem style={{ fontSize: '14px', height: '20px' }} key={row.username} onClick={(event) => this.handleSeleccionarUsuario(event, row.username)}>
                                                        <Tooltip title={row.name}>
                                                          <Avatar
                                                            aria-label="recipe"
                                                            className={classes.avatar}
                                                            style={{
                                                              marginRight: '10px', height: '30px', width: '30px', fontSize: '12px'
                                                            }}
                                                          >
                                                            {row.avatar}
                                                          </Avatar>
                                                        </Tooltip>
                                                        {row.username}
                                                      </MenuItem>
                                                    ))
                                                  ) : (
                                                    'vacio'
                                                  )}
                                                </MenuList>
                                              </Paper>
                                            )}
                                          </Popper>
                                        </FormControl>
                                      </Grid>
                                      <Grid item>
                                        <Tooltip title="Otorgar permiso">
                                          <IconButton
                                            color="primary"
                                            aria-label="upload picture"
                                            component="span"
                                            style={{
                                              verticalAlign: 'center', position: 'relative', marginTop: '7px', marginLeft: '5px'
                                            }}
                                            disabled={this.state.compartir.btnsharedisable}
                                            onClick={(e) => this.handleActionPermitirUser(e)}
                                          >
                                            <Done />
                                          </IconButton>
                                        </Tooltip>
                                      </Grid>
                                    </Grid>
                                  </div>
                                  <React.Fragment>
                                    <div>
                                      <div style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #FF0000'
                                      }}
                                      >
                                        <Typography align="left" variant="h7" color="primary" style={{ marginLeft: '5px' }}><b>Usuarios ó Grupos con permisos</b></Typography>
                                        <Tooltip title="Quitar permiso">
                                          <IconButton color="primary" component="span" disabled={this.state.compartir.deletesharedisable} onClick={(e) => this.handleDeletePermisosUserAll('local')}>
                                            <HighlightOff />
                                          </IconButton>
                                        </Tooltip>
                                      </div>
                                      {this.state.permisos.listuserexternos.length > 0 ? (
                                        <Grid container>
                                          {this.state.permisos.listuserexternos.map((row, index) => (
                                            <Card className={classes.root} style={{ width: '400px', marginTop: '10px' }}>
                                            <CardContent style={{ padding: '0px 12px 12px 12px' }}>
                                                <div style={{
                                                  padding: '15px 0px 15px 0px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                                                }}
                                                >
                                                  <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    {row.status === 'Activo' ? (
                                                      <Tooltip title={row.status}>
                                                        <Avatar aria-label="recipe" className={classes.avatar}>
                                                          {row.avatar}
                                                        </Avatar>
                                                      </Tooltip>
                                                    ) : (
                                                      <Tooltip title={row.status}>
                                                        <Avatar aria-label="recipe" className={classes.avatarinactivo}>
                                                          {row.avatar}
                                                        </Avatar>
                                                      </Tooltip>
                                                    )}
                                                    <span style={{ marginLeft: '15px', fontSize: '16px' }}>{row.username}</span>

                                                  </div>
                                                  <div>
                                                    <Tooltip title="Eliminar permiso">
                                                      <IconButton aria-label="settings">
                                                        <Delete
                                                          color="primary"
                                                          style={{ fontSize: '18px' }}
                                                          onClick={(e) => this.handleDeletePermUserSec(row, 'local')}
                                                        />
                                                      </IconButton>
                                                    </Tooltip>
                                                  </div>
                                                </div>

                                                <div style={{ padding: '0px 0px 0px 35px' }}>
                                                  <Typography textAlign="justify" variant="body2" color="textSecondary" component="p">
                                                    <b>Permiso: </b>
                                                    {' '}
                                                    <Chip
                                                      size="small"
                                                      label={row.permission}
                                                      color="primary"
                                                      style={{ marginLeft: '5px', height: '22px' }}
                                                    />
                                                  </Typography>
                                                  <Typography textAlign="justify" variant="body2" color="textSecondary" component="p">
                                                    <b>Concedió: </b>
                                                    {' '}
                                                    {row.creator}
                                                  </Typography>
                                                  <Typography textAlign="justify" variant="body2" color="textSecondary" component="p">
                                                    <b>Concedido: </b>
                                                    {' '}
                                                    {row.concedido}
                                                  </Typography>
                                                  <Typography textAlign="justify" variant="body2" color="textSecondary" component="p">
                                                    <b>Duración: </b>
                                                    {' '}
                                                    {row.duracion}
                                                  </Typography>
                                                </div>
                                              </CardContent>
                                          </Card>
                                          ))
                                          }
                                          {/*   {this.state.permisos.listuserexternos.length >= 2 &&
                                          <div style={{ marginLeft: '100px' }}>
                                            <Button color="secundary" className={classes.button} onClick={(e) => this.prepararlistarShare()}>
                                              <Typography textAlign='center' style={{ fontSize: '10px', color: '#039BE5' }}>
                                                <b>{this.state.compartir.textbtnlistartodos}</b>
                                              </Typography>
                                            </Button>
                                          </div>
                                        } */}
                                        </Grid>
                                      )
                                        : (
                                          <div style={{ textAlign: 'center', marginTop: '25%', height: '325px' }}>
                                            <Security style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '30px', marginBottom: '10px' }} />
                                            <Typography style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '14px' }}><b>No se ha otorgado permiso a usuarios en el espacio de grupo de trabajo seleccionado...</b></Typography>
                                          </div>
                                        )}
                                    </div>
                                  </React.Fragment>
                                </div>
                              )

                              }


                            </TabContainer>
                          )
                        }
                        {this.state.tabactivo === 6 && (
                          <TabContainer style={{ borderBottom: '2px solid #FFFFFF' }}>
                            {/*  <Tooltip title='Crear versión'>
                            <IconButton aria-label="settings">
                              <NoteAdd color='primary'
                                style={{ fontSize: '30px' }}
                                onClick={(e) => this.crearVersion()} />
                            </IconButton>
                          </Tooltip> */}
                            <div style={{ textAlign: 'center', height: '325px' }}>
                              <React.Fragment>
                                <div>
                                  {this.state.versiones.totalversiones > 0 ? (
                                    <Grid container>
                                      {this.state.versiones.listversiones.map((row, index) => (
                                        <Card className={classes.root} style={{ width: '400px', marginTop: '10px' }}>
                                          <CardHeader
                                            style={{ padding: '10px' }}
                                            avatar={(
                                              <Tooltip title={moment(row.lastModified, 'YYYY-MM-DDTHH:mm:ss.SSSSZ').format('YYYY-MM-DD HH:mm:ss')}>
                                                {this.DevuelveIcons(seleccionado)}
                                              </Tooltip>
                                            )}
                                            action={
                                              seleccionado.permisos[seleccionado.permisos.length - 1] === 'Everything'
                                              && (
                                                <React.Fragment>
                                                  <Tooltip title="Mortrar versión">
                                                    <IconButton aria-label="view" style={{ marginTop: '10px' }}>
                                                      <Visibility
                                                        color="primary"
                                                        onClick={(e) => this.handleClickMostrarVersion(row.uid)}
                                                      />
                                                    </IconButton>
                                                  </Tooltip>
                                                  <Tooltip title="Restaurar versión">
                                                    <IconButton aria-label="restore" style={{ marginTop: '10px' }}>
                                                      <RestorePage
                                                        color="primary"
                                                        onClick={(e) => this.restaurarVersion(row.uid)}
                                                      />
                                                    </IconButton>
                                                  </Tooltip>
                                                </React.Fragment>
                                              )
                                            }
                                            title={'versión ' + row.properties['uid:major_version'] + '.' + row.properties['uid:minor_version'] + ' ( ' + this.tiempotranscurrido(row.lastModified) + ' )'}
                                          />
                                        </Card>
                                      ))
                                      }
                                      {this.state.versiones.totalversiones >= 4
                                      && (
                                        <div style={{ marginLeft: '100px' }}>
                                          <Button color="secundary" className={classes.button} onClick={(e) => this.prepararlistarVersiones()}>
                                            <Typography textAlign="center" style={{ fontSize: '10px', color: '#FF0000' }}>
                                              <b>{this.state.versiones.textverbtntodos}</b>
                                            </Typography>
                                          </Button>
                                        </div>
                                      )
                                      }
                                    </Grid>
                                  ) : (
                                    <div style={{ textAlign: 'center', marginTop: '25%', height: '325px' }}>
                                      <Storage style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '30px', marginBottom: '10px' }} />
                                      <Typography style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '14px' }}><b>No se han guardado versiones del documento...</b></Typography>
                                    </div>
                                  )}
                                </div>
                              </React.Fragment>
                            </div>
                          </TabContainer>
                        )
                        }
                        {this.state.tabactivo === 7
                          && (
                            <TabContainer style={{ borderBottom: '2px solid #FFFFFF' }}>
                              <div style={{ height: '325px', marginTop: '20px' }}>
                                <div hidden={this.state.expiracion.expriracionvisible}>
                                  <Typography textAlign="justify" variant="body2" color="primary" component="p">
                                  Seleccione la fecha en que expira el documento
                                  </Typography>
                                  <div style={{ marginLeft: '10px', marginTop: '10px', marginBottom: '10px' }}>
                                    <MuiPickersUtilsProvider utils={MomentUtils} locale="es" moment={moment}>
                                      <DatePicker
                                        id="expiriracion"
                                        keyboard
                                        placeholder="Fecha expiración"
                                        format="YYYY/MM/DD"
                                        // handle clearing outside => pass plain array if you are not controlling value outside
                                        mask={value => (value ? [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]
                                          : [])
                                        }
                                        minDate={this.state.expiracion.fechamin}
                                        value={this.state.expiracion.fechaexpiracion}
                                        onChange={this.handleChangeExpiracion}
                                        disableOpenOnEnter
                                        animateYearScrolling={false}
                                        // autoOk={true}
                                        // clearable
                                        onInputChange={(e) => this.cambiarEstadoExpiracion(e)}
                                      />
                                    </MuiPickersUtilsProvider>
                                  </div>
                                </div>

                                <Typography textAlign="justify" variant="body2" color="primary" component="p">
                                Seleccione las opciones de subscripción al documento
                                </Typography>
                                {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >

                                <Tooltip title="Expandir opciones">
                                  <IconButton color="primary" component="span" onClick={(e) => this.handleChangeExpandirSubscrip()}>
                                    {this.state.subscripcion.expandir ? <ExpandLess /> : <ExpandMore />}
                                  </IconButton>
                                </Tooltip>
                              </div> */}
                                <div style={{ marginLeft: '10px', marginTop: '10px' }}>
                                  <FormControlLabel
                                    style={{ fontSize: '8px', height: '30px' }}
                                    control={
                                      <Checkbox fontSize="small" value={this.state.subscripcion.notifsubscripcion} checked={this.state.subscripcion.notifsubscripcion} onChange={(e) => this.handleChangeSubscribirse(this.state.subscripcion.notifsubscripcion, 'Todos')} />
                                    }
                                    label="Subscribirse al documento"
                                  />
                                  <FormControlLabel
                                    style={{ fontSize: '8px', height: '30px' }}
                                    control={
                                      <Checkbox fontSize="small" value={this.state.subscripcion.notifmodificar} checked={this.state.subscripcion.notifmodificar} onChange={(e) => this.handleChangeSubscribirse(this.state.subscripcion.notifmodificar, 'Modifications')} />
                                    }
                                    label="Solo las notificaciones de modificación"
                                  />
                                  <FormControlLabel
                                    style={{ fontSize: '8px', height: '30px' }}
                                    control={
                                      <Checkbox fontSize="small" value={this.state.subscripcion.notifcomment} checked={this.state.subscripcion.notifcomment} onChange={(e) => this.handleChangeSubscribirse(this.state.subscripcion.notifcomment, 'CommentAdded')} />
                                    }
                                    label="Solo las notificaciones de nuevo comentario"
                                  />
                                </div>
                              </div>
                            </TabContainer>
                          )
                        }
                        {this.state.tabactivo === 8
                          && (
                            <TabContainer style={{ borderBottom: '2px solid #FFFFFF' }} disabled>
                              <div style={{ textAlign: 'center', height: '325px' }}>
                                <div className={classes.margin}>
                                  <Grid container>
                                    <Grid item>
                                      <PersonAdd
                                        style={{
                                          verticalAlign: 'center', position: 'relative', marginTop: '24px', marginRight: '15px'
                                        }}
                                        color="primary"
                                      />
                                    </Grid>
                                    <Grid item style={{ width: '280px' }}>
                                      <FormControl>
                                        <TextField
                                          variant="outlined"
                                          type="search"
                                          value={this.state.grupos.usuariosselect}
                                          style={{
                                            marginTop: '10px', marginBottom: '7px', padding: '0px', width: '280px'
                                          }}
                                          size="small"
                                          label="Agregar:"
                                          onChange={(event) => this.handleBuscarUsersGroups(event)}
                                        />
                                        <Popper open={!!(this.state.grupos.openlist && this.state.usersygroups.listusersygrups.length > 0)} anchorEl={this.state.grupos.companchorEl} transition disablePortal style={{ zIndex: '1', display: this.state.grupos.visible }} s>
                                          {({ TransitionProps }) => (
                <Paper style={{ width: '280px', maxHeight: '200px', overflow: 'auto' }}>
                                              <MenuList>
                                                {this.state.usersygroups.listusersygrups.length > 0 ? (
                                                  this.state.usersygroups.listusersygrups.map((row, index) => (
                                                    <MenuItem style={{ fontSize: '14px', height: '20px' }} key={row.username} onClick={(event) => this.handleSeleccionarUsuarioGrupos(event, row)}>
                                                      <Tooltip title={row.name}>
                                                        <Avatar
                                                          aria-label="recipe"
                                                          className={classes.avatar}
                                                          style={{
                                                            marginRight: '10px', height: '30px', width: '30px', fontSize: '12px'
                                                          }}
                                                        >
                                                          {row.avatar}
                                                        </Avatar>
                                                      </Tooltip>
                                                      {row.username}
                                                    </MenuItem>
                                                  ))
                                                ) : (
                                                  'vacio'
                                                )}
                                              </MenuList>
                                            </Paper>
                                          )}
                                        </Popper>
                                      </FormControl>
                                    </Grid>
                                    <Grid item>
                                      <Tooltip title="Agregar Usuario">
                                        <IconButton
                                          color="primary"
                                          aria-label="agregar user"
                                          component="span"
                                          style={{
                                            verticalAlign: 'center', position: 'relative', marginTop: '12px', marginLeft: '5px'
                                          }}
                                          disabled={this.state.grupos.btnsagregardisable}
                                          onClick={(e) => this.handleActionAgregar(e)}
                                        >
                                          <Done />
                                        </IconButton>
                                      </Tooltip>
                                    </Grid>
                                  </Grid>
                                </div>
                                <React.Fragment>
                                  <div>
                                    <div style={{
                                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #039BE5'
                                    }}
                                    >
                                      <Typography align="left" variant="h7" color="primary" style={{ marginLeft: '5px' }}><b>Miembros del grupo</b></Typography>
                                      <Tooltip title="Eliminar usuarios del grupo">
                                        <IconButton color="primary" component="span" disabled={this.state.grupos.deleteuserdisable} onClick={(e) => this.handleActionsEliminarTodosUsers()}>
                                          <HighlightOff />
                                        </IconButton>
                                      </Tooltip>
                                    </div>
                                    {this.state.grupos.totalusuarios > 0 ? (
                                      <Grid container>
                                        {this.state.grupos.listusuarios.map((row, index) => (
                                          <Card className={classes.root} style={{ width: '400px', marginTop: '10px' }}>
                <CardContent style={{ padding: '0px 12px 12px 12px' }}>
                                              <div style={{
                                                padding: '15px 0px 15px 0px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                                              }}
                                              >
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                  <Tooltip title={row.name}>
                                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                                      {row.avatar}
                                                    </Avatar>
                                                  </Tooltip>
                                                  <span style={{ marginLeft: '15px', fontSize: '16px' }}>{row.name}</span>
                                                </div>
                                                <div>
                                                  <Tooltip title="Quitar del grupo">
                                                    <IconButton aria-label="settings">
                                                      <Delete
                                                        color="primary"
                                                        style={{ fontSize: '18px' }}
                                                        onClick={(e) => this.handleActionQuitar(row)}
                                                      />
                                                    </IconButton>
                                                  </Tooltip>
                                                </div>
                                              </div>

                                              <div style={{ padding: '0px 0px 0px 35px' }}>
                                                <Typography textAlign="justify" variant="body2" color="textSecondary" component="p">
                                                  <b>Email: </b>
                                                  {' '}
                                                  <Chip
                                                    size="small"
                                                    label={row.email}
                                                    color="primary"
                                                    style={{ marginLeft: '5px', height: '22px' }}
                                                  />
                                                </Typography>
                                              </div>
                                            </CardContent>
              </Card>
                                        ))
                                        }
                                        {this.state.grupos.listusuarios.length >= 3
                                        && (
                                          <div style={{ marginLeft: '100px' }}>
                                            <Button color="secundary" className={classes.button} onClick={(e) => this.prepararlistarUserGrupos()}>
                                              <Typography textAlign="center" style={{ fontSize: '10px', color: '#039BE5' }}>
                                                <b>{this.state.grupos.textbtnlistartodos}</b>
                                              </Typography>
                                            </Button>
                                          </div>
                                        )
                                        }
                                      </Grid>
                                    )
                                      : (
                                        <div style={{ textAlign: 'center', marginTop: '25%', height: '325px' }}>
                                          <Group style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '30px', marginBottom: '10px' }} />
                                          <Typography style={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: '14px' }}><b>No se han agregado usuarios al grupo...</b></Typography>
                                        </div>
                                      )}
                                  </div>
                                </React.Fragment>
                              </div>
                            </TabContainer>
                          )
                        }
                      </Grid>
                    </div>
                  </Drawer>
                </div>
              </Grid>
            </Grid>
            <Grid item sm={12} md={12} lg={12}>
              <div>
                {!this.state.menu.hidebtnprincipales && this.state.acciones.upload
                  && (
                    <React.Fragment>
                      <input hidden="hidden" id="icon-button-file" type="file" name="file" multiple onChange={(e) => this.onChangeupload(e)} />
                      <label htmlFor="icon-button-file">
                        <Tooltip title="Importar Archivo">
                          <Fab
                            color="primary"
                            aria-label="crear"
                            variant="raised"
                            aria-label="upload file"
                            component="span"
                            size="small"
                            // variant="contained"
                            style={{ float: 'right' }}
                            // aria-controls="long-menu-crear"
                            aria-haspopup="true"
                          >
                            <Publish />
                          </Fab>
                        </Tooltip>
                      </label>
                    </React.Fragment>
                  )
                }
                {this.state.mover.btnclearmover && !this.state.menu.hidebtnprincipales && this.state.acciones.mover
                  && (
                    <React.Fragment>
                      <Tooltip title="Cancelar Movimiento">
                        <Fab
                          color="primary"
                          variant="raised"
                          component="span"
                          onClick={this.cancelarMovimiento}
                          size="small"
                          // variant="contained"
                          style={{
                            float: 'right', backgroundColor: '#757575', marginRight: '10px', marginLeft: '10px'
                          }}
                        >
                          <HighlightOff color="inherit" />
                        </Fab>
                      </Tooltip>
                    </React.Fragment>
                  )
                }
                {this.state.mover.btnaceptarmovimiento && !this.state.menu.hidebtnprincipales && this.state.acciones.mover
                  && (
                    <React.Fragment>
                      <Tooltip title="Pegar archivos copiados">
                        <Fab
                          color="primary"
                          variant="raised"
                          component="span"
                          disabled={this.state.mover.nosubcarpeta}
                          onClick={this.handleActionsMenuMover}
                          size="small"
                          style={{ float: 'right' }}
                        >
                          <AssignmentTurnedIn />
                        </Fab>
                      </Tooltip>
                    </React.Fragment>
                  )
                }
                <CreateDocumentDialog
                  openConfirm={this.state.ventadicionar.opencrear}
                  options={{
                    title: this.state.ventadicionar.enunciado,
                    tipo: this.state.ventadicionar.tipo,
                    mimeType: this.state.ventadicionar.mimeType,
                    error: this.state.ventadicionar.error,
                    errorMessage: this.state.ventadicionar.errorMessage,
                    denom: this.state.ventadicionar.denom,
                    descrip: this.state.ventadicionar.descrip,
                  }}
                  handleYesConfirm={this.handleYesConfirmCrear}
                  handleNoConfirm={this.handleNoConfirmCrear}
                />
                <Confirmacion
                  openConfirm={this.state.confirmacion.open}
                  options={{
                    title: this.state.confirmacion.enunciado,
                    text: this.state.confirmacion.texto,
                  }}
                  handleYesConfirm={this.handleYesConfirmDelete}
                  handleNoConfirm={this.handleCloseConfirmacion}
                />

                {this.state.acciones.papelera && this.state.acciones.elimperm
                  && (
                    <Tooltip title="Eliminar todos">
                      <Fab
                        color="primary"
                        aria-label="crear"
                        disabled={!rows.length > 0}
                        size="small"
                        variant="contained"
                        style={{ float: 'right' }}
                        aria-controls="long-menu-crear"
                        aria-haspopup="true"
                        onClick={this.handleClicDeletePerm}
                      >
                        <DeleteForever />
                      </Fab>
                    </Tooltip>
                  )
                }
              </div>
            </Grid>
          </Grid>
        </PapperBlock>
        {this.state.onlyoffice.showwindows && <DocWindows doc={this.state.onlyoffice.doc} />}
        <div />
      </div>
    );
  }
}

export default withStyles(styles)(DocumentManager);