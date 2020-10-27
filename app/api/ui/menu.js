module.exports = [
  {
    key: 'commercial',
    name: 'Commercial',
    icon: 'ios-folder',
    multilevel: true,
    child: [
      {
        key: 'commercial_manager',
        name: 'Commercial Manager',
        icon: 'ios-newspaper-outline',
        keyParent: 'commercial',
        child: [
          {
            key: 'clients',
            name: 'Clients',
            link: '/app/gestion-commercial/clients',
            icon: 'ios-people-outline'
          },
          {
            key: 'commercial_assignment',
            name: 'Commercial assignment',
            link: '/app/configurations/assignments/commercial-assignment'
          },
          {
            key: 'client_contact',
            name: 'Clients Contacts',
            link: '/app/gestion-commercial/contacts',
            icon: 'ios-people-outline'
          },
          {
            key: 'commercial_operation',
            name: 'Commercial Operations',
            link: '/app/gestion-commercial/Commercial-Operations',
            icon: 'ios-people-outline'
          },
          {
            key: 'country_assignment',
            name: 'Country assignment',
            link: '/app/configurations/countries'
          }
        ]
      },
      {
        key: 'commercial_basic_table',
        name: 'CommercialBasic Tables',
        icon: 'ios-newspaper-outline',
        keyParent: 'commercial',
        child: [
          /*         {
                   key: 'countries',
                   name: 'Countries',
                   link: '/app/configurations/country'
                 }, */
          {
            key: 'States',
            name: 'County State City',
            link: '/app/gestion-commercial/states'
          },
          /*          {
            key: 'cities',
            name: 'Cities',
            link: '/app/gestion-commercial/cities'
          }, */
          {
            key: 'status_of_commercial_operation',
            name: 'Status of Commercial Operation',
            link: '/app/gestion-commercial/status'
          },
          {
            key: 'contact_by_operation_status',
            name: 'Contact by Operation Status',
            link: '/app/gestion-commercial/contact-by-Operation'
          },
          {
            key: 'service_type',
            name: 'Service Type',
            link: '/app/gestion-commercial/service-type',
            icon: 'ios-people-outline'
          },
          {
            key: 'sectors',
            name: 'Sectors',
            link: '/app/gestion-commercial/sectors',
            icon: 'ios-people-outline'
          },
          {
            key: 'sectorsCompany',
            name: 'Sectors Company',
            link: '/app/gestion-commercial/sectorsCompany',
            icon: 'ios-people-outline'
          },

          /* {
            key: 'countries',
            name: 'Countries',
            link: '/app/configurations/country'
          } */
        ]
      }
    ]
  },
  {
    key: 'financial',
    name: 'Financial',
    icon: 'ios-cash',
    multilevel: true,
    child: [
      {
        key: 'financial_manager',
        name: 'Financial Manager',
        icon: 'ios-newspaper-outline',
        keyParent: 'financial',
        child: [
          {
            key: 'contract',
            name: 'Contracts',
            link: '/app/gestion-financial/Contracts',
            icon: 'ios-newspaper-outline'
          },
          {
            key: 'billing',
            name: 'Billing',
            link: '/app/gestion-financial/Billing',
            icon: 'ios-cash-outline'
          },
          {
            key: 'staffPayment',
            name: 'Staff Payment',
            link: '/app/gestion-financial/Staff-Payment',
            icon: 'ios-cash-outline'
          },
          {
            key: 'suppliersPayment',
            name: 'Suppliers Payment',
            link: '/app/gestion-financial/Suppliers-Payment',
            icon: 'ios-cash-outline'
          }
        ]
      },
      {
        key: 'financial_basic_table',
        name: 'Financial Basic Tables',
        icon: 'ios-newspaper-outline',
        keyParent: 'financial',
        child: [
          {
            key: 'company',
            name: 'Companies',
            link: '/app/gestion-financial/Company',
            icon: 'ios-people-outline'
          },
          {
            key: 'contractStatus',
            name: 'Contract Status',
            link: '/app/gestion-financial/Contract-Status',
            icon: 'ios-newspaper-outline'
          },
          {
            key: 'currencyManagement',
            name: 'Currency Management',
            link: '/app/gestion-financial/Currency-Management',
            icon: 'ios-cash-outline'
          },
          {
            key: 'iva',
            name: ' I.V.A %',
            link: '/app/gestion-financial/IVA',
            icon: 'ios-cash-outline'
          },
          {
            key: 'typeOfRetentoins',
            name: 'Types of Retentions',
            link: '/app/gestion-financial/Retention',
            icon: 'ios-cash-outline'
          }
        ]
      }
    ]
  },
  {
    key: 'hhrrSystem',
    name: 'HH.RR System',
    icon: 'ios-people',
    child: [
      {
        key: 'hhrr_manager',
        name: 'HH.RR Manager',
        icon: 'ios-newspaper-outline',
        keyParent: 'hhrrSystem',
        child: [
          {
            key: 'functionalStructure',
            name: 'Functional Structure',
            link: '/app/hh-rr/functionalStructure',
            icon: 'ios-people-outline'
          },
          {
            key: 'staff',
            name: 'Staff',
            link: '/app/hh-rr/staff'
          }
        ]
      },
      {
        key: 'hhrr_basic_table',
        name: 'HH.RR Basic Tables',
        icon: 'ios-newspaper-outline',
        keyParent: 'hhrrSystem',
        child: [
          {
            key: 'contractType',
            name: 'Types of contract',
            link: '/app/hh-rr/ContractType',
            icon: 'ios-paper-outline'
          },
          {
            key: 'legalCategoryType',
            name: 'Types of legal category',
            link: '/app/hh-rr/LegalCategoryType',
            icon: 'ios-paper-outline'
          },
          {
            key: 'absenceType',
            name: 'Types of absence',
            link: '/app/hh-rr/AbsenceType',
            icon: 'ios-paper-outline'
          }
        ]
      }
    ]
  },
  {
    key: 'errors',
    name: 'Errors',
    icon: 'ios-paw-outline',
    child: [
      {
        key: 'errors_page',
        name: 'Errors Pages',
        title: true
      },
      {
        key: 'not_found_page',
        name: 'Not Found Page',
        link: '/app/pages/not-found',
        icon: 'ios-warning-outline'
      },
      {
        key: 'error_page',
        name: 'Error Page',
        link: '/app/pages/error',
        icon: 'ios-warning-outline'
      }
    ]
  },
  {
    key: 'menu_levels',
    name: 'Menu Levels',
    multilevel: true,
    icon: 'ios-menu-outline',
    child: [
      {
        key: 'level_2',
        keyParent: 'menu_levels',
        multilevel: true,
        name: 'Level 2',
        child: [
          {
            key: 'sub_menu_1',
            name: 'Sub Menu 1',
            keyParent: 'level_2',
            child: [
              {
                key: 'test',
                name: 'diobra',
                link: '/#'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    key: 'no_child',
    name: 'One Level Menu',
    icon: 'ios-document-outline',
    linkParent: '/app'
  }
];
